$(document).ready(function() {

        // Scroll functions
        var scrolled = false;
        var scrollPos;

        $(window).scroll(function() {
            scrolled = true;
        });

        setInterval(function() {
            if (scrolled) {
                scrolled = false;
                scrollPos = $(window).scrollTop();
                progressTracker(scrollPos);
                suchScroll();
                if (scrollPos >= (navPos.top + 12)) {
                    $('.header__nav').addClass('fixed');
                }
                else {
                    $('.header__nav').removeClass('fixed');
                }
            }
        }, 10);


        var navPos = $('.header__nav').offset();

        function suchScroll() {
            $('[data-js="suchScroll"]').each(function() {
                var scrollObj = $(this); // assigning the object
                var fadeScreen = $(this).find('.fade-screen');

                // Set background y-position
                var yPos = (scrollPos / (100 / scrollObj.data('speed'))); 

                // Set screen alpha
                var alpha = (scrollPos / (scrollObj.height() * 1.5));
                 
                // Put together our final background position
                var coords = '50% '+ yPos + 'px';

                // Move the background
                scrollObj.css({ backgroundPosition: coords });

                // Fade out
                fadeScreen.css('opacity' , alpha);
            }); 
        }


        var sectionPositions = []; 
        var sectionIDs = []; 
        var currentSection;
        $('.layer').each(function() {
          sectionPositions.push(($(this).offset().top) - 65); 
          sectionIDs.push($(this).attr('id'));
        });

        function progressTracker(scrollPos) {
          for (i = 0; i <= sectionPositions.length; i++) {
            if (scrollPos >= sectionPositions[i]) {
              currentSection = sectionIDs[i];
            }
          }
          $('.header__nav nav a').removeClass('-current');
          $('a[href="#' + currentSection + '"]').addClass('-current');
          console.log(currentSection);
        }

        
        $('.header__nav nav a').click(function() {
            var target = $(this.hash);
            $('html,body').animate({
              scrollTop: (target.offset().top - 64)
            }, 500);
            return false;
        });

    
        // Update position variables on resize
        $(window).resize(function() {
            navPos = $('.header__nav').offset(); 
            $('.layer').each(function() {
              sectionPositions.push(($(this).offset().top) - 70); 
              sectionIDs.push($(this).attr('id'));
            });
        });

    });