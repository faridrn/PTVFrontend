$(function() {
    $(".header-menu .search > a").click(function(e) {
	$(this).next().toggle(300);
	e.preventDefault();
    });
});