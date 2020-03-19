export default class LotusClientRPC {
  constructor (provider, { schema }) {
    this.provider = provider
    this.schema = schema
    return new Proxy(this, {
      get: (obj, prop) => {
        // console.log('Jim proxy', obj, prop)
        if (prop in obj) {
          return obj[prop]
        } else {
          const method = prop.charAt(0).toUpperCase() + prop.slice(1)
          const schemaMethod = schema.methods[method]
          if (schemaMethod) {
            return this.callSchemaMethod.bind(this, method, schemaMethod)
          } 
        }
      }
    })
  }

  async callSchemaMethod (method, schemaMethod, ...args) {
    console.log('Jim callSchemaMethod', method, schemaMethod, args)
    await this.provider.connect()
    const request = {
      method: `Filecoin.${method}`
    }
    if (schemaMethod.subscription) {
      const cb = args[0]
      request.params = args.slice(1)
      return this.provider.sendSubscription(request, cb)
    } else {
      request.params = args
      return await this.provider.send(request)
    }
  }

  close () {
    // console.log('Jim rpc close')
    this.provider.close()
  }
}