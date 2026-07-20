import { db } from "./lib/firebase-admin.js";
import { getAllProducts } from "./lib/products.js";
import { FieldValue } from "firebase-admin/firestore";

export default async function handler(req, res) {

    const products = await getAllProducts();

const batch = db.batch();

for (const product of products) {

    const ref = db
        .collection("shopee_products")
        .doc(String(product.item_id));

    batch.set(ref, {

        ...product,

        updatedAt: FieldValue.serverTimestamp()

    });

}

await batch.commit();

    res.status(200).json({

        success: true,

        total: products.length

    });

}