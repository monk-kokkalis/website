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
    }).call(this);
    
    var load = function() {
        for (let prop in this.App.scripts) {
            this.App.scripts[prop].call(App.scripts[prop]);
        }
    }

    var scroll = function() {
        this.App.scroll();
    }

    var click = function(event) {
        event.target.event_handler();   
    }

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('scroll', scroll);
    window.addEventListener('click', click);
}).call(this)

