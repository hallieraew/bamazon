require("dotenv").config();
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var sqlPass = require("./pass");
console.log(sqlPass);

var connection = mysql.createConnection(sqlPass);

function startApp() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("\n=========== Welcome to Bamazon! ===========");
        console.log("\n Here is the inventory of products: ");
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

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
        })
    });
};

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

                    if (answer.IdofProduct === res[i].item_id) {
                        howMany(res[i].item_id);
                        return;
                    }
                }
                console.log("\nUnfortunately we cannot find that ID. Please enter another ID from our current list of products.\n");
                startPrompt();
            });
        });
};

function howMany(ID) {

    inquirer
        .prompt({
            name: "numberofProduct",
            type: "number",
            message: "How many of the product would you like to purchase?",
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { item_id: ID }, function (err, res) {
                if (err) throw err;
                console.log(res);
                if (answer.numberofProduct <= parseInt(res[0].stock_quantity)) {
                    var newStock = res[0].stock_quantity - answer.numberofProduct;
                    connection.query("UPDATE products SET ? WHERE ?",

                        [{
                            stock_quantity: newStock,
                        },
                        {
                            item_id: ID
                        }],

                        function (err) {
                            if (err) throw err;

                        })
                    console.log("\nYour total cost is: $" + answer.numberofProduct * res[0].price + "\n");
                    again();
                    return;
                }
                console.log("\nInsufficient quantity!\n");
                howMany();
            });

        });
};
function again() {
    inquirer.prompt({
        name: "exit",
        type: "list",
        message: "Would you like to purchase another item or exit the store?",
        choices: ["BUY", "EXIT"]
    }).then(function (answer) {
        if (answer.exit === "EXIT") {
            console.log("\n====Thank you for your purchase(s)! See you again soon!====\n")
            connection.end();
            return;
        } else startPrompt();
    })
};
startApp();