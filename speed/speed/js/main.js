(function ($) {
 "use strict";
	
/*--------------------------
preloader
---------------------------- */	
    var pre_load = $(window);
    pre_load.on("load",function() {
        var pre_loader = $('#preloader')
        pre_loader.fadeOut('slow',function(){$(this).remove();});
    });	
    
/*---------------------
  venobox
--------------------- */
    var veno_box = $('.venobox');
    veno_box.venobox();
	
/*---------------------
 TOP Menu Stick
--------------------- */
	var s = $("#sticker");
	var pos = s.position();					   
	$(window).on('scroll', function() {
		var windowpos = $(window).scrollTop();
		if (windowpos > pos.top) {
		s.addClass("stick");
		} else {
			s.removeClass("stick");	
		}
	});


/*----------------------------
 Scrollspy js
------------------------------ */
	var Body = $('body');
	Body.scrollspy({
		target: '.navbar-collapse',
		offset: 80
	});
    
/*----------------------------
Page Scroll
------------------------------ */
    var page_scroll = $('a.page-scroll');
	page_scroll.on('click', function(event) {
		var $anchor = $(this);
		  $('html, body').stop().animate({
			  scrollTop: $($anchor.attr('href')).offset().top - 55
			}, 1000, 'easeInOutExpo');
		event.preventDefault();
	}); 
/*----------------------------
 Menu hide
------------------------------ */
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    }); 
/*----------------------------
 Counter js active
------------------------------ */
    var count = $('.counter');
    count.counterUp({
		delay: 40,
		time: 3000
	});
/*--------------------------
 collapse
---------------------------- */
    var panel_test = $('.panel-heading a');
    panel_test.on('click', function(){
        panel_test.removeClass('active');
        $(this).addClass('active');
    });
/*---------------------
 wow .js
--------------------- */
    new WOW().init();


/*--------------------------
 scrollUp
---------------------------- */
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
    
/*---------------------
 Main Slider carousel
---------------------*/
    var main_slide = $('.main-slider');
    main_slide.owlCarousel({
        loop:true,
        nav:true,
        dots:false,   
        autoplay:false,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
/*---------------------
 Testimonial carousel
---------------------*/
    var test_carousel = $('.testimonial-carousel');
    test_carousel.owlCarousel({
        loop:true,
        nav:false,
        dots:true,
        autoplay:false,
        margin:30,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
/*---------------------
 Gallery carousel
---------------------*/
	var gallery = $('.gallery-carousel');
	    gallery.owlCarousel({
		loop:true,
		nav:false,
		dots:true,
        center: true,
        autoWidth:true,
        margin:20,    
		autoplay:false,
		responsive:{
			0:{
				items:1,
			},
			768:{
				items:3
			},
			1000:{
				items:4
			}
		}
	});
/*--------------------------
 Parallax
---------------------------- */	
    var parallaxeffect = $(window);
    parallaxeffect.stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalScrolling: false
    });

/*--------------------------
 MagnificPopup
---------------------------- */	
    $('.video-play').magnificPopup({
        type: 'iframe'
    });

	
/*----------------------------
    Contact form
------------------------------ */
	$("#contactForm").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			formError();
			submitMSG(false, "Did you fill in the form properly?");
		} else {
			event.preventDefault();
			submitForm();
		}
	});
	function submitForm(){
		var name = $("#name").val();
		var email = $("#email").val();
		var msg_subject = $("#msg_subject").val();


		$.ajax({
			type: "POST",
			url: "assets/contact.php",
			data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject,
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					formError();
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$("#contactForm")[0].reset();
		submitMSG(true, "Message Submitted!")
	}

	function formError(){
		$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center tada animated text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

})(jQuery); 