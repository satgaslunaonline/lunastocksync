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

                const items =
                    data.response.item;

                let html = `

<table border="1" cellspacing="0" cellpadding="8">

<tr>

<th>Item ID</th>

<th>Status</th>

<th>Update</th>

<th>Aksi</th>

</tr>

`;

                items.forEach(item => {

                    html += `

<tr>

<td>${item.item_id}</td>

<td>${item.item_status}</td>

<td>${new Date(item.update_time * 1000).toLocaleString()}</td>

<td>

<button
class="btn-detail"
data-id="${item.item_id}">

Detail

</button>

</td>

</tr>

`;

                });

                html += "</table>";

                result.innerHTML = html;

            }

            catch (err) {

                result.innerHTML = err.message;

            }

        };

}