import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let categories: ICategory[];
	let totalCategories: number;
	try {
		const jsonRes = await fetch(`${PUBLIC_BACKEND_URL}/categories?limit=1000`, {
			headers: { 'Content-Type': 'application/json' }
		});

		const response = await jsonRes.json();
		categories = response.data.categories;
		totalCategories = response.total;
	} catch (error) {
		console.error(error);
		throw redirect(303, '/');
	}

	return {
		categories,
		totalCategories
	};
};
