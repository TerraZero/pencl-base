const Assert = require('assert');

describe('Handler.js', () => {
  const Handler = require('../../src/Util/Handler');

  it('use an async handler for listener', async () => {
    const handler = new Handler();
    const data = {number: 0, sync: []};

    handler.on('test', async (bag) => {
      bag.number++;
      bag.sync.push('listener1');
    });

    handler.on(['cool', 'test'], async (bag) => {
      bag.number++;
      bag.sync.push('listener2');
    });

    handler.prepare((handler, events, args) => {
      args[0].number++;
      args[0].sync.push('prepare');
    });

    handler.done((handler, events, args) => {
      args[0].number++;
      args[0].sync.push('done');
    });

    await handler.emit('test', data);

    Assert.strict.equal(data.number, 4);
    Assert.strict.equal(data.sync.join('-'), 'prepare-listener1-listener2-done');
  });
});