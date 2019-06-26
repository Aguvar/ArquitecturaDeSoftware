class AirlinesService {
  async getAll () {
    return this.airlinesRepositoryService.getAll()
  }
}

module.exports = AirlinesService
