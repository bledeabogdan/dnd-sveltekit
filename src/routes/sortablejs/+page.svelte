<script lang="ts">
	import { list } from "$lib/lists";
	import DraggableList from "$lib/sortable/list/DraggableList.svelte";
	import DraggableItem from "$lib/sortable/list/DraggableItem.svelte";
	import Tree from "$lib/sortable/tree/Tree.svelte";
</script>

<h3>List</h3>
<DraggableList items={list} itemElement={DraggableItem}/>
<hr />
<h3>Tree</h3>
<Tree itemComponent={DraggableItem}/>
