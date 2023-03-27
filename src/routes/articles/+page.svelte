<script lang="ts">
	/* @type { import('./$houdini').PageData } */
	export let data;

	$: ({ Articles } = data);
</script>

<main>
	<pre>{JSON.stringify($Articles, null, 2)}</pre>
</main>
