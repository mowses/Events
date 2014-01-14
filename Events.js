; var Events = (function($) {

    function Events(supported_events) {
        var self = this,
            events = {};

        // add supported events
        $.each($.makeArray(supported_events), function(i, event) {
            events[event] = [];
        });

        return {
            on: function(arr_events, callback) {
                var parent = this,
                    arr_events = $.makeArray(arr_events);

                $.each(arr_events, function(i, event) {
                    if(!events[event]) {
                        console.warn(parent, 'does not support "' + event + '" event.');
                    } else {
                        events[event].push(callback);
                    }
                });

                return parent;
            },

            trigger: function(event, params) {
                var parent = this;

                if(!events[event]) {
                    console.warn(parent, 'does not support "' + event + '" event.');
                } else {

                    $.each(events[event], function(i, callback) {
                        if(! $.isFunction(callback)) return;

                        callback.call(parent, params);
                    });
                }

                return parent;
            }
        };
    }

    return Events;
})(jQuery);