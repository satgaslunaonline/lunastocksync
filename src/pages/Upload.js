import { Layout } from "../components/Layout";
import { readExcel } from "../services/excel";
import { aggregate } from "../services/parser";
import { renderTable } from "../components/Table";
import {
    getProducts,
    saveProduct
} from "../services/firestore";
import { compareProducts } from "../services/compare";
import { addToQueue } from "../services/queue";
import { getWaitingQueue } from "../services/worker";

export function Upload() {

    return Layout(`

        <h1>Upload Stock On Hand</h1>

        <div class="upload-card">

            <input
                type="file"
                id="excelFile"
                accept=".xlsx,.xls">

            <br><br>

            <button id="btnRead">

                Baca Excel

            </button>

        </div>

<div id="result">

    <p>Belum ada data.</p>

</div>

    `);

}

export function initUpload() {

    const btn = document.getElementById("btnRead");

    if (!btn) return;

    btn.addEventListener("click", async () => {

        const file = document
            .getElementById("excelFile")
            .files[0];

        if (!file) {

            console.log("Belum ada file dipilih");

            return;

        }

        try {

const rows = await readExcel(file);

const products = aggregate(rows);

const firestoreProducts = await getProducts();

const compare = compareProducts(
    products,
    firestoreProducts
);

console.log(compare);

for (const product of compare.created) {

    // Simpan ke master products
    await saveProduct(product);

    // Masukkan ke antrean sinkronisasi
    await addToQueue(product);

}

for (const item of compare.updated) {

    await saveProduct(item.current);

    await addToQueue(
        item.current,
        item.old.stockShopee
    );

}

const waiting = await getWaitingQueue();

console.log("QUEUE:", waiting);

document.getElementById("result").innerHTML =
    renderTable(products);

        } catch (err) {

            console.error(err);

        }

    });

}