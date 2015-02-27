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
    // PC
    'gmail.com',
    'yahoo.co.jp',
    'yahoo.com',
    'ybb.ne.jp',
    'hotmail.com',
    'hotmail.co.jp',
    'icloud.com',
    'me.com',
    'mac.com',
    'live.jp',
    'msn.com',
    'nifty.com',
    'outlook.jp',
    'outlook.com',
    'aol.com',
    'excite.co.jp',
    // Mobile
    'docomo.ne.jp',
    'ezweb.ne.jp',
    'softbank.ne.jp',
    'i.softbank.jp',
    'willcom.com',
    'emobile.ne.jp',
    'yahoo.ne.jp',
    'ymobile.ne.jp'
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
      if (options.addDomain !== undefined) {
        if (getType(options.addDomain) === 'String') Array.prototype.push.call(DOMAIN_LIST, options.addDomain);
        else if (getType(options.addDomain) === 'Array') Array.prototype.push.apply(DOMAIN_LIST, options.addDomain);
      }
    }
    el.setAttribute('list', DOMAIN_LIST_ID);
    $el = el;
    $datalist = document.createElement('datalist');
    $datalist.id = DOMAIN_LIST_ID;

    lastEventData = null;

    /**
     * get type
     *
     * @method private
     * @param {Any} obj
     * @return {String} type
     */
    function getType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    }

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

    /**
     * string full-size to half-size
     *
     * @method private
     * @param {String} s input string
     * @return {String} half-size string
     */
    function toHalfSize(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }

    return {
      /**
       * suggest run
       *
       * @method public instance
       */
      execute: function() {
        var fullSizeRegex = /[Ａ-Ｚａ-ｚ０-９]/g;
        var vowelRegex1 = /あ/;
        var vowelRegex2 = /い/;
        var vowelRegex3 = /う/;
        var vowelRegex4 = /え/;
        var vowelRegex5 = /お/;
        var vowelRegex6 = /＠/;
        var vowelRegex7 = /ー/;
        var vowelRegex8 = /＿/;
        $el.addEventListener('input', function(evt) {
          var val = evt.target.value;
          $el.value = val.replace(fullSizeRegex, toHalfSize);
          if (val.match(vowelRegex1)) $el.value = val.replace(vowelRegex1, 'a');
          if (val.match(vowelRegex2)) $el.value = val.replace(vowelRegex2, 'i');
          if (val.match(vowelRegex3)) $el.value = val.replace(vowelRegex3, 'u');
          if (val.match(vowelRegex4)) $el.value = val.replace(vowelRegex4, 'e');
          if (val.match(vowelRegex5)) $el.value = val.replace(vowelRegex5, 'o');
          if (val.match(vowelRegex6)) $el.value = val.replace(vowelRegex6, '@');
          if (val.match(vowelRegex7)) $el.value = val.replace(vowelRegex7, '-');
          if (val.match(vowelRegex8)) $el.value = val.replace(vowelRegex8, '_');
          if (!evt.target.value.match(/@/)) return deleteDataList();
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
     * @param {Array or String} options.addDomain add DOMAIN_LIST
     * @return singleton instance
     */
    getInstance: function($el, options) {
      if (!instance) instance = init($el, options);
      return instance;
    }
  };
})();
