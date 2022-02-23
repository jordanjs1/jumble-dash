var db = require("../models");

module.exports = {
    findAllUnsolved: function (req, res) {
        db.Problem.findAll({
            where: {
                solved: false,
                TaskId: req.params.id
            }
        }).then(function (dbProblem) {
            res.json(dbProblem);
        });
    },
    findAllSolved: function (req, res) {
        db.Problem.findAll({
            where: {
                solved: true,
                TaskId: req.params.id
            }
        }).then(function (dbProblem) {
            res.json(dbProblem);
        });
    },
    create: function (req, res) {
        console.log(req);
        db.Problem.create({
            problem: req.body.problem,
            TaskId: req.body.TaskId,
            ProjectId: req.body.ProjectId
        }).then(function (newProblem) {
            console.log(newProblem)
            res.json(newProblem);
        })
    },
    update: function (req, res) {
        db.Problem.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbProblem) {
            res.json(dbProblem);
        });
    },
    remove: function (req, res) {
        db.Problem.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbProblem) {
            res.json(dbProblem);
        });
    },
};