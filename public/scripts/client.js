/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  const renderTweets = function (tweets) {
    //loops through tweets - takes in an array of tweet objects
    //calls createTweetElement for each tweet
    //takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('.container').append($tweetElement);
    } 
  }

  const createTweetElement = function (tweet) {
    const $tweet = $(`      <section class="tweets">
    <article>
      <header class="tweet-header">
        <div class="avatar-name">
          <div class="avatar">
            <img src= "https://i.imgur.com/73hZDYK.png" alt="Avatar of old man">
          </div>
          <div class="tweet-name">
            ${tweet.user.name}
          </div>
        </div>
       
      <div class="tweet-handle">
          ${tweet.user.handle}
        </div>
    </header>

    <p class="tweet">
      ${tweet.content.text}
    </p>   
    <hr>
    <footer class="tweet-footer">
      <div>
        ${tweet["created_at"]}
      </div>
      <div>
        &#127988 &#x2794 &#10084
      </div>
    </footer>

    </article>
  </section>`)
    return $tweet;
  }

  renderTweets(data)

// const $tweet = createTweetElement(tweetData);
// console.log("this is $tweet: ", $tweet)
// $('.container').append($tweet);

});

