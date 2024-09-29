import { historyService } from '~/server/services/historyService'

export default defineEventHandler((event) => {
  if (okProtectedEndpoint(event)) {
    return historyService.getAll()
  } else {
    return 'restricted'
  }
})
