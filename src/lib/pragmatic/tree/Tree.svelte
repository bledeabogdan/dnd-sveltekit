<script lang="ts">
	import { onMount, setContext } from "svelte";
	import type { DependencyContext, TreeContext } from "./types";
	import { reducible } from "./stores";
	import {
		getInitialTreeState,
		tree,
		treeStateReducer,
		type TreeItem as TreeItemType
	} from "./data";
	import TreeItem from "./TreeItem.svelte";
	import {
		attachInstruction,
		extractInstruction
	} from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item";
	import DropIndicator from "../DropIndicator.svelte";
	import { getItemMode } from "./utils";
	import invariant from "tiny-invariant";
	import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
	import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

	const registry = new Map<string, { element: HTMLElement }>();
	const [state, dispatch] = reducible(getInitialTreeState(), treeStateReducer);
	const ctx = setContext<TreeContext>("tree", {
		uniqueContextId: Symbol("tree"),
		getPathToItem: (targetId: string) =>
			tree.getPathToItem({ current: $state.data, targetId }) ?? [],
		getMoveTargets,
		getChildrenOfItem,
		registerTreeItem(itemId: string, element: HTMLElement) {
			registry.set(itemId, { element });
			return () => {
				registry.delete(itemId);
			};
		},
		dispatch
	});
	setContext<DependencyContext>("dependency", {
		DropIndicator: DropIndicator,
		attachInstruction,
		extractInstruction
	});

	let ref: HTMLDivElement | null;

	onMount(() => {
		invariant(ref);
		return combine(
			monitorForElements({
				canMonitor({ source }) {
					return source.data.uniqueContextId === ctx.uniqueContextId;
				},
				onDrop({ location, source }) {
					if (!location.current.dropTargets.length) {
						return;
					}

					if (source.data.type === "tree-item") {
						const itemId = source.data.id as string;
						const target = location.current.dropTargets[0];
						const targetId = target.data.id as string;
						const instruction = extractInstruction(target.data);

						if (instruction !== null) {
							dispatch({ type: "instruction", instruction, itemId, targetId });
						}
					}
				}
			})
		);
	});

	function getMoveTargets({ itemId }: { itemId: string }): TreeItemType[] {
		const targets = [];

		const searchStack = Array.from($state.data);

		while (searchStack.length > 0) {
			const node = searchStack.pop();

			if (!node) {
				continue;
			}

			if (node.id === itemId) {
				continue;
			}

			targets.push(node);

			node.children.forEach((child) => searchStack.push(child));
		}

		return targets;
	}

	function getChildrenOfItem(itemId: string) {
		if (itemId === "") {
			return $state.data;
		}

		const item = tree.find($state.data, itemId);

		invariant(item);

		return item.children;
	}
</script>

<div id="tree" bind:this={ref}>
	{#each $state.data as item, index (item.id)}
		<TreeItem {item} {index} mode={getItemMode(item, index, $state.data)} level={0} />
	{/each}
</div>
