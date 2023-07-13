CREATE TABLE users (
    user_id varchar(255) PRIMARY KEY,
    username varchar(30) NOT NULL UNIQUE,
    password varchar NOT NULL,
    first_name varchar(100) CHECK (first_name ~ '^[A-Za-z]+$'),
    last_name varchar(100) CHECK (first_name ~ '^[A-Za-z]+$'),
    email_address varchar(100) NOT NULL UNIQUE,
    phone_number varchar(10) CHECK (phone_number ~ '^[0-9]{10}$'),
    street_address varchar(100) NOT NULL,
    city varchar(30) NOT NULL,
    state varchar(2) NOT NULL,
    zipcode varchar(5) NOT NULL
);

CREATE TABLE orders (
    order_id varchar(255) PRIMARY KEY,
    date varchar(300) NOT NULL,
    total money NOT NULL,
    shipto_street varchar(50) NOT NULL,
	shipto_city varchar(30) NOT NULL,
	shipto_state char(2) NOT NULL,
	shipto_zipcode varchar(10) NOT NULL,
	email varchar(100) NOT NULL,
	pay_method varchar(20) NOT NULL,
	card_num char(4) NOT NULL,
	user_id varchar(255) REFERENCES users(user_id)
);

CREATE TABLE product (
	product_id serial PRIMARY KEY,
	product_name varchar(50) NOT NULL,
	manufacturer varchar(50) NOT NULL,
	category varchar(50) NOT NULL,
	sell_price money NOT NULL,
	stock_quantity integer NOT NULL,
	product_url varchar(100) NOT NULL,
	product_description text NOT NULL
);

CREATE TABLE order_details (
    order_id varchar REFERENCES orders(order_id),
    product_id integer REFERENCES product(product_id),
    quantity integer NOT NULL,
    price money NOT NULL
);


-- I think I'll use state for the cart. Then, when it's submitted, orders and order_details can handle it. Don't need cart_id now
CREATE TABLE cart (
    cart_id varchar(255) REFERENCES users(cart_id),
	product_id varchar(255) REFERENCES product(product_id),
	cart_quantity integer NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);