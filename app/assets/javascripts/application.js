//= require _app
//= require_tree .

(function(){
    'use strict';
    (function load_pollyfills() {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector ||
                                        Element.prototype.webkitMatchesSelector;
        }

        if (!Element.prototype.closest) {
            Element.prototype.closest = function(selector) {
                var element = this;

                do {
                    if (element.matches(selector)) return element;
                    element = element.parentElement || element.parentNode;
                } while (element !== null && element.nodeType === 1);
                return null;
            };
        }

        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function(predicate) {
                    if (typeof predicate !== 'function') {
                        throw TypeError('the predicate is not a function');
                    }
                    
                    var array_length = this.length >>> 0;
                    var index = 0;
                    var thisArg = arguments[1];
            
                    while (index < array_length) {
                        if (predicate.call(thisArg, this[index], index, this)) {
                            return this[index];
                        }
                        index += 1;
                    }
                    return undefined;
                },
                configurable: true,
                writable: true
            });
        }

        if (!Array.prototype.findIndex) {
            Object.defineProperty(Array.prototype, 'findIndex', {
                value: function(predicate) {
                    if (typeof predicate !== 'function') {
                        throw TypeError('the predicate is not a function');
                    }
                    
                    var array_length = this.length >>> 0;
                    var index = 0;
                    var thisArg = arguments[1];
            
                    while (index < array_length) {
                        if (predicate.call(thisArg, this[index], index, this)) {
                            return index;
                        }
                        index += 1;
                    }
                    return undefined;
                },
                configurable: true,
                writable: true
            });
        }

    }).call(this);

    (function init() {
        HTMLElement.prototype.event_handler = function() {
            var controller = this.dataset.controller;
            var handler = this.dataset.handler;
            if (!controller || !handler) return;
            if (!App.scripts[controller][handler]) throw 'the '+ handler + 
                ' handler' + 'does not exist in the ' + controller + ' controller';
            App.scripts[controller][handler].call(this);
        }
        NodeList.prototype.each_element = function(predicate) {
            Array.prototype.forEach.call(this, predicate);
        }
        NodeList.prototype.map_elements = function(predicate) {
            return Array.prototype.map.call(this, function(element) {
                return {
                    passed: predicate(element),
                    element: element
                }
            });
        }
        NodeList.prototype.find_index = function(predicate) {
            return Array.prototype.findIndex.call(this, predicate);
        };

        NodeList.prototype.find_element = function(predicate) {
            return Array.prototype.find.call(this, predicate);
        }
    }).call(this);
    
    var load = function() {
        for (let prop in this.App.scripts) {
            if (App.scripts.hasOwnProperty(prop)) {
                this.App.scripts[prop].call(App.scripts[prop]);
            }
        }
        this.App.subscriptions();
    }

    var click = function(event) {
        event.target.event_handler();   
    }

    var resize = function() {
        this.App.resize();
    };

    var scroll = function() {
        this.App.scroll();
    }

    var touchmove = function(event) {
        if (event.cancelable) {
            if (App.global_variables.overlay_visible) event.preventDefault();
        }
    }

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('scroll', scroll);
    window.addEventListener('click', click);
    window.addEventListener('resize', resize);
    window.addEventListener('touchmove', touchmove)
}).call(this)

