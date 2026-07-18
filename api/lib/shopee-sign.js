import crypto from "crypto";

export function generateSignature(baseString) {

    return crypto
        .createHmac(
            "sha256",
            process.env.SHOPEE_PARTNER_KEY
        )
        .update(baseString)
        .digest("hex");

}