/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//apiCalls
const getData = (apiName) => {
  return fetch(`http://localhost:3001/api/v1/${apiName}`).then(
    (response) => response.json()
  );
};

const postData = (apiName, formData) => {
  let url = `http://localhost:3001/api/v1/${apiName}`
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    (response) => response.json()
  );
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TravelerRepo {
  constructor(travelData) {
    this.data = travelData;
  }

  // need for login
  findById(id) {
    let traveler;
    if (id === undefined) {
      return "Oops it looks like no id was passed in";
    } else {
      traveler = this.data.find((traveler) => traveler.id === id);
    }
    if(traveler) {
      return traveler;
    } else {
      return "Traveler not found";
    }
  }

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelerRepo);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
  }

  returnFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our data base";
    } else {
      return this.name.split(" ")[0];
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class TripRepo {
  constructor(tripData) {
    this.data = tripData;
  }

  filterPastTrips(arr, date) {
    return arr.filter(trip => trip.pastTrip(date))
  }

  filterFutureTrips(arr, date) {
    return arr.filter(trip => trip.futureTrip(date))
  }

  findCurrentTrip(arr, date) {
    return arr.find(trip => trip.currentTrip(date))
  }

  filterById(travelerId, status) {
    let filterId = this.data.filter((trip) => {
      return trip.userID == travelerId
    })
    if(status) {
      return this.filterByStatus(filterId, status)
    }
    return filterId;
  }

  filterByStatus(arr, status) {
    let filterId = arr.filter(trip => trip.status == status);
    return filterId
  }

  filterByYear(trips, date) {
    let year = new Date(date).getFullYear();
    return trips.filter((trip) => {
      let thisYear = trip.startDate().getFullYear() === year
        return thisYear;
    })
  }

  getPaidTrips(travelerId, date) {
    let trips = this.filterById(travelerId, "approved");
    let pastAndCurrentTrips = this.filterPastTrips(trips, date);
    let currentTrip = this.findCurrentTrip(trips, date);
    if(currentTrip) {
      pastAndCurrentTrips.push(currentTrip);
    }
    return this.filterByYear(pastAndCurrentTrips, date);
  }

  getYearTotal(travelerId) {
    let date = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTodaysDate)();
    let paidTrips = this.getPaidTrips(travelerId, date);
    let totalExpenses = paidTrips.reduce((acc, trip) => {
      acc += (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.calculateTripCost)(trip)
      return acc;
    }, 0);
    return totalExpenses;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TripRepo);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTodaysDate": () => (/* binding */ getTodaysDate),
/* harmony export */   "calculateTripCost": () => (/* binding */ calculateTripCost)
/* harmony export */ });
//utils
const getTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  return yyyy + '/' + mm + '/' + dd;
}

