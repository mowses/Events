What is Events?
--------------------------------------
Events is a script that you can bind async custom events into your javascript objects.


Dependencies
--------------------------------------
No dependencies


Usage
----------------------------

Include Events.js in your project:

```javascript
import Events from './Events.js';
```

Prototyping an object and defining its custom events

```javascript
Game.prototype = {
    events: new Events([
        'load game',
        'refresh game',
        'attack',
        'attacked'
    ])
};
```

No other events can be bind or triggered if not present in the array above.


Setting callbacks for the defined events:

```javascript
var game = new Game();

game.events
    .on(['load game', 'refresh game'], function() {
		console.log('game loaded or refreshed');
	})
	.on('attacked', function(say) {
		console.log(say);
	});
```

Triggering your custom events

```javascript
// attack order!
game.events.trigger('attack')

// triggering an invalid event
game.events.trigger('invalid event');  // will throw a console warning

// passing custom argument to event callback
game.events.trigger('attacked', 'Ouch, that hurts!')
```

