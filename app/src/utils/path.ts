import path from "node:path";
import type { Request } from "express";
import type { ProductData } from "../models/product";

const __dirname = import.meta.dirname;

export const rootPath = path.join(__dirname, "..");

export const findById = (req: Request, p: ProductData) =>
	p.id === req.params.id;
