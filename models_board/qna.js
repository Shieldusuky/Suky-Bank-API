module.exports = function(sequelize, DataTypes) {
	var Qna = sequelize.define("qna", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    });
	return Qna;
};
