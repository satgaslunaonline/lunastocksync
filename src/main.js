import "./css/app.css";

import { registerRoute, startRouter } from "./router";

import { Dashboard } from "./pages/Dashboard";
import { Upload, initUpload } from "./pages/Upload";

registerRoute(
    "dashboard",
    Dashboard
);

registerRoute(
    "upload",
    Upload,
    initUpload
);

startRouter();