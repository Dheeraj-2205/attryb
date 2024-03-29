const express = require('express');
const { createProduct, getAllProducts, updateProducts, adminGetAllProducts,deleteProducts } = require('../controller/oem_specs');
const { isAuthenticated, authorizeRoles } = require('../utils/auth');
const router = express.Router();

router.route("/newoem").post(createProduct)
router.route("/alloem").get(getAllProducts)
router.route("/admin/getall").get(isAuthenticated,authorizeRoles("admin"),adminGetAllProducts)
router.route("/admin/:id").put(updateProducts).delete(deleteProducts);


module.exports = router