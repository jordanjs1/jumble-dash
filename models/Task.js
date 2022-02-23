const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true
        },
        assignee1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assignee2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assignee3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        assignee4: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Task.associate = function (models) {

        Task.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'cascade'
        });

        Task.hasMany(models.Problem, {
            foreignKey: "TaskId"
        });
    };

    return Task;
}