export default function handler(req, res) {

    res.status(200).json({

        success: true,

        partnerId: process.env.SHOPEE_PARTNER_ID,

        partnerKey: process.env.SHOPEE_PARTNER_KEY
            ? "FOUND"
            : "NOT FOUND"

    });

}