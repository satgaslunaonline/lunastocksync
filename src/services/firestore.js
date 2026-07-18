import {
    collection,
    getDocs,
    doc,
    setDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function getProducts() {

    const snapshot = await getDocs(
        collection(db, "products")
    );

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}

export async function saveProduct(product) {

    await setDoc(

        doc(
            db,
            "products",
            encodeURIComponent(product.sku)
        ),

        product

    );

}