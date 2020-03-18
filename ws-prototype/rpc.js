export default class LotusClientRPC {
  constructor (provider, { schema }) {
    this.provider = provider
    this.schema = schema
  }

  async actorAddress () {
    await this.provider.connect()
    const request = {
      method: 'Filecoin.ActorAddress',
      params: []
    }
    return await this.provider.send(request)
  }

  close () {
    console.log('Jim rpc close')
    this.provider.close()
  }
}