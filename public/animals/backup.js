(function() {
  'use strict';

  const board = document.getElementsByClassName('board')[0];
  const bar = document.getElementsByClassName('progress-bar')[0];
  const finish = document.getElementById('yea');
  const guesses = document.getElementById('guesses');
  const gotRight = document.getElementById('gotRight');
  const sleep = 'https://s-media-cache-ak0.pinimg.com/564x/fe/c4/2c/fec42c5f96c6157f4f68e1d65af2b045.jpg';
  const pissing = 'http://cdn.xl.thumbs.canstockphoto.com/canstock1585698.jpg';
  const knife = 'http://quotesnhumor.com/wp-content/uploads/2015/09/Top-40-Humorous-Quotes-Funniest-jokes.jpg';
  const didIt = 'http://www.onefortraining.org/sites/default/files/YouDidIt.png';
  const ninja = 'http://img.izismile.com/img/img4/20110407/640/humorous_signology_640_02.jpg';
  const motorcycle = 'http://2.bp.blogspot.com/-I-qJIOvCWEo/U2Nz4wWHjrI/AAAAAAAAlVY/ODbABCFO_6s/s1600/Vintage+Humorous+Photos+(1).jpg';
  const lol = 'http://thumb1.shutterstock.com/display_pic_with_logo/2892448/305952458/stock-vector-lol-the-man-laughs-humor-reaction-joker-retro-style-305952458.jpg';
  const ski = 'http://www.ctmcm.com/humor/navyski.jpg';
  const photo = 'http://funny-pics.co/wp-content/uploads/Humorous-caricatures.jpg';
  const einstein = 'http://cdn.phys.org/newman/csz/news/800/2015/thehumorousp.jpg';
  const question = 'http://gogaytours.com/wp-content/uploads/2013/04/questionmark.png';
  var images = [sleep, pissing, knife, ninja, motorcycle, lol, ski, photo, sleep, pissing, knife, ninja, motorcycle, lol, ski, photo];
  let count = 0;
  let compconste = 0;
  let nailedIt = 0;
  let tries = 0;
  let first = '';
  let second = '';
  var chosen;
  var chosen2;

  var success = function() {
    compconste += 12.5;
    nailedIt ++;
    bar.style.width = `${compconste}%`;
    bar.textContent = `${compconste}%`;
    gotRight.textContent = `You got ${nailedIt} right!`;
    if (compconste === 100) {
      finish.src = didIt;
    }
  };

  var shuffle = function(array) {
    var currentIndex = array.length;
    var temp;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    };
    return array;
  };
  shuffle(images);

  var makeBoard = function() {
    for (var i = 0; i < 16; i++) {
      var squares = document.createElement('img');
      var j;

      squares.className = 'col-sm-3 squares';
      squares.src = question;
      if (i < 10) {
        j = `0${i}`;
      }
      else {
        j = i;
      }
      squares.setAttribute('id', `sq${j}`);
      board.appendChild(squares);
    }
  };
  makeBoard();

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
