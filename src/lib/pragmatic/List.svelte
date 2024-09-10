<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Task from './Task.svelte';
	import { getTasks, isTaskData, type TTask } from './utils';
	import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
	import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';

	let tasks: TTask[] = getTasks();
	let cleanup = () => {};

	onMount(() => {
		cleanup = monitorForElements({
			canMonitor({ source }) {
				return isTaskData(source.data);
			},
			onDrop({ location, source }) {
				const target = location.current.dropTargets[0];

				if (!target) {
					return;
				}

				const sourceData = source.data;
				const targetData = target.data;

				if (!isTaskData(sourceData) || !isTaskData(targetData)) {
					return;
				}

				const indexOfSource = tasks.findIndex((t) => t.id === sourceData.taskId);
				const indexOfTarget = tasks.findIndex((t) => t.id === targetData.taskId);

				if (indexOfSource === -1 || indexOfTarget === -1) {
					return;
				}

				const closestEdgeOfTarget = extractClosestEdge(targetData);

				tasks = reorderWithEdge<TTask>({
					list: tasks,
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
	{#each tasks as task}
		<Task {task} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
