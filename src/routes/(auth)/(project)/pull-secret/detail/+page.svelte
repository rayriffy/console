<script>
	import ClipboardJS from 'clipboard'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import modal from '$lib/modal'
	import api from '$lib/api'

	export let data
	$: ({
		project,
		location,
		name,
		pullSecret
	} = data)

	onMount(() => {
		const copyList = new ClipboardJS('.copy')
		return () => {
			copyList?.destroy()
		}
	})

	function deleteItem () {
		modal.confirm({
			title: `Delete "${pullSecret.name}" ?`,
			yes: 'Delete',
			callback: async () => {
				const resp = await api.invoke('pullSecret.delete', { project, location, name }, fetch)
				if (!resp.ok) {
					modal.error({ error: resp.error })
					return
				}
				await goto(`/pull-secret?project=${project}`)
			}
		})
	}
</script>

<div>
	<ul class="breadcrumb">
		<li>
			<a href={`/pull-secret?project=${project}`} class="link"><h6>Pull Secrets</h6></a>
		</li>
		<li>
			<h6>{pullSecret.name}</h6>
		</li>
	</ul>
</div>
<br>
<div class="panel _dp-g _gg-16px">
	<div class="lo-12 _gg-12px">
		<div class="_dp-g _gg-16px _gatf-r _gatf-cl-lg _jtfct-spbtw">
			<h3><strong>Pull secret "{pullSecret.name}"</strong></h3>
			<div class="_dp-f">
				<button class="button -small -negative -tertiary" type="button" on:click={deleteItem}>Delete</button>
			</div>
		</div>
	</div>

	<hr>

	<div class="_dp-g _gg-16px _w-100pct _mxw-512px">
		<div class="field">
			<label for="input-name">Name</label>
			<div class="input">
				<input id="input-name" value={pullSecret.name} readonly disabled>
			</div>
		</div>
		<div class="field">
			<label for="input-location">Location</label>
			<div class="input">
				<input id="input-location" value={pullSecret.location} readonly disabled>
			</div>
		</div>
		<div class="field">
			<label for="input-server">Server</label>
			<div class="input -has-icon-right">
				<input id="input-server" value={pullSecret.spec.server} readonly disabled>
				<span class="_cl-text-mute _cl-white-hover _cs-pt _ussl-n _mgl-12px _fs-600 icon -is-right copy"
					data-clipboard-text={pullSecret.spec.server}>
					<i class="fa-light fa-copy"></i>
				</span>
			</div>
		</div>
		<div class="field">
			<label for="input-username">Username</label>
			<div class="input -has-icon-right">
				<input id="input-username" value={pullSecret.spec.username} readonly disabled>
				<span class="_cl-text-mute _cl-white-hover _cs-pt _ussl-n _mgl-12px _fs-600 icon -is-right copy"
					data-clipboard-text={pullSecret.spec.username}>
					<i class="fa-light fa-copy"></i>
				</span>
			</div>
		</div>
		<div class="field">
			<label for="input-password">Password</label>
			<div class="input -has-icon-right">
				<input id="input-password" type="password" value={pullSecret.spec.password} readonly disabled>
				<div class="icon -is-right">
					<span class="_cl-text-mute _cl-white-hover _cs-pt _ussl-n _fs-600 copy"
						data-clipboard-text={pullSecret.spec.password}>
						<i class="fa-light fa-copy"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
