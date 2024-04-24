import { goto } from '$app/navigation';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import SuccessAlert from '$lib/components/SuccessAlert.svelte';
import {
	currentToken,
	resetCredentials,
	setCredentials
} from '$lib/stores/user.store';
import { get } from 'svelte/store';

type RegisterInput = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
};

// Register Function
export const signup = async function (userInputFormData: RegisterInput) {
	// Make API call to authenticate user
	const response = await fetch(`${PUBLIC_BACKEND_URL}/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userInputFormData)
	});

	if (!response.ok) {
		throw await response.json();
	}

	// On successful authentication, update auth store with user details and accessToken
	const data = await response.json();
	setCredentials({
		user: data.data.user,
		accessToken: data.accessToken
	});

	// Redirect the user to his appropriate route based on his role
	switch (data.data.user.role) {
		case 'admin':
			goto('/admin/dashboard');
			break;

		default:
			goto('/');
			break;
	}

	// return successMsg to be displayed;
	return 'Signed Up Successfully!';
};

// Login function
export const login = async function (email: string, password: string) {
	// Make API call to authenticate user
	const response = await fetch(`${PUBLIC_BACKEND_URL}/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		throw await response.json();
	}

	// On successful authentication, update auth store with user details and accessToken
	const data = await response.json();
	setCredentials({
		user: data.data.user,
		accessToken: data.accessToken
	});

	// successMsg to be displayed;
	goto('/');
	new SuccessAlert({
		props: { successMsg: 'Logged in Successfully!' },
		target: document.body
	});
};

// Logout function
export const logout = async function () {
	const accessToken = get(currentToken);

	// BUG on Chrome

	await fetch(`${PUBLIC_BACKEND_URL}/auth/logout`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	resetCredentials();
	goto('/');
	new SuccessAlert({
		props: { successMsg: 'logged out successfuly!' },
		target: document.body
	});
};
