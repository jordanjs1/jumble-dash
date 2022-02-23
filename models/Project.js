const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    Project.associate = function (models) {

        Project.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Project.hasMany(models.Task, {
            foreignKey: "ProjectId"
        });
    };

    return Project;
}