/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const loadTweets = function () {
    $.ajax('/tweets/', { 
      method: 'GET',
      dataType: 'json'
    })
    .then(function (data) {
      renderTweets(data)
    })
  }

  loadTweets();

  //When I submit a tweet it adds it to the server database
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
  //   console.log("sending tweets")
  //  console.log(event.target.text.value)
  //  console.log($(this).serialize())
    if ($("#tweet-text").val().length === 0) {
      alert ("Please enter a message before hitting submit")
    } else if ($("#tweet-text").val().length > 140) {
      alert("Your tweet is greater than 140 characters. Please try again")
    } else {
    $.ajax({
      method: "POST", 
      url: "/tweets/",
      //data: {"text": $("#tweet-text").val()} // same as below
      data: $(this).serialize()
    })
    .then (function () {
      console.log("sucessfully submitted!")
      $(".tweets").empty()
      //$("#tweet-form").reset() //<- this doesnt actually work because reset is not in jquery
      document.getElementById('tweet-form').reset()
      $(".counter").html(140)
      loadTweets();
    })
  }
  });


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

  })

// $( "#input-tweet" ).submit(function( event ) {
//   alert( "Handler for .submit() called." );
//   event.preventDefault();
// });

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]


//  "text": $("#tweet-text") < this is yøur THIS
    // .then(function (textField) {
    //   const textField = $('#tweet-text').val();
    //   console.log ('Succceess!!: ', textField);