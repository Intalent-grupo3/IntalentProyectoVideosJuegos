/**

* @jest-environment jsdom

*/

let i = 0;

test('y no es mayor del alto del canvas ni menor al tamaño de los obstaculos', () => {
    while (i++ < 1000) {
        let tests = require('./obstaculosT');
        expect(tests()).toBeGreaterThan(0);
        expect(tests()).toBeLessThan(440);
    }
});
