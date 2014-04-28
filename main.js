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
	$('#view-rotate').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-rotate');
	});
});

  // End Copied Code



  $(document).on('mousemove', function(e){

  	if(e.pageY > $(window).height()*.965){
  		$('.footer').css('visibility', 'visible');
  	}
  	else{
  		$('.footer').css('visibility', 'hidden');
  	}
  })
});