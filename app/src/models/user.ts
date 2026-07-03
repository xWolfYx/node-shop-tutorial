import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const user = sequelize.define("user", {
	id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
	name: DataTypes.STRING,
	email: DataTypes.STRING,
});

export default user;
