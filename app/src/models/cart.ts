import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const cart = sequelize.define("cart", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
});

export default cart;
