export const toUSD = (price: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
		price / 100,
	);

export const toCents = (price: string | number) =>
	Math.round(Number(price) * 100);
