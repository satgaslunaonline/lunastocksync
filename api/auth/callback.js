import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const partner_id = Number(process.env.SHOPEE_PARTNER_ID);
    const partner_key = process.env.SHOPEE_PARTNER_KEY;

    const { code, shop_id } = req.query;

    if (!code || !shop_id) {
      return res.status(400).json({
        success: false,
        message: "Missing code or shop_id"
      });
    }

    const path = "/api/v2/auth/token/get";
    const timestamp = Math.floor(Date.now() / 1000);

    // Base string sesuai dokumentasi Shopee
    const baseString =
      `${partner_id}${path}${timestamp}`;

    const sign = crypto
      .createHmac("sha256", partner_key)
      .update(baseString)
      .digest("hex");

    const url =
      `https://partner.shopeemobile.com${path}` +
      `?partner_id=${partner_id}` +
      `&timestamp=${timestamp}` +
      `&sign=${sign}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code,
        shop_id: Number(shop_id),
        partner_id
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
}