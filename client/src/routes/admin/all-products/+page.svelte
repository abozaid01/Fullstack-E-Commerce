<script lang="ts">
	import {
		Card,
		Button,
		Badge,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Avatar,
		Rating,
		TableSearch,
		Dropdown,
		Checkbox,
		ButtonGroup,
		DropdownDivider
	} from 'flowbite-svelte';
	import {
		PlusOutline,
		FilterSolid,
		ChevronRightOutline,
		ChevronLeftOutline
	} from 'flowbite-svelte-icons';
	import ProductActionIcons from '$lib/components/AdminComponents/ProductActionIcons.svelte';
	import { GridSolid, ListOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import AddProductModal from './AddProductModal.svelte';

	const divClass =
		'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-x-scroll scrollbar-none';
	const innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	const searchClass = 'w-full md:w-1/2 relative';
	const classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

	const paginationData = [
		{
			id: 1,
			photo: 'https://vetra.laborasyon.com/assets/images/products/1.jpg',
			name: 'Headphone',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$120.00',
			qty: 120,
			rating: 5.0,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 2,
			photo: 'https://vetra.laborasyon.com/assets/images/products/2.jpg',
			name: 'Shoe',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$320.00',
			qty: 54,
			rating: 5,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 3,
			photo: 'https://vetra.laborasyon.com/assets/images/products/3.jpg',
			name: 'Digital Clock',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$230.00',
			qty: 0,
			rating: 3,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 4,
			photo: 'https://vetra.laborasyon.com/assets/images/products/4.jpg',
			name: 'Toy Car',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$54.00',
			qty: 12,
			rating: 4,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 5,
			photo: 'https://vetra.laborasyon.com/assets/images/products/5.jpg',
			name: 'Sunglasses',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$20.00',
			qty: 340,
			rating: 4,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 6,
			photo: 'https://vetra.laborasyon.com/assets/images/products/6.jpg',
			name: 'Cake',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus \n\neligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit! \nDoloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam \n\nducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$69.00',
			qty: 0,
			rating: 4,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 7,
			photo: 'https://vetra.laborasyon.com/assets/images/products/7.jpg',
			name: 'Glass',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$34.00',
			qty: 12,
			rating: 5,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 8,
			photo: 'https://vetra.laborasyon.com/assets/images/products/8.jpg',
			name: 'Ear Buds',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$100.00',
			qty: 0,
			rating: 5,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 9,
			photo: 'https://vetra.laborasyon.com/assets/images/products/9.jpg',
			name: 'Perfume',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$90.00',
			qty: 34,
			rating: 5,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		},
		{
			id: 10,
			photo: 'https://vetra.laborasyon.com/assets/images/products/10.jpg',
			name: 'Cookie',
			shortDescription:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			featureDescription:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam dolor sit amet consectetur adipisicing elit., eaque. Porro dolorem asperiores eos nostrum corrupti! Sit officia distinctio quidem amet nulla',
			londDescription:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ad saepe porro laudantium, assumenda eos perspiciatis. Quia repellendus\n\n eligendi exercitationem explicabo consectetur facilis vitae nemo dignissimos, totam quas in nostrum optio blanditiis amet quam consequatur illum eos minus voluptates possimus aperiam non modi voluptatem velit!\n Doloremque distinctio commodi corporis adipisci voluptatem fugit maxime error officiis dicta deleniti exercitationem provident a obcaecati, quaerat dolores dolor harum non perferendis blanditiis ipsum aliquam\n\n ducimus sapiente molestias. Atque odio inventore consequuntur delectus beatae fugit. Accusamus, aut tempora cupiditate temporibus consequuntur dolorem iusto laborum nihil!',
			price: '$10.00',
			qty: 0,
			rating: 3,
			reviews: [
				{
					username: 'Rodger Stutely',
					avatar_url: 'https://i.pravatar.cc/150?img=69',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Corly Hailston',
					avatar_url: 'https://i.pravatar.cc/150?img=25',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				},
				{
					username: 'Hurleigh Smallcomb',
					avatar_url: 'https://i.pravatar.cc/150?img=41',
					review:
						'I love your products. It is very easy and fun to use this panel. I would recommend it to everyone.',
					rate: 5.0
				}
			]
		}
	];

	let addProductModal: boolean;
	let view = 'list';
	let searchTerm = '';
	let currentPosition = 0;
	const itemsPerPage = 5;
	const showPage = 5;
	let totalPages = 0;
	let pagesToShow: number[] = [];
	let totalItems = paginationData.length;
	let startPage: number;
	let endPage: number;

	const updateDataAndPagination = () => {
		paginationData.slice(currentPosition, currentPosition + itemsPerPage);
		renderPagination();
	};

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < paginationData.length) {
			currentPosition += itemsPerPage;
			updateDataAndPagination();
		}
	};

	const loadPreviousPage = () => {
		if (currentPosition - itemsPerPage >= 0) {
			currentPosition -= itemsPerPage;
			updateDataAndPagination();
		}
	};

	const renderPagination = () => {
		totalPages = Math.ceil(paginationData.length / itemsPerPage);
		const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

		startPage = currentPage - Math.floor(showPage / 2);
		startPage = Math.max(1, startPage);
		endPage = Math.min(startPage + showPage - 1, totalPages);

		pagesToShow = Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	};

	const goToPage = (pageNumber: number) => {
		currentPosition = (pageNumber - 1) * itemsPerPage;
		updateDataAndPagination();
	};

	$: startRange = currentPosition + 1;
	$: endRange = Math.min(currentPosition + itemsPerPage, totalItems);
	$: currentPageItems = paginationData.slice(
		currentPosition,
		currentPosition + itemsPerPage
	);
	$: filteredItems = paginationData.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	onMount(() => {
		// Call renderPagination when the component initially mounts
		renderPagination();
	});

	const toggleView = function () {
		view = view === 'grid' ? 'list' : 'grid';
	};
