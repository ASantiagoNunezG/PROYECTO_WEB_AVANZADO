DROP DATABASE tec;

CREATE DATABASE tec;

USE tec;

CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45)
);

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    name VARCHAR(45),
    lastname VARCHAR(45),
    email VARCHAR(100),
    password VARCHAR(255),
    address TEXT,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE brand (
	brand_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45)
);

CREATE TABLE provider (
	provider_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(9)
);

CREATE TABLE category (
	category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120)
);

CREATE TABLE product (
	product_id INT AUTO_INCREMENT PRIMARY KEY,
    provider_id INT,
    category_id INT,
    brand_id INT,
    name VARCHAR(200),
    price DOUBLE,
    description TEXT,
    stock INT
);

CREATE TABLE specification (
	specification_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    content TEXT
);

CREATE TABLE specification_detail (
	specification_id INT,
    product_id INT,
    PRIMARY KEY (product_id, specification_id)
);

CREATE TABLE sell (
	sell_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    payment_id INT,
    delivery_id INT,
    state VARCHAR(60),
    final_price DOUBLE,
    delivery_commision DOUBLE,
    sell_date DATE
);

CREATE TABLE payment (
	payment_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type_id INT,
    state VARCHAR(60),
    payment_date DATE,
    payment_hour TIME
);

CREATE TABLE payment_type (
	payment_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45)
);

CREATE TABLE delivery (
	delivery_id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_type_id INT,
    shop_id INT,
    state VARCHAR(60),
    delivery_date DATE,
    delivery_hour TIME
);

CREATE TABLE delivery_type (
	delivery_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60)
);

CREATE TABLE shop (
	shop_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT
);

ALTER TABLE product 
ADD CONSTRAINT fk_product_provider FOREIGN KEY (provider_id) REFERENCES provider(provider_id),
ADD CONSTRAINT fk_product_brand FOREIGN KEY (brand_id) REFERENCES brand(brand_id),
ADD CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category(category_id);

ALTER TABLE specification_detail
ADD CONSTRAINT fk_sd_specification FOREIGN KEY (specification_id)  REFERENCES specification(specification_id),
ADD CONSTRAINT fk_sd_product FOREIGN KEY (product_id) REFERENCES product(product_id);

ALTER TABLE sell
ADD CONSTRAINT fk_sell_user FOREIGN KEY (user_id) REFERENCES user(user_id),
ADD CONSTRAINT fk_sell_payment FOREIGN KEY (payment_id) REFERENCES payment(payment_id),
ADD CONSTRAINT fk_sell_delivery FOREIGN KEY (delivery_id) REFERENCES delivery(delivery_id);

ALTER TABLE payment
ADD CONSTRAINT fk_payment_pt FOREIGN KEY (payment_type_id) REFERENCES payment_type(payment_type_id);

ALTER TABLE delivery
ADD CONSTRAINT fk_delivery_dt FOREIGN KEY (delivery_type_id) REFERENCES delivery_type(delivery_type_id),
ADD CONSTRAINT fk_delivery_shop FOREIGN KEY (shop_id) REFERENCES shop(shop_id);

-- Insertar un rol
INSERT INTO role (name) VALUES ('Admin');

-- Insertar un usuario
INSERT INTO user (role_id, name, lastname, email, password, address) 
VALUES (1, 'Juan', 'Pérez', 'juan.perez@example.com', 'password123', 'Calle Falsa 123');

-- Insertar una marca
INSERT INTO brand (name) VALUES ('MarcaEjemplo');

-- Insertar un proveedor
INSERT INTO provider (name, phone) VALUES ('ProveedorEjemplo', '123456789');

-- Insertar una categoría
INSERT INTO category (name) VALUES ('Electrónica');

-- Insertar un producto
INSERT INTO product (provider_id, category_id, brand_id, name, price, description, stock) 
VALUES (1, 1, 1, 'ProductoEjemplo', 99.99, 'Descripción del producto ejemplo.', 50);

-- Insertar una especificación
INSERT INTO specification (name, content) VALUES ('EspecificaciónEjemplo', 'Contenido de la especificación ejemplo.');

-- Insertar un detalle de especificación
INSERT INTO specification_detail (specification_id, product_id) VALUES (1, 1);


-- Insertar un tipo de pago
INSERT INTO payment_type (name) VALUES ('Tarjeta de Crédito');

-- Insertar un pago
INSERT INTO payment (payment_type_id, state, payment_date, payment_hour) 
VALUES (1, 'completed', '2024-10-08', '10:00:00');

-- Insertar un tipo de entrega
INSERT INTO delivery_type (name) VALUES ('Envío estándar');

-- Insertar una tienda
INSERT INTO shop (name, address) VALUES ('TiendaEjemplo', 'Av. Principal 456');

-- Insertar una entrega
INSERT INTO delivery (delivery_type_id, shop_id, state, delivery_date, delivery_hour) 
VALUES (1, 1, 'in transit', '2024-10-08', '12:00:00');

-- Insertar una venta
INSERT INTO sell (user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date) 
VALUES (1, 1, 1, 'completed', 150.75, 5.00, '2024-10-08');

