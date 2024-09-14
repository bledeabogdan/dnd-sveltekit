import type { TreeAction } from './data';

export type CleanupFn = () => void;

export type TreeContext = {
	registerTreeItem: (itemId: string, element: HTMLElement) => CleanupFn;
	dispatch: (action: TreeAction) => void;
};
