$(function () {
    // Search collapse
    $(".header-menu .search > a").click(function (e) {
        var $search = $(this).next();
        $search.animate({width: 260, padding: 5}, function () {
            $search.find("input").focus();
        });
        $search.on('focusout', "input", function () {
            $search.animate({width: 0, padding: '5px 0'});
        });
        e.preventDefault();
    });
});