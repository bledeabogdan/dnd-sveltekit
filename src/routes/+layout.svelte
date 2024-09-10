<script lang="ts">
	import Theme from '@askia/fibre-components/theme/Theme.svelte';
	import UiShell from '@askia/fibre-components/ui-shell/UiShell.svelte';
</script>

<Theme theme="dark-grey">
	<UiShell trackingId="shell">
		<slot />
	</UiShell>
</Theme>
