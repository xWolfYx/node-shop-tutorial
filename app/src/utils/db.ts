import { Sequelize } from "sequelize";

const sequelize = new Sequelize("product-shop", "root", "StrongPassword", {
	dialect: "mysql",
	host: "localhost",
});

export default sequelize;
