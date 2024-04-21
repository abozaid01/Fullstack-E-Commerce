<script>
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import {
		ChartPieSolid,
		CartSolid,
		GridSolid,
		ShoppingBagSolid,
		TicketSolid,
		StoreSolid,
		EyeSolid,
		UsersGroupSolid,
		WindowRestoreSolid,
		LifeSaverSolid
	} from 'flowbite-svelte-icons';

	import { page } from '$app/stores';

	const resources = [
		{
			name: 'Dashboard',
			route: '/admin/dashboard',
			icon: ChartPieSolid
		},
		{
			name: 'Orders',
			route: '/admin/orders',
			icon: CartSolid
		},
		{
			name: 'Products',
			icon: ShoppingBagSolid,
			nested: [
				{
					name: 'Products',
					route: '/admin/all-products'
				},
				{
					name: 'Brands',
					route: '/admin/all-brands'
				},
				{
					name: 'Categories',
					route: '/admin/all-categories'
				},
				{
					name: 'Subcategories',
					route: '/admin/all-subcategories'
				}
			]
		},
		{
			name: 'Coupons',
			icon: TicketSolid,
			nested: [
				{
					name: 'All Coupons',
					route: '/admin/all-coupons'
				},
				{
					name: 'Add New Coupon',
					route: '/admin/add-coupon'
				}
			]
		},
		{
			name: 'Customers',
			icon: UsersGroupSolid,
			route: '/admin/all-customers'
		}
	];

	$: activeUrl = $page.url.pathname;
</script>

<div class="hidden xl:block">
	<Sidebar {activeUrl}>
		<SidebarWrapper>
			<SidebarGroup>
				{#each resources as resource}
					{#if resource.nested}
						<SidebarDropdownWrapper label={resource.name}>
							<svelte:fragment slot="icon">
								<svelte:component this={resource.icon} />
							</svelte:fragment>
							{#each resource.nested as nested}
								<SidebarDropdownItem
									label={nested.name}
									href={nested.route}
									active={nested.route === activeUrl}
								/>
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem label={resource.name} href={resource.route}>
							<svelte:fragment slot="icon">
								<svelte:component this={resource.icon} />
							</svelte:fragment>
						</SidebarItem>
					{/if}
				{/each}
			</SidebarGroup>

			<!-- DIVIDER -->
			<SidebarGroup border>
				<SidebarItem
					label="Online Store"
					href="/"
					target="_blank"
					spanClass="flex-1 ms-3 whitespace-nowrap"
				>
					<svelte:fragment slot="icon">
						<StoreSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-gray-200 p-3 text-sm font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-200"
						>
							<EyeSolid />
						</span>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Documentation">
					<svelte:fragment slot="icon">
						<TicketSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Components">
					<svelte:fragment slot="icon">
						<WindowRestoreSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Help">
					<svelte:fragment slot="icon">
						<LifeSaverSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</div>
