<script>
	import LoadingRow from '$lib/components/LoadingRow.svelte'
	import NoDataRow from '$lib/components/NoDataRow.svelte'
	import format from '$lib/format'
	import { loading } from '$lib/stores'

	export let data
	$: ({
		project,
		permission,
		serviceAccounts
	} = data)
</script>

<h6>Service Accounts</h6>
<br>
<div class="panel">
	<div class="_dp-f _jtfct-spbtw _alit-ct">
		<div class="lo-grid-span-horizontal _gg-8px _mgl-at">
			<a class="button -small" href={`/service-account/create?project=${project}`}>
				Create
			</a>
		</div>
	</div>

	<div class="table-container">
		<table class="table -ruled">
			<thead>
			<tr>
				<th>Email</th>
				<th>Name</th>
				<th>Created At</th>
				<th class="collapsed _tal-r"></th>
			</tr>
			</thead>
			<tbody>
			{#if $loading}
				<LoadingRow span="4" />
			{:else}
				{#each serviceAccounts as it}
					<tr>
						<td>
							<a sveltekit:prefetch class="link" href={`/service-account/detail?project=${project}&id=${it.sid}`}>
								{it.email}
							</a>
						</td>
						<td>{it.name}</td>
						<td>{format.datetime(it.createdAt)}</td>
						<td>
							<div class="table-action-container">
								<a href={`/service-account/create?project=${project}&id=${it.sid}`}>
									<div class="icon-button -secondary">
										<i class="fa-solid fa-pen"></i>
									</div>
								</a>
							</div>
						</td>
					</tr>
				{:else}
					<NoDataRow span="4" forbidden={!permission.serviceAccounts} />
				{/each}
			{/if}
			</tbody>
		</table>
	</div>
</div>
