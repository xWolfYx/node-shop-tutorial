import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const orderItem = sequelize.define("orderItem", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
});

export default orderItem;
