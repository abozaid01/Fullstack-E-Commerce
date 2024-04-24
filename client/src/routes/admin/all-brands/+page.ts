import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let brands: IBrand[];
	let totalBrands: number;
	try {
		const jsonRes = await fetch(`${PUBLIC_BACKEND_URL}/brands?limit=1000`, {
			headers: { 'Content-Type': 'application/json' }
		});

		const response = await jsonRes.json();
		brands = response.data.brands;
		totalBrands = response.total;
	} catch (error) {
		console.error(error);
		throw redirect(303, '/');
	}

	return {
		brands,
		totalBrands
	};
};
