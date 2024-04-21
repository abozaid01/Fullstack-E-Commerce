<script lang="ts">
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { login } from '$lib/services/auth.service';
	import ValidateInput from '$lib/components/ValidateInput.svelte';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	export let loginModal: boolean = false;
	export let signupModal: boolean = false;

	let email = 'test@gmail.com';
	let password = 'test123';

	let successMsg = '';
	let errStr = '';
	let errObj: any = {};

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
			successMsg = await login(email, password);
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

{#if successMsg}
	<SuccessAlert {successMsg} />
{/if}

{#if errStr}
	<ErrorAlert {errStr} />
{/if}

<Modal
	bind:open={loginModal}
	size="xs"
	autoclose={false}
	class="w-full"
	outsideclose
>
	<form class="flex flex-col space-y-5" on:submit|preventDefault={handleLogin}>
		<div class="text-center">
			<h4 class="text-xl font-medium text-gray-900 dark:text-white">
				Welcome back!
			</h4>
			<h3 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
				Sign in to your account
			</h3>
		</div>

		<!-- SIGNUP MODAL-->
		<div
			class="text-center text-sm font-medium text-gray-500 dark:text-gray-300"
		>
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
			<Input
				type="text"
				name="email"
				placeholder="name@company.com"
				bind:value={email}
			/>
			{#if errObj?.email}
				<ValidateInput inputError={errObj.email} />
			{/if}
		</Label>

		<!-- PASSWORD -->
		<Label class="space-y-2">
			<span>Your password</span>
			<Input
				type="password"
				name="password"
				placeholder="•••••"
				bind:value={password}
			/>
			{#if errObj?.password}
				<ValidateInput inputError={errObj.password} />
			{/if}
		</Label>

		<!-- FORGET PASSWORD -->
		<div class="text-center">
			<a
				href="#"
				class="text-primary-700 dark:text-primary-500 ms-auto text-xs hover:underline"
			>
				Forget your password?
			</a>
		</div>

		<Button type="submit" class="w-full1">Login to your account</Button>
	</form>
</Modal>
