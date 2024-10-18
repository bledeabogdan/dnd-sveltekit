<script lang="ts">
	import { type DndEvent, dndzone, type Item } from "svelte-dnd-action";
	import {flip} from 'svelte/animate';
	export let itemComponent;
	export let idPropertyName = "id";

	export let items: Item[] = [];

	export let level = 0;

	const flipDurationMs = 300;

	function handleConsider(e: CustomEvent<DndEvent>) {
		console.log("consider", e, items);
		items = e.detail.items;
	}
	function handleFinalize(e: CustomEvent<DndEvent>) {
		items = e.detail.items;
		console.log("finalize");
	}
</script>
<section use:dndzone={{items, flipDurationMs}} on:consider={handleConsider} on:finalize={handleFinalize}>
	{#each items as item(item[idPropertyName])}
		<div animate:flip={{duration: flipDurationMs}}>
			<svelte:component this={itemComponent} {item}/>
			{#if item.items}
				<svelte:self bind:items={item.items} {itemComponent} {idPropertyName} level={level + 1} />
			{/if}
		</div>
	{/each}
</section>


<style>
    section {
        width: auto;
        max-width: 400px;
        border: 0px solid black;
        padding: 0.4em;
        /* this will allow the dragged element to scroll the list */
        overflow-y: auto ;
        height: auto;
        background-color: rgba(100, 100, 100, 0.1);
    }
    div {
        width: 90%;
        padding: 0.3em;
        border: 0px solid blue;
        margin: 0.15em 0;
    }
</style>
