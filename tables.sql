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

CREATE TABLE cart (
    cart_id varchar(255) REFERENCES users(user_id),
	product_id integer REFERENCES product(product_id),
	quantity integer NOT NULL,
    total integer NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);


-- Dummy data for product table
INSERT INTO product (product_id, product_name, manufacturer, category, sell_price, stock_quantity, product_url, product_description)
VALUES(
   1,'at','Okuneva-Luettgen','eaque',396,245764292,'http://ratkepouros.biz/','Quam libero recusandae repudiandae. Tempora atque magni fuga nostrum libero consectetur est. Consequatur esse vel animi ratione earum eligendi sit. Tempora minima eos possimus fugit laborum velit.'),(2,'debitis','Hahn, Glover and Runolfsdottir','aliquam',223,101,'http://greenfelder.com/','Et iste harum similique distinctio. Totam consequatur ab earum rerum.'),(3,'eaque','Mante Group','eos',5400011,784283973,'http://powlowskinolan.com/','Adipisci nam magni nemo ab aperiam voluptas molestias. Beatae iure delectus voluptatem eaque delectus id. Et nostrum recusandae impedit assumenda tempora culpa et culpa.'),(4,'inventore','Powlowski-Senger','ducimus',1,150650717,'http://www.mayer.com/','Quasi ut dolor consectetur temporibus. Ut accusamus mollitia qui iusto animi. Voluptates recusandae eligendi inventore nihil voluptas et dolorem. Quaerat non eum rerum.'),(5,'reprehenderit','Breitenberg, Gaylord and Lemke','eaque',124,99603,'http://keebler.com/','Cupiditate nihil ipsum animi laboriosam exercitationem minus. Ullam sunt ut qui non quia et ducimus. Unde sapiente nesciunt vel ex ipsum.'),(6,'quo','Hamill, Hammes and Gleason','rerum',19876052,60,'http://williamson.com/','Aliquam cum impedit fuga assumenda illo quae illum. Harum illum expedita quam ut pariatur tempore facere. Esse vero accusamus culpa sapiente autem.'),(7,'est','Cassin-Dicki','dolorum',0,0,'http://weber.info/','Ipsum dolorem delectus aut laborum inventore distinctio quaerat. Rem soluta et quia est. Id omnis maxime nobis quis perspiciatis. Eum consequatur eaque qui tempora sint quia amet.'),(8,'amet','Grant, Adams and Murphy','optio',59,12,'http://www.zboncak.info/','Iste maiores commodi eum tenetur qui. Repellat quam qui sit magni. Fugiat repudiandae vitae praesentium ut non. Molestiae dolor eveniet temporibus voluptatem omnis enim.'),(9,'ex','Considine Group','sunt',1,347844,'http://nader.org/','Qui voluptate et sit error illum. Temporibus ut vitae quidem voluptatem dolore. Laborum sapiente illo dignissimos magni dignissimos mollitia nisi. Quasi sit qui quo quia.'),(10,'temporibus','Sporer Group','quo',3,6724338,'http://nienow.com/','Dolor dolores alias quae a. Atque earum debitis error harum provident eligendi exercitationem. Rem corrupti ut blanditiis blanditiis consequatur. Voluptas voluptas quas vel ab cum accusantium aliquam praesentium. Magnam deserunt saepe aut qui occaecati.'),(11,'necessitatibus','Waelchi, Carroll and Dickinson','modi',2958,298,'http://predovicryan.net/','Possimus ex aliquam est aliquam velit sit culpa. Iusto inventore totam sit.'),(12,'omnis','Roberts Group','accusantium',717786,9387,'http://www.quigleykozey.com/','Vel at quibusdam odit voluptatem commodi optio sit ut. Perspiciatis ipsa dolores et aliquid. Atque libero repellat fugiat quasi ut architecto. Sunt dignissimos nesciunt et natus.'),(13,'minus','Price, Considine and Anderson','repudiandae',19572119,7244739,'http://hermiston.com/','Voluptas libero sit assumenda ut et. Nam facere ipsum tempore quis quod vel temporibus eum. Reiciendis consectetur veritatis vitae necessitatibus qui voluptates delectus.'),(14,'placeat','Denesik and Sons','dolorum',170,34236,'http://www.stammjakubowski.org/','Nulla doloremque illum sint nostrum iste architecto beatae. Ad nobis numquam vel iusto. Facilis eum est et alias aliquam nisi officiis. Possimus necessitatibus iure ipsa et fuga excepturi qui quas.'),(15,'quidem','Brown, Koelpin and Koss','laborum',157583814,3382,'http://www.pagacoconnell.biz/','Dolores est ullam maxime cum hic eveniet dolorum ut. Libero eveniet cum ducimus aliquid porro fugit. Earum reprehenderit numquam molestiae amet mollitia laborum dicta. Recusandae voluptatibus delectus quis ut. Qui libero optio architecto neque ut odio quas ipsa.'
);


