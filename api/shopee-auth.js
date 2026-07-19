import crypto from "crypto";

export default function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const timestamp = Math.floor(Date.now() / 1000);
    const path = "/api/v2/shop/auth_partner";

    const baseString = `${partnerId}${path}${timestamp}`;

    const sign = crypto
        .createHmac("sha256", partnerKey)
        .update(baseString)
        .digest("hex");

    res.json({
        partnerId,
        keyPrefix: partnerKey.substring(0, 8),
        keyLength: partnerKey.length,
        baseString,
        sign
    });

}