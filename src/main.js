import "./css/app.css";

import { registerRoute, startRouter } from "./router";

import { Dashboard } from "./pages/Dashboard";
import { Upload, initUpload } from "./pages/Upload";

import {
    renderShopeeProducts,
    initShopeeProducts
} from "./pages/shopee-products.js";

registerRoute(
    "dashboard",
    Dashboard
);

registerRoute(
    "upload",
    Upload,
    initUpload
);

registerRoute(
    "shopee-products",
    renderShopeeProducts,
    initShopeeProducts
);

startRouter();