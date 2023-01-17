/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function TimePassed
// Calculates the time since a tweet was posted.
// Input: none; Output: Time passed since the tweet was posted in string format

const timePassed = (time) => {
  return timeago.format(time);
};

// Function loadTweets
// Makes an ajax call to the backend server for the curernt tweets.
// Input: none; Output: result tweet data from the sevrer

const loadTweets = () => {
  $.ajax({
    url: `/tweets`,
    type: "get",
    data: null,
  })
    .then((result) => {
      renderTweets(result.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function renderTweets
// Renders a tweet element to the screen. Use the function createTweetElement in order to create the necessary data.
// Input: tweets object; Output: appended tweet items to page using jquery.

const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};

// Function createTweetElement
// Creates a new tweet element using the data from the tweet element that is passed in.
// Input: tweet object; Output: html markup for the tweet.

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
      <div class="newTweetContainer">
        <span class="newTweet">${tweet.content.text}</span>
      </div>
      <div class="footer-bottom">
        <span>${timePassed(tweet.created_at)}</span>
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

const tweetsContainer = $("#tweets-container");
const data = [];
loadTweets();

$("#my-form").submit((event) => {
  event.preventDefault();
  const tweetText = $("#tweet-text").serialize();
  let tweetTextVal = $("#tweet-text").val();
  tweetTextVal = $("<div>").text(tweetTextVal).html();
  $("#error").slideUp("slow", function () {});
  if (parseInt(tweetTextVal.length) > 140) {
    $("#error").text("Tweet cannot be longer than 140 characters");
    $("#error").slideDown("slow", function () {});
  } else if (!tweetTextVal) {
    $("#error").text("Tweet cannot be empty");
    $("#error").slideDown("slow", function () {});
  } else {
    $.ajax({
      url: `/tweets?${tweetText}`,
      type: "post",
      data: tweetText,
    })
      .then((result) => {
        console.log("here");
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
