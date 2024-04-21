<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineSafety from 'svelte-icons-pack/ai/AiOutlineSafety';
	import FaSolidShippingFast from 'svelte-icons-pack/fa/FaSolidShippingFast';
	import IoPlayBackSharp from 'svelte-icons-pack/io/IoPlayBackSharp';
</script>

<div
	class="container flex flex-col items-center justify-between gap-4 py-3 lg:flex-row"
>
	<div class="box bg-blue-500">
		<Icon src={AiOutlineSafety} className="text-4xl min-w-10" color="white" />
		<div class="text-box">
			<h4 class="text-header">Safe and Handmade</h4>
			<p class="text-details">
				toys we sell are provided by the best manufatuers on the market. Safe,
				Handmade & Certified.
			</p>
		</div>
	</div>

	<div class="box bg-orange-500">
		<Icon
			src={FaSolidShippingFast}
			color="white"
			className="text-4xl min-w-10"
		/>
		<div class="text-box">
			<h4 class="text-header">fast delivery</h4>
			<p class="text-details">
				we have deticated packaging and delivery team that will make everything
				for fast shipmenet
			</p>
		</div>
	</div>

	<div class="box bg-slate-500">
		<Icon src={IoPlayBackSharp} className="text-4xl min-w-10" color="white" />
		<div class="text-box">
			<h4 class="text-header">free returns</h4>
			<p class="text-details">
				you can return all purchases for up to 30 days after transctions. No
				strings attached
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.box {
		@apply flex max-w-xs justify-between gap-5 rounded-3xl p-4 text-white;
	}

	.text-box {
		@apply flex flex-col gap-1;
	}

	.text-header {
		@apply font-semibold uppercase tracking-wider;
	}

	.text-details {
		@apply text-xs;
	}
</style>
