const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const root = path.join(__dirname, "..");
const dbPath = path.join(root, "data", "app.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

for (const f of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`, `${dbPath}-journal`]) {
  fs.rmSync(f, { force: true });
}

const db = new Database(dbPath);
db.exec(fs.readFileSync(path.join(root, "seed.sql"), "utf8"));
const c = db.prepare("SELECT COUNT(*) n FROM customers").get().n;
const o = db.prepare("SELECT COUNT(*) n FROM orders").get().n;
console.log(`✔ seeded ${dbPath} — customers: ${c}, orders: ${o}`);
db.close();