import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const product = sequelize.define("product", {
	id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	title: { type: DataTypes.STRING, allowNull: false },
	imageUrl: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
});

export default product;
