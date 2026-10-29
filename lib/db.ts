import Database from "better-sqlite3";
import path from "path";

export type Row = {
  customer_id: number;
  customer_name: string;
  city: string;
  order_id: number | null;
  total_pay: number | null;
  status: "paid" | "pending" | "cancelled" | null;
  date: string | null;
};

export function getCustomerOrders(): Row[] {
  const db = new Database(path.join(process.cwd(), "data", "app.db"), {
    readonly: true,
    fileMustExist: true,
  });
  try {
    return db
      .prepare(
        `SELECT c.id         AS customer_id,
                c.name       AS customer_name,
                c.city       AS city,
                o.id         AS order_id,
                o.amount     AS total_pay,
                o.status     AS status,
                o.created_at AS date
           FROM customers c
           LEFT JOIN orders o ON o.customer_id = c.id
          ORDER BY c.id, o.created_at, o.id`
      )
      .all() as Row[];
  } finally {
    db.close();
  }
}