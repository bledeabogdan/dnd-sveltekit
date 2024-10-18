<script lang="ts">
	import SortableList from "$lib/sortable/SortableList.svelte";
	export let items = [];
	export let itemElement: any = null;
</script>

<SortableList class="list-group col" animation={150} ghostClass="bg-info">
	{#each items as item}
		<svelte:component this={itemElement} {item} />
	{/each}
</SortableList>
