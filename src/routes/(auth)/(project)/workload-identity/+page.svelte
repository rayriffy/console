<script>
	import StatusIcon from '$lib/components/StatusIcon.svelte'
	import LoadingRow from '$lib/components/LoadingRow.svelte'
	import NoDataRow from '$lib/components/NoDataRow.svelte'
	import { loading } from '$lib/stores'
	import format from '$lib/format'
	import { browser } from '$app/env'
	import { onDestroy } from 'svelte'
	import api from '$lib/api'

	export let data
	$: ({
		project,
		permission,
		workloadIdentities
	} = data)

	let pendingTimeout
	$: {
		if (browser) {
			const hasPending = workloadIdentities.some((x) => x.status === 'pending')
			if (hasPending) {
				pendingTimeout = setTimeout(() => api.invalidate('workloadIdentity.list'), 2000)
			}
		}
	}

	if (browser) {
		onDestroy(() => {
			clearTimeout(pendingTimeout)
		})
	}
</script>

<h6>Workload Identities</h6>
<br>
<div class="panel">
	<div class="_dp-f _jtfct-spbtw _alit-ct">
		<div class="lo-grid-span-horizontal _gg-8px _mgl-at">
			<a class="button -small" href={`/workload-identity/create?project=${project}`}>
                Create
            </a>
		</div>
	</div>

	<div class="table-container">
		<table class="table -ruled">
			<thead>
			<tr>
				<th>Name</th>
				<th>Location</th>
				<th>Created at</th>
			</tr>
			</thead>
			<tbody>
			{#if $loading}
				<LoadingRow span="3" />
			{:else}
				{#each workloadIdentities as it}
					<tr>
						<td>
							<StatusIcon status={it.status} />
							<a sveltekit:prefetch class="link" href={`/workload-identity/detail?project=${project}&location=${it.location}&name=${it.name}`}>
								{it.name}
							</a>
						</td>
						<td>{it.location}</td>
						<td>{format.datetime(it.createdAt)}</td>
					</tr>
				{:else}
					<NoDataRow span="3" forbidden={!permission.workloadIdentities} />
				{/each}
			{/if}
			</tbody>
		</table>
	</div>
</div>
