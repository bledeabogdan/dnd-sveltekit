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
        padding-left: 0.5rem;
        border: 0px solid blue;
        margin: 0.15em 0;
    }

    :global(.sortable-chosen) {
        opacity: 0;
    }
    .item{
        background-color: rgba(00, 100, 100, 0.1);
    }
</style>
