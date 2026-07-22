import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const cart = sequelize.define("cart", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
});

export default cart;
