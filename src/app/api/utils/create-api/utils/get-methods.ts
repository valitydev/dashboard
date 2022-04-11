export function getMethods(klass: new (...args: unknown[]) => unknown, instance: unknown) {
    return Object.getOwnPropertyNames(klass.prototype).filter(
        (name) => typeof instance[name] === 'function' && name !== 'constructor'
    );
}
