const sayHello = require('./app');

test('returns Hello, World!', () => {
    expect(sayHello()).toBe('Hello, World!');
});