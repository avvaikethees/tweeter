$(document).ready(function() {
  $('#tweet-text').on('input', (function() {
    let textInput = $(this).val();
    //console.log(140 - (textInput.length));
    if (textInput.length < 140) {
      $(".counter").css("color", "black").text(140 - (textInput.length));
    } else if (textInput.length >= 140) {
      $(".counter").css("color", "red").text(140 - (textInput.length));
    }
  }));
});

