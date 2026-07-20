import { db } from "./firebase-admin.js";

export async function getShopeeAuth() {

    const doc = await db
        .collection("settings")
        .doc("shopee")
        .get();

    if (!doc.exists) {

        throw new Error(
            "Shopee belum di-authorize."
        );

    }

    const data = doc.data();

    return {

        accessToken: data.accessToken,

        refreshToken: data.refreshToken,

        shopId: data.shopId,

        expiredAt: data.expiredAt

    };

}