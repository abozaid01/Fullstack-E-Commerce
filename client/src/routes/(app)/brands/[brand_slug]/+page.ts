import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageLoad } from './$types';

// Function to extract id by slug
function getIdBySlug(slug: string, brands: IBrand[]) {
	// Iterate through the array
	for (let i = 0; i < brands.length; i++) {
		// Check if the slug matches
		if (brands[i].slug === slug) {
			// Return the id if found
			return brands[i]._id;
		}
	}
	// Return null if slug not found
	return null;
}

export const load: PageLoad = async ({ fetch, params }) => {
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

		// Get All Brand Products
		const brandId = getIdBySlug(params.brand_slug, brands);

		const productsResponse = await fetch(`${PUBLIC_BACKEND_URL}/brands/${brandId}/products`);
		const productsData = await productsResponse.json();
		const products: IProduct[] = productsData.data.products;

		return {
			brands,
			categories,
			products
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		// Handle errors or return default values
		return { brands: [], categories: [], products: [] };
	}
};
