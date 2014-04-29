// Class Constructors
var Book = function(title, author, genre){
	this.title = title;
	this.author = author;
	this.genre = genre;
}

var bookArray = [];

// Create new instances of books
var theLorax = new Book('The Lorax', 'Dr. Seuss', 'Children');
var alexander = new Book('Alexander and the Terrible, Horrible, No Good, Very Bad Day', 'Judith Viorst', 'Children');
var borrowers = new Book('The Borrowers', 'Mary Norton', 'Children');
var catHat = new Book('The Cat in the Hat', 'Dr. Seuss', 'Children');
var charlotte = new Book('Charlotte\'s Web', 'E.B. White', 'Children');
var corduroy = new Book('Corduroy', 'Don Freeman', 'Children');
var frogToad = new Book('Frog and Toad Are Friends', 'Arnold Lobel', 'Children');
var goodnightMoon = new Book('Goodnight Moon', 'Margaret Wise Brown', 'Children');
var phantomTollbooth = new Book('The Phantom Tollbooth', 'Norton Juster', 'Children');
var pippiLongstocking = new Book('Pippi Longstocking', 'Astrid Lindgren', 'Children');
var ferdinand = new Book('The Story of Ferdinand', 'Munro Leaf', 'Children');
var hungryCaterpillar = new Book('The Very Hungry Caterpillar', 'Eric Carle', 'Children');
var wildThings = new Book('Where the Wild Things Are', 'Maurice Sendak', 'Children');
var pooh = new Book('Winnie-the-Pooh', 'A.A. Milne', 'Children');

// push books to array
bookArray.push(theLorax);
bookArray.push(alexander);
bookArray.push(borrowers);
bookArray.push(catHat);
bookArray.push(charlotte);
bookArray.push(corduroy);
bookArray.push(frogToad);
bookArray.push(goodnightMoon);
bookArray.push(phantomTollbooth);
bookArray.push(pippiLongstocking);
bookArray.push(ferdinand);
bookArray.push(hungryCaterpillar);
bookArray.push(wildThings);
bookArray.push(pooh);



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
			$('.main').find('.book-page.page-flip').removeClass('page-flip');
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

	// Go to previous page, or close book by clicking inside of front cover
	// Not ideal, but functional for now
	$(document).on('click', '.book-cover-back', function(){

			if(($('.main').find('.book-page.page-flip')).length === 0){
				if ( book.attr('class') != 'open-book') {
					$('#open-book').addClass('cur').siblings().removeClass('cur');
					book.removeClass().addClass('open-book');
				}
				else{
					$('#open-book').removeClass('cur');
					$('#view-cover').addClass('cur');
					book.removeClass().addClass('view-cover');
				}
			}

			$('.main').find('.book-page.page-flip:first').removeClass('page-flip')
			.next().children('.book-page-back').css('visibility', 'visible');
	});

	// Flip page when clicked on
	$(document).on('click', '.book-page', function(){
		
		$(this).addClass('page-flip');
		$(this).find('.book-page-back').addClass('visible-back-page').css('visibility', 'visible');
		$(this).siblings().find('.book-page-back').css('visibility', 'hidden');
	
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

  // display search results in a modal
  var searchModal = function(arr){
	  	$('.modal-body').empty();


	  	// for(var i=0; i<arr.length; i++){
	  	// 	for(var key in arr[i]){
	  	// 		var prop = $('<h2>' + arr[i][key] + '</h2>');
	  	// 		$('.modal-body').append(prop);
	  	// 	}
	  	// }
	  	arr.map(function(obj){
	  		for(var key in obj){
	  			var prop = $('<h4>' + key.toUpperCase() + ': <a href="#">' + obj[key] + '</a></h4>');
	  			$('.modal-body').append(prop);
	  		}
	  	});

  	};

  

  $(document).on('submit', '#search-bar', function(){
  	// console.log('submitted');
  	var searchArray = [];
  	for(var i=0; i < bookArray.length; i++){
  		// console.log($(this).find('#search-field').val().toLowerCase());
  		// console.log(bookArray[i]);
  		for(var key in bookArray[i]){
  			// console.log(bookArray[i][key]);
  			if(bookArray[i][key].toLowerCase() === $(this).find('#search-field').val().toLowerCase()){
  				searchArray.push(bookArray[i]);
  				// console.log(bookArray[i]);
  			}

  		} 
  	}
	searchModal(searchArray);
	$(this).find('#search-field').val('');
	$('#myModal').modal('show');
	
  	return false;
  });





});






















