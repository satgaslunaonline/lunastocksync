import { getAllProducts } from "./lib/products.js";

export default async function handler(req, res) {

    try {

        const products = await getAllProducts();

        res.status(200).json({

            total: products.length,

            products

        });

    } catch (err) {

        res.status(500).json({

            error: err.message

        });

    }

}