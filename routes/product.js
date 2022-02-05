const router = require("express").Router();
const productControllter = require("../controller/productController");

router.post("/",productControllter.product_create);
router.get("/",productControllter.product_all);
router.get("/:productId",productControllter.product_details);
router.put("/:productId",productControllter.product_update);
router.delete("/:productId",productControllter.product_delete);

module.exports = router;