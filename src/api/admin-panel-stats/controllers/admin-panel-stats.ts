export default {

    async getStats(ctx: any) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized("Authentication required");
            }

            const currentUser = await strapi.db
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        id: user.id,
                    },
                    populate: {
                        role: true,
                    },
                });

            if (currentUser?.role?.name !== "Authenticated") {
                return ctx.forbidden("Access denied");
            }

            // Count only users with Client role
            const totalUsers = await strapi.db
                .query("plugin::users-permissions.user")
                .count({
                    where: {
                        role: {
                            name: "Client", // Change if your role name differs
                        },
                    },
                });

            // Count only paid & published payment logs
            const totalPaymentLogs = await strapi.db
                .query("api::payment-log.payment-log")
                .count({
                    where: {
                        payment_status: "paid",
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                });

            // Get paid & published logs for revenue calculation
            const paymentLogs = await strapi.db
                .query("api::payment-log.payment-log")
                .findMany({
                    select: ["amount"],
                    where: {
                        payment_status: "paid",
                        publishedAt: {
                            $notNull: true,
                        },
                    },
                });

            const totalRevenue = paymentLogs.reduce(
                (sum: number, log: any) => sum + Number(log.amount || 0),
                0
            );

            ctx.body = {
                totalUsers,
                totalPaymentLogs,
                totalRevenue,
            };
        } catch (error) {
            strapi.log.error("Dashboard Stats Error:", error);
            return ctx.internalServerError("Failed to fetch dashboard statistics");
        }
    },

    async getClients(ctx: any) {
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized("Authentication required");
            }

            const currentUser = await strapi.db
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        id: user.id,
                    },
                    populate: {
                        role: true,
                    },
                });

            if (currentUser?.role?.name !== "Authenticated") {
                return ctx.forbidden("Access denied");
            }

            const clients = await strapi.db
                .query("plugin::users-permissions.user")
                .findMany({
                    where: {
                        role: {
                            name: "Client",
                        },
                    },
                    populate: {
                        machine_ids: {
                            select: ["machineId"],
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });

            return ctx.send({
                success: true,
                count: clients.length,
                data: clients.map((client: any) => ({
                    firstName: client.firstName,
                    lastName: client.lastName,
                    email: client.email,
                    createdAt: client.createdAt,
                    isActive: client.isActive,
                    machine_ids:
                        client.machine_ids?.map(
                            (machine: any) => machine.machineId
                        ) || [],
                })),
            });
        } catch (error) {
            strapi.log.error("Get clients error:", error);
            return ctx.internalServerError("Failed to fetch clients");
        }
    }

};