(function($) {

  var icaal__modals = [],
      getCurrent = function() {
        return icaal__modals.length ? icaal__modals[icaal__modals.length - 1] : null;
      },
      selectCurrent = function() {
        var i,
            selected = false;
        for (i=icaal__modals.length-1; i>=0; i--) {
          if (icaal__modals[i].$blocker) {
            icaal__modals[i].$blocker.toggleClass('current',!selected).toggleClass('behind',selected);
            selected = true;
          }
        }
      };

  $.icaal__modal = function(el, options) {
    var remove, target;
    this.$body = $('body');
    this.options = $.extend({}, $.icaal__modal.defaults, options);
    this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
    this.$blocker = null;
    if (this.options.closeExisting)
      while ($.icaal__modal.isActive())
        $.icaal__modal.close(); // Close any open icaal__modals.
    icaal__modals.push(this);
    if (el.is('a')) {
      target = el.attr('href');
      //Select element by id from href
      if (/^#/.test(target)) {
        this.$elm = $(target);
        if (this.$elm.length !== 1) return null;
        this.$body.append(this.$elm);
        this.open();
      //AJAX
      } else {
        this.$elm = $('<div>');
        this.$body.append(this.$elm);
        remove = function(event, icaal__modal) { icaal__modal.elm.remove(); };
        this.showSpinner();
        el.trigger($.icaal__modal.AJAX_SEND);
        $.get(target).done(function(html) {
          if (!$.icaal__modal.isActive()) return;
          el.trigger($.icaal__modal.AJAX_SUCCESS);
          var current = getCurrent();
          current.$elm.empty().append(html).on($.icaal__modal.CLOSE, remove);
          current.hideSpinner();
          current.open();
          el.trigger($.icaal__modal.AJAX_COMPLETE);
        }).fail(function() {
          el.trigger($.icaal__modal.AJAX_FAIL);
          var current = getCurrent();
          current.hideSpinner();
          icaal__modals.pop(); // remove expected icaal__modal from the list
          el.trigger($.icaal__modal.AJAX_COMPLETE);
        });
      }
    } else {
      this.$elm = el;
      this.$body.append(this.$elm);
      this.open();
    }
  };

  $.icaal__modal.prototype = {
    constructor: $.icaal__modal,

    open: function() {
      var m = this;
      this.block();
      if(this.options.doFade) {
        setTimeout(function() {
          m.show();
        }, this.options.fadeDuration * this.options.fadeDelay);
      } else {
        this.show();
      }
      $(document).off('keydown.icaal__modal').on('keydown.icaal__modal', function(event) {
        var current = getCurrent();
        if (event.which == 27 && current.options.escapeClose) current.close();
      });
      if (this.options.clickClose)
        this.$blocker.click(function(e) {
          if (e.target==this)
            $.icaal__modal.close();
        });
    },

    close: function() {
      icaal__modals.pop();
      this.unblock();
      this.hide();
      if (!$.icaal__modal.isActive())
        $(document).off('keydown.icaal__modal');
    },

    block: function() {
      this.$elm.trigger($.icaal__modal.BEFORE_BLOCK, [this._ctx()]);
      this.$body.css('overflow','hidden');
      this.$blocker = $('<div class="jquery-icaal__modal blocker current"></div>').appendTo(this.$body);
      selectCurrent();
      if(this.options.doFade) {
        this.$blocker.css('opacity',0).animate({opacity: 1}, this.options.fadeDuration);
      }
      this.$elm.trigger($.icaal__modal.BLOCK, [this._ctx()]);
    },

    unblock: function(now) {
      if (!now && this.options.doFade)
        this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this,true));
      else {
        this.$blocker.children().appendTo(this.$body);
        this.$blocker.remove();
        this.$blocker = null;
        selectCurrent();
        if (!$.icaal__modal.isActive())
          this.$body.css('overflow','');
      }
    },

    show: function() {
      this.$elm.trigger($.icaal__modal.BEFORE_OPEN, [this._ctx()]);
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-icaal__modal" rel="icaal__modal:close" class="close-icaal__modal ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
        this.$elm.append(this.closeButton);
      }
      this.$elm.addClass(this.options.icaal__modalClass).appendTo(this.$blocker);
      if(this.options.doFade) {
        this.$elm.css('opacity',0).show().animate({opacity: 1}, this.options.fadeDuration);
      } else {
        this.$elm.show();
      }
      this.$elm.trigger($.icaal__modal.OPEN, [this._ctx()]);
    },

    hide: function() {
      this.$elm.trigger($.icaal__modal.BEFORE_CLOSE, [this._ctx()]);
      if (this.closeButton) this.closeButton.remove();
      var _this = this;
      if(this.options.doFade) {
        this.$elm.fadeOut(this.options.fadeDuration, function () {
          _this.$elm.trigger($.icaal__modal.AFTER_CLOSE, [_this._ctx()]);
        });
      } else {
        this.$elm.hide(0, function () {
          _this.$elm.trigger($.icaal__modal.AFTER_CLOSE, [_this._ctx()]);
        });
      }
      this.$elm.trigger($.icaal__modal.CLOSE, [this._ctx()]);
    },

    showSpinner: function() {
      if (!this.options.showSpinner) return;
      this.spinner = this.spinner || $('<div class="' + this.options.icaal__modalClass + '-spinner"></div>')
        .append(this.options.spinnerHtml);
      this.$body.append(this.spinner);
      this.spinner.show();
    },

    hideSpinner: function() {
      if (this.spinner) this.spinner.remove();
    },

    //Return context for custom events
    _ctx: function() {
      return { elm: this.$elm, $blocker: this.$blocker, options: this.options };
    }
  };

  $.icaal__modal.close = function(event) {
    if (!$.icaal__modal.isActive()) return;
    if (event) event.preventDefault();
    var current = getCurrent();
    current.close();
    return current.$elm;
  };

  // Returns if there currently is an active icaal__modal
  $.icaal__modal.isActive = function () {
    return icaal__modals.length > 0;
  }

  $.icaal__modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    closeText: 'Close',
    closeClass: '',
    icaal__modalClass: "icaal__modal",
    spinnerHtml: null,
    showSpinner: true,
    showClose: true,
    fadeDuration: null,   // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0        // Point during the overlay's fade-in that the icaal__modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Event constants
  $.icaal__modal.BEFORE_BLOCK = 'icaal__modal:before-block';
  $.icaal__modal.BLOCK = 'icaal__modal:block';
  $.icaal__modal.BEFORE_OPEN = 'icaal__modal:before-open';
  $.icaal__modal.OPEN = 'icaal__modal:open';
  $.icaal__modal.BEFORE_CLOSE = 'icaal__modal:before-close';
  $.icaal__modal.CLOSE = 'icaal__modal:close';
  $.icaal__modal.AFTER_CLOSE = 'icaal__modal:after-close';
  $.icaal__modal.AJAX_SEND = 'icaal__modal:ajax:send';
  $.icaal__modal.AJAX_SUCCESS = 'icaal__modal:ajax:success';
  $.icaal__modal.AJAX_FAIL = 'icaal__modal:ajax:fail';
  $.icaal__modal.AJAX_COMPLETE = 'icaal__modal:ajax:complete';

  $.fn.icaal__modal = function(options){
    if (this.length === 1) {
      new $.icaal__modal(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="icaal__modal:close" to, well, close the icaal__modal.
  $(document).on('click.icaal__modal', 'a[rel="icaal__modal:close"]', $.icaal__modal.close);
  $(document).on('click.icaal__modal', 'a[rel="icaal__modal:open"]', function(event) {
    event.preventDefault();
    $(this).icaal__modal();
  });
})(jQuery);