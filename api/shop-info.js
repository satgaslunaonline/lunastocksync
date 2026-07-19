import crypto from "crypto";

export default async function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const accessToken =
        "ISI_ACCESS_TOKEN";

    const shopId =
        304158815;

    const path =
        "/api/v2/shop/get_shop_info";

    const timestamp =
        Math.floor(Date.now() / 1000);

    const baseString =
        `${partnerId}${path}${timestamp}${accessToken}${shopId}`;

    const sign =
        crypto
            .createHmac("sha256", partnerKey)
            .update(baseString)
            .digest("hex");

    const url =
        `https://partner.shopeemobile.com${path}` +
        `?partner_id=${partnerId}` +
        `&shop_id=${shopId}` +
        `&timestamp=${timestamp}` +
        `&access_token=${accessToken}` +
        `&sign=${sign}`;

    const response =
        await fetch(url);

    const data =
        await response.json();

    res.status(200).json(data);

}