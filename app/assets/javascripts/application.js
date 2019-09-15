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
   
    var load = function() {
        for (let prop in this.App.scripts) {
            this.App.scripts[prop].call(App.scripts[prop]);
        }
    }

    var scroll = function() {
        this.App.scroll();
    }

    var click = function(event) {
        var link_target;
        var target = (function() {
            link_target = event.target.getAttribute('data-target');
            if (link_target) {
                event.preventDefault();
                return 'link';   
            }
            if (event.target.id == '') {
                var parent = event.target.parentElement;
                if(!parent) return undefined;
                return parent.id == '' ? undefined : parent.id
            }
            return event.target.id;
        }).call(this);
        
        if (target === undefined) return;
        switch(target) {
            case 'mobile-button':
                this.App.scripts.mobile_navigation.button_click();
                break;
            case 'link':
                if (!link_target) throw 'Link has no target'
                this.App.scripts.navigation.link(link_target);
                break;
        }
    }

    window.addEventListener('DOMContentLoaded', load);
    window.addEventListener('scroll', scroll);
    window.addEventListener('click', click);
}).call(this)

