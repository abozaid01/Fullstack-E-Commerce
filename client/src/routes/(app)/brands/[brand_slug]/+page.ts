import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		// Fetch data for brands and categories in parallel
		const [brandsResponse, categoriesResponse /*, productsResponse*/] =
			await Promise.all([
				fetch(`${PUBLIC_BACKEND_URL}/brands`),
				fetch(`${PUBLIC_BACKEND_URL}/categories`)
				// fetch(`${PUBLIC_BACKEND_URL}/brands/${params.brand}/products`)
			]);

		// Parse response data
		const brandsData = await brandsResponse.json();
		const categoriesData = await categoriesResponse.json();
		// const productsData = await productsRes.json();

		// Extract brands and categories from response data
		const brands: IBrand[] = brandsData.data.brands;
		const categories: ICategory[] = categoriesData.data.categories;
		// const products: IProduct[] = productsData.data.products;

		return {
			brands,
			categories,
			products: [
				{
					_id: '1',
					title: 'Classic White T-Shirt',
					description:
						'A comfortable and stylish white t-shirt for everyday wear.',
					quantity: 50,
					price: 19.99,
					priceAfterDiscount: 15.99,
					colors: ['White'],
					imageCover: 'https://source.unsplash.com/user/c_v_r/1600x1900',
					images: ['tshirt-white.jpg', 'tshirt-white-back.jpg'],
					category_id: 'clothing',
					subcategories_ids: ['tshirts'],
					ratingsQuantity: 35,
					ratingsAverage: 4.5,

					slug: 'classic-white-t-shirt'
				},
				{
					_id: '2',
					title: 'Denim Jeans',
					description: 'Classic denim jeans with a modern fit.',
					quantity: 30,
					price: 49.99,
					priceAfterDiscount: 39.99,
					colors: ['Blue'],
					imageCover:
						'data:image/jpeg;base64,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',
					images: ['jeans-blue.jpg', 'jeans-blue-side.jpg'],
					category_id: 'clothing',
					subcategories_ids: ['pants'],
					ratingsQuantity: 20,
					ratingsAverage: 4.0,

					slug: 'denim-jeans'
				},
				{
					_id: '3',
					title: 'Leather Wallet',
					description:
						'Sleek leather wallet with multiple card slots and compartments.',
					quantity: 15,
					price: 29.99,
					priceAfterDiscount: 24.99,
					colors: ['Brown', 'Black'],
					imageCover:
						'data:image/jpeg;base64,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',
					images: ['wallet-brown.jpg', 'wallet-brown-open.jpg'],
					category_id: 'accessories',
					subcategories_ids: ['wallets'],
					ratingsQuantity: 10,
					ratingsAverage: 4.0,

					slug: 'leather-wallet'
				},
				{
					_id: '4',
					title: 'Running Shoes',
					description: 'Lightweight running shoes with breathable mesh.',
					quantity: 40,
					price: 79.99,
					priceAfterDiscount: 69.99,
					colors: ['Black', 'Red', 'Blue'],
					imageCover:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQwe3Wma23rMyo6suK1D6K0JHhEeh-zy-EP6NRgyeqh3Z0531yy2TESjFxk3EntH5ye6I&usqp=CAU',
					images: ['running-shoes-black.jpg', 'running-shoes-black-side.jpg'],
					category_id: 'shoes',
					subcategories_ids: ['running'],
					ratingsQuantity: 25,
					ratingsAverage: 2.4,

					slug: 'running-shoes'
				},
				{
					_id: '5',
					title: 'Smartphone',
					description: 'Powerful smartphone with a stunning display.',
					quantity: 20,
					price: 699.99,
					priceAfterDiscount: 649.99,
					colors: ['Black', 'Silver', 'Gold'],
					imageCover:
						'https://media.istockphoto.com/id/1174517122/photo/yellow-book-pair-over-blue-background.jpg?s=612x612&w=0&k=20&c=ZSXhCRRfUNpOltfD-oraPhA2KEmgeIxDtkpehZiDxlw=',
					images: ['smartphone-black.jpg', 'smartphone-black-back.jpg'],
					category_id: 'electronics',
					subcategories_ids: ['mobile'],
					ratingsQuantity: 15,
					ratingsAverage: 3.8,

					slug: 'smartphone'
				},
				{
					_id: '6',
					title: 'Wireless Headphones',
					description:
						'Premium wireless headphones for an immersive audio experience.',
					quantity: 35,
					price: 129.99,
					priceAfterDiscount: 119.99,
					colors: ['Black', 'White'],
					imageCover:
						'https://removal.ai/wp-content/uploads/2022/02/Plush-Design-Studio-PEXELS.jpg',
					images: ['headphones-black.jpg', 'headphones-black-side.jpg'],
					category_id: 'electronics',
					subcategories_ids: ['audio'],
					ratingsQuantity: 18,
					ratingsAverage: 4.1,

					slug: 'wireless-headphones'
				}
			]
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		// Handle errors or return default values
		return { brands: [], categories: [], products: [] };
	}
};
