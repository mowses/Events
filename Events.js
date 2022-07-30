function makeArray(obj) {
    if (Array.isArray(obj)) return obj;

    return [].slice.call([obj]);
}

const Events = function (supported_events) {
    let events = {};

    // add supported events
    [].forEach.call(makeArray(supported_events), function (event) {
        events[event] = {};
    });

    return {
        on: function (arr_events, callback) {
            let parent = this;

            arr_events = makeArray(arr_events);

            [].forEach.call(arr_events, function (event) {
                let event_parts = event.split('.'),
                    event_name = event_parts[0],
                    event_namespace = event_parts.slice(1).join('.');

                if (!events[event_name]) {
                    console.trace(parent, 'does not support "' + event_name + '" event.');
                } else {
                    if (!events[event_name][event_namespace]) {
                        events[event_name][event_namespace] = [];
                    }

                    events[event_name][event_namespace].push(callback);
                }
            });

            return parent;
        },

        once: function (arr_events, callback) {
            arr_events = makeArray(arr_events);

            let parent = this,
                // create a wrapper for 'on' method
                new_callback = function () {
                    callback.apply(this, arguments);

                    // remove new_callback from events
                    [].forEach.call(arr_events, function (event) {

                        let event_parts = event.split('.'),
                            event_name = event_parts[0],
                            event_namespace = event_parts.slice(1).join('.');

                        events[event_name][event_namespace] = events[event_name][event_namespace].filter(function (cb) {
                            return cb !== new_callback;
                        }, true);
                    });
                };

            this.on(arr_events, new_callback);

            return parent;
        },

        trigger: function (event, params) {
            let parent = this,
                event_parts = event.split('.'),
                event_name = event_parts[0],
                event_namespace = event_parts.slice(1).join('.'),
                callbacks;

            if (!events[event_name]) {
                console.warn(parent, 'does not support "' + event_name + '" event.');
                return parent;
            }

            if (!event_namespace) {
                // trigger all events with event_name because there is no namespace
                callbacks = (function (events) {
                    let callbacks = [];
                    Object.entries(events).forEach(([, items]) => {
                        [].forEach.call(items, function (callback) {
                            callbacks.push(callback);
                        });
                    });

                    return callbacks;

                })(events[event_name]);
            } else {
                callbacks = makeArray(events[event_name][event_namespace]);
            }

            [].forEach.call(callbacks, function (callback) {
                if (typeof callback !== 'function') return;

                callback.call(parent, params);
            });

            return parent;
        },

        remove: function (arr_events) {
            let parent = this;

            [].forEach.call(makeArray(arr_events), function (event) {

                let event_parts = event.split('.'),
                    event_name = event_parts[0],
                    event_namespace = event_parts.slice(1).join('.');

                if (!event_namespace) {
                    events[event_name] = {};
                } else {
                    events[event_name][event_namespace] = [];
                }

            });

            return parent;
        }
    };
};

export default Events;
