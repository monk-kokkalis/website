// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
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

