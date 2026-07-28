import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const order = sequelize.define("order", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
});

export default order;
