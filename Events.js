(function () {

    'use strict';

    function makeArray(obj) {
        if (Array.isArray(obj)) return obj;

        return [].slice.call([obj]);
    }

    function Events(supported_events) {
        var self = this,
            events = {}
        ;

        // add supported events
        [].forEach.call(makeArray(supported_events), function (event) {
            events[event] = {};
        });

        return {
            on: function (arr_events, callback) {
                var parent = this,
                    arr_events = makeArray(arr_events);

                [].forEach.call(arr_events, function (event, i) {
                    var event_parts = event.split('.'),
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
                var parent = this,
                    arr_events = makeArray(arr_events),

                    // create a wrapper for 'on' method
                    new_callback = function () {
                        callback.apply(this, arguments);

                        // remove new_callback from events
                        [].forEach.call(arr_events, function (event, i) {

                            var event_parts = event.split('.'),
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
                var parent = this,
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
                        var callbacks = [];
                        Object.entries(events).forEach(([namespace, items]) => {
                            [].forEach.call(items, function (callback, i) {
                                callbacks.push(callback);
                            });
                        });

                        return callbacks;

                    })(events[event_name]);
                } else {
                    callbacks = makeArray(events[event_name][event_namespace]);
                }

                [].forEach.call(callbacks, function (callback, i) {
                    if (typeof callback !== 'function') return;

                    callback.call(parent, params);
                });

                return parent;
            },

            remove: function (arr_events) {
                var parent = this;

                [].forEach.call(makeArray(arr_events), function (event, i) {

                    var event_parts = event.split('.'),
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
    }

    // Node: Export function
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Events;
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Events;
        });
    }
    // Browser: Expose to window
    else {
        window.Events = Events;
    }

})();
