<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getTaskData, isTaskData, type TTask } from './utils';
	import ContainedListItem from '@askia/fibre-components/contained-list/ContainedListItem.svelte';
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

	export let task: TTask;

	type TaskState =
		| {
				type: 'idle';
		  }
		| {
				type: 'preview';
				container: HTMLElement;
		  }
		| {
				type: 'is-dragging';
		  }
		| {
				type: 'is-dragging-over';
				closestEdge: Edge | null;
		  };

	const idle: TaskState = { type: 'idle' };

	const stateStyles: { [Key in TaskState['type']]?: string } = {
		'is-dragging': 'opacity-40'
	};

	let ref: HTMLDivElement | null;
	let state: TaskState = idle;
	let cleanup = () => {};

	onMount(() => {
		if (!ref) {
			return;
		}

		cleanup = combine(
			draggable({
				element: ref,
				getInitialData() {
					return getTaskData(task);
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

					return isTaskData(source.data);
				},
				getData({ input }) {
					const data = getTaskData(task);

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

<div bind:this={ref} class={stateStyles[state.type] ?? ''} class:task={true}>
	<ContainedListItem as="div">
		<span slot="node">{task.content}</span>
	</ContainedListItem>
	{#if state.type === 'is-dragging-over'}
		<DropIndicator edge={state.closestEdge} />
	{/if}
</div>

<style>
	.task {
		position: relative;
	}

	.task :global(.fds--contained-list-item::before) {
		display: none;
	}

	.opacity-40 {
		opacity: 0.5;
	}
</style>
