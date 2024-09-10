<script lang="ts">
	import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { onMount } from 'svelte';
	import Tile from '@askia/fibre-components/tile/Tile.svelte';

	let ref: HTMLDivElement | null;

	let isDraggingOver = false;

	onMount(() => {
		if (!ref) {
			return;
		}

		return dropTargetForElements({
			element: ref,
			onDragEnter() {
				isDraggingOver = true;
			},
			onDragLeave() {
				isDraggingOver = false;
			},
			onDrop() {
				isDraggingOver = false;
			}
		});
	});
</script>

<div bind:this={ref}>
	<Tile layer={isDraggingOver ? 1 : 2}>This is a droppable area</Tile>
</div>
