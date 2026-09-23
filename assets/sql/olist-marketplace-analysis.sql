-- Olist Marketplace Analytics
-- Repeat purchasing among customers with delivered orders.
-- customer_unique_id is used to identify customers across orders.

WITH customer_orders AS (
    SELECT
        c.customer_unique_id,
        COUNT(DISTINCT o.order_id) AS delivered_orders
    FROM customers c
    JOIN orders o
        ON o.customer_id = c.customer_id
    WHERE o.order_status = 'delivered'
    GROUP BY c.customer_unique_id
)
SELECT
    COUNT(*) AS unique_customers,
    COUNT(*) FILTER (
        WHERE delivered_orders > 1
    ) AS repeat_customers,
    ROUND(
        100.0 * COUNT(*) FILTER (
            WHERE delivered_orders > 1
        ) / COUNT(*),
        2
    ) AS repeat_customer_rate_pct
FROM customer_orders;
