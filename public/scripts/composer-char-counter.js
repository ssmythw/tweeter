$(document).ready(function () {
  // --- our code goes here ---

  let elementsArray = document.querySelectorAll(".tweetItem");
  elementsArray.forEach((item) => {
    $(item).mouseover(function () {
      item.style.color = "gold";
    });
    $(item).mouseout(function () {
      item.style.color = "rgb(83, 80, 74)";
    });
  });

  const textarea = document.getElementById("tweet-text");
  $(textarea).keyup(function (e) {
    counter = e.target.value.length;
    let counterNode = this.nextSibling.nextSibling.children[1];
    let counterHTML = counterNode.innerHTML;
    let count = parseInt(counterHTML);
    count -= 1;
    if (count < 0) {
      counterNode.style.color = "red";
    }
    counterNode.innerHTML = count;
  });
});
