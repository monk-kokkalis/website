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

    }).call(this);

    (function init() {
        HTMLElement.prototype.event_handler = function() {
            var controller = this.dataset.controller;
            var handler = this.dataset.handler;
            if (!controller || !handler) return;
            if (!App.scripts[controller][handler]) throw 'the '+ handler + 
                ' handler' + 'does not exist in the ' + controller + ' controller';
            App.scripts[controller][handler](this);
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
    }).call(this);
    
    var load = function() {
        for (let prop in this.App.scripts) {
            this.App.scripts[prop].call(App.scripts[prop]);
        }
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

    var touchend = function(event) {
        if (event.cancelable) {
            if (App.global_variables.overlay_visible) event.preventDefault();
        }
    }

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('scroll', scroll);
    window.addEventListener('click', click);
    window.addEventListener('resize', resize);
    window.addEventListener('touchend', touchend)
}).call(this)

