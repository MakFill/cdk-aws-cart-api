insert into carts (user_id, title, created_at, updated_at, status) values
(gen_random_uuid(), 'Test title 1', make_date(2022, 07, 25), make_date(2022, 07, 26), 'OPEN'),
(gen_random_uuid(), 'Test title 2', make_date(2023, 08, 26), make_date(2023, 08, 27), 'ORDERED')


insert into cart_items (cart_id, product_id, count) values
('bd2734b2-3202-4fb0-a6f5-2c0311f7b6c3', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 4),
('dd3d634c-7054-434d-a084-a5169ca51f34', '7567ec4b-b10c-48c5-9445-fc73c48a80a2', 6)