'use strict';

var Player = Backbone.Model.extend({
  initialize: function () {
  console.log('Player created');
},
  asString: function () {
    return JSON.stringify(this.toJSON());
  }
});
  var player = new Player({
    name: '',
    highScore: '0'
});
  var ColorGame = Backbone.Model.extend({
    initialize: function () {
    console.log("ColorGame Model initialized.");
},
    asString: function () {
      return JSON.stringify(this.toJSON());
    }
});