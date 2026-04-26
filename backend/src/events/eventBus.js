class EventBus {
  constructor() {
    this.handlers = new Map()
  }

  on(eventName, handler) {
    const current = this.handlers.get(eventName) ?? []
    this.handlers.set(eventName, [...current, handler])
  }

  async emit(eventName, payload) {
    const handlers = this.handlers.get(eventName) ?? []
    for (const handler of handlers) {
      await handler(payload)
    }
  }
}

export const eventBus = new EventBus()
