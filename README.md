[![Javascript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)]() [![NodeJs Badge](https://img.shields.io/badge/NodeJs-339933?logo=node.js&logoColor=FFF&style=for-the-badge)]()  [![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=FFF&style=for-the-badge)]()

# [Note Taker](https://github.com/domdecap/employee-tracker)



## Description

This is a note taker application. The purpose of this assignment was to familiarize myself with Express and further my abilities with Node. This application mainly works by utilizing GET and POST paths.

## Technologies

I used JavaScript, Node, pg, npm, and PostgreSQL.

## Install

Prerequisites: [NodeJs](https://nodejs.org/en) ```v20.12.2```
[PostgreSQL](https://www.postgresql.org/) ```v16.2```

1. Clone this repo to your local machine.
2. Open in code editior (I used VS Code).
3. Open a new instance of the integrated terminal.
4. Run ```npm i``` to install dependencies.
5. Log in to PostgreSQL by typing ```psql -U postgres``` and entering your password.
6. Run ```\i db/schema.sql``` to create the database and tables.
7. Run ```\i db/seeds.sql``` to seed the database.

## Usage

After following installation instructions, run ```node server.js``` in the integrated terminal to launch the employee tracker. From there, you should see a list of prompts that you can choose from. Navigate your list of options using your arrow keys. Choose an option using the enter key. 

## Demo




https://github.com/domdecap/employee-tracker/assets/33850184/af732891-a303-48b6-aad2-b9e92041c50c




## Contributions

I received help from my tutor Alexis on how to create the View All Employees and Add Emnployee options. I also utilized ChatGPT to help create and debug the remaining functions.

## 📜 License

MIT License

Copyright (c) 2024 Dominic DeCapite

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
