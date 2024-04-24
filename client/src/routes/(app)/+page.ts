import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Fetch data for brands and categories in parallel
		const [brandsResponse, categoriesResponse] = await Promise.all([
			fetch(`${PUBLIC_BACKEND_URL}/brands`),
			fetch(`${PUBLIC_BACKEND_URL}/categories`)
		]);

		// Parse response data
		const brandsData = await brandsResponse.json();
		const categoriesData = await categoriesResponse.json();

		// Extract brands and categories from response data
		const brands: IBrand[] = brandsData.data.brands;
		const categories: ICategory[] = categoriesData.data.categories;

		return {
			brands,
			categories
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		// Handle errors or return default values
		return { brands: [], categories: [] };
	}
};
