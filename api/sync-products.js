import { db } from "./lib/firebase-admin.js";
import { getAllProducts } from "./lib/products.js";

export default async function handler(req, res) {

    const products = await getAllProducts();

    res.status(200).json({

        total: products.length,

        products

    });

}