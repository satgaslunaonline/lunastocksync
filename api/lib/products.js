import { shopeeRequest } from "./request.js";

const accessToken =
    "784a4c6d7647635672594b5575614269";

const shopId =
    304158815;

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