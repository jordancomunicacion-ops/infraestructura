const express = require("express");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

app.get("/health", async (_req, res) => {
    res.json({ ok: true });
});

app.get("/db", async (_req, res) => {
    const client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try {
        await client.connect();
        const r = await client.query("SELECT NOW() as now");
        await client.end();
        res.json({ db: "ok", now: r.rows[0].now });
    } catch (e) {
        res.status(500).json({ db: "error", error: String(e) });
    }
});

app.listen(port, () => console.log(`API listening on ${port}`));
