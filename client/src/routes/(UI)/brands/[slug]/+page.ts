import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch(`http://localhost:3000/api/v1/brands`);
	const brands = await response.json();
	console.log(brands);
	return {
		post: {
			title: `Title for ${params.slug} goes here`,
			content: `Content for ${params.slug} goes here`
		},
		brands
	};
};
