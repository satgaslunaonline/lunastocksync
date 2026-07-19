export async function getProducts() {

    const response = await fetch("/api/products");

    if (!response.ok) {
        throw new Error("Gagal mengambil produk Shopee");
    }

    return await response.json();

}