jQuery(function($) {

  $('[data-toggle="quoting-engine"]').click(function() {


    // Setup variables
    var modal = $('#quoting-engine-modal'),
        iframe = $(this).attr('data-iframe'),
        redirectWidth = $(this).attr('data-redirect-width');

    // Toggle modal
    $(modal).icaal__modal('toggle');

  });

});