import { db } from "./lib/firebase-admin.js";
import { getAllProducts } from "./lib/products.js";
import { FieldValue } from "firebase-admin/firestore";

export default async function handler(req, res) {

    const products = await getAllProducts();

    if (products.length > 0) {

        await db
            .collection("products")
            .doc(String(products[0].item_id))
            .set({

                ...products[0],

                updatedAt: FieldValue.serverTimestamp()

            });

    }

    res.status(200).json({

        success: true,

        total: products.length

    });

}