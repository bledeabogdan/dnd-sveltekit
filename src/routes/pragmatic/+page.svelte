<script lang="ts">
	import DraggableList from '../../lib/pragmatic/DraggableList.svelte';
	import Tree from '../../lib/pragmatic/tree/Tree.svelte';
	import type { Item } from '../../lib/pragmatic/utils';
	import { Tile } from 'carbon-components-svelte';

	const list: Item[] = [
		{ id: '1', content: 'Item 1' },
		{ id: '2', content: 'Item 2' },
		{ id: '3', content: 'Item 3' },
		{ id: '4', content: 'Item 4' },
		{ id: '5', content: 'Item 5' }
	];
</script>

<h3>List</h3>
<DraggableList items={list}>
	<svelte:fragment let:item>
		<Tile>{item.content}</Tile>
	</svelte:fragment>
</DraggableList>
<hr />
<h3>Tree</h3>

<Tree />
