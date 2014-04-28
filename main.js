$(document).on('ready', function() {

	// Set initial height of main content
	// var view = $(window).height() - /*$('.header').height() * 2*/130;
	// $('.center,.left,.right').height(view);
	// console.log($(window).height());
	// console.log($('.header').height());
	// console.log($('.footer').height());

	// // Reset height of main content whenever the window is resized
	// $(window).on('resize', function(){
	// 	var view = $(window).height() - /*$('.header').height() * 2*/135;
	// 	$('.center,.left,.right').height(view);
	// });

  



  // Start Copied Code
  $(function(){
	var book = $('#book');
	$('#view-cover').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-cover');
	});
	$('#view-back').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-back');
	});
	$('#open-book').click(function(){
		if ( book.attr('class') !='open-book') {
			$(this).addClass('cur').siblings().removeClass('cur');
			book.removeClass().addClass('open-book');
		}else{
			$(this).removeClass('cur');
			$('#view-cover').addClass('cur');
			book.removeClass().addClass('view-cover');
		}
	});
	$('#view-rotate').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-rotate');
	});
});

  // End Copied Code
});