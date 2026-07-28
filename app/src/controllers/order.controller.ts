import type { Request, Response } from "express";

export const submitOrder = async (req: Request, res: Response) => {
	console.log(req.user);
	res.redirect("/orders");
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};
