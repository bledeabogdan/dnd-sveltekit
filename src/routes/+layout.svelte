<script>
	import { Header, Content, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
</script>

<Theme theme="g10" />
<Header company="sd" platformName="dnd-sveltekit"></Header>

<Content>
	<slot />
</Content>
