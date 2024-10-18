<script lang="ts">
	import SortableList from "$lib/sortable/SortableList.svelte";
	import TreeItem from "$lib/sortable/tree/TreeItem.svelte";

	export let itemComponent:any;

	let treeItems = [
		{
			id: 1,
			items: [
				{
					id: 2,
					items: [
						{
							id: 3,
							items: []
						},
						{
							id: 4,
							items: []
						}
					]
				},
				{
					id: 5,
					items: []
				}
			]
		},
		{
			id: 6,
			items: [
				{
					id: 22,
					items: [
						{
							id: 32,
							items: []
						},
						{
							id: 42,
							items: []
						}
					]
				},
				{
					id: 5,
					items: []
				}
			]
		}
	];
</script>
<SortableList
	class="list-group col nested-sortable"
	group="nested"
	animation={150}
	forceFallback={true}
	swapThreshold={0.65}
>
	{#each treeItems as item}
		<TreeItem bind:item={item} itemComponent={itemComponent}/>
	{/each}
</SortableList>


<style>
    :global(.level-1) {
        margin-bottom: 8px;
        background-color: rgb(241, 241, 241);
    }

    :global(.level-2) {
        margin-bottom: 8px;
        background-color: rgb(221, 221, 221);
    }

    :global(.level-3) {
        margin-bottom: 8px;
        background-color: rgb(201, 201, 201);
    }
</style>
