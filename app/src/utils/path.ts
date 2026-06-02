import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Request } from "express";
import type { ProductData } from "../models/product";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootPath = path.join(__dirname, "..");

export const findById = (req: Request, p: ProductData) =>
	p.id === req.params.id;
