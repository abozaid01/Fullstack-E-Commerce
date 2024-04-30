<script lang="ts">
	import { Button, Modal, Label, Input } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, EyeSlashSolid } from 'flowbite-svelte-icons';
	import { login } from '$lib/services/auth.service';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	export let loginModal: boolean = false;
	export let signupModal: boolean = false;

	let email = 'test@gmail.com';
	let password = 'test123';

	let errStr = '';
	let errObj: { email?: string; password?: string } = {};

	let showPassword = false;
	let passwordRef: HTMLInputElement;

	const handleTogglePassword = () => {
		showPassword = !showPassword;
		if (showPassword) {
			passwordRef.type = 'text';
		} else {
			passwordRef.type = 'password';
		}
	};

	const handleLogin = async function () {
		// 1) Reset the Errors if the form was submitted before
		if (errStr) errStr = '';
		if (errObj) errObj = {};

		// 2) Validate the required fields
		if (!emailRegex.test(email)) errObj.email = `invalid email address!`;
		if (password.length < 6) errObj.password = `Invalid Password`;
		if (!email) errObj.email = `Email can't be empty`;
		if (!password) errObj.password = `Password can't be empty`;
		if (errObj.email || errObj.password) return;

		try {
			await login(email, password);
			loginModal = false;
		} catch (error: any) {
			if (error.data?.validation_errors) errObj = error.data.validation_errors;
			if (error.message) errStr = error.message;
		}
	};

	const handleSignupModal = function () {
		loginModal = false;
		signupModal = true;
	};
</script>

{#if errStr}
	<ErrorAlert {errStr} />
{/if}

<Modal bind:open={loginModal} size="xs" autoclose={false} class="w-full" outsideclose>
	<form class="flex flex-col space-y-5" on:submit|preventDefault={handleLogin}>
		<div class="text-center">
			<h4 class="text-xl font-medium text-gray-900 dark:text-white">Welcome back!</h4>
			<h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">Sign in to your account</h3>
		</div>

		<!-- SIGNUP MODAL-->
		<div class="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
			Don't have an account? <button
				on:click|preventDefault={handleSignupModal}
				class="text-primary-700 dark:text-primary-500 hover:underline"
			>
				Sign Up
			</button>
		</div>

		<!-- EMAIL -->
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="text" name="email" placeholder="Enter your Email here" bind:value={email} />
			{#if errObj?.email}
				<ValidateInput inputError={errObj.email} />
			{/if}
		</Label>

		<!-- PASSWORD -->
		<Label class="space-y-2">
			<span>Your password</span>
			<div class="relative">
				<input
					type="password"
					bind:value={password}
					bind:this={passwordRef}
					name="password"
					placeholder="Enter your Password here"
					class="focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				/>

				<button
					type="button"
					on:click={handleTogglePassword}
					class="absolute end-0 top-1/2 -translate-y-1/2 rounded-e-md p-3.5"
				>
					{#if showPassword}
						<EyeOutline color="#6B7280" size="sm" />
					{:else}
						<EyeSlashSolid color="#6B7280" size="sm" />
					{/if}
				</button>
			</div>

			{#if errObj?.password}
				<ValidateInput inputError={errObj.password} />
			{/if}
		</Label>

		<!-- FORGET PASSWORD -->
		<div class="text-center">
			<a href="#" class="text-primary-700 dark:text-primary-500 ms-auto text-xs hover:underline">
				Forget your password?
			</a>
		</div>

		<Button type="submit" class="w-full1">Login to your account</Button>
	</form>
</Modal>
