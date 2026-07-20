import { shopeeRequest } from "./request.js";
import { getShopeeAuth } from "./auth.js";

export async function getItemList(
    offset = 0,
    pageSize = 20
) {

    const {
        accessToken,
        shopId
    } = await getShopeeAuth();

    return await shopeeRequest({

        path: "/api/v2/product/get_item_list",

        accessToken,

        shopId,

        query: {

            offset,

            page_size: pageSize,

            item_status: "NORMAL"

        }

    });

}

export async function getAllItemIds() {

    let offset = 0;

    const pageSize = 100;

    let items = [];

    while (true) {

        const response =
            await getItemList(offset, pageSize);

        items.push(...response.response.item);

        if (!response.response.has_next_page) {

            break;

        }

        offset = response.response.next_offset;

    }

    return items;

}

export async function getItemBaseInfo(itemIds) {

    if (!Array.isArray(itemIds)) {

        itemIds = [itemIds];

    }

    const {
        accessToken,
        shopId
    } = await getShopeeAuth();

    return await shopeeRequest({

        path: "/api/v2/product/get_item_base_info",

        accessToken,

        shopId,

query: {

    item_id_list: itemIds.join(","),

    need_complaint_policy: false,

    need_tax_info: false,

    need_complaint_policy: false

}

    });

}

export async function getAllProducts() {

    const items = await getAllItemIds();

    const ids = items.map(item => item.item_id);

    let products = [];

    for (let i = 0; i < ids.length; i += 50) {

        const batch = ids.slice(i, i + 50);

        const response =
            await getItemBaseInfo(batch);

        console.log(JSON.stringify(response, null, 2));

        if (response.response?.item_list) {

            products.push(
                ...response.response.item_list
            );

console.log(
    "Produk pertama:",
    response.response.item_list[0]
);

        }

    }

    return products;

}