<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaSolidCloud from 'svelte-icons-pack/fa/FaSolidCloud';
	import IoHomeOutline from 'svelte-icons-pack/io/IoHomeOutline';
	import IoMail from 'svelte-icons-pack/io/IoMail';
	import BsTelephoneFill from 'svelte-icons-pack/bs/BsTelephoneFill';
	import CgMathPlus from 'svelte-icons-pack/cg/CgMathPlus';
	import CgFacebook from 'svelte-icons-pack/cg/CgFacebook';
	import CgInstagram from 'svelte-icons-pack/cg/CgInstagram';
	import CgTwitter from 'svelte-icons-pack/cg/CgTwitter';
	import CgYoutube from 'svelte-icons-pack/cg/CgYoutube';
</script>

<div class="zig-zag">
	<Icon
		src={FaSolidCloud}
		className="text-9xl absolute -top-[5rem] left-0"
		color="#44403C"
	/>
	<Icon
		src={FaSolidCloud}
		className="text-9xl absolute -top-[4.88rem] -right-0"
		color="#44403C"
	/>
</div>

<footer class="bg-stone-700">
	<div class="container grid grid-cols-4">
		<!-- 1) CONTACT INFO-->
		<div>
			<h3 class="footer-heading">our headquarters</h3>
			<div class="mt-2 flex gap-3">
				<Icon src={IoHomeOutline} size="18" color="#F97316" />
				<p class="footer-text max-w-40">378 Main Street 09733 Western London</p>
			</div>
			<div class="mt-2 flex gap-3">
				<Icon src={IoMail} size="18" color="#F97316" />
				<p class="footer-text">info@example.com</p>
			</div>

			<div class="mt-2 flex gap-3">
				<Icon src={BsTelephoneFill} size="18" color="#F97316" />

				<p class="footer-text">(44) 123-45-67</p>
			</div>
		</div>

		<!-- 2) CATEGORIES-->
		<div>
			<h3 class="footer-heading">product categories</h3>
			<ul class="links-list">
				<li class="footer-text">accessories</li>
				<li class="footer-text">clothes</li>
				<li class="footer-text">toys</li>
				<li class="footer-text">miscellaneous</li>
			</ul>
		</div>

		<!-- 3) QUICK LINKS -->
		<div>
			<h3 class="footer-heading">quick links</h3>
			<ul class="links-list">
				<li class="footer-text">about us</li>
				<li class="footer-text">green products</li>
				<li class="footer-text">educational products</li>
				<li class="footer-text">products</li>
				<li class="footer-text">shop locator</li>
				<li class="footer-text">online shop</li>
			</ul>
		</div>

		<!-- 4) NEWSLETTER -->
		<div>
			<h3 class="footer-heading">sign up for our newsletter now!</h3>
			<form>
				<div class="relative">
					<input
						type="text"
						class="w-full rounded-3xl border bg-stone-700 px-3 py-3 text-base text-stone-300 placeholder:text-stone-400"
						placeholder="enter your email address"
					/>
					<button>
						<Icon
							src={CgMathPlus}
							className="absolute top-3 right-3 rounded-full text-white bg-orange-500 text-2xl"
						/>
					</button>
				</div>
			</form>
			<h3 class="footer-heading mt-4">find us elsewhere</h3>
			<div class="flex gap-5">
				<Icon
					src={CgFacebook}
					className="text-xl text-stone-400 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
				/>
				<Icon
					src={CgInstagram}
					className="text-xl text-stone-400 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
				/>
				<Icon
					src={CgTwitter}
					className="text-xl text-stone-400 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
				/>
				<Icon
					src={CgYoutube}
					className="text-xl text-stone-400 hover:text-orange-400 transition-colors duration-300 ease-in cursor-pointer"
				/>
			</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	.zig-zag {
		position: relative;
		margin-top: 3rem;
		background: linear-gradient(-45deg, #44403c 24px, transparent 0),
			linear-gradient(45deg, #44403c 24px, transparent 0);
		background-size: 14px 32px;
		display: block;
		height: 32px;
	}

	.footer-heading {
		@apply mb-4 font-[Dosis] text-lg font-semibold uppercase tracking-wide text-white;
	}

	.footer-text {
		@apply cursor-pointer font-[Dosis] text-sm text-gray-200 transition-all duration-200 ease-in hover:text-orange-400;
	}

	.links-list {
		@apply flex flex-col gap-3 font-semibold uppercase tracking-wider;
	}
</style>
