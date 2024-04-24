<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import CgFacebook from 'svelte-icons-pack/cg/CgFacebook';
	import CgInstagram from 'svelte-icons-pack/cg/CgInstagram';
	import CgTwitter from 'svelte-icons-pack/cg/CgTwitter';
	import CgYoutube from 'svelte-icons-pack/cg/CgYoutube';
	import CgPhone from 'svelte-icons-pack/cg/CgPhone';
	import FaSolidUser from 'svelte-icons-pack/fa/FaSolidUser';
	import FaHeart from 'svelte-icons-pack/fa/FaHeart';
	import FaSolidShoppingCart from 'svelte-icons-pack/fa/FaSolidShoppingCart';
	import FaSolidCloud from 'svelte-icons-pack/fa/FaSolidCloud';
	import LoginModal from './LoginModal.svelte';
	import SignupModal from './SignupModal.svelte';
	import { currentToken, currentUser } from '$lib/stores/user.store';
	import { Dropdown, DropdownItem, Avatar } from 'flowbite-svelte';
	import { logout } from '$lib/services/auth.service';
	import CartDrawer from '../Cart/CartDrawer.svelte';

	let loginModal = false;
	let signupModal = false;
	let hideCartDrawer = true;
</script>

<LoginModal bind:loginModal bind:signupModal />
<SignupModal bind:signupModal bind:loginModal />
<CartDrawer bind:hideCartDrawer />

<header class="h-64 bg-[#1ba1e2] px-12 py-10">
	<div
		class="container relative mb-4 flex justify-between rounded-full bg-white py-3"
	>
		<!-- SOCIAL MEDIA -->
		<div class="flex gap-3 px-4">
			<Icon
				src={CgFacebook}
				className="text-xl text-stone-600 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
			/>
			<Icon
				src={CgInstagram}
				className="text-xl text-stone-600 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
			/>
			<Icon
				src={CgTwitter}
				className="text-xl text-stone-600 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
			/>
			<Icon
				src={CgYoutube}
				className="text-xl text-stone-600 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
			/>
			<div class="ml-6 flex gap-4">
				<Icon
					src={CgPhone}
					className="text-xl text-stone-600 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
				/>
				<p class="text-sm uppercase">
					call us: <span class="font-bold">0123 456 678</span>
				</p>
			</div>
		</div>

		<!-- USER ACTIONS -->
		<div class="flex gap-6 px-4">
			<!-- Login -->
			{#if $currentToken}
				<Avatar
					class="acs h-6"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qj7vqj7aZaD6dhml7gfswli38CGD8uRN1A&s"
					dot={{ color: 'green' }}
				/>

				<Dropdown triggeredBy=".acs">
					<div slot="header" class="px-4 py-2">
						<span class="block text-sm text-gray-900 dark:text-white"
							>{$currentUser?.name}</span
						>
						<span class="block truncate text-sm font-medium"
							>{$currentUser?.email}</span
						>
					</div>
					<DropdownItem>Profile</DropdownItem>
					<DropdownItem>Orders</DropdownItem>
					{#if $currentUser?.role === 'admin'}
						<DropdownItem href="/admin">Dashboard</DropdownItem>
					{/if}
					<DropdownItem slot="footer" on:click={logout}>Sign out</DropdownItem>
				</Dropdown>
			{:else}
				<button
					class="flex cursor-pointer gap-1 hover:text-orange-400"
					on:click={() => (loginModal = true)}
				>
					<p
						class="text-sm font-semibold uppercase text-gray-400 transition-colors duration-300 ease-in"
					>
						login
					</p>
					<Icon src={FaSolidUser} className="text-xl text-stone-600" />
				</button>
			{/if}
			<!-- Wishlist -->
			<div class="relative flex gap-1">
				<a
					href="#"
					class="text-sm font-semibold uppercase text-gray-400 transition-colors duration-300 ease-in hover:text-orange-400"
					>WISHLIST</a
				>
				<button>
					<Icon
						src={FaHeart}
						className="text-xl text-stone-600 cursor-pointer"
					/>
					<span class="absolute-count">0</span>
				</button>
			</div>
			<!-- Cart -->
			<div class="relative flex gap-1">
				<button
					on:click={() => (hideCartDrawer = false)}
					class="text-sm font-semibold uppercase text-gray-400 transition-colors duration-300 ease-in hover:text-orange-400"
				>
					CART
				</button>
				<button>
					<Icon
						src={FaSolidShoppingCart}
						className="text-xl text-stone-600 cursor-pointer"
					/>
					<span class="absolute-count">0</span>
				</button>
			</div>
		</div>

		<!-- LOGO -->
		<img
			src="https://previews.123rf.com/images/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500960/101157490-logo-text-teddy-bear-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful-vector.jpg"
			alt="logo"
			class="logo"
		/>
		<!-- <div class="logo"></div> -->
	</div>

	<!-- NAV LINKS -->
	<nav class="container flex justify-between">
		<ul class="flex gap-10 text-sm font-semibold uppercase text-white">
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="/">Home</a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">online shop</a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">shop Locater</a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">Testimonials</a>
			</li>
		</ul>
		<ul class="flex gap-10 text-sm font-semibold uppercase text-white">
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href=""></a>
				<a href="">Services</a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">Blog</a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">About Us</a>
				<a href=""></a>
			</li>
			<li class="transition-colors duration-300 ease-in hover:text-orange-400">
				<a href="">Contact Us</a>
			</li>
		</ul>
	</nav>
</header>

<div class="zig-zag-bottom">
	<Icon
		src={FaSolidCloud}
		className="text-9xl absolute -top-[4rem] left-0"
		color="#fff"
	/>
	<Icon
		src={FaSolidCloud}
		className="text-9xl absolute -top-[3.88rem] -right-0"
		color="#fff"
	/>
</div>

<style lang="postcss">
	header {
		/* background-image: url('/gift.jpg');
		background-position: top;
		background-repeat: no-repeat;
		background-size: cover; */
	}

	.logo {
		@apply absolute -top-4 right-1/2 h-24 w-24 translate-x-1/2 rounded-full bg-orange-500;
	}

	.absolute-count {
		@apply absolute -right-2 -top-3 rounded-full bg-orange-400 px-1 py-0.5 text-xs leading-none text-slate-100;
	}

	.zig-zag-bottom {
		position: relative;
		margin-bottom: 3rem;
		background: linear-gradient(-45deg, transparent 24px, #1ba1e2 0),
			linear-gradient(45deg, transparent 24px, #1ba1e2 0);
		background-repeat: repeat-x;
		background-position: left bottom;
		background-size: 14px 32px;
		content: '';
		display: block;

		width: 100%;
		height: 32px;
	}
</style>
