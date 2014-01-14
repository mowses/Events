[jQuery](http://jquery.com/) - jQEvents
=====================================

What is jQEvents?
--------------------------------------
jQEvents is a script that you can bind async custom events into your javascript objects.


Dependencies
--------------------------------------
jQuery 1.x


Usage
----------------------------

Include jQEvents.js in your project:

```bash
<script type="text/javascript" src="js/libraries/jQEvents/jQEvents.js"></script>
```

Prototyping an object and defining its custom events

```bash
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

```bash
var game = new Game();

game.events.on(['load game', 'refresh game'], function() {
		console.log('game loaded or refreshed');
	})
	.on('attacked', function() {
		console.log('Im hit!');
	});
```

Triggering your custom events

```bash
game.events
// attack order!
.trigger('attack')

// triggering an invalid event
.trigger('invalid event');  // will throw a console warning
```