import { historyService } from '~/server/services/historyService'

export default defineEventHandler((event) => {
  return historyService.getAllCurrent()
})
