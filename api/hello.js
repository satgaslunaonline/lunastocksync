export default function handler(req, res) {

    res.status(200).json({

        success: true,

        partnerId: process.env.SHOPEE_PARTNER_ID ? "OK" : "NOT FOUND",

        partnerKey: process.env.SHOPEE_PARTNER_KEY ? "OK" : "NOT FOUND"

    });

}