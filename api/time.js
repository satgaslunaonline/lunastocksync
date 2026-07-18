export default function handler(req, res) {

    res.json({

        now: Date.now(),

        unix: Math.floor(Date.now() / 1000),

        iso: new Date().toISOString(),

        locale: new Date().toString()

    });

}