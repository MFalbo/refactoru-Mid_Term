// --------------------------------------------------------Class Constructors
var Book = function(title, author, genre){
	this.title = title;
	this.author = author;
	this.genre = genre;
}

// --------------------------------------------------------Data Construction
// Initialize empty book array
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

// ----------------------------------Audio track and function construction------------------------

//Construct 'Wads' of desired audio tracks 
var track1 = new Wad({source: '/Title.wav', env:{hold: 1000, release: 0}});
var track2 = new Wad({source: '/Page_1.wav', env:{hold: 1000, release: 0}});
var track3 = new Wad({source: '/Page_2&3.wav', env:{hold:1000, release: 0}});
var track4 = new Wad({source: '/Page_4&5.wav', env:{hold:1000, release: 0}});

// create and array of all audio tracks
var audioArray = [track1, track2, track3, track4];

// Play audio track function
var playAudio = function(track){
	stopAudio();
	if(typeof track !== "undefined"){
		track.play({wait: 0.5});
	}
};

// Stop audio track function
var stopAudio = function(){
	for(var i=0; i<audioArray.length; i++){
		if(audioArray[i].gain){
			audioArray[i].stop();
		}
	}
};


// --------------------------------------All jQuery DOM construction and event handlers-------------------------
$(document).on('ready', function() {

	var book = $('#book');

	// Reset all pages to original position.  Called whenever the book is closed.
	var unflipPages = function(){
		$('.main').find('.book-page.page-flip').removeClass('page-flip');
			book.removeClass().addClass('view-cover');
	};

  	// View Front Cover by clicking button
	$('#view-cover').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		unflipPages();
		stopAudio();
		book.removeClass().addClass('view-cover');
	});

    // View Back Cover by clicking button
	$('#view-back').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		unflipPages();
		book.removeClass().addClass('view-back');
		stopAudio();
	});

