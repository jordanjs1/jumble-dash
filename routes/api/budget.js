const router = require("express").Router();
const budget = require("../../controllers/budget-controller");

// =====================================
//     /api/budget   ===================
// =====================================
router.route("/")
  .post(budget.create);

router.route("/:id")
    .get(budget.findOne)
    .put(budget.update);
	
module.exports = router;