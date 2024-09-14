<script lang="ts">
	import { setContext } from 'svelte';
	import type { TreeContext } from './types';
	import { reducible } from './stores';
	import {
		getInitialTreeState,
		type TreeAction,
		treeStateReducer,
		type TreeItem as TreeItemType
	} from './data';
	import TreeItem from './TreeItem.svelte';
	import type { ItemMode } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';

	const registry = new Map<string, { element: HTMLElement }>();

	const [state, dispatch] = reducible(getInitialTreeState(), treeStateReducer);

	const ctx = setContext<TreeContext>('tree', {
		registerTreeItem(itemId: string, element: HTMLElement) {
			registry.set(itemId, { element });
			return () => {
				registry.delete(itemId);
			};
		},
		dispatch
	});

	let ref: HTMLDivElement | null;

	function getItemMode(item: TreeItemType, index: number): ItemMode {
		if (item.children.length > 0 && item.isOpen) {
			return 'expanded';
		}

		if (index === $state.data.length - 1) {
			return 'last-in-group';
		}

		return 'standard';
	}
</script>

<div id="tree" bind:this={ref}>
	{#each $state.data as item, index (item.id)}
		<TreeItem {item} {index} mode={getItemMode(item, index)} />
	{/each}
</div>