-- Dummy data for orders table
INSERT INTO orders 
  (order_id, date, total, shipto_street, shipto_city, shipto_state, shipto_zipcode, email, pay_method, card_num, user_id)
VALUES 
  ('0e29a011-3b44-3b6b-ba85-b681a0be95de', '1988-04-08', 16191.4, '7254 Konopelski Walks Suite 612', 'Lake Casimerstad', 'So', 'cepu', 'fweissnat@example.com', 'American Express', '5413', 'e87db979-3225-4456-9a88-e1e255e2d960'),
  ('149a3ffa-34c5-3408-b126-a8ef2f7217d3', '2003-11-08', 9.37639, '432 Emard Port', 'North Edwina', 'No', 'poev', 'moen.noemy@example.org', 'MasterCard', '5404', NULL),
  ('1b54dd54-370a-3e98-a3e9-abcb1b96f664', '2008-01-27', 172.665, '4416 Sophia Island Apt. 159', 'Andersonfort', 'Ka', 'okqu', 'okeeling@example.com', 'Visa', '4556', NULL),
  ('208d2a2a-3f2c-3738-96f4-bfadf0f7d324', '1988-10-15', 561.678, '10214 Randall Stravenue', 'East Katharinaland', 'Mi', 'empl', 'bruen.karianne@example.com', 'MasterCard', '5145', NULL),
  ('25e684b6-a955-3010-bdf3-647da3fae534', '2002-01-10', 53625.8, '46905 Winston Parkway', 'South Nevafurt', 'Al', 'mkqg', 'rudolph84@example.org', 'MasterCard', '4716', NULL),
  ('297b8014-847d-39fc-bf8a-9ffa8e3918ba', '1989-01-21', 573927000, '548 Wiley Vista', 'South Rosalinda', 'Al', 'kmkl', 'zheidenreich@example.net', 'Visa', '4556', NULL),
  ('2fc34231-fc18-302d-9786-ffe57d3eb78b', '1972-03-26', 1131080, '014 Enos Rapids Suite 505', 'Lillieberg', 'Ne', 'ezat', 'qreilly@example.net', 'Discover Card', '4539', NULL),
  ('577f0bbb-3eeb-3395-9abf-bbeba9721574', '2006-12-09', 6.83844, '20699 Carroll Causeway', 'North Isac', 'Ar', 'muev', 'abernathy.kenny@example.org', 'MasterCard', '4556', NULL),
  ('59d880e9-4ca3-3936-a6ad-9e014e50ada1', '1985-06-13', 120274, '935 Armando Plains Apt. 226', 'Millsfurt', 'In', 'jvmn', 'haley.fern@example.com', 'MasterCard', '5326', NULL),
  ('6a9a7e4f-2475-3ff2-9c04-e3d52386ca30', '1986-07-02', 45868.4, '38835 Felicity Land', 'Robelville', 'Lo', 'syyz', 'dovie.ortiz@example.com', 'MasterCard', '5179', NULL),
  ('6ffd3c4d-15af-305b-b6a7-e52bd2637443', '1985-02-04', 3.39, '5735 Adriana Corner', 'Batzshire', 'Ke', 'yqii', 'howe.leilani@example.org', 'MasterCard', '5513', NULL),
  ('787a12d8-cd0e-3b25-9466-36be71611820', '1998-04-11', 0, '546 Becker Track', 'South Cary', 'Lo', 'oznd', 'llueilwitz@example.net', 'Visa', '6011', NULL);
