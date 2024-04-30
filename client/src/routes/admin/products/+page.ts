import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let products: IProduct[];
	let brands: IBrand[];
	let subcategories: ISubCategory[];

	try {
		// Fetch data for brands and subcategories in parallel
		const [productsResponse, brandsResponse, subcategoriesResponse] = await Promise.all([
			fetch(`${PUBLIC_BACKEND_URL}/products?limit=1000`),
			fetch(`${PUBLIC_BACKEND_URL}/brands?limit=50`),
			fetch(`${PUBLIC_BACKEND_URL}/subcategories?limit=50`)
		]);

		// Parse response data
		const productsData = await productsResponse.json();
		const brandsData = await brandsResponse.json();
		const subcategoriesData = await subcategoriesResponse.json();

		// Extract brands and subcategories from response data
		products = productsData.data.products;
		brands = brandsData.data.brands;
		subcategories = subcategoriesData.data.subcategories;
	} catch (error) {
		console.error(error);
		throw redirect(303, '/');
	}

	return {
		products,
		brands,
		subcategories
	};
};
