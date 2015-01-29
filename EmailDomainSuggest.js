/**
 * Email domain suggest module
 *
 * singleton class
 */
var EmailDomainSuggest = EmailDomainSuggest || (function() {
  'use strict';
  // datalist tag id
  var DOMAIN_LIST_ID = 'domain_list';
  // email domain list
  var DOMAIN_LIST = [
    'yahoo.com',
    'gmail.com',
    'google.com',
    'hotmail.com',
    'me.com',
    'aol.com',
    'mac.com',
    'live.com',
    'comcast.com',
    'googlemail.com',
    'msn.com',
    'hotmail.co.uk',
    'yahoo.co.uk',
    'facebook.com',
    'verizon.net',
    'att.net',
    'gmz.com',
    'mail.com'
  ];
  // input @-mark = true
  var IS_ATMARK_PRESS = false;

  // instance manager
  var instance = null;

  // email input form
  var $el = null;
  // datalist form
  var $datalist = null;
  // option form
  var $option = null;
  // input event last window.event data
  var lastEventData = null;

  /**
   * initialize and constructor
   *
   * @param {HTMLElement} el email element
   * @param {Object} options
   */
  function init(el, options) {
    if (options !== undefined) {
      DOMAIN_LIST_ID = (options.datalistId != null) ? options.datalistId : DOMAIN_LIST_ID;
    }
    el.setAttribute('list', DOMAIN_LIST_ID);
    $el = el;
    $datalist = document.createElement('datalist');
    $datalist.id = DOMAIN_LIST_ID;

    lastEventData = null;

    /**
     * email domain autocomplete
     *
     * @method private
     */
    function suggest() {
      if (!IS_ATMARK_PRESS) return;

      var inputMail = lastEventData.target.value;
      lastEventData = null;
      var valueList = inputMail.split('@');
      if ($option == null) addDataList(valueList);
    }

    /**
     * add domain list datalist
     * add to the under the input form.
     *
     * @method private
     * @param {Array} val [user-input, domain]
     */
    function addDataList(val) {
      var newDomainList = sliceDomainList(val);
      for (var i = 0, len = newDomainList.length; i < len; i++) {
        $option = document.createElement('option');
        $option.value = val[0] + '@' + DOMAIN_LIST[i];
        $datalist.appendChild($option);
      }
      $el.appendChild($datalist);
    }

    /**
     * re-create domain list
     *
     * @method private
     * @param {Array} val [user-input, domain]
     * @return {Array} new domain list
     */
    function sliceDomainList(val) {
      var newDomainList = [];
      var suffix = val[1];
      var regex = new RegExp(suffix, 'i');
      for (var i = 0, len = DOMAIN_LIST.length; i < len; i++) {
        var domain = DOMAIN_LIST[i];
        if (domain.match(regex)) newDomainList.push(domain);
      }
      return newDomainList;
    }

    /**
     * $datalist removeChildren
     *
     * @method private
     */
    function deleteDataList() {
      if ($datalist.hasChildNodes()) {
        while ($datalist.childNodes.length > 0) $datalist.removeChild($datalist.firstChild);
      }
      $option = null;
    }

    return {
      /**
       * suggest run
       *
       * @method public instance method
       */
      execute: function() {
        $el.addEventListener('input', function(evt) {
          if (!evt.target.value.match(/@/)) return deleteDataList();
          //if (evt.target.value.length < 1) deleteDataList();
          lastEventData = evt;
          IS_ATMARK_PRESS = true;
          suggest();
        });
      }
    };
  }

  return {
    /**
     * create instance
     * singleton class.
     *
     * @method public class method
     * @param {HTMLElement} $el input form
     * @param {Object} options
     * @param {String} options.datalistId datalist tag id replace
     * @return singleton instance
     */
    getInstance: function($el, options) {
      if (!instance) instance = init($el, options);
      return instance;
    }
  };
})();
