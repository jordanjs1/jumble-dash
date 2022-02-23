const router = require("express").Router();
const problem = require("../../controllers/problem-controller");

// =====================================
//     /api/problem   ==================
// =====================================
router.route("/")
  .post(problem.create);

router.route("/:id/solved")
  .get(problem.findAllSolved);

router.route("/:id/unsolved")
  .get(problem.findAllUnsolved);

router.route("/:id")
  .put(problem.update)
  .delete(problem.remove);

module.exports = router;