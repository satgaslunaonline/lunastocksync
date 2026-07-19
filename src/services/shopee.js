export async function getProducts() {

    const response =
        await fetch("/api/products");

    return await response.json();

}

export async function getProductDetail(itemId) {

    const response =
        await fetch(`/api/product-detail?item_id=${itemId}`);

    return await response.json();

}

export async function getModels(itemId) {

    const response =
        await fetch(`/api/models?item_id=${itemId}`);

    return await response.json();

}