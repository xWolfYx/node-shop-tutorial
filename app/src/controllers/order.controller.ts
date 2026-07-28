import type { Request, Response } from "express";

export const submitOrder = async (req: Request, res: Response) => {
	try {
		const cart = await req.user.getCart();
		const products = await cart.getProducts();

		const order = await req.user.createOrder();

		await order.addProducts(
			products.map((p) => {
				p.orderItem = { quantity: p.cartItem.quantity };
				return p;
			}),
		);

		await cart.setProducts(null);
		res.redirect("/orders");
	} catch (err) {
		console.log(err);
	}
};

export const renderOrders = async (req: Request, res: Response) => {
	const orders = await req.user.getOrders({ include: ["products"] });
	console.log(orders);

	res.render("shop/orders", {
		pageTitle: "Orders",
		path: "orders",
		orders,
	});
};
