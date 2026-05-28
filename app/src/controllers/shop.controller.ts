import type { Request, Response } from "express";

export const renderCart = (_: Request, res: Response) => {
	res.render("shop/cart", { pageTitle: "Cart" });
};