const calculateTripCost = (trip) => {
  let total = trip.getTicketPrices() + trip.getLodgingPrice();
  
  total += (total * .10)
  return total
}



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
  constructor(tripData, destination) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.destination = destination;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }

  getTicketPrices() {
    return this.travelers * this.destination.flightCostPerPerson
  }

  getLodgingPrice() {
    return this.duration * this.destination.lodgingPerDay
  }

  startDate() {
    return new Date(this.date);
  }

  endDate() {
    let endDate = this.startDate();
    endDate.setDate(this.startDate().getDate() + this.duration)
    return endDate
  }

  pastTrip(currentDate) {
    let today = new Date(currentDate);
    if (today > this.endDate()) {
      return true;
    }
    return false
  }

  currentTrip(currentDate) {
    let today = new Date(currentDate);
    if (today >= this.startDate() && today <= this.endDate()) {
      return true 
    }
    return false
  }

  futureTrip(currentDate) {
    let today = new Date(currentDate);
    if (today < this.startDate()) {
      return true;
    }
    return false
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.lodgingPerDay = destinationData.estimatedLodgingCostPerDay;
    this.flightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
    this.image = destinationData.image;
    this.alt = destinationData.alt;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n,i,a,r,s,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],i=function(){function o(e){var n=e.targetModal,i=e.triggers,a=void 0===i?[]:i,r=e.onShow,s=void 0===r?function(){}:r,l=e.onClose,c=void 0===l?function(){}:l,d=e.openTrigger,u=void 0===d?"data-micromodal-trigger":d,f=e.closeTrigger,h=void 0===f?"data-micromodal-close":f,v=e.openClass,g=void 0===v?"is-open":v,m=e.disableScroll,b=void 0!==m&&m,y=e.disableFocus,p=void 0!==y&&y,w=e.awaitCloseAnimation,E=void 0!==w&&w,k=e.awaitOpenAnimation,M=void 0!==k&&k,A=e.debugMode,C=void 0!==A&&A;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.modal=document.getElementById(n),this.config={debugMode:C,disableScroll:b,openTrigger:u,closeTrigger:h,openClass:g,onShow:s,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:M,disableFocus:p},a.length>0&&this.registerTriggers.apply(this,t(a)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var i,a,r;return i=o,(a=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];o.filter(Boolean).forEach((function(t){t.addEventListener("click",(function(t){return e.showModal(t)}))}))}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){var o=function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()};this.modal.addEventListener("animationend",o,!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var o=this.config.openClass;this.modal.addEventListener("animationend",(function e(){t.classList.remove(o),t.removeEventListener("animationend",e,!1)}),!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){(e.target.hasAttribute(this.config.closeTrigger)||e.target.parentNode.hasAttribute(this.config.closeTrigger))&&(e.preventDefault(),e.stopPropagation(),this.closeModal(e))}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(n);return Array.apply(void 0,t(e))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var o=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));o.length>0&&o[0].focus(),0===o.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var o=t.indexOf(document.activeElement);e.shiftKey&&0===o&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&o===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&e(i.prototype,a),r&&e(i,r),o}(),a=null,r=function(e){if(!document.getElementById(e))return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},s=function(e,t){if(function(e){e.length<=0&&(console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))}(e),!t)return!0;for(var o in t)r(o);return!0},{init:function(e){var o=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=t(document.querySelectorAll("[".concat(o.openTrigger,"]"))),r=function(e,t){var o=[];return e.forEach((function(e){var n=e.attributes[t].value;void 0===o[n]&&(o[n]=[]),o[n].push(e)})),o}(n,o.openTrigger);if(!0!==o.debugMode||!1!==s(n,r))for(var l in r){var c=r[l];o.targetModal=l,o.triggers=t(c),a=new i(o)}},show:function(e,t){var o=t||{};o.targetModal=e,!0===o.debugMode&&!1===r(e)||(a&&a.removeEventListeners(),(a=new i(o)).showModal())},close:function(e){e?a.closeModalById(e):a.closeModal()}});"undefined"!=typeof window&&(window.MicroModal=l);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (l);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 11 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  height: 100vh;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1.5px;\n}\n\n.header {\n  border: solid 1px black;\n  height: 30%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n}\n\n.welcome {\n  font-size: 30px;\n  height: 100%;\n  padding-top: 20px;\n  display: flex;\n  justify-content: space-between\n}\n\n.welcome-user{\n  margin-left: 2%;\n}\n\n.welcome-right {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-end;\n  min-width: 40%;\n}\n\n.welcome-total {\n  margin-right: 2%;\n  font-size: 25px;\n  \n}\n\n.signout-button {\n  /* align-self: flex-end; */\n  height: 30px;\n  margin-right: 15px;\n  margin-top: 0px;\n}\n\nul.navbar {\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 5px;\n}\n\nul.navbar li {\n  color: black;\n  font-size: 2em;\n  list-style-type: none;\n  margin-left: 30px;\n\n}\n\n.main-box {\n  min-height: 70%;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n\nbutton {\n  font-size: 20px;\n  margin-bottom: 5px;\n}\n\nbutton:hover {\n  cursor: pointer;\n  transform: scale(1.03);\n}\n\nbutton:active {\n  transform: scale(0.90);\n}\n\n.search-page {\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.user-form {\n  border: solid 2px black;\n  height: 30%;\n  width: 70%;\n  padding: 50px;\n  margin-top: 30px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  text-align: center;\n}\n\n.selected-trip {\n  width: 70%;\n  padding: 50px;\n  margin-top: 30px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  text-align: center;\n}\n\n.image-preview {\n  border: solid 4px black;\n  width: 40%;\n}\n\n.trip-container {\n  width: 80%;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  overflow-y: auto;\n\n}\n\n.trip-box {\n  border: solid 4px black;\n  height: 250px;\n  width: 30%;\n  margin: 1%;\n}\n\n.trip-image {\n  height: 250px;\n  width: 100%;\n}\n\n.search-button:hover{\n  cursor: pointer;\n  transform: scale(1.03);\n}\n\n.search-button:active {\n  transform: scale(0.90);\n}\n\n.hidden {\n  display: none;\n}\n\n.center {\n  justify-content: center;\n}\n\np {\n  font-size: 10px;\n}\n\n.modal {\n  display: none;\n}\n\n.trip-image:hover{\n  cursor: pointer;\n}\n\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,yCAAyC;EACzC,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;EACvB,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,iBAAiB;EACjB,aAAa;EACb;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,eAAe;;AAEjB;;AAEA;EACE,0BAA0B;EAC1B,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,iBAAiB;;AAEnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,uBAAuB;EACvB,WAAW;EACX,UAAU;EACV,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;EACvB,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,gBAAgB;;AAElB;;AAEA;EACE,uBAAuB;EACvB,aAAa;EACb,UAAU;EACV,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,WAAW;AACb;;AAEA;EACE,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB","sourcesContent":["body {\n  height: 100vh;\n  font-family: Arial, Helvetica, sans-serif;\n  letter-spacing: 1.5px;\n}\n\n.header {\n  border: solid 1px black;\n  height: 30%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n}\n\n.welcome {\n  font-size: 30px;\n  height: 100%;\n  padding-top: 20px;\n  display: flex;\n  justify-content: space-between\n}\n\n.welcome-user{\n  margin-left: 2%;\n}\n\n.welcome-right {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-end;\n  min-width: 40%;\n}\n\n.welcome-total {\n  margin-right: 2%;\n  font-size: 25px;\n  \n}\n\n.signout-button {\n  /* align-self: flex-end; */\n  height: 30px;\n  margin-right: 15px;\n  margin-top: 0px;\n}\n\nul.navbar {\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 5px;\n}\n\nul.navbar li {\n  color: black;\n  font-size: 2em;\n  list-style-type: none;\n  margin-left: 30px;\n\n}\n\n.main-box {\n  min-height: 70%;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n\nbutton {\n  font-size: 20px;\n  margin-bottom: 5px;\n}\n\nbutton:hover {\n  cursor: pointer;\n  transform: scale(1.03);\n}\n\nbutton:active {\n  transform: scale(0.90);\n}\n\n.search-page {\n  width: 80%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.user-form {\n  border: solid 2px black;\n  height: 30%;\n  width: 70%;\n  padding: 50px;\n  margin-top: 30px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  text-align: center;\n}\n\n.selected-trip {\n  width: 70%;\n  padding: 50px;\n  margin-top: 30px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  text-align: center;\n}\n\n.image-preview {\n  border: solid 4px black;\n  width: 40%;\n}\n\n.trip-container {\n  width: 80%;\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  overflow-y: auto;\n\n}\n\n.trip-box {\n  border: solid 4px black;\n  height: 250px;\n  width: 30%;\n  margin: 1%;\n}\n\n.trip-image {\n  height: 250px;\n  width: 100%;\n}\n\n.search-button:hover{\n  cursor: pointer;\n  transform: scale(1.03);\n}\n\n.search-button:active {\n  transform: scale(0.90);\n}\n\n.hidden {\n  display: none;\n}\n\n.center {\n  justify-content: center;\n}\n\np {\n  font-size: 10px;\n}\n\n.modal {\n  display: none;\n}\n\n.trip-image:hover{\n  cursor: pointer;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 13 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 15 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0,0,0,0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.modal__container {\n  background-color: #fff;\n  padding: 30px;\n  width: 350px;\n  height: 350px;\n  border-radius: 4px;\n  overflow-y: auto;\n  box-sizing: border-box;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n\n.modal__title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-weight: 600;\n  font-size: 1.25rem;\n  line-height: 1.25;\n  color: #00449e;\n  box-sizing: border-box;\n}\n\n.modal__close {\n  float: right;\n  background: transparent;\n  border: 0;\n}\n\n.modal__header .modal__close:before { content: \"\\2715\"; }\n\n.modal__content {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  line-height: 1.5;\n  color: rgba(0,0,0,.8);\n}\n\n.modal__btn {\n  font-size: .875rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n  background-color: #e6e6e6;\n  color: rgba(0,0,0,.8);\n  border-radius: .25rem;\n  border-style: none;\n  border-width: 0;\n  cursor: pointer;\n  -webkit-appearance: button;\n  text-transform: none;\n  overflow: visible;\n  line-height: 1.15;\n  margin: 0;\n  will-change: transform;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  transition: -webkit-transform .25s ease-out;\n  transition: transform .25s ease-out;\n  transition: transform .25s ease-out,-webkit-transform .25s ease-out;\n}\n\n.modal__btn:focus, .modal__btn:hover {\n  -webkit-transform: scale(1.05);\n  transform: scale(1.05);\n}\n\n.modal__btn-primary {\n  background-color: #00449e;\n  color: #fff;\n}\n\n/**************************\\\n  Demo Animation Style\n\\**************************/\n/* @keyframes mmfadeIn {\n    from { opacity: 0; }\n      to { opacity: 1; }\n}\n\n@keyframes mmfadeOut {\n    from { opacity: 1; }\n      to { opacity: 0; }\n}\n\n@keyframes mmslideIn {\n  from { transform: translateY(15%); }\n    to { transform: translateY(0); }\n}\n\n@keyframes mmslideOut {\n    from { transform: translateY(0); }\n    to { transform: translateY(-10%); }\n} */\n\n.micromodal-slide {\n  display: none;\n}\n\n.micromodal-slide.is-open {\n  display: block;\n}\n\n.micromodal-slide[aria-hidden=\"false\"] .modal__overlay {\n  animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"false\"] .modal__container {\n  animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"true\"] .modal__overlay {\n  animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"true\"] .modal__container {\n  animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);\n}\n\n.micromodal-slide .modal__container,\n.micromodal-slide .modal__overlay {\n  will-change: transform;\n}\n", "",{"version":3,"sources":["webpack://./src/css/modal.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,2BAA2B;EAC3B,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;EACjB,cAAc;EACd,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,uBAAuB;EACvB,SAAS;AACX;;AAEA,sCAAsC,gBAAgB,EAAE;;AAExD;EACE,gBAAgB;EAChB,mBAAmB;EACnB,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;EACrB,yBAAyB;EACzB,qBAAqB;EACrB,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,0BAA0B;EAC1B,oBAAoB;EACpB,iBAAiB;EACjB,iBAAiB;EACjB,SAAS;EACT,sBAAsB;EACtB,kCAAkC;EAClC,mCAAmC;EACnC,2BAA2B;EAC3B,gCAAgC;EAChC,wBAAwB;EACxB,2CAA2C;EAC3C,mCAAmC;EACnC,mEAAmE;AACrE;;AAEA;EACE,8BAA8B;EAC9B,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,WAAW;AACb;;AAEA;;2BAE2B;AAC3B;;;;;;;;;;;;;;;;;;GAkBG;;AAEH;EACE,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,sDAAsD;AACxD;;AAEA;EACE,kDAAkD;AACpD;;AAEA;EACE,uDAAuD;AACzD;;AAEA;EACE,mDAAmD;AACrD;;AAEA;;EAEE,sBAAsB;AACxB","sourcesContent":[".modal__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0,0,0,0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.modal__container {\n  background-color: #fff;\n  padding: 30px;\n  width: 350px;\n  height: 350px;\n  border-radius: 4px;\n  overflow-y: auto;\n  box-sizing: border-box;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n\n.modal__title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-weight: 600;\n  font-size: 1.25rem;\n  line-height: 1.25;\n  color: #00449e;\n  box-sizing: border-box;\n}\n\n.modal__close {\n  float: right;\n  background: transparent;\n  border: 0;\n}\n\n.modal__header .modal__close:before { content: \"\\2715\"; }\n\n.modal__content {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  line-height: 1.5;\n  color: rgba(0,0,0,.8);\n}\n\n.modal__btn {\n  font-size: .875rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n  background-color: #e6e6e6;\n  color: rgba(0,0,0,.8);\n  border-radius: .25rem;\n  border-style: none;\n  border-width: 0;\n  cursor: pointer;\n  -webkit-appearance: button;\n  text-transform: none;\n  overflow: visible;\n  line-height: 1.15;\n  margin: 0;\n  will-change: transform;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  transition: -webkit-transform .25s ease-out;\n  transition: transform .25s ease-out;\n  transition: transform .25s ease-out,-webkit-transform .25s ease-out;\n}\n\n.modal__btn:focus, .modal__btn:hover {\n  -webkit-transform: scale(1.05);\n  transform: scale(1.05);\n}\n\n.modal__btn-primary {\n  background-color: #00449e;\n  color: #fff;\n}\n\n/**************************\\\n  Demo Animation Style\n\\**************************/\n/* @keyframes mmfadeIn {\n    from { opacity: 0; }\n      to { opacity: 1; }\n}\n\n@keyframes mmfadeOut {\n    from { opacity: 1; }\n      to { opacity: 0; }\n}\n\n@keyframes mmslideIn {\n  from { transform: translateY(15%); }\n    to { transform: translateY(0); }\n}\n\n@keyframes mmslideOut {\n    from { transform: translateY(0); }\n    to { transform: translateY(-10%); }\n} */\n\n.micromodal-slide {\n  display: none;\n}\n\n.micromodal-slide.is-open {\n  display: block;\n}\n\n.micromodal-slide[aria-hidden=\"false\"] .modal__overlay {\n  animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"false\"] .modal__container {\n  animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"true\"] .modal__overlay {\n  animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n}\n\n.micromodal-slide[aria-hidden=\"true\"] .modal__container {\n  animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);\n}\n\n.micromodal-slide .modal__container,\n.micromodal-slide .modal__overlay {\n  will-change: transform;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _repositories_travelerRepo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _src_traveler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _repositories_tripRepo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _trip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _destination_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var micromodal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _css_modal_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
// Import required classes








// import and initialize MicroModal

micromodal__WEBPACK_IMPORTED_MODULE_7__.default.init({
  openTrigger: 'data-custom-open',
  disableScroll: true,
  awaitCloseAnimation: false
});

// Import css



//queryselectors
let searchPage = document.querySelector("#searchPage");
let userForm = document.querySelector("#userForm");
let selectedTrip = document.querySelector("#selectedTrip");
let searchButton = document.querySelector("#searchButton");
let currentButton = document.querySelector("#currentButton");
let upcomingButton = document.querySelector("#upcomingButton");
let pastButton = document.querySelector("#pastButton");
let pendingButton = document.querySelector("#pendingButton");
let tripContainer = document.querySelector("#tripContainer");
let welcome = document.querySelector("#welcome");
let destinationsSelect = document.querySelector("#destinationID");
let tripSubmit = document.querySelector("#tripSubmit");

// Global Variables
let travelers;
let destinations;
let trips;
let travelerRepo;
let tripRepo;
let currentTraveler;
let potentialTrip;
let todaysDate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.getTodaysDate)();

//functions

// Fetch all data
const fetchUserData = () => {
  Promise.all([
    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.getData)("travelers"),
    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.getData)("destinations"),
    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.getData)("trips")
  ]).then((data) => {
    createDataArrays(data);
    travelerRepo = new _repositories_travelerRepo__WEBPACK_IMPORTED_MODULE_1__.default(travelers);
    if (checkIfSignedIn()) {
      tripRepo = new _repositories_tripRepo_js__WEBPACK_IMPORTED_MODULE_3__.default(trips);
      setWelcomeDisplay();
    }
  }).catch((error) =>
    alert(error)
  );
};

// Create array from resolved Promise
const createDataArrays = (data) => {
  travelers = data[0].travelers.map((traveler) => {
    return new _src_traveler__WEBPACK_IMPORTED_MODULE_2__.default(traveler);
  });
  destinations = data[1].destinations.map((destination) => {
    return new _destination_js__WEBPACK_IMPORTED_MODULE_5__.default(destination);
  });
  trips = data[2].trips.map((trip) => {
    let destination = destinations.find((destination) => {
      return destination.id === parseInt(trip.destinationID);
    })
    return new _trip_js__WEBPACK_IMPORTED_MODULE_4__.default(trip, destination);
  });
}

const setWelcomeDisplay = () => {
  welcome.innerHTML = `
  <h1 class="welcome-user">Welcome, ${currentTraveler.returnFirstName()}!</h1>
  <div class="welcome-right">
  <button class="signout-button" type="submit" id="signOut">Sign Out</button>
  <h2 class="welcome-total">You've spent: $${tripRepo.getYearTotal(currentTraveler.id)} this year.</h2>
  </div>
  `
  addRestrictionsToDateInput();
  addOptionsToDestinationsDropdown();
  watchForSignout();
}

const addRestrictionsToDateInput = () => {
  let date = userForm.querySelector("#date");
  date.setAttribute("min", todaysDate.split("/").join("-"));
};

const addOptionsToDestinationsDropdown = () => {
  destinations.forEach((destination) => {
    destinationsSelect.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>`
  })
};

const watchForSignout = () => {
  let signoutButton = document.querySelector("#signOut");
  signoutButton.addEventListener("click", () => {
    window.location.href = "http://localhost:8080/signin.html";
  });
}


// Functions for the Trip Modals
const setTripModal = (trip) => {
  return `
  <div class="micromodal-slide modal" id="modal-${trip.id}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-custom-close="">
      <div class="modal__container w-40-ns w-90" role="dialog" aria-modal="true" aria-labelledby="modal-${trip.id}-title">
        <header class="modal__header">
          <button class="modal__close" id="modalClose-${trip.id}" aria-label="Close modal" data-custom-close=""></button>
        </header>
        <h4> Date of Trip: ${trip.date}<br>
          Duration: ${trip.duration} days<br>
          Destination: ${trip.destination.destination}<br>
          Travelers: ${trip.travelers} <br>
          Status: ${trip.status}<br>
          Total Cost: $${(0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.calculateTripCost)(trip)}
        </h4>
      </div>
    </div>
  </div>
  `
}

const setModalToggle = (trips) => {
  trips.forEach((trip) => {
    ["keypress", "click"].forEach((e) => {
      document.querySelector(`#viewTrip-${trip.id}`).addEventListener(e, () => {
        micromodal__WEBPACK_IMPORTED_MODULE_7__.default.show(`modal-${trip.id}`, {
          debugMode: true,
          disableScroll: true
        })
      })
      
      document.querySelector(`#modalClose-${trip.id}`)
        .addEventListener(e, (event) => {
          event.preventDefault()
          micromodal__WEBPACK_IMPORTED_MODULE_7__.default.close(`modal-${trip.id}`)
        })
    })
  })
}

