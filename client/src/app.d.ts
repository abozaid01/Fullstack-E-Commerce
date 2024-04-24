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

	interface IProduct {
		_id: string;
		title: string;
		description: string;
		quantity: number;
		price: number;
		priceAfterDiscount: number;
		colors: string[];
		imageCover: string;
		images: string[];
		category_id: string;
		subcategories_ids: string[];
		ratingsQuantity: number;
		ratingsAverage: number;
		slug: string;
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
	}
}

export {};
