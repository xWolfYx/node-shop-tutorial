import type { ProductData } from "../lib/types.js";

export const findById = (id: string, p: ProductData) => p.id === id;
