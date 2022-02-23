const router = require("express").Router();
const task = require("../../controllers/task-controller");

// =====================================
//     /api/task   =====================
// =====================================
router.route("/")
  .post(task.create);

router.route("/:id/incomplete")
  .get(task.findAllIncomplete);

router.route("/:id/unsolved")
  .get(task.findAllUnsolvedTaskProblems);

router.route("/:id/solved")
  .get(task.findAllSolvedTaskProblems);

router.route("/:id")
  .get(task.findAll)
  .put(task.update)
  .delete(task.remove);

module.exports = router;