// Open/Close Book event handlers

	// Open/close book with button
	$('#open-book').click(function(){
		if ( book.attr('class') != 'open-book') {
			$(this).addClass('cur').siblings().removeClass('cur');
			book.removeClass().addClass('open-book');
		}
		else{
			$(this).removeClass('cur');
			$('#view-cover').addClass('cur');
			unflipPages();
			stopAudio();
		}
	});

	// Open book by clicking cover
	$(document).on('click', '.book-cover', function(){
		$('#open-book').addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('open-book');

		// Call audio track to be played
		playAudio(audioArray[1]);
	});

	// Go to previous page, or close book by clicking inside of front cover
	// Not ideal, but functional for now
	$(document).on('click', '.book-cover-back', function(){

		// Determine if there are no currently flipped pages, and if so, close book cover
		if(($('.main').find('.book-page.page-flip')).length === 0){
			$('#open-book').removeClass('cur');
			$('#view-cover').addClass('cur');
			book.removeClass().addClass('view-cover');
		}

		// Retrieve value of page's data-id attribute and convert it to a number to correlate with pages track index in audioArray
		var curTrack = +$('.main').find('.book-page.page-flip:first').attr('data-id');
		// Call audio track to be played
		playAudio(audioArray[curTrack]);

		// Locate previous page and remove 'page-flip' class in order to reset page to un-flipped position
		$('.main').find('.book-page.page-flip:first').removeClass('page-flip')
		.next().children('.book-page-back').css('visibility', 'visible');
	});

	// Flip page when clicked on
	$(document).on('click', '.book-page', function(){
		
		$(this).addClass('page-flip');
		$(this).find('.book-page-back').addClass('visible-back-page').css('visibility', 'visible');
		$(this).siblings().find('.book-page-back').css('visibility', 'hidden');

		// Retrieve value of page's data-id attribute and convert it to a number to correlate with pages track index in audioArray
		var curTrack = +$(this).attr('data-id');
		
		// Call audio track to be played
		playAudio(audioArray[curTrack+1]);
		
	});

	// Rotate book 360 degrees when button is clicked
	$('#view-rotate').click(function(){
		unflipPages();
		stopAudio();
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-rotate');
	});

	$('#play-title').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		book.removeClass().addClass('view-cover');

		// Call audio track to be played
		playAudio(audioArray[0]);

	});

	// Pop-up footer event handler.  NEEDS TO BE IMPROVED WHEN PAGE IS IN COLLAPSED STATE, perhaps with a media query
	$(document).on('mousemove', function(e){
	  	if($(window).width() < 768){
		  	$('.footer').css('visibility', 'visible');
	  	}
		else if(e.pageY > $(window).height()*.95){
	  		$('.footer').css('visibility', 'visible');
	  	}
	  	else{
	  		$('.footer').css('visibility', 'hidden');
	  	}
	});

	// Pop-up sidebars.  Sizing and placement, especially in collapsed states needs work
	$(document).on('mousemove', function(e){

	  	if((e.pageX > $(window).width()*.87) && (e.pageY < $(window).height()*.95)){
	  		$('.right').css('visibility', 'visible');
	  	}
	  	// else if((e.pageX < $(window).width()*.15) && (e.pageY < $(window).height()*.95)){
	  	// 	$('.left').css('visibility', 'visible');
	  	// }
	  	else{
	  		$('.left, .right').css('visibility', 'hidden');
	  	}
	});

	// search function
	var search = function(criteria){
		var searchArray = [];
	  	for(var i=0; i < bookArray.length; i++){
	  		for(var key in bookArray[i]){
	  			if(bookArray[i][key].toLowerCase() === criteria.toLowerCase()){
	  				searchArray.push(bookArray[i]);
	  			}
	  		} 
	  	}
	  	return searchArray;
	};

	// display search results in a modal.   ROOM FOR DISPLAY IMPROVEMENTS
	var searchModal = function(arr){
	  	$('.modal-body').empty();
	  			var bookNum = 1;
	  	arr.map(function(obj){
	  		var bookNumDisp = $('<h4 class="bg-info"><a class="search-title" href="#">' + obj['title'] + '</a></h4>');
	  		$('.modal-body').append(bookNumDisp);
	  		for(var key in obj){
	  			if(key !== 'title'){
		  			var prop = $('<h5 class="bg-warning">' + key.toUpperCase() + ': <a class="search-criteria" href="#">' + obj[key] + '</a></h5>');
		  			$('.modal-body').append(prop);
	  			}
	  		}
	  		bookNum++;
	  	});
  	};

  	// Search through 'database' of books using search bar and display results in a modal box
	$(document).on('submit', '#search-bar', function(){
	  	var criteria = $(this).find('#search-field').val()
	  	var results = search(criteria);
		searchModal(results);
		$(this).find('#search-field').val('');
		$('#myModal').modal('show');

	  	return false;
	});

	// Do new search based off of clicked data in original search modal box
	$(document).on('click','.search-criteria', function(){
		var newCriteria = $(this).text();
		var results = search(newCriteria);
		searchModal(results);
		$('#myModal').modal('show');

	});

	// Thumbnail Scrollbar Code
	var pos = 0;
	var interval;	
	// Thumbnail Scroll Bar Event Handlers.

	// Scroll thumbnails down and stop when top thumbnail is at position 0
	$('#scroll-up').on('mouseenter', function(){
		
		interval = setInterval(function(){
			if(pos >= 0){
				clearInterval(interval);	
			}
			else{
				$('.shifting-container').css('top', pos + 'px');
				pos+=2;
			}
		}, 10);
	});

	// Stop Scrolling when mouse is no longer hovering over up arrow
	$('#scroll-up').on('mouseleave', function(){
		clearInterval(interval);	
	});

	// Scroll thumbnails up and stop when the bottom of the shifting-container is at the middle of the thumbnail container
	$('#scroll-down').on('mouseenter', function(){
		var bottomLimit = $('.shifting-container').height() - ($('#thumbnail-container').height()/2);
		
		interval = setInterval(function(){
			if(pos <= -bottomLimit){
				clearInterval(interval);	
			}
			else{
				$('.shifting-container').css('top', pos + 'px');
				pos-=2;
			}
		}, 10);
	});

	// Stop Scrolling when mouse is no longer hovering over down arrow
	$('#scroll-down').on('mouseleave', function(){
		clearInterval(interval);	
	});
});




// TO DO
// Change search so that when a displayed book title is selected it brings the user to the page of that book
// Improve the formatting of displayed search results
// Add inside back cover
















