import crypto from "crypto";

export default function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const redirect = "https://lunastocksync.vercel.app/auth/callback";

    const path = "/api/v2/shop/auth_partner";

    const timestamp = Math.floor(Date.now() / 1000);

    const baseString = `${partnerId}${path}${timestamp}`;

    const sign = crypto
        .createHmac("sha256", partnerKey)
        .update(baseString)
        .digest("hex");

    const authUrl =
        `https://partner.shopeemobile.com${path}` +
        `?partner_id=${partnerId}` +
        `&timestamp=${timestamp}` +
        `&sign=${sign}` +
        `&redirect=${encodeURIComponent(redirect)}`;

    res.json({
        success: true,
        authUrl
    });

}