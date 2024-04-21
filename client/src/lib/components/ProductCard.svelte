<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillStar from 'svelte-icons-pack/ai/AiFillStar';
	import AiOutlineStar from 'svelte-icons-pack/ai/AiOutlineStar';
	import CgHeart from 'svelte-icons-pack/cg/CgHeart';
	import BsCart3 from 'svelte-icons-pack/bs/BsCart3';

	let isNew = true;
	let isSale = true;
</script>

<div class="card">
	<div class="card-img group">
		<div class:isNew>{isNew ? 'new!' : ''}</div>
		<div class:isSale>{isNew ? 'sale!' : ''}</div>
		<div class="wishlist">
			<Icon src={CgHeart} />
		</div>
		<div class="add-to-cart">
			<Icon src={BsCart3} />
		</div>
	</div>
	<h4 class="card-title">school bus</h4>
	<p class="card-price"><span class="mr-1">EGP</span>400</p>
	<div class="stars">
		<Icon src={AiFillStar} color="#FB923C" />
		<Icon src={AiFillStar} color="#FB923C" />
		<Icon src={AiFillStar} color="#FB923C" />
		<Icon src={AiOutlineStar} color="#FB923C" />
	</div>
</div>

<style>
	.card {
		@apply flex flex-col items-center;
	}

	.card-img {
		@apply 3xl:h-72 3xl:w-72 relative h-52 w-52 rounded-3xl bg-slate-200 transition-all duration-200 ease-in hover:bg-orange-400 xl:h-48 xl:w-48 2xl:h-60 2xl:w-60;
	}

	.isNew {
		@apply absolute left-[6%] top-[5%] rounded-full border-2 border-white bg-blue-400 p-3 font-[Dosis] text-xs font-bold uppercase text-white;
	}

	.isSale {
		@apply absolute left-[6%] top-[18%] rounded-full border-2 border-white bg-lime-500 p-3 font-[Dosis] text-xs font-bold uppercase text-white;
	}

	.wishlist {
		@apply invisible absolute bottom-1/2 right-1/2 -translate-x-1/4 translate-y-1/2 cursor-pointer rounded-full border-2 border-white p-2 text-3xl text-white group-hover:visible;
	}

	.add-to-cart {
		@apply invisible absolute bottom-1/2 left-1/2 translate-x-1/4 translate-y-1/2 cursor-pointer rounded-full border-2 border-white p-2 text-3xl text-white group-hover:visible;
	}

	.card-title {
		@apply m-0 mt-2 flex items-center justify-center font-[Dosis] font-semibold uppercase;
	}

	.card-price {
		@apply flex items-center justify-center text-lg font-medium text-orange-500;
	}

	.stars {
		@apply mx-auto flex items-center text-xl;
	}
</style>
