import { redirect, error } from '@sveltejs/kit'
import api from '$lib/api'

/** @type {import('./$types').Load} */
export async function load ({ url, parent, fetch }) {
	const { project } = await parent()
	const location = url.searchParams.get('location')
	const name = url.searchParams.get('name')

	const [locationData, workloadIdentity] = await Promise.all([
		api.invoke('location.get', { project, id: location }, fetch),
		api.invoke('workloadIdentity.get', { project, location, name }, fetch)
	])

	if (!locationData.ok || !workloadIdentity.ok) {
		if (locationData.error?.notFound || workloadIdentity.error?.notFound) {
			throw redirect(302, `/workload-identity?project=${project}`)
		}
		throw error(500, `location: ${location.error?.message}, workloadIdentity: ${workloadIdentity.error?.message}`)
	}
	return {
		// location: locationData.result,
		name,
		workloadIdentity: workloadIdentity.result
	}
}
