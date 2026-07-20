import crypto from "crypto";

const accessToken =
    "784a4c6d7647635672594b5575614269";

const shopId =
    304158815;
    
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