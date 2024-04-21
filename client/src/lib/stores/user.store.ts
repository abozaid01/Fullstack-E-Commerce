import {
	GCMEncryption,
	createEncryptionStorage,
	createLocalStorage,
	persist
} from '@macfja/svelte-persistent-store';
import { derived, writable, type Writable } from 'svelte/store';

type UserData = { user: IUser | null; accessToken: string | null };

// Create writable stores for user and token
export const user: Writable<null | IUser> = persist(
	writable(null),
	createEncryptionStorage(
		createLocalStorage(),
		new GCMEncryption('65fe8103ce245155940af4ee8')
	),
	'userData'
);
export const token: Writable<null | string> = persist(
	writable(null),
	createEncryptionStorage(
		createLocalStorage(),
		new GCMEncryption('65fe8103ce245155940af4ee8')
	),
	'accessToken'
);

// Derived stores for current user and accessToken
export const currentUser = derived(user, ($user) => $user);
export const currentToken = derived(token, ($token) => $token);

// Actions to update user and token
export const setTokenCredential = (newToken: string) => {
	token.set(newToken)
}
export const setCredentials = (userData: UserData) => {
	user.set(userData.user);
	token.set(userData.accessToken);
};

export const resetCredentials = () => {
	user.set(null);
	token.set(null);
};
