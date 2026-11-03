import Events from '../Events.js';

function assert(desc, cond) {
    console[cond === true ? 'log' : 'error'](desc, cond);
}

const runs = {
    'event 1': 0,
    'event 2': 0,
    'event 2.namespaced': 0,
    'event 3': 0,
};

new Events([
    'event 1',
    'event 2',
    'event 2.namespaced',
    'event 3',
])
.on('event 1', data => {
    runs['event 1']++;
})
.on('event 2', data => {
    runs['event 2']++;
})
.on('event 2.namespaced', data => {
    runs['event 2.namespaced']++;
})
.trigger('event 1', {event: 1})
.trigger('event 2', {event: 2})
.trigger('event 2.namespaced', {event: '2.namespaced'})
.trigger('event 3', {event: 3});


console.log('NOTE: .trigger("event") (without namespace) executes namespaced events');
console.log('That\'s why "event 2.namespaced" ran twice');
console.log('');

assert(`event 1:            ${runs['event 1']} === 1`, runs['event 1'] === 1);
assert(`event 2:            ${runs['event 2']} === 1`, runs['event 2'] === 1);
assert(`event 2.namespaced: ${runs['event 2.namespaced']} === 2`, runs['event 2.namespaced'] === 2);
assert(`event 3:            ${runs['event 3']} === 0`, runs['event 3'] === 0);