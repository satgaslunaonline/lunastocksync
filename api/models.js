import crypto from "crypto";

export default async function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const accessToken = "784a4c6d7647635672594b5575614269";
    const shopId = 304158815;

    const itemId = req.query.item_id;

if (!itemId) {

    return res.status(400).json({

        error: "item_id wajib diisi"

    });

}

    const path = "/api/v2/product/get_model_list";

    const timestamp = Math.floor(Date.now() / 1000);

    const baseString =
        `${partnerId}${path}${timestamp}${accessToken}${shopId}`;

    const sign = crypto
        .createHmac("sha256", partnerKey)
        .update(baseString)
        .digest("hex");

    const url =
        `https://partner.shopeemobile.com${path}` +
        `?partner_id=${partnerId}` +
        `&timestamp=${timestamp}` +
        `&access_token=${accessToken}` +
        `&shop_id=${shopId}` +
        `&sign=${sign}` +
        `&item_id=${itemId}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);

}