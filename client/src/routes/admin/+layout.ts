import { fetchWithAuth } from '$lib/services/api.service';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load: LayoutLoad = async () => {
	try {
		await fetchWithAuth(`/coupons`);
	} catch (error) {
		console.error(`failed to fetch`, error);
		throw redirect(303, '/');
	}
};
