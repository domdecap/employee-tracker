const { Pool } = require('pg');
const inquirer = require ('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        database: 'employees_db'
    },
    console.log('Connected to employees_db')
)

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err));


