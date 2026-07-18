export function compareProducts(
    excelProducts,
    firestoreProducts
) {

    const firestoreMap = new Map();

    firestoreProducts.forEach(product => {

        firestoreMap.set(product.sku, product);

    });

    const result = {

        unchanged: [],

        updated: [],

        created: []

    };

    excelProducts.forEach(product => {

        const oldProduct = firestoreMap.get(product.sku);

// Produk baru
if (!oldProduct) {

    result.created.push(product);

    return;

}

// Stock berubah
if (oldProduct.stockShopee !== product.stockShopee) {

    result.updated.push({

        old: oldProduct,

        current: product

    });

    return;

}

// Tidak berubah
result.unchanged.push(product);

    });

    return result;

}