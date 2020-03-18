const cp = require('child_process');
const path = require('path');

let wait = function(milliseconds) {
  return new Promise((resolve, reject) => {
    if (typeof(milliseconds) !== 'number') { 
      throw new Error('milleseconds not a number'); 
    }

    setTimeout(() => resolve("done!"), milliseconds)
  });
}

test('throws invalid number', async() => {
    await expect(wait('foo')).rejects.toThrow('milleseconds not a number');
});

test('wait 500 ms', async() => {
    const start = new Date();
    await wait(500);
    const end = new Date();
    var delta = Math.abs(end - start);
    expect(delta).toBeGreaterThan(450);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    const ip = path.join(__dirname, 'index.js');
    console.log(cp.execSync(`node ${ip}`).toString());
})