What is Events?
--------------------------------------
Events is a script that you can bind and trigger custom events into your javascript objects.


Dependencies
--------------------------------------
No dependencies


Usage
----------------------------

Include Events.js in your project:

```javascript
import Events from '@mowses/Events';
```

Defining an object and its custom events:

```javascript
const Game = function ()
{
    this.events = new Events([
        'load game',
        'refresh game',
        'attack',
        'attacked'
    ]);
}
```

No other events can be bound or triggered if not present in the array above.


Setting callbacks for the defined events:

```javascript
var game = new Game();

game.events
    .on(['load game', 'refresh game'], function () {
		console.log('game loaded or refreshed');
	})
    .on('attack', function (enemy, damage) {
        enemy.hp -= damage;
    })
	.on('attacked', function(attacker) {
		notification.send(`You have been attacked by ${attacker.name}`);
	});
```

Triggering your events:

```javascript
// example of triggering an invalid event
game.events.trigger('invalid event');  // will throw a console warning

// passing custom argument to event callback
game.events.trigger('attack', enemy, 50);

game.events.trigger('attacked', enemy);
```

