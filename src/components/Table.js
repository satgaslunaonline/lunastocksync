export function renderTable(products) {

    if (!products.length) {

        return `
            <p>Tidak ada data.</p>
        `;

    }

    return `
        <table class="stock-table">

            <thead>

                <tr>

                    <th>No</th>
                    <th>SKU</th>
                    <th>Nama Produk</th>
                    <th>Stock POS</th>
                    <th>Stock Shopee</th>

                </tr>

            </thead>

            <tbody>

                ${products.map((item, index) => `

                    <tr>

                        <td>${index + 1}</td>

                        <td>${item.sku}</td>

                        <td>${item.nama}</td>

<td>${item.stockPos}</td>

<td>${item.stockShopee}</td>

                    </tr>

                `).join("")}

            </tbody>

        </table>
    `;

}