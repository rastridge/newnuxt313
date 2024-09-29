import { historyService } from '~/server/services/historyService'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  return historyService.getOne(id)
})
