import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { db } from "./firebase";

export async function getWaitingQueue() {

    const q = query(
        collection(db, "queue"),
        where("status", "==", "waiting")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

}