</script>

<AddProductModal bind:addProductModal />

<div class="container flex flex-col gap-4">
	<Section
		name="advancedTable"
		classSection="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5"
	>
		<TableSearch
			placeholder="Search"
			hoverable={true}
			bind:inputValue={searchTerm}
			{divClass}
			{innerDivClass}
			{searchClass}
			{classInput}
		>
			<!-- CARD HEADER -->
			<div
				slot="header"
				class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
			>
				<!-- ADD Product Modal -->
				<Button on:click={() => (addProductModal = true)}>
					<PlusOutline class="mr-2 h-3.5 w-3.5" />Add New Product
				</Button>

				<!-- Filter -->
				<Button color="alternative"
					>Filter<FilterSolid class="ml-2 h-3 w-3 " /></Button
				>
				<Dropdown class="w-48 space-y-2 p-3 text-sm">
					<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
						Choose Brand
					</h6>
					<li>
						<Checkbox>Apple (56)</Checkbox>
					</li>
					<li>
						<Checkbox>Microsoft (16)</Checkbox>
					</li>
					<li>
						<Checkbox>Razor (49)</Checkbox>
					</li>
					<DropdownDivider />
					<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
						Choose Category
					</h6>
					<li>
						<Checkbox>Nikon (12)</Checkbox>
					</li>
					<li>
						<Checkbox>BenQ (74)</Checkbox>
					</li>
				</Dropdown>

				<Button class="p-2" on:click={toggleView}>
					{#if view === 'grid'}
						<GridSolid />
					{:else}
						<ListOutline />
					{/if}
				</Button>
			</div>

			{#if view === 'list'}
				<!-- TABLE HEADER -->
				<TableHead>
					<TableHeadCell padding="px-4 py-3" scope="col">NAME</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col">STOCK</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col">RATING</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col">QTY</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col">Price</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col">Action</TableHeadCell>
				</TableHead>

				<!-- TABLE BODY -->
				<TableBody tableBodyClass="divide-y">
					<!-- SEARCHED TABLE BODY -->
					{#if searchTerm !== ''}
						{#each filteredItems as item (item.id)}
							<TableBodyRow>
								<TableBodyCell>
									<div class="flex items-center text-sm">
										<Avatar class="mr-4" src={item.photo} alt="Product image" />
										<div>
											<p class="font-semibold">{item.name}</p>
										</div>
									</div>
								</TableBodyCell>
								<TableBodyCell tdClass="px-4 py-3"
									><Badge rounded color={item.qty > 0 ? 'green' : 'red'}>
										{item.qty > 0 ? 'In Stock' : 'Out of Stock'}
									</Badge></TableBodyCell
								>
								<TableBodyCell tdClass="px-4 py-3"
									><Rating total={5} rating={item.rating}>
										<p
											slot="text"
											class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
										>
											({item.reviews.length})
										</p>
									</Rating></TableBodyCell
								>
								<TableBodyCell tdClass="px-4 py-3">{item.qty}</TableBodyCell>

								<TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
								<TableBodyCell>
									<div class="flex gap-2">
										<ProductActionIcons />
									</div>
								</TableBodyCell>
							</TableBodyRow>
						{/each}

						<!-- FULL TABLE BODY -->
					{:else}
						{#each currentPageItems as item (item.id)}
							<TableBodyRow>
								<TableBodyCell>
									<div class="flex items-center text-sm">
										<Avatar
											class="mr-1 lg:mr-4"
											src={item.photo}
											alt="Product image"
										/>
										<div>
											<p class="text-xs lg:font-semibold">{item.name}</p>
										</div>
									</div>
								</TableBodyCell>
								<TableBodyCell tdClass="px-4 py-3"
									><Badge rounded color={item.qty > 0 ? 'green' : 'red'}>
										{item.qty > 0 ? 'In Stock' : 'Out of Stock'}
									</Badge></TableBodyCell
								>
								<TableBodyCell tdClass="px-4 py-3"
									><Rating total={5} rating={item.rating}>
										<p
											slot="text"
											class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
										>
											({item.reviews.length})
										</p>
									</Rating></TableBodyCell
								>
								<TableBodyCell tdClass="px-4 py-3">{item.qty}</TableBodyCell>
								<TableBodyCell tdClass="px-4 py-3">{item.price}</TableBodyCell>
								<TableBodyCell>
									<div class="flex gap-2">
										<ProductActionIcons />
									</div>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					{/if}
				</TableBody>

				<!-- GRID VIEW TODO: sync with pagination-->
			{:else}
				<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#each paginationData as product (product.id)}
						<Card img={product.photo}>
							<div class="mb-2 flex items-center justify-between">
								<p
									class="truncate text-base font-semibold text-gray-600 dark:text-gray-300"
								>
									{product.name}
								</p>
								<Badge
									rounded
									color={product.qty > 0 ? 'green' : 'red'}
									class="whitespace-nowrap"
								>
									<p class="break-normal">
										{product.qty > 0 ? `In Stock` : 'Out of Stock'}
									</p>
								</Badge>
							</div>

							<p class="text-primary-500 mb-3 font-semibold">
								{product.price}
							</p>

							<p class="mb-8 text-sm text-gray-600 dark:text-gray-400">
								{product.shortDescription}
							</p>

							<div class="flex justify-end gap-2">
								<ProductActionIcons />
							</div>
						</Card>
					{/each}
				</div>
			{/if}

			<!-- PAGINATION -->
			<div
				slot="footer"
				class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
				aria-label="Table navigation"
			>
				<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Showing
					<span class="font-semibold text-gray-900 dark:text-white"
						>{startRange}-{endRange}</span
					>
					of
					<span class="font-semibold text-gray-900 dark:text-white"
						>{totalItems}</span
					>
				</span>
				<ButtonGroup>
					<Button on:click={loadPreviousPage} disabled={currentPosition === 0}
						><ChevronLeftOutline size="xs" class="m-1.5" /></Button
					>
					{#each pagesToShow as pageNumber}
						<Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
					{/each}
					<Button on:click={loadNextPage} disabled={totalPages === endPage}
						><ChevronRightOutline size="xs" class="m-1.5" /></Button
					>
				</ButtonGroup>
			</div>
		</TableSearch>
	</Section>
</div>
