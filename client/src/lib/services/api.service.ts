import { PUBLIC_BACKEND_URL } from '$env/static/public';
import {
	currentToken,
	setCredentials,
	setTokenCredential
} from '$lib/stores/user.store';
import { get } from 'svelte/store';

export async function fetchWithAuth(URL: string, options: RequestInit = {}) {
	for (let retry = 0; retry < 2; retry++) {
		// 1) Check if there's Access Token in the Global state
		const accessToken = get(currentToken);
		if (!accessToken) throw new Error('no accessToken');

		// 2) fetch request with accessToken
		const response = await fetch(`${PUBLIC_BACKEND_URL}${URL}`, {
			...options,
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		// 3.1) return the respone if it's okay
		if (response.ok) {
			return response.json();
		}
		// 3.2) refresh accessToken if the accessToken expired and loop again
		else if (response.status === 401) {
			const newAccessToken = await refreshAccessToken(accessToken);
			setTokenCredential(newAccessToken);
		}
		// 3.3) throw error if 404 | 403 | 500
		else {
			console.error('Error fetching data...');
			throw await response.json();
		}
	}

	throw new Error('Max retries exceeded');
}

async function refreshAccessToken(accessToken: string) {
	console.log(`refreshing Access Token`);
	const refreshResponse = await fetch(`${PUBLIC_BACKEND_URL}/auth/refresh`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	});

	if (refreshResponse.ok) {
		const { accessToken: newAccessToken } = await refreshResponse.json();
		return newAccessToken;
	} else {
		setCredentials({ user: null, accessToken: null });
		throw new Error('Refresh token failed');
	}
}
