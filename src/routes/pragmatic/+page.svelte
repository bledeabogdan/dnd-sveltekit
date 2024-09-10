<script lang="ts">
	import DraggableList from '../../lib/pragmatic/DraggableList.svelte';
	import type { Item } from '../../lib/pragmatic/utils';
	import Tile from '@askia/fibre-components/tile/Tile.svelte';

	const list: Item[] = [
		{ id: '1', content: 'Item 1' },
		{ id: '2', content: 'Item 2' },
		{ id: '3', content: 'Item 3' },
		{ id: '4', content: 'Item 4' },
		{ id: '5', content: 'Item 5' }
	];
</script>

<DraggableList items={list}>
	<svelte:fragment let:item>
		<Tile title={item.content} />
	</svelte:fragment>
</DraggableList>
