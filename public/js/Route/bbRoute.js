'use strict';

(function(){
  window.App = {
  	Router: {},
    data: {},
    initialize: function() {
      this.data = new App.Router();
    }
  };
})();

App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
    'done': 'done'
	},

	index: function(){
		alert("Enter your name and click Pick Colors");
	},
	done: function(){
		alert("Game Over. Thanks for playing.");
	},

});

new App.Router();
Backbone.history.start();