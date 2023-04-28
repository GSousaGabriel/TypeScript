
export function AutoBindDecorator(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalCall = descriptor.value
    const newCall: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalCall.bind(this)
            return boundFn
        }
    }
    return newCall
}