//Searchs closest parent elements
!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


// Modals


// Modal Opening
var body = document.querySelector(".body"),
	modalBtn = document.querySelectorAll(".js-open-modal"),
	modalCloseBtn = document.querySelectorAll(".modal__close");


modalBtn.forEach( function(button) {
	button.addEventListener("click", function(event) {
		event.preventDefault();
		var modalId = this.getAttribute('data-modal'),
    		modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
		modalElem.style.display = "flex";
		body.classList.add("no-scroll");
		$('[data-slider="slider"]').slick('setPosition');
	});
}); 


// Modal Closing
modalCloseBtn.forEach( function(closeBtn) {
	closeBtn.addEventListener("click", function(event) {
		event.preventDefault();
		this.closest('.modal').style.display = "none";
		body.classList.remove("no-scroll");
	});
});

window.onclick = function(event) {
	var modal = document.querySelectorAll(".modal");

	modal.forEach( function(modalItem) {
		if (event.target == modalItem) {
			modalItem.style.display = "none";
    		body.classList.remove("no-scroll");
		};
	});  
};

/* Slider: kenwheeler.github.io/slick 
=====================================*/
$('[data-slider="slider"]').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
});

$('#slickPrev').on('click', function(event) {
	event.preventDefault();

	let currentSlider = $(this).parents(".modal").find('[data-slider="slider"]');

	currentSlider.slick("slickPrev");
});
$('#slickNext').on('click', function(event) {
	event.preventDefault();
	
	let currentSlider = $(this).parents(".modal").find('[data-slider="slider"]');

	currentSlider.slick("slickNext");
});
