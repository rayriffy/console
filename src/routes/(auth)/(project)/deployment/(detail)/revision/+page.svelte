<script>
	import format from '$lib/format'
	import { goto } from '$app/navigation'
	import modal from '$lib/modal'
	import api from '$lib/api'

	export let data
	const {
		deployment,
		revisions
	} = data

	function rollback (toRevision) {
		modal.confirm({
			title: `Rollback ${deployment.name} to revision ${toRevision}`,
			yes: 'Rollback',
			callback: async () => {
				const resp = await api.invoke('deployment.rollback', {
					project: deployment.project,
					location: deployment.location,
					name: deployment.name,
					revision: toRevision
				}, fetch)
				if (!resp.ok) {
					modal.error({ error: resp.error })
					return
				}
				goto(`/deployment/detail?project=${deployment.project}&location=${deployment.location}&name=${deployment.name}`)
			}
		})
	}
</script>

<h6><strong>Revision</strong></h6>
<div class="table-container _wsp-nw">
	<table class="table">
		<thead>
		<tr>
			<th>Revision</th>
			<th>Image</th>
			<th>Deployed At</th>
			<th>Deployed By</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		{#each revisions as it, index}
			<tr>
				<td>{it.revision}</td>
				<td>{it.image}</td>
				<td>{format.datetime(it.createdAt)}</td>
				<td>{it.createdBy}</td>
				<td>
					{#if index > 0}
						<button class="button -tertiary -small" type="button" on:click={() => rollback(it.revision)}>Rollback</button>
					{/if}
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>
