CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(50), city VARCHAR(50));
CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, amount INT, status VARCHAR(20), created_at DATE);

INSERT INTO customers VALUES
 (1,'Somchai','Bangkok'),(2,'Suda','Chiang Mai'),(3,'Anan','Bangkok'),(4,'Mali','Phuket');

INSERT INTO orders VALUES
 (101,1,1200,'paid','2026-09-01'),
 (102,1,300,'cancelled','2026-09-03'),
 (103,2,850,'paid','2026-09-05'),
 (104,3,450,'pending','2026-09-10'),
 (105,3,2000,'paid','2026-09-12');
