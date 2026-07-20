import { shopeeRequest } from "./request.js";

export async function getItemList(
    offset = 0,
    pageSize = 20
) {

    return await shopeeRequest({

        path:
            "/api/v2/product/get_item_list",

        accessToken,

        shopId,

        query: {

            offset,

            page_size: pageSize,

            item_status: "NORMAL"

        }

    });

}