// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface IUser {
		// wishlist: [],
		_id: string;
		name: string;
		email: string;
		verified: boolean;
		profileImg: string;
		role: 'admin' | 'user';
		// addresses: []
	}

	interface IBrand {
		_id: string;
		name: string;
		description?: string;
		imageCover: string;
	}

	interface ISubCategory {
		_id: string;
		name: string;
		description?: string;
		imageCover?: string;
		category_id: string;
	}

	interface ICategory {
		_id: string;
		name: string;
		description?: string;
		imageCover: string;
		subcategories: ISubCategory[];

		isExpanded: boolean;
	}
}

export {};
