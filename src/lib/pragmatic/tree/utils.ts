import type { TreeItem } from "./data";
import type { ItemMode } from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item";
export function getItemMode(item: TreeItem, index: number, items: TreeItem[]): ItemMode {
	if (item.children.length > 0 && item.isOpen) {
		return "expanded";
	}

	if (index === items.length - 1) {
		return "last-in-group";
	}

	return "standard";
}
