import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

export async function addToQueue(product, oldStock = null) {

    await addDoc(
        collection(db, "queue"),
        {

            sku: product.sku,

            nama: product.nama,

            oldStock,

            newStock: product.stockShopee,

            status: "waiting",

            retry: 0,

            createdAt: serverTimestamp()

        }
    );

}