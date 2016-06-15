'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/* eslint-disable no-console */

$(init);
// var play;
  var colorElements = [0, 0, 0, 0];

  function init() {
    document.getElementsByClassName('colors')[0].style.visibility = 'hidden';
    var saveButton = document.getElementById('save');
    saveButton.addEventListener('click', saveItem);
  }

  function submitColors() {
    var play = new Games({});

    var view = new View({ model: play });
    var total = new totalView({ model: play });
    var boxView = new Box0View({ model: play });
    var boxView = new Box1View({ model: play });
    var boxView = new Box2View({ model: play });
    var boxView = new Box3View({ model: play });
    var curGame = play.create(player.attributes);
    console.log(curGame);
  }
 
