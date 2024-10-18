import type { TreeAction, TreeItem } from "./data";
import DropIndicator from "../list/DropIndicator.svelte";
import {
	attachInstruction,
	extractInstruction
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item";
export type CleanupFn = () => void;

export type TreeContext = {
	uniqueContextId: Symbol;
	getPathToItem: (itemId: string) => string[];
	getChildrenOfItem: (itemId: string) => TreeItem[];
	getMoveTargets: ({ itemId }: { itemId: string }) => TreeItem[];
	registerTreeItem: (itemId: string, element: HTMLElement) => CleanupFn;
	dispatch: (action: TreeAction) => void;
};

export type DependencyContext = {
	DropIndicator: typeof DropIndicator;
	attachInstruction: typeof attachInstruction;
	extractInstruction: typeof extractInstruction;
};
