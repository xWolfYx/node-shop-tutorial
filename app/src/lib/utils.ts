import type { ProductData } from "../lib/types.js";

export const findById = (id: string, p: ProductData) => p.id === id;
export const toUSD = (price: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
		price / 100,
	);

export const toCents = (price: string | number) =>
	Math.round(Number(price) * 100);
