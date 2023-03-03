<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main class="wrapper">
	<section class="about center">
		<p class="">
			WPDecoupled will be a place for <s>headless</s>
			decoupled WordPress countent! We hope to be
			<em>the</em> place for independent content on building with decoupled WordPress.
		</p>
	</section>
	<section id="signup" class="center">
		<div id="form-layout">
			<h2>Sign up to hear when we lauch!</h2>
			{#if form?.status === 'mail_sent'}
				<p>{form?.message}</p>
			{:else}
				<form method="POST" use:enhance>
					{#if form?.status === 'validation_failed'}<p class="error">{form.message}</p>{/if}
					<label for="email" class="visuallyhidden">Email</label>
					<input
						id="email"
						name="email"
						placeholder="email"
						type="email"
						autocomplete="email"
					/>
					<button id="email_submit" type="submit">Sign Up</button>
				</form>
			{/if}
		</div>
	</section>
	<section class="definition center">
		<p>Decoupled WordPress</p>
		<p>/ diˈkʌp əld / wɜrd-prɛs /</p>
		<br />
		<dfn class="prose"
			>Using WordPress data via an API to provide content to other User Experiences beyond the
			WordPress themeing and templating engine.</dfn
		>
	</section>
</main>

<style lang="postcss">
	.about,
	.definition {
		height: var(--size-13);
	}
	.about > p {
		font-size: var(--font-size-3);
		line-height: var(--font-lineheight-3);
	}

	#form-layout {
		padding: var(--size-fluid-4);
		border: var(--border-size-1) solid var(--primary-color);
		border-radius: var(--radius-2);
	}

	h2 {
		font-size: var(--font-size-fluid-2);
	}
	form > * {
		margin: var(--size-fluid-1);
	}
</style>
