$(document).ready(function($) {
	$("<ul>").attr('id', 'myUl').appendTo($("#content"));
	for (var i = 0; i < 10; i++) {
		$("<li>").html(i).appendTo($("#myUl"));
	}
	$("<ul>").attr('id', 'myUl1').appendTo($("#content1"));
	for (var i = 0; i < 10; i++) {
		$("<li>").html(i).appendTo($("#myUl1"));
	}

	$.each($("#myUl li"), function(i, item) {
		$(item).click(function() {

			var $parent = $(this).parent();
			if($parent.attr('id') === 'myUl') {
				$(this).appendTo($("#myUl1"));
			} else {
				$(this).appendTo($("#myUl"));
			}
		});
	});

	// $.each($("#myUl1 li"), function(i, item) {
	// 	$(item).click(function() {

	// 		var $parent = $(this).parent();
	// 		if($parent.attr('id') === 'myUl') {
	// 			$(this).appendTo($("#myUl1"));
	// 		} else {
	// 			$(this).appendTo($("#myUl"));
	// 		}
	// 	});
	// });
});