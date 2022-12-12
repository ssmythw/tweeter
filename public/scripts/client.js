/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsContainer = document.getElementById("tweets-container");

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$("#my-form").submit((event) => {
  event.preventDefault();
  const tweetText = $("#tweet-text").serialize();
  let tweetTextVal = $("#tweet-text").val();
  tweetTextVal = $("<div>").text(tweetTextVal).html();
  $("#error").slideUp("slow", function () {});
  if (tweetTextVal.length > 140) {
    $("#error").append("<p>Tweet cannot be longer than 140 characters</p>");
  }

  if (!tweetTextVal) {
    $("#error").text("Tweet cannot be empty");
    $("#error").slideDown("slow", function () {});
  }

  $.ajax({
    url: `http://localhost:8080/tweets?${tweetText}`,
    type: "post",
    data: tweetText,
  })
    .then((result) => {
      const user = {
        user: {
          name: "Scott Smyth",
          avatars: "https://i.imgur.com/73hZDYK.png",
          handle: "@ssmy_39",
        },
        content: {
          text: tweetTextVal,
        },
        created_at: 1461116232227,
      };
      $("#tweet-text").val("");
      data.unshift(user);
      renderTweets(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const timePassed = (tweet) => {
  return timeago.format(tweet.created_at);
};

const loadTweets = () => {
  $.ajax({
    url: `http://localhost:8080/tweets`,
    type: "get",
    data: tweetText,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderTweets = function (tweets) {
  // loops through tweets
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

const createTweetElement = function (tweet) {
  let $tweet = $(`<article>
    <div class="tweet-header">
    <div class="name-image">
    <img src='${tweet.user.avatars}'></img>
        <span>
        ${tweet.user.name}
        </span>
   </div>
      <span>
        ${tweet.user.handle}
      </span>
    </div>
    <footer>
      <div>
        <span class="tweet">${tweet.content.text}</span>
      </div>
      <div class="footer-bottom">
        <span>10 days ago</span>
        <div class="icons">
          <i class="tweetItem fas fa-flag"></i>
          <i class="tweetItem fas fa-sync"></i>
          <i class="tweetItem fa-solid fa-heart"></i>
        </div>
      </div>
    </footer>
  </article>`); /* Your code for creating the tweet element */
  return $tweet;
};

renderTweets(data);
