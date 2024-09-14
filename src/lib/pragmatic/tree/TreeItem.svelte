<script lang="ts">
	import {
		type Instruction,
		type ItemMode
	} from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';
	import type { TreeItem } from './data';
	import type { TreeContext } from './types';
	import { getContext, onMount } from 'svelte';
	import invariant from 'tiny-invariant';

	export let item: TreeItem;
	export let mode: ItemMode;
	export let level: number = 0;
	export let index: number;

	let ref: HTMLButtonElement | null = null;

	let state: 'idle' | 'dragging' | 'preview' | 'parent-of-instruction' = 'idle';

	let instruction: Instruction | null = null;
	const { dispatch, registerTreeItem } = getContext<TreeContext>('tree');

	function toggleOpen() {
		dispatch({ type: 'toggle', itemId: item.id });
	}

	onMount(() => {
		invariant(ref);

		registerTreeItem(item.id, ref);
	});
</script>

<div>
	<button
		style:padding-left="{level * 32}px"
		bind:this={ref}
		on:click={toggleOpen}
		data-level={level}
		data-index={index}
	>
		{item.id}
	</button>
	{#each item.children as child, i (child.id)}
		<svelte:self item={child} {mode} level={level + 1} index={i} />
	{/each}
</div>
