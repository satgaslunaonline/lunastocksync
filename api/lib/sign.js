import crypto from "crypto";

export function createSignature(path, accessToken = "", shopId = "") {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const timestamp = Math.floor(Date.now() / 1000);

    const baseString =
        `${partnerId}${path}${timestamp}${accessToken}${shopId}`;

    const sign = crypto
        .createHmac("sha256", partnerKey)
        .update(baseString)
        .digest("hex");

    return {
        partnerId,
        timestamp,
        sign
    };

}