<script lang="ts">
	import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

	export let edge: Edge | null = null;
</script>

<div class="drop-indicator horizontal {edge}"></div>

<style>
	.drop-indicator {
		pointer-events: none;
		position: absolute;
		left: 4px;
		right: 0px;
		z-index: 10;
		box-sizing: border-box;
		height: 2px;
		background-color: #1d4ed8;
	}

	.drop-indicator::before {
		content: '';
		border-color: #1d4ed8;
		border-style: solid;
		border-width: 2px;
		border-radius: 50%;
		width: 8px;
		height: 8px;
		left: -8px;
		bottom: -3px;
		position: absolute;
	}

	.drop-indicator.bottom {
		bottom: calc(-0.5 * (8px + 2px));
	}

	.drop-indicator.top {
		top: calc(-0.5 * (8px + 2px));
	}
</style>
