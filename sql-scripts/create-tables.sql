create type status as enum ('OPEN', 'ORDERED')

CREATE TABLE carts (
 id uuid primary key default uuid_generate_v4(),
 user_id uuid not null,
 title text not null,
 created_at date not null,
 updated_at date not null,
 status status not null
)

create table cart_items (
	cart_id uuid,
	product_id uuid not null,
	count integer,
	foreign key ("cart_id") references "carts" ("id")
)

create extension if not exists "uuid-ossp"