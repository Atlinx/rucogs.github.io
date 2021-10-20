$( '.collapsible' ).on('click', function () {
    $(this).toggleClass("c_active");
    let content = $(this).next();
    if (content.attr('style')){
        content.attr('style', null);
    } else {
        content.attr('style', 'max-height: 144px;');
    }
});