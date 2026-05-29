import type { Request, Response } from "express";

export const renderIndex = async (_: Request, res: Response) => {
	res.render("shop/index", {
		pageTitle: "Shop",
	});
};

export const renderCart = (_: Request, res: Response) => {
	res.render("shop/cart", { pageTitle: "Cart" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
