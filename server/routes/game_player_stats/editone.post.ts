import { statsService } from '~/server/services/statsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return statsService.editOne(body)
	} else {
		return 'restricted'
	}
})
