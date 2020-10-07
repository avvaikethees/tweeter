$(document).ready(function() {
  // $('#tweet-text').blur(function () {
  //   console.log("This input field has lost its focus.")
  // })
 
  
  $('#tweet-text').on('input', (function() {
    let textInput = $(this).val()
    //console.log(140 - (textInput.length));

    $(".counter").text(140 - (textInput.length));

  }))
});

