//= require _app
//= require_tree .

(function(){
    'use strict';
    (function init() {
        HTMLElement.prototype.event_handler = function() {
            var controller = this.dataset.controller;
            var handler = this.dataset.handler;
            if (!controller || !handler) return;
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

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('scroll', scroll);
    window.addEventListener('click', click);
    window.addEventListener('resize', resize);
}).call(this)

