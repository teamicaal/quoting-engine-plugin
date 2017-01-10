jQuery(function($) {

  $('[data-toggle="quoting-engine"]').click(function(event) {
    event.preventDefault();

    // Setup variables
    var modal = $('#quoting-engine-modal'),
        modalInst = $(modal).remodal();
        body = $(modal).find('.icaal__modal-body'),
        iframe = $(this).attr('data-iframe'),
        iframeElement = '<iframe id="icaal__quote-engine" src="' + iframe + '" width="100%" height="" frameborder="0">',
        redirectWidth = $(this).attr('data-redirect-width'),
        windowWidth = $(window).width();

    if( typeof redirectWidth == typeof undefined || redirectWidth == false ) {
      redirectWidth = 0;
    }

    // Check window width
    if( windowWidth >= redirectWidth || typeof redirectWidth == typeof undefined || redirectWidth == false ) {

      // Toggle modal
      modalInst.open();

      // Check if already loaded
      if( $(modal).data('engine') !== iframe ) {
        $(modal).data('engine', iframe);
        $(body).empty().append(iframeElement);
      }

    } else {

      window.open( iframe, '_blank' );

    }


  });

});