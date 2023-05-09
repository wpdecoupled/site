<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div id="form-layout">
	{#if form?.status === 'mail_sent'}
		<p>{form?.message}</p>
	{:else}
		<h2>Want to hear when we launch new features?</h2>
		<form method="POST" use:enhance>
			{#if form?.status === 'validation_failed'}<p class="error">{form.message}</p>{/if}
			<label for="email" class="visuallyhidden">Email</label>
			<input id="email" name="email" placeholder="email" type="email" autocomplete="email" />
			<button id="email_submit" type="submit">Sign Up</button>
		</form>
	{/if}
</div>

<style lang="postcss">
	h2 {
		font-size: var(--font-size-fluid-2);
	}
	#email_submit {
		margin: var(--size-fluid-1);
	}
</style>
