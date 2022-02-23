const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define("Budget", {
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Marketing: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        HR: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Design: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Engineering: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Sales: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Finance: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Security: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
            timestamps: false
        });

    Budget.associate = function (models) {

        Budget.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'cascade'
        });
    };

    return Budget;
}