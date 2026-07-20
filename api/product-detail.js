import crypto from "crypto";
import { getShopeeAuth } from "./lib/auth.js";
import { getModelList } from "./lib/products.js";

export default async function handler(req, res) {

    const partnerId = process.env.SHOPEE_PARTNER_ID;
    const partnerKey = process.env.SHOPEE_PARTNER_KEY;

const {

    accessToken,

    shopId

} = await getShopeeAuth();

    const path = "/api/v2/product/get_item_base_info";

    const timestamp = Math.floor(Date.now()/1000);

    const baseString =
        `${partnerId}${path}${timestamp}${accessToken}${shopId}`;

    const sign = crypto
        .createHmac("sha256",partnerKey)
        .update(baseString)
        .digest("hex");

    // sementara satu item dulu
    const itemIds = req.query.item_id;

if (!itemIds) {

    return res.status(400).json({

        error: "item_id wajib diisi"

    });

}

const modelResponse = await getModelList(itemIds);

return res.status(200).json(modelResponse);

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