// functions for finding/displaying trips
const setTrip = (trip) => {
  return `
    <section class="trip-box" data-custom-open=>
    
    ${setTripModal(trip)}
    <img src="${trip.destination.image}" tabindex="0" class="trip-image" data-micromodal-trigger="modal-${trip.id}" id="viewTrip-${trip.id}">
    </section>
  `
}

const getCurrentTrip = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.findCurrentTrip(tripByID, todaysDate);
}

const displayCurrentTrip = (currentTrip) => {
  tripContainer.innerHTML = ``
  if (currentTrip) {
    tripContainer.innerHTML = setTrip(currentTrip);
    setModalToggle([currentTrip]);
  } else {
    tripContainer.innerHTML =
      `<h2> Uh oh! You do not have a current trip!</h2> `
  }
};

const getFutureTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.filterFutureTrips(tripByID, todaysDate);
}

const displayUpcomingTrips = (upcomingTrips) => {
  tripContainer.innerHTML = ``;
  if (upcomingTrips.length === 0) {
    tripContainer.innerHTML = `
     <h2>You do not currently have any approved upcoming trips.<br>
     Check to see if any trip is pending.</h2>`
    return
  }
  upcomingTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip);
  });
  return setModalToggle(upcomingTrips);
}

const getPastTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id, "approved");
  return tripRepo.filterPastTrips(tripByID, todaysDate);
}

