$(document).ready(function () {
  const textarea = $("#tweet-text");
  let countText = $("#counter");
  $(textarea).keyup(function (e) {
    counter = e.target.value.length;
    let counterNode = this.nextSibling.nextSibling.children[1];
    let counterHTML = counterNode.innerHTML;
    let count = parseInt(counterHTML);
    count -= 1;
    if (count < 0) {
      countText.addClass("red");
    }
    counterNode.innerHTML = count;
  });
});
