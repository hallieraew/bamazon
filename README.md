# Bamazon

## Overview

Bamazon is an Amazon-like store front which allows customers to view inventory, select product, select quanity and determine price for products desired from the command line. This application will query from a MySQL database in order to determine cost, product and quantity and then will dynamically update the stock based on what the user has decided to purchase.

### Tech Requirements

This application is run with Node.js. To run it will be necesary to require both MySQL and Inquirer NPM packages. I have also required the cli-table NPM package to easily display our SQL data in the terminal.

* [MySQL](https://www.npmjs.com/package/mysql)

* [Inquirer](https://www.npmjs.com/package/inquirer)

* [CLI Table](https://www.npmjs.com/package/cli-table)

### Demo - Customer View

When users run the application, we will start with displaying the full list of inventory products pulled every time from our MySQL database and prompting the user to enter the ID of the product they would like to purchase.

![GIF for when application starts and inventory table is populated to user.](/Images/Launch_Bamazon_Application.gif)

When the customer enters an incorrect ID, we let them know it cannot be found and prompt them to enter another ID. When the ID does match one that exists in the product table, we prompt to determine how many of the product they would like to purchase.

![Screenshot of function to take in ID and prompt how many of the product to purchase.](/Images/Correct_IncorrectIDs.gif)

When the customer enters the quantity of the product, we query the databse to ensure there is enough in stock. If there is, we will update the database and display the total cost to the user. If not, we will display that there is an insufficient quantity and the user can enter a new amount.

![Determine insufficient quantities of product or display total cost.](/Images/sufficient_insufficient_quantity.gif)

When we display total cost to the user, we will then display two options to either buy again or exit the application.

![Determine if user wants to buy again or exit the application.](/Images/buyOrExit.gif)