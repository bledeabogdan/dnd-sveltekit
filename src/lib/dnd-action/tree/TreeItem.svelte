<script>
	import { flip } from 'svelte/animate';

	export let nodes
	export let node

	export let itemTemplate;

	const flipDurationMs = 300;
</script>
<svelte:component this={itemTemplate}>{node?.id}</svelte:component>
{#if node?.hasOwnProperty("items")}
		{#each node.items as item(item.id)}
			<div animate:flip="{{duration: flipDurationMs}}" class="item">
				<svelte:self bind:nodes={nodes} node={nodes[item.id]} {itemTemplate} />
			</div>
		{/each}
{/if}



<style>
    div {
        width: 90%;
        padding: 0.3em;
        border: 0px solid blue;
        margin: 0.15em 0;
    }
    .item{
        background-color: rgba(00, 100, 100, 0.1);
    }
</style>
