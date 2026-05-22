import express from "express";

const router = express.Router();

const products: { title: string }[] = [];

router.get("/add-product", (_, res) => {
	res.render("add-product", {
		pageTitle: "Add Product",
	});
});

router.post("/add-product", (req, res) => {
	if (req.body.title) products.push({ title: req.body.title });
	res.redirect("/");
});

export { products, router };
