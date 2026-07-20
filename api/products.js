import { getAllItemIds } from "./lib/products.js";

export default async function handler(req, res) {

    try {

        const items = await getAllItemIds();

        res.status(200).json({

            total: items.length,

            items

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

}