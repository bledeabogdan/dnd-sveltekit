<script lang="ts">
	import {
		type Instruction,
		type ItemMode
	} from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item";
	import type { TreeItem } from "./data";
	import { type DependencyContext, type TreeContext } from "./types";
	import { getContext, onMount } from "svelte";
	import invariant from "tiny-invariant";
	import TreeIcon from "./TreeIcon.svelte";
	import { getItemMode } from "./utils";
	import {
		draggable,
		dropTargetForElements,
		monitorForElements
	} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
	import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
	import type { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/types";

	export let item: TreeItem;
	export let mode: ItemMode;
	export let level: number = 0;
	export let index: number;

	let ref: HTMLButtonElement | null = null;

	let state: "idle" | "dragging" | "preview" | "parent-of-instruction" = "idle";

	let instruction: Instruction | null = null;
	const { dispatch, registerTreeItem, uniqueContextId, getPathToItem } =
		getContext<TreeContext>("tree");
	const { DropIndicator, attachInstruction, extractInstruction } =
		getContext<DependencyContext>("dependency");

	function toggleOpen() {
		dispatch({ type: "toggle", itemId: item.id });
	}

	onMount(() => {
		invariant(ref);

		registerTreeItem(item.id, ref);

		return combine(
			draggable({
				element: ref,
				getInitialData() {
					return {
						id: item.id,
						type: "tree-item",
						isOpenOnDragStart: item.isOpen,
						uniqueContextId
					};
				},
				onDragStart({ source }) {
					state = "dragging";

					if (source.data.isOpenOnDragStart) {
						dispatch({ type: "collapse", itemId: item.id });
					}
				},
				onDrop({ source }) {
					state = "idle";

					if (source.data.isOpenOnDragStart) {
						dispatch({ type: "expand", itemId: item.id });
					}
				}
			}),
			dropTargetForElements({
				element: ref,
				getData({ input, element }) {
					const data = { id: item.id };

					return attachInstruction(data, {
						input,
						element,
						indentPerLevel: 32,
						currentLevel: level,
						mode,
						block: item.isDraft ? ["make-child"] : []
					});
				},
				canDrop({ source }) {
					return (
						source.data.type === "tree-item" && source.data.uniqueContextId === uniqueContextId
					);
				},
				getIsSticky() {
					return true;
				},
				onDrag({ self, source }) {
					const _instruction = extractInstruction(self.data);

					if (source.data.id !== item.id) {
						if (_instruction?.type !== "make-child") {
							cancelExpand();
						}

						instruction = _instruction;
						return;
					}

					if (_instruction?.type === "reparent") {
						instruction = _instruction;

						return;
					}

					instruction = null;
				},
				onDragLeave() {
					cancelExpand();
					instruction = null;
				},
				onDrop() {
					cancelExpand();
					instruction = null;
				}
			}),
			monitorForElements({
				canMonitor({ source }) {
					return source.data.uniqueContextId === uniqueContextId;
				},
				onDragStart: updateIsParentOfInstruction,
				onDrag: updateIsParentOfInstruction,
				onDrop() {
					clearParentOfInstructionState();
				}
			})
		);
	});

	function cancelExpand() {
		dispatch({ type: "expand", itemId: item.id });
	}

	function updateIsParentOfInstruction({ location }: { location: DragLocationHistory }) {
		if (shouldHighlightParent(location)) {
			state = "parent-of-instruction";
			return;
		}
		clearParentOfInstructionState();
	}

	function clearParentOfInstructionState() {
		if (state === "parent-of-instruction") {
			state = "idle";
		}
	}

	function shouldHighlightParent(location: DragLocationHistory) {
		const target = location.current.dropTargets[0];

		if (!target) {
			return false;
		}

		const instruction = extractInstruction(target.data);

		if (!instruction) {
			return false;
		}

		const targetId = target.data.id;
		invariant(typeof targetId === "string");

		const path = getPathToItem(targetId);
		const parentLevel: number = getParentLevelOfInstruction(instruction);
		const parentId = path[parentLevel];
		return parentId === item.id;
	}

	function getParentLevelOfInstruction(instruction: Instruction): number {
		if (instruction.type === "instruction-blocked") {
			return getParentLevelOfInstruction(instruction.desired);
		}
		if (instruction.type === "reparent") {
			return instruction.desiredLevel - 1;
		}
		return instruction.currentLevel - 1;
	}
</script>

<div class:idle={state === "idle"} class:tree-item-container={true}>
	<button
		class:tree-item={true}
		style:padding-left="{level * 32}px"
		bind:this={ref}
		on:click={toggleOpen}
		data-level={level}
		data-index={index}
	>
		<span
			class:tree-item-inner={true}
			class:dragging={state === "dragging"}
			class:parent-of-instruction={state === "parent-of-instruction"}
		>
			<TreeIcon {item} />
			<span class:label={true}> Item {item.id} </span>
		</span>

		{#if instruction}
			<DropIndicator />
		{/if}
	</button>
	{#if item.children.length && item.isOpen}
		{#each item.children as child, i (child.id)}
			<svelte:self
				item={child}
				mode={getItemMode(child, i, child.children)}
				level={level + 1}
				index={i}
			/>
		{/each}
	{/if}
</div>

<style>
	div.tree-item-container {
		position: relative;

		&.idle {
			border-radius: 3px;
			cursor: pointer;

			&:hover {
				background-color: #091e420f;
			}
		}
	}

	button.tree-item {
		color: #172b4d;
		border: 0;
		width: 100%;
		position: relative;
		background: transparent;
		margin: 0;
		padding: 0;
		border-radius: 3px;
		cursor: pointer;
	}

	span.tree-item-inner {
		padding: 8px;
		align-items: center;
		display: flex;
		flex-direction: row;
		background: transparent;
		border-radius: 3px;

		&.dragging {
			opacity: 0.4;
		}

		&.parent-of-instruction {
			background: transparent;
		}
	}

	span.label {
		flex-grow: 1;
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
