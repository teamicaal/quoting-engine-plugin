jQuery(function($) {

  // iframe height listener
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  eventer(messageEvent,function(e) {
    document.getElementById("icaal__quote-engine").height = e.data;
  },false);

  function quotingEngineMessage(event) {
    var message = event.data;
    var origin = event.origin;
    if( origin === 'https://app.quotingengine.co.uk' ) {
      switch( message ) {
        case 'quoteStart':
          console.log('Quote Started');
        break;
        case 'quotePostcodeEnter':
          console.log('Quote Postcode Entered');
        break;
        case 'quoteComplete':
          console.log('Quote Completed');
        break;
      }
    }
  }
  window.addEventListener( 'message', quotingEngineMessage, false );
  
});