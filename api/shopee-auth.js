import crypto from "crypto";

export default function handler(req, res) {

    const partnerId = Number(process.env.SHOPEE_PARTNER_ID);
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const redirect = "https://lunastocksync.vercel.app/auth/callback";

    const timestamp = Math.floor(Date.now() / 1000);

const path = "/api/v2/shop/auth_partner";

const baseString = `${partnerId}${path}${timestamp}`;

    const sign = crypto
        .createHmac("sha256", partnerKey)
        .update(baseString)
        .digest("hex");

    const url =
        `https://partner.shopeemobile.com/api/v2/shop/auth_partner` +
        `?partner_id=${partnerId}` +
        `&timestamp=${timestamp}` +
        `&sign=${sign}` +
        `&redirect=${encodeURIComponent(redirect)}`;

res.status(200).json({
    partnerId,
    timestamp,
    path,
    baseString,
    sign,
    url
});

}