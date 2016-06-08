$(document).ready(function() {
	var el = document.getElementById("range");
	var pRange = new Powerange(el, { min: 1, max: 1000, start: 1 });
	el.onchange = function() {

		$("#area").text(el.value);
		$("#count").text(el.value * 2);
	}

	$('.btn-popup').fancybox();

	$('.input.phone').mask("+7 (999) 999-99-99");

	$('form').ajaxForm({
		url: "mail.php",
		beforeSubmit: function(data, $form) {
			var $name = $form.find(".name"),
				$phone = $form.find(".phone");
			
			printValid($name);
			printValid($phone);

			if( ! (valid($name) && valid($phone)) ) {
			$.fancybox.open('#success');

				return false;
			}
		},

		success: function(responseText, statusText, xhr, $form) {
			$form.trigger('reset');
			$form.find('.phone').removeClass('has-success has-warning');
			$form.find('.name').removeClass('has-success has-warning');

			$.fancybox.open('#success');
			
		}

	});
});

$(function () { // run this code on page load (AKA DOM load)

	var scroll_timer;
	var displayed = false;
	var $message = $('#message');
	var $window = $(window);
	var top = $(document.body).children(0).position().top + 150;

	if($window.scrollTop() <= top) 
	{
		displayed = false;
		$message.fadeOut(500);
	}
	else if(displayed == false) 
	{
		displayed = true;
		$message.stop(true, true).fadeIn(500).click(function () { $message.fadeOut(500); });
	}


	$window.scroll(function () {
		window.clearTimeout(scroll_timer);
		scroll_timer = window.setTimeout(function () { 
			if($window.scrollTop() <= top) 
			{
				displayed = false;
				$message.fadeOut(500);
			}
			else if(displayed == false) 
			{
				displayed = true;
				$message.stop(true, true).fadeIn(500).click(function () { $message.fadeOut(500); });
			}
		}, 100);
	});

	$('#top-link').click(function(e) {
		//e.preventDefault();
		$('html, body').animate({ scrollTop: 0 });
		return false;
	});
});

$(".input.phone, .input.name").change(function() {
	printValid($(this));
});

function printValid($input) {

if(valid($input)) {
	$input.removeClass("has-warning");
	$input.addClass("has-success");
} else {
	$input.removeClass("has-success");
	$input.addClass("has-warning");
}
}


function valid ($input) {
	if($input.val().length > 2) {
		return true;
	}

	return false;
}