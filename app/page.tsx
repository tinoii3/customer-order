import { Suspense } from "react";
import { connection } from "next/server";
import { getCustomerOrders } from "@/lib/db";

const statusLabel = { paid: "Paid", pending: "Pending", cancelled: "Cancelled" } as const;
const money = new Intl.NumberFormat("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Page() {
  return (
    <main>
      <h1>ลูกค้าและออร์เดอร์</h1>
      <Suspense fallback={<p className="sub">กำลังโหลดข้อมูล...</p>}>
        <CustomerOrders />
      </Suspense>
    </main>
  );
}

async function CustomerOrders() {
  await connection();
  const rows = getCustomerOrders();
  const customers = new Set(rows.map((r) => r.customer_id)).size;
  const orders = rows.filter((r) => r.order_id !== null).length;
  const noOrder = rows.filter((r) => r.order_id === null).length;

  return (
    <>
      <p className="sub">
        ลูกค้า {customers} ราย · ออร์เดอร์ {orders} รายการ · ยังไม่มีออร์เดอร์ {noOrder} ราย
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Order No</th>
              <th className="num">Pay Total (฿)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.customer_id}-${r.order_id ?? "none"}-${i}`}>
                <td>{r.customer_name}</td>
                <td>{r.city}</td>
                {r.order_id === null ? (
                  <td colSpan={3} className="empty">ยังไม่มีออร์เดอร์</td>
                ) : (
                  <>
                    <td className="mono">#{r.order_id}</td>
                    <td className="num mono">{money.format(r.total_pay ?? 0)}</td>
                    <td>
                      <span className={`badge ${r.status}`}>{statusLabel[r.status!]}</span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}