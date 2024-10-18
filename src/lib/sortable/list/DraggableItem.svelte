<script>
	import { Tile } from "carbon-components-svelte";

	export let item;
</script>
<div style="cursor: grab; margin: 0.1rem">
	<Tile>Item id: {item.id}</Tile>
</div>

