var $myCarousel = $('#examplesCarousel');

$myCarousel.on('slide.bs.carousel', function (e) {

  // hide the current background to prevent overlapping transparent space
  $('.item-background').each(function(index) {
    if (index == e.from) {
      $(this).css('opacity', '0');
    } else {
      $(this).css('opacity', '.7');
    }
  });

  // hide all text except the outgoing text
  $('.carousel-item-text').each(function(index) {
    if (index == e.from) {
      $(this).css('opacity', '1');
    } else {
      $(this).css('opacity', '0');
    }
  });

  // // hide the incoming image
  // $('.exampleImage').each(function(index) {
  //   if (index == e.to) {
  //     $(this).css('opacity', '0');
  //   } else {
  //     $(this).css('opacity', '1');
  //   }
  // });

  // hide the incoming title
  $('.exampleTitle').each(function(index) {
    if (index == e.to) {
      $(this).css('opacity', '0');
    } else {
      $(this).css('opacity', '1');
    }
  });

  // after 500ms, hide everything except the incoming text
  setTimeout(function() {
    $('.carousel-item-text').each(function(index) {
      if (index == e.to) {
        $(this).css('opacity', '1');
      } else {
        $(this).css('opacity', '0');
      }
    });
  }, 500);
  
  // // after 1 second, show the incoming image
  // setTimeout(function() {
  //   $('.exampleImage').each(function(index) {
  //     if (index == e.to) {
  //       $(this).css('opacity', '1');
  //     } else {
  //       // $(this).css('opacity', '0');
  //     }
  //   });
  // }, 500);

  // after 500ms show the incoming title
  setTimeout(function() {
    $('.exampleTitle').each(function(index) {
      if (index == e.to) {
        $(this).css('opacity', '1');
      } else {
        // $(this).css('opacity', '0');
      }
    });
  }, 500);

  // move summary horizontally
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

  // fade out outgoing image
  setTimeout(function() {
    $('.exampleImage').each(function(index) {
      if (index == e.from) {
        $(this).transition({
          opacity: "0"
        },500, function() {
          // then restore opacity
          $(this).css('opacity', '1');
        });
      }
    });
  }, 700)
});
