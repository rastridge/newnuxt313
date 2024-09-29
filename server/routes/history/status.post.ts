import { historyService } from '~/server/services/historyService'

export default defineEventHandler(async (event) => {
  if (okProtectedEndpoint(event)) {
    const body = await readBody(event)
    return historyService.changeStatus(body)
  } else {
    return 'restricted'
  }
})
