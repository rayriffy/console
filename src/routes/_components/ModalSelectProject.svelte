<script>
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { project } from '$lib/stores'

	export let projects

	let isActive

	function setProject (sid) {
		close()

		const q = new URLSearchParams($page.url.search)
		q.set('project', sid)

		if ($project) {
			goto(`${$page.data.overrideRedirect || ''}?${q.toString()}`)
			return
		}

		goto(`/?${q.toString()}`)
	}

	export function open () {
		isActive = true
	}

	function close () {
		isActive = false
	}
</script>

<div class="modal" on:click|self={close} class:is-active={isActive}>
	<div class="modal-panel u-raised-1">
		<div class="modal-close" on:click|self={close}>✕</div>
		<h4>Projects</h4>

		<div class="table-container">
			<table class="table -ruled _fs-300">
				<thead>
					<tr>
						<th class="collapsed"></th>
						<th>Name</th>
						<th>ID</th>
					</tr>
				</thead>
				<tbody>
					{#each projects as it}
					<tr>
						<td>
							{#if $project === it.project}
								<i class="fas fa-check _cl-primary-500 _fs-600"></i>
							{/if}
						</td>
						<td>
							<div on:click={() => setProject(it.project)} class="_tdcrt-udl _cs-pt _cl-primary-500-hover" style="font-weight: 500">
								{it.name}
							</div>
						</td>
						<td>{it.project}</td>
					</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style lang="scss">
	.table-container {
		max-height: 405px;
		overflow: auto;
	}

	.table td {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
</style>
