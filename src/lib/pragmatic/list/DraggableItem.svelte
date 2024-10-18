<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getItemData, isItemData, type Item } from './utils';
	import {
		draggable,
		dropTargetForElements
	} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
	import {
		attachClosestEdge,
		extractClosestEdge,
		type Edge
	} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
	import DropIndicator from './DropIndicator.svelte';

	export let item: Item;

	type ItemState =
		| {
				type: 'idle';
		  }
		| {
				type: 'is-dragging';
		  }
		| {
				type: 'is-dragging-over';
				closestEdge: Edge | null;
		  };

	const idle: ItemState = { type: 'idle' };

	let ref: HTMLDivElement | null;
	let state: ItemState = idle;
	let cleanup = () => {};

	onMount(() => {
		if (!ref) {
			return;
		}

		cleanup = combine(
			draggable({
				element: ref,
				getInitialData() {
					return getItemData(item);
				},
				onDragStart() {
					state = { type: 'is-dragging' };
				},
				onDrop() {
					state = idle;
				}
			}),
			dropTargetForElements({
				element: ref,
				canDrop({ source }) {
					if (source.element === ref) {
						return false;
					}

					return isItemData(source.data);
				},
				getData({ input }) {
					const data = getItemData(item);

					return attachClosestEdge(data, {
						element: ref,
						input,
						allowedEdges: ['top', 'bottom']
					});
				},
				getIsSticky() {
					return true;
				},
				onDragEnter({ self }) {
					const closestEdge = extractClosestEdge(self.data);

					state = { type: 'is-dragging-over', closestEdge };
				},
				onDrag({ self }) {
					const closestEdge = extractClosestEdge(self.data);

					if (state.type !== 'is-dragging-over' || state.closestEdge !== closestEdge) {
						state = { type: 'is-dragging-over', closestEdge };
					}
				},
				onDragLeave() {
					state = idle;
				},
				onDrop() {
					state = idle;
				}
			})
		);
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<div bind:this={ref} class:dragging={state.type === 'is-dragging'} class:item={true}>
	<slot {item} />
	{#if state.type === 'is-dragging-over'}
		<DropIndicator edge={state.closestEdge} />
	{/if}
</div>

<style>
	.item {
		position: relative;
	}

	.dragging {
		opacity: 0.5;
	}
</style>
