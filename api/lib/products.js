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