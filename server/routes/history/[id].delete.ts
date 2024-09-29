import { historyService } from '~/server/services/historyService'

export default defineEventHandler(async (event) => {
  if (okProtectedEndpoint(event)) {
    const id = event.context.params.id
    return historyService.deleteOne(id)
  } else {
    return 'restricted'
  }
})
