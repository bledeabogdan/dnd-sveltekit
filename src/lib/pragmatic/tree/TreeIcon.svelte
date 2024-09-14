<script lang="ts">
	import type { TreeItem } from "./data";

	export let item: TreeItem;
</script>

{#if !item.children.length}
	<span> 🍁 </span>
{:else if item.isOpen}
	<span> 🔽 </span>
{:else}
	<span>▶️</span>
{/if}
