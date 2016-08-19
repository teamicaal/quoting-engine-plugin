<div class="icaal__modal fade" id="quoting-engine-modal" tabindex="-1" role="dialog" aria-labelledby="quoting-engine-modal-label" aria-hidden="true">
  <div class="icaal__modal-dialog" role="document">
    <div class="icaal__modal-content">
      <div class="icaal__modal-body">
        ...
      </div>
      <div class="icaal__modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="icaal__modal">Close</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  
  function quoteStart() {

    if( typeof ga == 'function' ) {
      ga( 'send', 'event', 'Quoting Engine', 'Start Quote' );
    }

    if( typeof __gaTracker == 'function' ) {
      __gaTracker( 'send', 'event', 'Quoting Engine', 'Start Quote' );
    }

  }

  function quotePostcodeEnter() {

    if( typeof ga == 'function' ) {
      ga( 'send', 'event', 'Quoting Engine', 'Enter Postcode' );
    }

    if( typeof __gaTracker == 'function' ) {
      __gaTracker( 'send', 'event', 'Quoting Engine', 'Enter Postcode' );
    }

  }

  function quoteComplete() {

    if( typeof ga == 'function' ) {
      ga( 'send', 'event', 'Quoting Engine', 'Complete Quote' );
    }

    if( typeof __gaTracker == 'function' ) {
      __gaTracker( 'send', 'event', 'Quoting Engine', 'Complete Quote' );
    }

  }

</script>