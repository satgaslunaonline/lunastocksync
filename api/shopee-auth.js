import { generateSignature } from "./lib/shopee-sign.js";

export default function handler(req, res) {

    const signature = generateSignature("LUNA_TEST");

    res.status(200).json({

        success: true,

        signature

    });

}