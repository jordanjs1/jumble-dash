var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Task.findAll({
            where: {
                ProjectId: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
    findAllIncomplete: function (req, res) {
        db.Task.findAll({
            where: {
                ProjectId: req.params.id,
                complete: false
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
    findAllUnsolvedTaskProblems: function (req, res) {
        db.Task.findAll({
            where: {
                ProjectId: req.params.id,
                complete: false
            },
            include: [{
                model: db.Problem,
                required: false,
                where : {
                    solved: false
                }
            }]
        }).then(function (dbTask) {
            res.json(dbTask)
        });
    },
    findAllSolvedTaskProblems: function (req, res) {
        db.Task.findAll({
            where: {
                ProjectId: req.params.id,
                complete: false
            },
            include: [{
                model: db.Problem,
                required: false,
                where : {
                    solved: true
                }
            }]
        }).then(function (dbTask) {
            res.json(dbTask)
        });
    },
    create: function (req, res) {
        db.Task.create({
            task: req.body.task,
            deadline: req.body.deadline,
            assignee1: req.body.assignee1,
            assignee2: req.body.assignee2,
            assignee3: req.body.assignee3,
            assignee4: req.body.assignee4,
            ProjectId: req.body.ProjectId
        }).then(function (newTask) {
            res.json(newTask);
        })
    },
    update: function (req, res) {
        db.Task.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
    remove: function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    },
};