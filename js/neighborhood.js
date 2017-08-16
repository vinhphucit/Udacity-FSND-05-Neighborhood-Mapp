function toggleMenu() {
    var windowWidth = $(window).width();
    if ($(favouriteId).css('display') === 'none') {
        if (windowWidth > 768) {
            $(favouriteId).attr('class','favourite-item-container favourite-item-container-responsive');
        }else{
            $(favouriteId).attr('class','favourite-item-container favourite-item-container-responsive-show');
        }
    } else {
        if (windowWidth > 768) {
            $(favouriteId).attr('class','favourite-item-container favourite-item-container-responsive-hide');
        }else{
            $(favouriteId).attr('class','favourite-item-container favourite-item-container-responsive');
        }
    }
}