const displayPastTrips = () => {
  let pastTrips = getPastTrips();
  tripContainer.innerHTML = ``;
  if (pastTrips.length === 0) {
    tripContainer.innerHTML = `<h2>You do not currently have past trips.</h2>`
    return
  }
  pastTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip);
  });
  return setModalToggle(pastTrips);
}

const getPendingTrips = () => {
  let tripByID = tripRepo.filterById(currentTraveler.id);
  return tripRepo.filterByStatus(tripByID, "pending");
}

const displayPendingTrips = () => {
  let pendingTrips = getPendingTrips();
  tripContainer.innerHTML = ``;
  if (pendingTrips.length === 0) {
    tripContainer.innerHTML =
      `<h2>You do not currently have pending trips.</h2>`
    return
  }

  pendingTrips.forEach((trip) => {
    tripContainer.innerHTML += setTrip(trip)
  });
  return setModalToggle(pendingTrips);
};

const toggleDisplay = (event) => {
  if (event.target.id === "searchButton") {
    searchPage.classList.remove("hidden");
    tripContainer.classList.add("hidden");
  } else {
    searchPage.classList.add("hidden");
    tripContainer.classList.remove("hidden");
  }
};

// functions for searching/booking trip
const getFormData = (event) => {
  let form = event.target.closest("form");
  let inputs = Array.from(form.querySelectorAll("input"));
  inputs = inputs.filter(input => input.type !== "submit");
  inputs.push(form.querySelector("select"))
  return inputs.map((input) => {
    return {name: input.name, value: input.value}
  });
};

