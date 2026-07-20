import { db } from "./lib/firebase-admin.js";
import { getAllProducts } from "./lib/products.js";

export default async function handler(req, res) {

    res.status(200).json({

        success: true

    });

}