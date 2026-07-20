import syncProducts from "./sync-products.js";

export default async function handler(req, res) {

    return await syncProducts(req, res);

}