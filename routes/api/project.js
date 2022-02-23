const router = require("express").Router();
const project = require("../../controllers/project-controller");

// =====================================
//     /api/project   ==================
// =====================================
router.route("/")
  .get(project.findAll)
  .post(project.create);

router.route("/:id")
    .get(project.findOne)
    .put(project.update)
    .delete(project.remove);
	
module.exports = router;