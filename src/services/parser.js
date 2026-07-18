/**
 * Mengubah kode POS menjadi SKU Shopee
 *
 * Contoh:
 * 105.0127A.2001 -> 105.0127A
 * 105.0127A      -> 105.0127A
 * 105            -> 105
 */
export function getShopeeSku(kode) {

    if (!kode) return "";

    const parts = String(kode).trim().split(".");

    // Format: 105.0127A.2001
    if (parts.length === 3) {
        parts.pop();
        return parts.join(".");
    }

    // Format: 105.0127A
    if (parts.length === 2) {
        return parts.join(".");
    }

    // Format: 105
    return parts[0];

}

export function aggregate(rows) {

    const products = {};

    for (const row of rows) {

        const sku = getShopeeSku(row.Kode);

        if (!sku) continue;

        const qty = Number(row.Quantity) || 0;

        if (!products[sku]) {

products[sku] = {

    sku,

    nama: row.Nama,

    stockPos: 0,

    stockShopee: 0,

    outlets: {}

};

        }

        products[sku].stockPos += qty;

const outlet = row.Outlet;

if (!products[sku].outlets[outlet]) {

    products[sku].outlets[outlet] = 0;

}

products[sku].outlets[outlet] += qty;

    }

for (const item of Object.values(products)) {

    item.stockShopee = Math.max(0, item.stockPos - 3);

}

    return Object.values(products);

}