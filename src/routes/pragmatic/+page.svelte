<script lang="ts">
	import DraggableList from '../../lib/pragmatic/list/DraggableList.svelte';
	import Tree from '../../lib/pragmatic/tree/Tree.svelte';
	import { Tile } from 'carbon-components-svelte';
	import { list, treeList } from '$lib/lists';

</script>

<h3>List</h3>
<DraggableList items={list}>
	<svelte:fragment let:item>
		<Tile>{item.content}</Tile>
	</svelte:fragment>
</DraggableList>
<hr />
<h3>Tree</h3>
<Tree items={treeList}>
	<svelte:fragment let:item>
		<Tile>Item {item.id} {JSON.stringify(item)}</Tile>
	</svelte:fragment>
</Tree>
