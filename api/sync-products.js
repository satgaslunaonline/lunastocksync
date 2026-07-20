import { db } from "./lib/firebase-admin.js";
import { getAllProducts } from "./lib/products.js";
import { FieldValue } from "firebase-admin/firestore";

export default async function handler(req, res) {

    const products = await getAllProducts();

for (const product of products) {

    await db
        .collection("shopee_products")
        .doc(String(product.item_id))
        .set({

            ...product,

            updatedAt: FieldValue.serverTimestamp()

        });

}

    res.status(200).json({

        success: true,

        total: products.length

    });

}