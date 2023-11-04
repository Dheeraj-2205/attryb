const express = require('express');
const app = express();
const {config} = require('dotenv');
const router = require('./routes/user');
const oem_specs = require('./routes/product');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1",router);
app.use("/api/v1", oem_specs)
config({
    path : "backend/config/config.env"
})

module.exports = app