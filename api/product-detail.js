import crypto from "crypto";

export default async function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

    const accessToken = "784a4c6d7647635672594b5575614269";
    const shopId = 304158815;

    const path = "/api/v2/product/get_item_base_info";

    const timestamp = Math.floor(Date.now()/1000);

    const baseString =
        `${partnerId}${path}${timestamp}${accessToken}${shopId}`;

    const sign = crypto
        .createHmac("sha256",partnerKey)
        .update(baseString)
        .digest("hex");

    // sementara satu item dulu
    const itemIds =
        "49614058259";

    const url =
        `https://partner.shopeemobile.com${path}`+
        `?partner_id=${partnerId}`+
        `&timestamp=${timestamp}`+
        `&access_token=${accessToken}`+
        `&shop_id=${shopId}`+
        `&sign=${sign}`+
        `&item_id_list=${itemIds}`;

    const response =
        await fetch(url);

    const data =
        await response.json();

    res.status(200).json(data);

}