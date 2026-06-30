export interface ProductData {
	id: string;
	title: string;
	imageUrl: string;
	description: string;
	price: number;
}

export interface CartProduct {
	id: string;
	quantity: number;
}

export interface CartData {
	products: CartProduct[];
	totalPrice: number;
}
