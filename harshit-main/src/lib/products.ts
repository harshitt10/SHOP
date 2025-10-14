import products from "@/data/products.json";

export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	image: string;
	description: string;
	slug: string;
}

export const getAllProducts = (): Product[] => {
	return products as Product[];
};

export const getProductBySlug = (slug: string): Product | undefined => {
	return products.find((product) => product.slug === slug) as Product | undefined;
};

export const getProductsByCategory = (category: string): Product[] => {
	return products.filter((product) => product.category === category) as Product[];
};

export const getCategories = (): string[] => {
	const categories = [...new Set(products.map((product) => product.category))];
	return categories.sort();
};
