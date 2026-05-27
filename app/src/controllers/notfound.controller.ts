import type { Request, Response } from "express";

export const renderNotfoundPage = (_: Request, res: Response) => {
	res.status(404).render("not-found", {
		pageTitle: "404 - Page Not Found",
		bodyClass: "page page--error",
	});
};
