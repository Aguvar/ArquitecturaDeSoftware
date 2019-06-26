class AirlinesService {
  constructor ({ airlinesRepositoryService }) {
    this.airlinesRepositoryService = airlinesRepositoryService
  }

  async getAll () {
    return this.airlinesRepositoryService.getAll()
  }
}

module.exports = AirlinesService
