const express = require('express');
const { createProduct, getAllProducts, updateProducts, adminGetAllProducts,deleteProducts } = require('../controller/oem_specs');
const { isAuthenticated, authorizeRoles } = require('../utils/auth');
const router = express.Router();

router.route("/newoem").post(isAuthenticated, authorizeRoles("admin"),createProduct)
router.route("/alloem").get(getAllProducts)
router.route("/admin/getall").get(isAuthenticated,adminGetAllProducts)
router.route("/admin/:id").put(isAuthenticated,updateProducts).delete(isAuthenticated,deleteProducts);


module.exports = router