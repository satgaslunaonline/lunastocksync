import { getProducts } from "../services/shopee.js";

export function renderShopeeProducts() {

    return `
        <h2>Shopee Products</h2>

        <button id="btnRefresh">
            Refresh dari Shopee
        </button>

        <div id="result"></div>
    `;

}

export function initShopeeProducts() {

    document
        .querySelector("#btnRefresh")
        .onclick = async () => {

            const result =
                document.querySelector("#result");

            result.innerHTML = "Loading...";

            try {

                const data =
                    await getProducts();

                result.innerHTML =
                    `<pre>${JSON.stringify(data, null, 2)}</pre>`;

            } catch (err) {

                result.innerHTML =
                    err.message;

            }

        };

}