<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { isItemData, type Item } from './utils';
	import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
	import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
	import DraggableItem from './DraggableItem.svelte';

	export let items: Item[] = [];

	let cleanup = () => {};

	onMount(() => {
		cleanup = monitorForElements({
			canMonitor({ source }) {
				return isItemData(source.data);
			},
			onDrop({ location, source }) {
				const target = location.current.dropTargets[0];

				if (!target) {
					return;
				}

				const sourceData = source.data;
				const targetData = target.data;

				if (!isItemData(sourceData) || !isItemData(targetData)) {
					return;
				}

				const indexOfSource = items.findIndex((t) => t.id === sourceData.itemId);
				const indexOfTarget = items.findIndex((t) => t.id === targetData.itemId);

				if (indexOfSource === -1 || indexOfTarget === -1) {
					return;
				}

				const closestEdgeOfTarget = extractClosestEdge(targetData);

				items = reorderWithEdge<Item>({
					list: items,
					startIndex: indexOfSource,
					indexOfTarget,
					closestEdgeOfTarget,
					axis: 'vertical'
				});
			}
		});
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<div>
	{#each items as item}
		<DraggableItem {item}>
			<slot {item} />
		</DraggableItem>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
