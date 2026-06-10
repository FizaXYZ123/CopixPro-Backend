export default {

async getLatestPurchase(ctx: any) {
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
                payment_status: "paid",
            },
            populate: {
                software: {
                    fields: ["downloadFileUrl"],
                },
            },
        });

        if (!latestPaymentLog) {
            return ctx.send({
                success: false,
                downloadFileUrl: null,
            });
        }

        return ctx.send({
            success: true,
            downloadFileUrl:
                latestPaymentLog.software?.downloadFileUrl || null,
        });
    } catch (error) {
        strapi.log.error("Get latest purchase error:", error);
        return ctx.internalServerError("Something went wrong");
    }
}

}