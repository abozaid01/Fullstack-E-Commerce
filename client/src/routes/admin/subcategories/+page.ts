import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let categories: ICategory[];
	let subcategories: ISubCategory[];
	let totalSubategories: number;

	try {
		// Fetch data for categories and subcategories in parallel
		const [categoriesResponse, subcategoriesResponse] = await Promise.all([
			fetch(`${PUBLIC_BACKEND_URL}/categories`),
			fetch(`${PUBLIC_BACKEND_URL}/subcategories`)
		]);

		// Parse response data
		const categoriesData = await categoriesResponse.json();
		const subcategoriesData = await subcategoriesResponse.json();

		// Extract categories and subcategories from response data
		categories = categoriesData.data.categories;
		subcategories = subcategoriesData.data.subcategories;
		totalSubategories = subcategoriesData.total;
	} catch (error) {
		console.error(error);
		throw redirect(303, '/');
	}

	return {
		categories,
		subcategories,
		totalSubategories
	};
};
