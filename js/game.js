const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  //DONE - 05.08.2020 N.D.
  //new comment
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  //done - 07.08.2020 N.D.
  let elemTarget = $(".target");
  elemTarget.html("");
  elemTarget.toggleClass("target");
  let divSelector = randomDivId();
  console.log("Hit %d - divSelector %s", hits, divSelector);
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  //done - 07.08.2020 N.D.
  $(".target").html(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime
  //DONE - 05.08.2020 N.D.
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  //done - 07.08.2020 NND
  $(".field-wrapper").toggleClass("endhidden");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
