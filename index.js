var $myCarousel = $('#examplesCarousel');

$myCarousel.on('slide.bs.carousel', function (e) {
  let incomingTitle = $('.example-title')[e.to];
  let incomingImage = $('.example-image')[e.to];
  let outgoingImage = $('.example-image')[e.from];
  let incomingCarouselItem = $('.carousel-item')[e.to];
  let outgoingBackground = $('.item-background')[e.from];  

  /* TRANSPARENT BACKGROUND */

  // hide the current background to prevent overlapping transparent space
  $(outgoingBackground).css('opacity', '0');

  // then put it back once it's off screen
  setTimeout(() => {
      $(outgoingBackground).css('opacity', '.7');
  }, 1500);

  /* EXPLODING TEXT */
      
  // hide all text except the outgoing text
  $('.carousel-item-text').each(function(index) {
    if (index == e.from) {
      $(this).css('opacity', '1');
    } else {
      $(this).css('opacity', '0');
    }
  });

  // after 500ms, hide all text except the incoming text
  setTimeout(function() {
    $('.carousel-item-text').each(function(index) {
      if (index == e.to) {
        $(this).css('opacity', '1');
      } else {
        $(this).css('opacity', '0');
      }
    });
  }, 500);

  // move summary text horizontally
  $('.summary').each(function() {
    $(this).transition({
      marginLeft: (e.from > e.to) ? "+=3000" : "-=3000"
    }, 600, function() {
      // then make (new) summary go back
      $(this).transition({
        marginLeft: (e.from > e.to) ? "-=3000" : "+=3000"
      }, 700, function() {
        // finished
      });
    });
  });

  // move technologies down
  $('.technologies').each(function() {
    $(this).transition({
      marginTop: "+=2000"
    },500, function() {
      // then make (new) technologies go back up
      $(this).transition({
        marginTop: "-=2000"
      }, 500, function() {
        // finished
      });
    });
  });

  /* FADING IMAGE AND TITLE */
  
  // fade in incoming title and image
  // these won't work unless I do a 1ms timeout... otherwise the carousel slide animation won't work
  setTimeout(function() {
    $(incomingTitle).css('opacity', '0');
    $(incomingTitle).transition({
      opacity: '1'
    },1500);
  }, 1);

  // not this one, it kind of looks good to have the image appear immediately.
  // setTimeout(function() {
  //   $(incomingImage).css('opacity', '0');
  //   $(incomingImage).transition({
  //     opacity: '1'
  //   },600);
  // }, 1);

  // because I have to do a 1ms timeout above, I have to hide the entire slide or it'll flash
  $(incomingCarouselItem).css('opacity', '0');
  setTimeout(() => {
    $(incomingCarouselItem).css('opacity', '1');
  }, 100);

  // fade out outgoing image
  setTimeout(function() {
    $(outgoingImage).transition({
      opacity: "0"
    },500, function() {
      // then restore opacity
      $(outgoingImage).css('opacity', '1');
    });
  }, 700);
});

// create the modal dialog
$('#aboutModal').modal();

let showModal = function() {
  $('#aboutModal').modal();
}
