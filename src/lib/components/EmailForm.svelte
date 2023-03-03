<script lang="ts">


	export let form: ActionData;

</script>

{#if form?.status === 'mail_sent'}
	<p>{form?.message}</p>
{:else}
	<form method="POST">
		{#if form?.status === 'validation_failed'}<p class="error">{form.message}</p>{/if}
		<label>
			Email
			<input name="email" type="email" autocomplete="email" />
		</label>
		<button type="submit">Sign Up</button>
	</form>
{/if}
