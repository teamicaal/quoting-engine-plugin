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
    if( origin === 'https://app.quotingengine.co.uk' ) {
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
        $("#icaal__quote-engine").height(e.data);
      }
      
    }
  }
  window.addEventListener( 'message', quotingEngineMessage, false );
  
});