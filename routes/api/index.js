const router = require("express").Router();

const UserRoutes 	 = require("./user");
const AccountRoutes  = require("./account");
const ProjectRoutes  = require("./project");
const BudgetRoutes   = require("./budget");
const TaskRoutes 	 = require("./task");
const ProblemRoutes  = require("./problem");

router.use("/user", UserRoutes);
router.use("/account", AccountRoutes);
router.use("/project", ProjectRoutes);
router.use("/budget", BudgetRoutes);
router.use("/task", TaskRoutes);
router.use("/problem", ProblemRoutes);

module.exports = router;