$(document).ready(function () {
  const textarea = $("#tweet-text");
  let countText = $("#counter");
  $(textarea).keyup(function (e) {
    if (140 - textarea.val().length < 0) {
      countText.css("color", "red");
    }
    if (140 - textarea.val().length > 0) {
      countText.css("color", "black");
    }
    countText.text(140 - textarea.val().length);
  });
});
