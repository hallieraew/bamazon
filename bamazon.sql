DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),
    PRIMARY KEY (item_id)

);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(1231, "Whisk", "Home & Kitchen", 8.99, 30), 
(523, "Cordless Hair Clippers", "Beauty & Personal Care", 36.99, 15), 
("Toothbrush Heads", "Beauty & Personal Care", 21.22, 45),
("Headphones", "Electronics", 87.65, 75),
("Frooties", "Food", 16.99, 52),
("The Highwomen", "CDs & Vinyl", 10, 36),
("Swingline Stapler", "Office Supplies", 4.07, 12),
("Whiteboard", "Office Supplies", 13.99, 38),
("Rubber Ducky", "Baby", 5.25, 45),
("Bluetooth Speaker", "Electronics", 65.76, 32);
