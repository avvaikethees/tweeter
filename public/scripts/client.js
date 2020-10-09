/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  //error function 
  const $error= $('.alert')
  const showError = function (errorMessage) {
    $error.slideDown ("fast");
    $error.css("display", "flex");
    $('.alert-message').html(errorMessage)
  }

  // function to render tweets
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
    const theTweetText = $("#tweet-text").val()

    if (theTweetText.length === 0) {
      showError("Hey! We can't do all the work for you. Tell us what you're thinking!")

    } else if (theTweetText.length > 140) {
      showError("Woah, calm down there Shakespeare... your message is too long")

    } else {
      $error.slideUp("slow");

      //function to sanitize form input 
      // const escape =  function(str) {
      //   let div = document.createElement('div');
      //   div.appendChild(document.createTextNode(str));
      //   return div.innerHTML;
      // }

      // console.log(theTweetText)
      // const safeText = escape(theTweetText);
      // console.log(safeText)
    

      //console.log($(this).serialize())
      $.ajax({
        method: "POST", 
        url: "/tweets/",
        //data: {"text": $("#tweet-text").val()} // same as below
        //data: {"text": safeText}
        data: $(this).serialize()
      })
    .then (function () {
      //console.log("sucessfully submitted!")

      //$("#tweet-form").reset() //<- this doesnt actually work because reset is not in jquery
      document.getElementById('tweet-form').reset()
      $(".counter").html(140)
      $(".tweets").empty()
      loadTweets();
    })
  }
  });

  const renderTweets = function (tweets) {
    //const reverseTweets = tweets.reverse();
    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('.tweets').prepend($tweetElement);
    } 
  }

  const createTweetElement = function (tweet) {
      const escape =  function(str) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      }

    return `<article>
    <header class="tweet-header">
      <div class="avatar-name">
        <div class="avatar">
          <img src= ${tweet.user.avatars}>
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
    ${escape(tweet.content.text)}
  </p>   
  <hr>
  <footer class="tweet-footer">
    <div>
      10 days ago
    </div>
    <div>
      &#127988 &#x2794 &#10084
    </div>
  </footer>

  </article>`
  }

  })