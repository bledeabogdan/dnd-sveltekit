<script lang="ts">
	import { dndzone } from "svelte-dnd-action";
	import {flip} from 'svelte/animate';
	import type { Item } from "$lib/pragmatic/list/utils";
	export let items: Item[];
	export let itemComponent;
	export let idPropertyName: string = "id";

	const flipDurationMs = 300;

	function handleConsider(e) {
		items = e.detail.items;
	}
	function handleFinalize(e) {
		items = e.detail.items;
	}
</script>

<section use:dndzone={{items, flipDurationMs}} on:consider={handleConsider} on:finalize={handleFinalize}>
	{#each items as item(item[idPropertyName])}
		<div animate:flip={{duration: flipDurationMs}}>
			<svelte:component this={itemComponent} {item}/>
		</div>
	{/each}
</section>
