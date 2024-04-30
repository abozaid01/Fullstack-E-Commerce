<script lang="ts">
	import {
		Button,
		TableHead,
		TableHeadCell,
		TableBody,
		TableSearch,
		ButtonGroup,
		Breadcrumb,
		BreadcrumbItem
	} from 'flowbite-svelte';
	import {
		PlusOutline,
		ChevronRightOutline,
		ChevronLeftOutline
	} from 'flowbite-svelte-icons';

	import { GridSolid, ListOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import type { PageData } from './$types';
	import BrandListItem from './BrandListItem.svelte';
	import BrandGridItem from './BrandGridItem.svelte';
	import AddBrandModal from './AddBrandModal.svelte';

	const divClass =
		'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-x-scroll scrollbar-none';
	const innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	const searchClass = 'w-full md:w-1/2 relative';
	const classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

	export let data: PageData;
	let paginationData = data.brands;

	let addBrandModal: boolean;
	let view = 'list';
	let searchTerm = '';
	let currentPosition = 0;
	const itemsPerPage = 10;
	const showPage = 5;
	let totalPages = 0;
	let pagesToShow: number[] = [];
	let totalItems = data.totalBrands;
	let startPage: number;
	let endPage: number;

	const loadNextPage = () => {
		if (currentPosition + itemsPerPage < paginationData.length) {
			currentPosition += itemsPerPage;
			renderPagination();
		}
	};

	const loadPreviousPage = () => {
		if (currentPosition - itemsPerPage >= 0) {
			currentPosition -= itemsPerPage;
			renderPagination();
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
		renderPagination();
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

<AddBrandModal bind:addBrandModal />

<div class="container flex flex-col gap-4">
	<Section
		name="advancedTable"
		classSection="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5"
	>
		<Breadcrumb aria-label="Default breadcrumb example" navClass="mb-4">
			<BreadcrumbItem href="/admin/dashboard" home>Dashboard</BreadcrumbItem>
			<BreadcrumbItem>Brands</BreadcrumbItem>
		</Breadcrumb>

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
				<!-- ADD Brand Modal -->
				<Button on:click={() => (addBrandModal = true)}>
					<PlusOutline class="mr-2 h-3.5 w-3.5" />Add New Brand
				</Button>

				<Button class="p-2" on:click={toggleView}>
					{#if view === 'list'}
						<ListOutline />
					{:else}
						<GridSolid />
					{/if}
				</Button>
			</div>

			{#if view === 'list'}
				<!-- LIST TABLE HEADER -->
				<TableHead>
					<TableHeadCell padding="px-4 py-3" scope="col">NAME</TableHeadCell>
					<TableHeadCell padding="px-4 py-3" scope="col"
						>DESCRIPTION</TableHeadCell
					>
					<TableHeadCell padding="px-4 py-3" scope="col">Action</TableHeadCell>
				</TableHead>

				<!-- LIST TABLE BODY -->
				<TableBody tableBodyClass="divide-y">
					{#if searchTerm !== ''}
						<!-- SEARCHED TABLE LIST BODY -->
						{#each filteredItems as item (item._id)}
							<BrandListItem {item} />
						{/each}
					{:else}
						<!-- FULL TABLE List BODY -->
						{#each currentPageItems as item (item._id)}
							<BrandListItem {item} />
						{/each}
					{/if}
				</TableBody>
			{:else}
				<!-- GRID VIEW -->
				<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{#if searchTerm !== ''}
						<!-- SEARCHED GRID ITEMS -->
						{#each filteredItems as item (item._id)}
							<BrandGridItem {item} />
						{/each}
					{:else}
						<!-- FULL GRID ITEMS -->
						{#each currentPageItems as item (item._id)}
							<BrandGridItem {item} />
						{/each}
					{/if}
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
				<ButtonGroup divClass="flex gap-1">
					<Button
						on:click={loadPreviousPage}
						disabled={currentPosition === 0}
						class="border-none bg-white p-2 dark:bg-gray-800"
						><ChevronLeftOutline size="md" /></Button
					>
					{#each pagesToShow as pageNumber}
						<Button
							on:click={() => goToPage(pageNumber)}
							class={`rounded-xl ${
								pageNumber === currentPosition / itemsPerPage + 1 &&
								'bg-primary-500 dark:bg-primary-600 hover:bg-primary-400 hover:dark:bg-primary-500  text-white transition-colors duration-200 ease-in hover:text-white'
							}`}>{pageNumber}</Button
						>
					{/each}
					<Button
						on:click={loadNextPage}
						disabled={currentPosition / itemsPerPage + 1 === pagesToShow.at(-1)}
						class="border-none bg-white p-2 dark:bg-gray-800"
						><ChevronRightOutline size="md" /></Button
					>
				</ButtonGroup>
			</div>
		</TableSearch>
	</Section>
</div>
