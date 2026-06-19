import type { ProductData } from "../lib/types";

export const findById = (id: string, p: ProductData) => p.id === id;