const checkforMissingOrInvalidValues = (formData) => {
  let missingValues = formData.filter(data => !data.value)
  let invalidValues;
  invalidValues = formData.filter((data) => {
    if (data.name === 'date') {
      if (data.value.split('-').join('/') <= todaysDate) {
        return true
      }
    } else {
      if (parseInt(data.value) < 0) {
        return true
      }
    }
  })
  if (missingValues.length > 0 || invalidValues.length > 0) {
    return true
  }
}

const createNewTrip = (formData, destination) => {
  let trip = {
    id: tripRepo.data.length + 1,
    userID: currentTraveler.id,
    destinationID: destination.id,
    travelers: parseInt(formData[2].value),
    date: formData[0].value.split("-").join("/"),
    duration: parseInt(formData[1].value),
    status: "pending",
    suggestedActivities: []
  }
  return new _trip_js__WEBPACK_IMPORTED_MODULE_4__.default(trip, destination)
}

const postPotentialTrip = () => {
  Promise.all([
    (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_0__.postData)("trips", potentialTrip)
  ])
    .then(() => {
      fetchUserData();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    )
};

const resetSearchPage = () => {
  let inputs = Array.from(userForm.querySelectorAll("input"));
  inputs.forEach((input) => {
    if (input.id === "tripSubmit") {
      return;
    } else if (input.type === "number") {
      input.value = '0';
    } else {
      input.value = '';
    }
  })
  selectedTrip.innerHTML = ''
}

const displaySelectedTripToBook = (formData, destination) => {
  potentialTrip = createNewTrip(formData, destination);
  selectedTrip.innerHTML = `
    <img class="image-preview" src="${destination.image}" alt="${destination.alt}">
    <article>
      <h3>
      Lodging: $${destination.lodgingPerDay} per person/night<br>
      Flight: $${destination.flightCostPerPerson} per person<br><br>
      Estimated Total Cost: $${(0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.calculateTripCost)(potentialTrip)}*</h3><br>
      <button class="book-now" id="bookNow">Book</button>
      <p>*This includes a 10% agent booking fee</p>
    </article>
  `
  selectedTrip.querySelector("#bookNow").addEventListener("click", (event) => {
    event.preventDefault();
    postPotentialTrip();
    resetSearchPage();
  })

};

const checkIfSignedIn = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let userName = urlParams.get('username')
  let userID
  if (userName) {
    userID = userName.split('').splice(8, 5).join('');
  }
  if (userID) {
    let traveler = travelerRepo.data.find((traveler) => {
      return traveler.id === parseInt(userID)
    })
    if (traveler) {
      currentTraveler = traveler
    }
    return true
  }
  if (!currentTraveler) {
    window.location.replace("http://localhost:8080/signin.html")
    return false
  }
}

//eventlisteners
window.addEventListener("load", () => {
  fetchUserData();
})

searchButton.addEventListener("click", (event) => {
  toggleDisplay(event)
});

currentButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayCurrentTrip(getCurrentTrip());
});

upcomingButton.addEventListener("click", (event) => {
  toggleDisplay(event)
  displayUpcomingTrips(getFutureTrips());
});

pastButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPastTrips();
});

pendingButton.addEventListener("click", (event) => {
  toggleDisplay(event);
  displayPendingTrips();
})

tripSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let formData = getFormData(event);
  if (checkforMissingOrInvalidValues(formData)) {
    alert("Please check field values, and try again.")
    return;
  }
  let destination = destinations.find((destination) => {
    return destination.id === parseInt(formData[3].value);
  })
  displaySelectedTripToBook(formData, destination);
})
})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map