jQuery(function($) {

  // iframe height listener
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  eventer(messageEvent,function(e) {
    $("#icaal__quote-engine").height(e.data);
  },false);

  function quotingEngineMessage(event) {
    var message = event.data;
    var origin = event.origin;
    if( origin.includes('quotingengine.co.uk') || origin.includes('quoting-engine.co.uk')  ) {
      switch( message ) {
        case 'quoteStart':
          quoteStart();
        break;
        case 'quotePostcodeEnter':
          quotePostcodeEnter();
        break;
        case 'quoteComplete':
          quoteComplete();
        break;
      }

      if( message.hasOwnProperty('height') ) {
        $("#icaal__quote-engine").height(message.height);
      }
      
    }
  }
  window.addEventListener( 'message', quotingEngineMessage, false );
  
});
  
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