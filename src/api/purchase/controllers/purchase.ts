export default {

    async getLatestPurchase(ctx: any) {
         console.log("GET LATEST PURCHASE HIT");
        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized("User not authenticated");
            }

            const latestPaymentLog = await strapi.documents(
                "api::payment-log.payment-log"
            ).findFirst({
                filters: {
                    users_permissions_user: {
                        id: user.id,
                    },
                },
                sort: {
                    createdAt: "desc",
                },
                populate: ["users_permissions_user"],
            });

            if (!latestPaymentLog) {
                return ctx.send({
                    success: false,
                });
            }

            return ctx.send({
                success: true,
                data: latestPaymentLog,
            });
        } catch (error) {
            strapi.log.error("Get latest payment log error:", error);

            return ctx.internalServerError("Something went wrong");
        }
    }
}