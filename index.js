var carousel = $('#examples-carousel');

carousel.on('slide.bs.carousel', function (e) {
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

  // there's a bug with this where if you move the carousel and then move it again in the opposite direction before
  // the movement is complete, you can get stuck with some small amount of extra margin on the text, it's some problem
  // with the code below.

  // maybe it can be fixed by just making the margins go back to zero instead of these "+- a certain number"

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
  // these won't work unless I do a timeout... otherwise the carousel slide animation doesn't work
  setTimeout(function() {
   $(incomingTitle).css('opacity', '0');
   $(incomingTitle).transition({
     opacity: '1'
   },1600);
 }, 400);

  setTimeout(function() {
    $(incomingImage).css('opacity', '0');
    $(incomingImage).transition({
      opacity: '1'
    },1600);
  }, 400);

  // because I have to do a timeout above, I have to hide the entire slide during this time or it'll flash
  $(incomingCarouselItem).css('opacity', '0');
  setTimeout(() => {
   $(incomingCarouselItem).css('opacity', '1');
 }, 410);

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

/* MODAL */

let showModal = function() {
  $('#about-modal').modal();

  // this also only works with a timeout?
  setTimeout(() => {
    $('#modal-close-button').focus();
  }, 50);
}

// show on page load
showModal();

/* ENABLE A SPECIFIC CAROUSEL SLIDE BASED ON URL */

function goToSlide(number) {
  setTimeout(() => {
    $("#examples-carousel").carousel(number);
  },200);
}
var url = window.location.href;
var slide = url.substring(url.lastIndexOf('?')+1); // 4
slide = parseInt(slide);
goToSlide(slide);
