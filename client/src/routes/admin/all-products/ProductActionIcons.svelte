<script>
	import { Badge } from 'flowbite-svelte';
	import { EyeSolid, PenOutline, TrashBinSolid } from 'flowbite-svelte-icons';
</script>

<a href="#">
	<Badge color="blue" rounded large class="!p-1 !font-semibold">
		<EyeSolid class="h-5 w-5" />
		<span class="sr-only">View Product Details</span>
	</Badge>
</a>
<Badge color="green" rounded large class="!p-1 !font-semibold">
	<PenOutline class="h-5 w-5" />
	<span class="sr-only">Edit Product</span>
</Badge>

<Badge color="red" rounded large class="!p-1 !font-semibold">
	<TrashBinSolid class="h-5 w-5" />
	<span class="sr-only">Delete Product</span>
</Badge>
