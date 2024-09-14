import { type Readable, writable } from "svelte/store";
import { type TreeAction, type TreeState, type TreeReducer } from "./data";

export function reducible(
	state: TreeState,
	reducer: TreeReducer
): [Readable<TreeState>, (action: TreeAction) => void] {
	const { update, subscribe } = writable(state);

	function dispatch(action: TreeAction) {
		update((state) => reducer(state, action));
	}

	return [{ subscribe }, dispatch];
}
