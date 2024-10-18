<script>
	import { list } from "$lib/lists";
import DraggableList from "$lib/dnd-action/list/DraggableList.svelte";
	import Tree from "$lib/dnd-action/tree/Tree.svelte";
	import DraggableItem from "$lib/dnd-action/list/DraggableItem.svelte";

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

<h3>List</h3>
<DraggableList items={list} idPropertyName="id" itemComponent={DraggableItem}/>
<h3>Tree</h3>
<Tree bind:items={treeItems} itemComponent={DraggableItem}/>
