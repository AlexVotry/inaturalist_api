(function() {
  'use strict';

  const board = document.getElementsByClassName('board')[0];
  const bar = document.getElementsByClassName('progress-bar')[0];
  const finish = document.getElementById('yea');
  const guesses = document.getElementById('guesses');
  const gotRight = document.getElementById('gotRight');

  var firstPick = function(event) {
    if (count < 1) {
      chosen = event.target;
      var num = chosen.id;
      var matchSquare = parseInt(num.match(/\d\d/g));

      if (chosen.src === question){
        chosen.src = images[matchSquare];
        first = chosen.src;
        count++;
      }
      return first;
    }
    secondPick(event);
  };

  var secondPick = function(event) {
    if (count === 1) {
      chosen2 = event.target;
      var num2 = chosen2.id;
      var matchSquare2 = parseInt(num2.match(/\d\d/g));

      if (chosen2.src === question){
        chosen2.src = images[matchSquare2];
        second = chosen2.src;
        count++;
        tries++;
        guesses.textContent = `You've made ${tries} guesses`;
      }
      else if (chosen2.src === einstein) {
        secondPick();
      }
    }
    setTimeout(function(){
      if (first === second) {
        chosen.src = einstein;
        chosen2.src = einstein;
        count = 0;
        success();
      }
      else {
        chosen.src = question;
        chosen2.src = question;
        count = 0;
      }
    }, 1000);
  };

  board.addEventListener('click', firstPick);
})();

var reset = function() {
  document.location.href = '';
};


var secondPick = function(index) {
  console.log('first: ', index);
  // var reset = [];
  // if (count === 1) {
      second = slides[index];
      // count++;
//       tries++;
//       guesses.textContent = `You've made ${tries} guesses`;
    // if (pic.id === gotIt.id) {
    //   secondPick();
    // }
console.log('second: ', second);
  // }
  // setTimeout(function(){
    // if (first.id === second.id) {
    //   first = gotIt[index];
    //   second = gotIt[index];
    //   count = 0;
    //
    //
    //   // success();
    // }
    // else {
      first = question;
      first.index = index;
      second = question;
      second.index = index;
      count = 0;
      // console.log('first:', first, 'second: ', second);
      return second;
    // }
  // }, 1000);
};
