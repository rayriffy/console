<script>
	import { onDestroy } from 'svelte'
	import DeploymentStatusIcon from '$lib/components/DeploymentStatusIcon.svelte'
	import LoadingRow from '$lib/components/LoadingRow.svelte'
	import NoDataRow from '$lib/components/NoDataRow.svelte'
	import { browser } from '$app/env'
	import format from '$lib/format'
	import { loading } from '$lib/stores'
	import api from '$lib/api'

	export let data
	$: ({
		project,
		permission,
		deployments
	} = data)

	let pendingTimeout

	$: {
		if (browser) {
			const hasPending = deployments.some((x) => x.status === 'pending')
			if (hasPending) {
				pendingTimeout = setTimeout(() => api.invalidate('deployment.list'), 2000)
			}
		}
	}

	if (browser) {
		onDestroy(() => {
			clearTimeout(pendingTimeout)
		})
	}
</script>

<h6>Deployments</h6>
<br>
<div class="panel">
	<div class="_dp-f _jtfct-spbtw _alit-ct">
		<div class="lo-grid-span-horizontal _gg-8px _mgl-at">
			<a class="button -small" href={`/deployment/deploy?project=${project}`}>
                Create
            </a>
		</div>
	</div>

	<div class="table-container">
		<table class="table -ruled">
			<thead>
			<tr>
				<th>Name</th>
				<th>Type</th>
<!--				<th>CPU</th>-->
				<th>Memory</th>
				<th>Replicas</th>
				<th>Location</th>
				<th>Last deployed</th>
<!--				<th>Deployed by</th>-->
			</tr>
			</thead>
			<tbody>
			{#if $loading}
				<LoadingRow span="6" />
			{:else}
				{#each deployments as it}
					<tr>
						<td>
							<DeploymentStatusIcon action={it.action} status={it.status} url={it.statusUrl} />
							<a sveltekit:prefetch class="link" href={`/deployment/metrics?project=${project}&location=${it.location}&name=${it.name}`}>
								{it.name}
							</a>
						</td>
						<td>{it.type}</td>
	<!--					<td>{format.cpu(it.resources.requests.cpu)}</td>-->
						<td>{format.memory(it.resources.requests.memory)}</td>
						<td>
							{#if it.minReplicas > 0}
								{#if it.minReplicas === it.maxReplicas}
									{it.minReplicas}
								{:else}
									{it.minReplicas} - {it.maxReplicas}
								{/if}
							{:else}
								-
							{/if}
						</td>
						<td>{it.location}</td>
						<td>{format.datetime(it.createdAt)}</td>
	<!--					<td>{it.createdBy}</td>-->
					</tr>
				{:else}
					<NoDataRow span="6" forbidden={!permission.deployments} />
				{/each}
			{/if}
			</tbody>
		</table>
	</div>
</div>
