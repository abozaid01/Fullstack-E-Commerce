<script lang="ts">
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { signup } from '$lib/services/auth.service';
	import ValidateInput from '../ValidateInput.svelte';
	import ErrorAlert from '../ErrorAlert.svelte';
	import SuccessAlert from '../SuccessAlert.svelte';

	// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	export let signupModal = false;
	export let loginModal = false;

	let name = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';

	let successMsg = '';
	let errStr = '';
	let errObj: any = {};

	const handleSginup = async function () {
		// 1) Reset the Errors if the form was submitted before
		if (errStr) errStr = '';
		if (errObj) errObj = {};

		// 2) Validate the required fields
		if (name.length < 3) errObj.name = `Name must be at least 3 charcters`;
		if (!emailRegex.test(email)) errObj.email = `invalid email address!`;
		if (password.length < 6)
			errObj.password = `Password must be at least 6 charcters`;
		if (passwordConfirm !== password)
			errObj.passwordConfirm = `Password Confirmation doesn't match`;
		if (!name) errObj.name = `Name can't be empty`;
		if (!email) errObj.email = `Email can't be empty`;
		if (!password) errObj.password = `Password can't be empty`;
		if (!passwordConfirm)
			errObj.passwordConfirm = `Password Confirmation can't be empty`;
		if (
			errObj.name ||
			errObj.email ||
			errObj.password ||
			errObj.passwordConfirm
		)
			return;

		try {
			successMsg = await signup({ name, email, password, passwordConfirm });
			signupModal = false;
		} catch (error: any) {
			if (error.data?.validation_errors) errObj = error.data.validation_errors;
			if (error.message) errStr = error.message;
		}
	};

	const handleLoginModal = function () {
		loginModal = true;
		signupModal = false;
	};
</script>

{#if successMsg}
	<SuccessAlert {successMsg} />
{/if}

{#if errStr}
	<ErrorAlert {errStr} />
{/if}

<Modal
	bind:open={signupModal}
	size="xs"
	autoclose={false}
	class="w-full"
	outsideclose
>
	<form class="flex flex-col space-y-5" on:submit|preventDefault={handleSginup}>
		<div class="text-center">
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">
				Create an account
			</h3>
		</div>

		<!-- LOGIN MODAL -->
		<div
			class="text-center text-sm font-medium text-gray-500 dark:text-gray-300"
		>
			Already have an account?
			<button
				on:click|preventDefault={handleLoginModal}
				class="text-primary-700 dark:text-primary-500 hover:underline"
			>
				Sing In
			</button>
		</div>

		<!-- NAME -->
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="name"
				placeholder="Ali Mohamed"
				bind:value={name}
			/>
			{#if errObj?.name}
				<ValidateInput inputError={errObj.name} />
			{/if}
		</Label>

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

		<!-- CONFIRM PASSWORD -->
		<Label class="space-y-2">
			<span>Confirm your password</span>
			<Input
				type="password"
				name="passwordConfirm"
				placeholder="•••••"
				bind:value={passwordConfirm}
			/>
			{#if errObj?.passwordConfirm}
				<ValidateInput inputError={errObj.passwordConfirm} />
			{/if}
		</Label>

		<Button type="submit" class="w-full1">CREATE AN ACCOUNT</Button>
	</form>
</Modal>
