<script>
	import LoadingRow from '$lib/components/LoadingRow.svelte'
	import NoDataRow from '$lib/components/NoDataRow.svelte'
	import { loading } from '$lib/stores'
	import format from '$lib/format'

	export let data
	$: ({
		project,
		permission,
		emails
	} = data)
</script>

<h6>Emails</h6>
<br>
<div class="panel">
	<div class="_dp-f _jtfct-spbtw _alit-ct">
		<div class="lo-grid-span-horizontal _gg-8px _mgl-at">
			Contact us to request access
		</div>
	</div>

	<div class="table-container">
		<table class="table -ruled">
			<thead>
			<tr>
				<th>Domain</th>
				<th>Quota</th>
				<th>Created at</th>
			</tr>
			</thead>
			<tbody>
			{#if $loading}
				<LoadingRow span="3" />
			{:else}
				{#each emails as it}
					<tr>
						<td>{it.domain}</td>
						<td>-</td>
						<td>{format.datetime(it.createdAt)}</td>
					</tr>
				{:else}
					<NoDataRow span="3" forbidden={!permission.emails} />
				{/each}
			{/if}
			</tbody>
		</table>
	</div>
</div>
