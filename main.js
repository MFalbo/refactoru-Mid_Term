$(document).on('ready', function() {

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

	// Open/Close Book event handlers

	// Open/close book with button
	$('#open-book').click(function(){
		if ( book.attr('class') != 'open-book') {
			$(this).addClass('cur').siblings().removeClass('cur');
			book.removeClass().addClass('open-book');
		}else{
			$(this).removeClass('cur');
			$('#view-cover').addClass('cur');
			book.removeClass().addClass('view-cover');
		}
	});

	// Open book by clicking cover
	$(document).on('click', '.book-cover', function(){
		if ( book.attr('class') != 'open-book') {
			$('#open-book').addClass('cur').siblings().removeClass('cur');
			book.removeClass().addClass('open-book');
		}else{
			$('#open-book').removeClass('cur');
			$('#view-cover').addClass('cur');
			book.removeClass().addClass('view-cover');
		}
	});

	// Close book by clicking inside of front cover
	$(document).on('click', '.book-cover-back', function(){
		if ( book.attr('class') != 'open-book') {
			$('#open-book').addClass('cur').siblings().removeClass('cur');
			book.removeClass().addClass('open-book');
		}else{
			$('#open-book').removeClass('cur');
			$('#view-cover').addClass('cur');
			book.removeClass().addClass('view-cover');
		}
	});

	// Flip page on when clicked on
	$(document).on('click', '.book-page', function(){
		
		$(this).addClass('page-flip');
		// $('.book-page-back').addClass('page-flip');
	
	});

// Rotate book 360 degrees when button is clicked
$('#view-rotate').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-rotate');
	});
});

  // End Copied Code


// Pop-up footer event handler
 $(document).on('mousemove', function(e){
  	if(e.pageY > $(window).height()*.95){
  		$('.footer').css('visibility', 'visible');
  	}
  	else{
  		$('.footer').css('visibility', 'hidden');
  	}
  });


// Pop-up sidebars.  Sizing and placement, especially in collapsed states needs work
  $(document).on('mousemove', function(e){

  	if((e.pageX > $(window).width()*.90) && (e.pageY < $(window).height()*.95)){
  		$('.right').css('visibility', 'visible');
  	}
  	else if((e.pageX < $(window).width()*.1) && (e.pageY < $(window).height()*.95)){
  		$('.left').css('visibility', 'visible');
  	}
  	else{
  		$('.left, .right').css('visibility', 'hidden');
  	}
  });





});






















