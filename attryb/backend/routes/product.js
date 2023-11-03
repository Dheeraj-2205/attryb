const express = require('express');
const { createProduct, getAllProducts, updateProducts, adminGetAllProducts,deleteProducts } = require('../controller/oem_specs');
const router = express.Router();

router.route("/newoem").post(createProduct)
router.route("/alloem").get(getAllProducts)
router.route("/admin/getall").get(adminGetAllProducts)
router.route("admin/:id").put(updateProducts).delete(deleteProducts);


module.exports = router