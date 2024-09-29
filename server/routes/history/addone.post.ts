import { historyService } from '~/server/services/historyService'

export default defineEventHandler(async (event) => {
  if (okProtectedEndpoint(event)) {
    const body = await readBody(event)
    return historyService.addOne(body)
  } else {
    return 'restricted'
  }
})
