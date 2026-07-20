import { createSignature } from "./sign.js";

export async function shopeeRequest({

    path,

    accessToken = "",

    shopId = "",

    query = {}

}) {

    const {

        partnerId,

        timestamp,

        sign

    } = createSignature(

        path,

        accessToken,

        shopId

    );

    const params = new URLSearchParams({

        partner_id: partnerId,

        timestamp,

        sign

    });

    if (accessToken) {

        params.append(

            "access_token",

            accessToken

        );

    }

    if (shopId) {

        params.append(

            "shop_id",

            shopId

        );

    }

    Object.entries(query).forEach(

        ([key, value]) => {

            params.append(

                key,

                value

            );

        }

    );

    const url =

        `https://partner.shopeemobile.com${path}?${params.toString()}`;

    const response =

        await fetch(url);

    return await response.json();

}