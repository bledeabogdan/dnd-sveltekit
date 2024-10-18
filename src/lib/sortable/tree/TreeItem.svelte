<script lang="ts">
	import SortableList from "$lib/sortable/SortableList.svelte";

	export let itemComponent: any = null;
	export let item: any;

	export let level = 0;
	$:console.log(item);
</script>

<svelte:component this={itemComponent} {item} />
{#if item.items}

	<SortableList
		class="list-group col nested-sortable level-{level}"
		group="nested"
		animation={150}
		forceFallback={true}
		swapThreshold={0.65}
	>
		{#each item.items as childItem(childItem.id)}
			<svelte:self bind:item={childItem} {itemComponent} level={level + 1} />
		{/each}

	</SortableList>
{/if}

<style>
    :global(.list-group) {
				border: 1px solid #ccc;
        padding: 0.5rem 0.5rem 0;
        margin: 0.15em 0;
				user-select: none;
    }
</style>
