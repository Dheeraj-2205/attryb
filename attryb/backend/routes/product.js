const express = require('express');
const { createProduct, getAllProducts } = require('../controller/oem_specs');
const router = express.Router();

router.route("/newoem").post(createProduct)
router.route("/alloem").get(getAllProducts)


module.exports = router