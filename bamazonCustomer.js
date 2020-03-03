var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// fuction to select all in the table in sql and display to console
// then need a function to start inquirer - prompt the user for id they would like to buy - then prompt how many
// take user input and create if statement - if there is enough product update to reflect quanitity and show total cost of product to user
// if not enough quanitity display a message to user and prompt for different item or different quanitity
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "home4567",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Here is the inventory of products: ");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement

        var table = new Table({
            head: ['Item Id', 'Product Name', 'Price']
            , colWidths: [20, 25, 20]
        });

        for (i = 0; i < 10; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price]
            );
        };

        console.log(table.toString());
        startPrompt();
        // connection.end();
    })
});

function startPrompt() {
    inquirer
        .prompt({
            name: "IdofProduct",
            type: "number",
            message: "What is the ID of the product you would like to buy?",
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    // return res[i].item_id
                    // console.log(res[i].item_id, answer.IdofProduct);
                    // console.log(res[i]);
                    if (answer.IdofProduct === res[i].item_id) {
                        howMany();
                        return;
                    }
                }
                console.log("Please enter another ID");
                startPrompt();
            });
        });
};

function howMany() {

    inquirer
        .prompt({
            name: "numberofProduct",
            type: "number",
            message: "How many of the product would you like to purchase?",
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].stock_quantity);
                    if (answer.numberofProduct <= parseInt(res[i].stock_quantity)) {
                        var newStock = res[i].stock_quantity -= answer.numberofProduct;
                        console.log(newStock);
                        connection.query("UPDATE products SET ? WHERE ?",

                            [{
                                stock_quantity: newStock,
                            },
                            {
                                item_id: answer.numberofProduct
                            }],

                            function (err) {
                                if (err) throw err;

                            })
                        console.log("Your total cost is: $" + answer.numberofProduct * res[i].price);
                        return;
                    }
                } 
                console.log("Insufficient quanity!");
                howMany();
                connection.end();
            });
        })
};