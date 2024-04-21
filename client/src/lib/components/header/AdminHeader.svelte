<script lang="ts">
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider,
		DarkMode
	} from 'flowbite-svelte';
	import { BellSolid, EyeSolid, SearchOutline } from 'flowbite-svelte-icons';
	import { currentUser } from '$lib/stores/user.store';
	import { logout } from '$lib/services/auth.service';
</script>

<header class="fixed z-50 hidden w-full bg-zinc-50 md:block">
	<nav
		class="custom-grid border-gray-200px-4 dark:shadow-sm-light py-2.5 shadow-md drop-shadow-xl lg:px-6 dark:bg-gray-800"
	>
		<!-- 1) Ecommerce -->
		<p class="text-xl font-bold dark:text-white">E-Commerce</p>

		<!-- 2) Search -->
		<div
			class="relative mr-6 flex w-full justify-center focus-within:text-orange-500"
		>
			<div
				class="absolute right-28 top-2 flex items-center pl-2 text-orange-600"
			>
				<SearchOutline size="lg" />
			</div>
			<input
				class="w-3/4 rounded-2xl border pl-8 text-gray-700"
				placeholder="Quick Search"
				aria-label="Search"
			/>
		</div>

		<!-- 3) User, Notification, Dark Mode -->
		<div class="flex flex-row-reverse">
			<!-- 3.1) user -->
			<div class="mr-8">
				<Avatar
					id="user-drop"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qj7vqj7aZaD6dhml7gfswli38CGD8uRN1A&s"
					class="cursor-pointer"
					dot={{ color: 'green' }}
				/>
				<Dropdown triggeredBy="#user-drop">
					<DropdownHeader>
						<span class="block text-sm">{$currentUser?.name}</span>
						<span class="block truncate text-sm font-medium"
							>{$currentUser?.email}</span
						>
					</DropdownHeader>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem>
					<DropdownDivider />
					<DropdownItem on:click={logout}>Sign out</DropdownItem>
				</Dropdown>
			</div>

			<!-- 3.2) Dark mode -->
			<DarkMode size="lg" btnClass="mr-8 text-orange-400" />

			<!-- 3.3) Notificaton -->
			<div
				id="bell"
				class="mr-8 inline-flex cursor-pointer items-center text-center text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-white"
			>
				<BellSolid class="h-5kj w-5" color="#FB923C" />
				<div class="relative flex">
					<div
						class="relative -top-2 end-3 inline-flex h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-gray-900"
					/>
				</div>
			</div>
			<Dropdown
				triggeredBy="#bell"
				class="w-full max-w-sm divide-y divide-gray-100 rounded shadow dark:divide-gray-700 dark:bg-gray-800"
			>
				<div slot="header" class="py-2 text-center font-bold">
					Notifications
				</div>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar
						src="/images/profile-picture-1.webp"
						dot={{ color: 'bg-gray-300' }}
						rounded
					/>
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							New message from <span
								class="font-semibold text-gray-900 dark:text-white"
								>Jese Leos</span
							>
							: "Hey, what's up? All set for the presentation?"
						</div>
						<div class="text-primary-600 dark:text-primary-500 text-xs">
							a few moments ago
						</div>
					</div>
				</DropdownItem>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar
						src="/images/profile-picture-2.webp"
						dot={{ color: 'bg-red-400' }}
						rounded
					/>
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold text-gray-900 dark:text-white"
								>Joseph Mcfall</span
							>
							and
							<span class="font-medium text-gray-900 dark:text-white"
								>5 others</span
							>
							started following you.
						</div>
						<div class="text-primary-600 dark:text-primary-500 text-xs">
							10 minutes ago
						</div>
					</div>
				</DropdownItem>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar
						src="/images/profile-picture-3.webp"
						dot={{ color: 'bg-green-400' }}
						rounded
					/>
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold text-gray-900 dark:text-white"
								>Bonnie Green</span
							>
							and
							<span class="font-medium text-gray-900 dark:text-white"
								>141 others</span
							>
							love your story. See it and view more stories.
						</div>
						<div class="text-primary-600 dark:text-primary-500 text-xs">
							44 minutes ago
						</div>
					</div>
				</DropdownItem>
				<a
					slot="footer"
					href="/"
					class="-my-1 block bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
				>
					<div class="inline-flex items-center">
						<EyeSolid class="me-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
						View all
					</div>
				</a>
			</Dropdown>
		</div>
	</nav>
</header>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
	}
</style>
