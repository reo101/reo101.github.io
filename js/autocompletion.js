// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//   typeof define === 'function' && define.amd ? define(factory) :
//   (global.autoComplete = factory());
// }(this, (function () { 'use strict';

//   function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//       throw new TypeError("Cannot call a class as a function");
//     }
//   }

//   function _defineProperties(target, props) {
//     for (var i = 0; i < props.length; i++) {
//       var descriptor = props[i];
//       descriptor.enumerable = descriptor.enumerable || false;
//       descriptor.configurable = true;
//       if ("value" in descriptor) descriptor.writable = true;
//       Object.defineProperty(target, descriptor.key, descriptor);
//     }
//   }

//   function _createClass(Constructor, protoProps, staticProps) {
//     if (protoProps) _defineProperties(Constructor.prototype, protoProps);
//     if (staticProps) _defineProperties(Constructor, staticProps);
//     return Constructor;
//   }

//   function _unsupportedIterableToArray(o, minLen) {
//     if (!o) return;
//     if (typeof o === "string") return _arrayLikeToArray(o, minLen);
//     var n = Object.prototype.toString.call(o).slice(8, -1);
//     if (n === "Object" && o.constructor) n = o.constructor.name;
//     if (n === "Map" || n === "Set") return Array.from(n);
//     if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
//   }

//   function _arrayLikeToArray(arr, len) {
//     if (len == null || len > arr.length) len = arr.length;

//     for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

//     return arr2;
//   }

//   function _createForOfIteratorHelper(o) {
//     if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
//       if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
//         var i = 0;

//         var F = function () {};

//         return {
//           s: F,
//           n: function () {
//             if (i >= o.length) return {
//               done: true
//             };
//             return {
//               done: false,
//               value: o[i++]
//             };
//           },
//           e: function (e) {
//             throw e;
//           },
//           f: F
//         };
//       }

//       throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
//     }

//     var it,
//         normalCompletion = true,
//         didErr = false,
//         err;
//     return {
//       s: function () {
//         it = o[Symbol.iterator]();
//       },
//       n: function () {
//         var step = it.next();
//         normalCompletion = step.done;
//         return step;
//       },
//       e: function (e) {
//         didErr = true;
//         err = e;
//       },
//       f: function () {
//         try {
//           if (!normalCompletion && it.return != null) it.return();
//         } finally {
//           if (didErr) throw err;
//         }
//       }
//     };
//   }

//   var dataAttribute = "data-id";
//   var select = {
//     resultsList: "autoComplete_list",
//     result: "autoComplete_result",
//     highlight: "autoComplete_highlighted",
//     selectedResult: "autoComplete_selected"
//   };
//   var keys = {
//     ENTER: 13,
//     ARROW_UP: 38,
//     ARROW_DOWN: 40
//   };
//   var getInput = function getInput(selector) {
//     return typeof selector === "string" ? document.querySelector(selector) : selector();
//   };
//   var createResultsList = function createResultsList(renderResults) {
//     var resultsList = document.createElement(renderResults.element);
//     resultsList.setAttribute("id", select.resultsList);
//     if (renderResults.container) {
//       renderResults.container(resultsList);
//     }
//     renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
//     return resultsList;
//   };
//   var highlight = function highlight(value) {
//     return "<span class=".concat(select.highlight, ">").concat(value, "</span>");
//   };
//   var addResultsToList = function addResultsToList(resultsList, dataSrc, resultItem) {
//     var fragment = document.createDocumentFragment();
//     dataSrc.forEach(function (event, record) {
//       var result = document.createElement(resultItem.element);
//       var resultIndex = dataSrc[record].index;
//       result.setAttribute(dataAttribute, resultIndex);
//       result.setAttribute("class", select.result);
//       resultItem.content ? resultItem.content(event, result) : result.innerHTML = event.match || event;
//       fragment.appendChild(result);
//     });
//     resultsList.appendChild(fragment);
//   };
//   var clearResults = function clearResults(resultsList) {
//     return resultsList.innerHTML = "";
//   };
//   var onSelection = function onSelection(event, field, resultsList, feedback, resultsValues, selection) {
//     feedback({
//       event: event,
//       query: field instanceof HTMLInputElement ? field.value : field.innerHTML,
//       matches: resultsValues.matches,
//       results: resultsValues.list.map(function (record) {
//         return record.value;
//       }),
//       selection: resultsValues.list.find(function (value) {
//         if (event.keyCode === keys.ENTER) {
//           return value.index === Number(selection.getAttribute(dataAttribute));
//         } else if (event.type === "mousedown") {
//           return value.index === Number(event.currentTarget.getAttribute(dataAttribute));
//         }
//       })
//     });
//     clearResults(resultsList);
//   };
//   var navigation = function navigation(input, resultsList, feedback, resultsValues) {
//     var li = resultsList.childNodes,
//         liLength = li.length - 1;
//     var liSelected = undefined,
//         next;
//     var removeSelection = function removeSelection(direction) {
//       liSelected.classList.remove(select.selectedResult);
//       if (direction === 1) {
//         next = liSelected.nextSibling;
//       } else {
//         next = liSelected.previousSibling;
//       }
//     };
//     var highlightSelection = function highlightSelection(current) {
//       liSelected = current;
//       liSelected.classList.add(select.selectedResult);
//     };
//     input.onkeydown = function (event) {
//       if (li.length > 0) {
//         switch (event.keyCode) {
//           case keys.ARROW_UP:
//             if (liSelected) {
//               removeSelection(0);
//               if (next) {
//                 highlightSelection(next);
//               } else {
//                 highlightSelection(li[liLength]);
//               }
//             } else {
//               highlightSelection(li[liLength]);
//             }
//             break;
//           case keys.ARROW_DOWN:
//             if (liSelected) {
//               removeSelection(1);
//               if (next) {
//                 highlightSelection(next);
//               } else {
//                 highlightSelection(li[0]);
//               }
//             } else {
//               highlightSelection(li[0]);
//             }
//             break;
//           case keys.ENTER:
//             if (liSelected) {
//               onSelection(event, input, resultsList, feedback, resultsValues, liSelected);
//             }
//         }
//       }
//     };
//     li.forEach(function (selection) {
//       selection.onmousedown = function (event) {
//         return onSelection(event, input, resultsList, feedback, resultsValues);
//       };
//     });
//   };

//   var CustomEventPolyfill = function CustomEventPolyfill(event, params) {
//     params = params || {
//       bubbles: false,
//       cancelable: false,
//       detail: undefined
//     };
//     var evt = document.createEvent("CustomEvent");
//     evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
//     return evt;
//   };
//   CustomEventPolyfill.prototype = window.Event.prototype;
//   var CustomEventWrapper = typeof window.CustomEvent === "function" && window.CustomEvent || CustomEventPolyfill;
//   var initElementClosestPolyfill = function initElementClosestPolyfill() {
//     if (!Element.prototype.matches) {
//       Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
//     }
//     if (!Element.prototype.closest) {
//       Element.prototype.closest = function (s) {
//         var el = this;
//         do {
//           if (el.matches(s)) {
//             return el;
//           }
//           el = el.parentElement || el.parentNode;
//         } while (el !== null && el.nodeType === 1);
//         return null;
//       };
//     }
//   };
//   var Polyfill = {
//     CustomEventWrapper: CustomEventWrapper,
//     initElementClosestPolyfill: initElementClosestPolyfill
//   };

//   var autoComplete = function () {
//     function autoComplete(config) {
//       _classCallCheck(this, autoComplete);
//       var _config$selector = config.selector,
//           selector = _config$selector === void 0 ? "#autoComplete" : _config$selector,
//           _config$data = config.data,
//           key = _config$data.key,
//           _src = _config$data.src,
//           _config$data$cache = _config$data.cache,
//           cache = _config$data$cache === void 0 ? true : _config$data$cache,
//           query = config.query,
//           _config$trigger = config.trigger;
//       _config$trigger = _config$trigger === void 0 ? {} : _config$trigger;
//       var _config$trigger$event = _config$trigger.event,
//           event = _config$trigger$event === void 0 ? ["input"] : _config$trigger$event,
//           _config$trigger$condi = _config$trigger.condition,
//           condition = _config$trigger$condi === void 0 ? false : _config$trigger$condi,
//           _config$searchEngine = config.searchEngine,
//           searchEngine = _config$searchEngine === void 0 ? "strict" : _config$searchEngine,
//           _config$threshold = config.threshold,
//           threshold = _config$threshold === void 0 ? 0 : _config$threshold,
//           _config$debounce = config.debounce,
//           debounce = _config$debounce === void 0 ? 0 : _config$debounce,
//           _config$resultsList = config.resultsList;
//       _config$resultsList = _config$resultsList === void 0 ? {} : _config$resultsList;
//       var _config$resultsList$r = _config$resultsList.render,
//           render = _config$resultsList$r === void 0 ? false : _config$resultsList$r,
//           _config$resultsList$c = _config$resultsList.container,
//           container = _config$resultsList$c === void 0 ? false : _config$resultsList$c,
//           destination = _config$resultsList.destination,
//           _config$resultsList$p = _config$resultsList.position,
//           position = _config$resultsList$p === void 0 ? "afterend" : _config$resultsList$p,
//           _config$resultsList$e = _config$resultsList.element,
//           resultsListElement = _config$resultsList$e === void 0 ? "ul" : _config$resultsList$e,
//           _config$resultsList$n = _config$resultsList.navigation,
//           navigation$$1 = _config$resultsList$n === void 0 ? false : _config$resultsList$n,
//           _config$sort = config.sort,
//           sort = _config$sort === void 0 ? false : _config$sort,
//           placeHolder = config.placeHolder,
//           _config$maxResults = config.maxResults,
//           maxResults = _config$maxResults === void 0 ? 5 : _config$maxResults,
//           _config$resultItem = config.resultItem;
//       _config$resultItem = _config$resultItem === void 0 ? {} : _config$resultItem;
//       var _config$resultItem$co = _config$resultItem.content,
//           content = _config$resultItem$co === void 0 ? false : _config$resultItem$co,
//           _config$resultItem$el = _config$resultItem.element,
//           resultItemElement = _config$resultItem$el === void 0 ? "li" : _config$resultItem$el,
//           noResults = config.noResults,
//           _config$highlight = config.highlight,
//           highlight$$1 = _config$highlight === void 0 ? false : _config$highlight,
//           onSelection = config.onSelection;
//       var resultsListView = render ? createResultsList({
//         container: container,
//         destination: destination || getInput(selector),
//         position: position,
//         element: resultsListElement
//       }) : null;
//       this.selector = selector;
//       this.data = {
//         src: function src() {
//           return typeof _src === "function" ? _src() : _src;
//         },
//         key: key,
//         cache: cache
//       };
//       this.query = query;
//       this.trigger = {
//         event: event,
//         condition: condition
//       };
//       this.searchEngine = searchEngine === "loose" ? "loose" : typeof searchEngine === "function" ? searchEngine : "strict";
//       this.threshold = threshold;
//       this.debounce = debounce;
//       this.resultsList = {
//         render: render,
//         view: resultsListView,
//         navigation: navigation$$1
//       };
//       this.sort = sort;
//       this.placeHolder = placeHolder;
//       this.maxResults = maxResults;
//       this.resultItem = {
//         content: content,
//         element: resultItemElement
//       };
//       this.noResults = noResults;
//       this.highlight = highlight$$1;
//       this.onSelection = onSelection;
//       this.init();
//     }
//     _createClass(autoComplete, [{
//       key: "search",
//       value: function search(query, record) {
//         var recordLowerCase = record.toLowerCase();
//         if (this.searchEngine === "loose") {
//           query = query.replace(/ /g, "");
//           var match = [];
//           var searchPosition = 0;
//           for (var number = 0; number < recordLowerCase.length; number++) {
//             var recordChar = record[number];
//             if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
//               recordChar = this.highlight ? highlight(recordChar) : recordChar;
//               searchPosition++;
//             }
//             match.push(recordChar);
//           }
//           if (searchPosition !== query.length) {
//             return false;
//           }
//           return match.join("");
//         } else {
//           if (recordLowerCase.includes(query)) {
//             var pattern = new RegExp("".concat(query), "i");
//             query = pattern.exec(record);
//             return this.highlight ? record.replace(query, highlight(query)) : record;
//           }
//         }
//       }
//     }, {
//       key: "listMatchedResults",
//       value: function listMatchedResults(data) {
//         var _this = this;
//         return new Promise(function (resolve) {
//           var resList = [];
//           data.filter(function (record, index) {
//             var search = function search(key) {
//               var recordValue = key ? record[key] : record;
//               if (recordValue) {
//                 var match = typeof _this.searchEngine === "function" ? _this.searchEngine(_this.queryValue, recordValue) : _this.search(_this.queryValue, recordValue);
//                 if (match && key) {
//                   resList.push({
//                     key: key,
//                     index: index,
//                     match: match,
//                     value: record
//                   });
//                 } else if (match && !key) {
//                   resList.push({
//                     index: index,
//                     match: match,
//                     value: record
//                   });
//                 }
//               }
//             };
//             if (_this.data.key) {
//               var _iterator = _createForOfIteratorHelper(_this.data.key),
//                   _step;
//               try {
//                 for (_iterator.s(); !(_step = _iterator.n()).done;) {
//                   var key = _step.value;
//                   search(key);
//                 }
//               } catch (err) {
//                 _iterator.e(err);
//               } finally {
//                 _iterator.f();
//               }
//             } else {
//               search();
//             }
//           });
//           var list = _this.sort ? resList.sort(_this.sort).slice(0, _this.maxResults) : resList.slice(0, _this.maxResults);
//           return resolve({
//             matches: resList.length,
//             list: list
//           });
//         });
//       }
//     }, {
//       key: "ignite",
//       value: function ignite() {
//         var _this2 = this;
//         var input = getInput(this.selector);
//         if (this.placeHolder) {
//           input.setAttribute("placeholder", this.placeHolder);
//         }
//         var debounce = function debounce(func, delay) {
//           var inDebounce;
//           return function () {
//             var context = this;
//             var args = arguments;
//             clearTimeout(inDebounce);
//             inDebounce = setTimeout(function () {
//               return func.apply(context, args);
//             }, delay);
//           };
//         };
//         var exec = function exec(event) {
//           var inputValue = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement ? input.value.toLowerCase() : input.innerHTML.toLowerCase();
//           var queryValue = _this2.queryValue = _this2.query && _this2.query.manipulate ? _this2.query.manipulate(inputValue) : inputValue;
//           var renderResultsList = _this2.resultsList.render;
//           var triggerCondition = _this2.trigger.condition ? _this2.trigger.condition(queryValue) : queryValue.length >= _this2.threshold && queryValue.replace(/ /g, "").length;
//           var eventEmitter = function eventEmitter(event, results) {
//             input.dispatchEvent(new Polyfill.CustomEventWrapper("autoComplete", {
//               bubbles: true,
//               detail: {
//                 event: event,
//                 input: inputValue,
//                 query: queryValue,
//                 matches: results ? results.matches : null,
//                 results: results ? results.list : null
//               },
//               cancelable: true
//             }));
//           };
//           if (renderResultsList) {
//             var resultsList = _this2.resultsList.view;
//             var clearResults$$1 = clearResults(resultsList);
//             if (triggerCondition) {
//               _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
//                 eventEmitter(event, list);
//                 if (_this2.resultsList.render) {
//                   if (list.list.length === 0 && _this2.noResults) {
//                     _this2.noResults();
//                   } else {
//                     addResultsToList(resultsList, list.list, _this2.resultItem);
//                     if (_this2.onSelection) {
//                       _this2.resultsList.navigation ? _this2.resultsList.navigation(event, input, resultsList, _this2.onSelection, list) : navigation(input, resultsList, _this2.onSelection, list);
//                     }
//                   }
//                 }
//               });
//             } else {
//               eventEmitter(event);
//             }
//           } else if (!renderResultsList && triggerCondition) {
//             _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
//               eventEmitter(event, list);
//             });
//           }
//         };
//         var run = function run(event) {
//           Promise.resolve(_this2.data.cache ? _this2.dataStream : _this2.data.src()).then(function (data) {
//             _this2.dataStream = data;
//             exec(event);
//           });
//         };
//         this.trigger.event.forEach(function (eventType) {
//           input.addEventListener(eventType, debounce(function (event) {
//             return run(event);
//           }, _this2.debounce));
//         });
//       }
//     }, {
//       key: "init",
//       value: function init() {
//         var _this3 = this;
//         if (this.data.cache) {
//           Promise.resolve(this.data.src()).then(function (data) {
//             _this3.dataStream = data;
//             _this3.ignite();
//           });
//         } else {
//           this.ignite();
//         }
//         Polyfill.initElementClosestPolyfill();
//       }
//     }]);
//     return autoComplete;
//   }();

//   return autoComplete;

// })));


// // autoComplete.js on type event emitter
// document.querySelector("#autoComplete").addEventListener("autoComplete", function (event) {
//   console.log(event.detail);
//   // console.log(autoCompletejs);
// });

// // The autoComplete.js Engine instance creator
// const autoCompletejs = new autoComplete({
//   data: {
//     src: async function () {
//       // Loading placeholder text
//       // document.querySelector("#autoComplete").setAttribute("placeholder", "");
//       // Fetch External Data Source
//       const source = await fetch("./db/generic.json");
//       const data = await source.json();
//       // Returns Fetched data
//       return data;
//     },
//     key: ["food", "cities", "animals"],
//   },
//   sort: function (a, b) {
//     if (a.match < b.match) {
//       return -1;
//     }
//     if (a.match > b.match) {
//       return 1;
//     }
//     return 0;
//   },
//   query: {
//     manipulate: function (query) {
//       return query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     },
//   },
//   trigger: {
//     event: ["input","focusin", "focusout"],
//     condition: function (query) {
//       return !!query.replace(/ /g, "").length && query !== "hamburger";
//     },
//   },
//   placeHolder: "Food & Drinks",
//   selector: "#autoComplete",
//   debounce: 0,
//   searchEngine: "strict",
//   highlight: true,
//   maxResults: 5,
//   resultsList: {
//     render: true,
//     container: function (source) {
//       source.setAttribute("id", "autoComplete_list");
//     },
//     element: "ul",
//     destination: document.querySelector("#autoComplete"),
//     position: "afterend",
//   },
//   resultItem: {
//     content: function (data, source) {
//       source.innerHTML = data.match;
//     },
//     element: "li",
//   },
//   noResults: function () {
//     const result = document.createElement("li");
//     result.setAttribute("class", "no_result");
//     result.setAttribute("tabindex", "1");
//     result.innerHTML = "No Results";
//     document.querySelector("#autoComplete_list").appendChild(result);
//   },
//   onSelection: function (feedback) {
//     document.querySelector("#autoComplete").blur();
//     const selection = feedback.selection.value.food;
//     // Render selected choice to selection div
//     document.querySelector(".selection").innerHTML = selection;
//     // Clear Input
//     document.querySelector("#autoComplete").value = "";
//     // Change placeholder with the selected value
//     document.querySelector("#autoComplete").setAttribute("placeholder", selection);
//     // Concole log autoComplete data feedback
//     console.log(feedback);
//   },
// });

// // Toggle Search Engine Type/Mode
// document.querySelector(".toggeler").addEventListener("click", function () {
//   // Holdes the toggle buttin alignment
//   const toggele = document.querySelector(".toggele").style.justifyContent;

//   if (toggele === "flex-start" || toggele === "") {
//     // Set Search Engine mode to Loose
//     document.querySelector(".toggele").style.justifyContent = "flex-end";
//     document.querySelector(".toggeler").innerHTML = "Loose";
//     autoCompletejs.searchEngine = "loose";
//   } else {
//     // Set Search Engine mode to Strict
//     document.querySelector(".toggele").style.justifyContent = "flex-start";
//     document.querySelector(".toggeler").innerHTML = "Strict";
//     autoCompletejs.searchEngine = "strict";
//   }
// });

// // Toggle results list and other elements
// const action = function (action) {
//   const github = document.querySelector(".github-corner");
//   const title = document.querySelector("h1");
//   const mode = document.querySelector(".mode");
//   const selection = document.querySelector(".selection");
//   const footer = document.querySelector(".footer");

//   if (action === "dim") {
//     github.style.opacity = 1;
//     title.style.opacity = 1;
//     mode.style.opacity = 1;
//     selection.style.opacity = 1;
//     footer.style.opacity = 1;
//   } else {
//     github.style.opacity = 0.1;
//     title.style.opacity = 0.3;
//     mode.style.opacity = 0.2;
//     selection.style.opacity = 0.1;
//     footer.style.opacity = 0.1;
//   }
// };

// // Toggle event for search input
// // showing & hidding results list onfocus / blur
// ["focus", "blur"].forEach(function (eventType) {
//   const resultsList = document.querySelector("#autoComplete_list");

//   document.querySelector("#autoComplete").addEventListener(eventType, function () {
//     // Hide results list & show other elemennts
//     if (eventType === "blur") {
//       action("dim");
//       resultsList.style.display = "none";
//     } else if (eventType === "focus") {
//       // Show results list & hide other elemennts
//       action("light");
//       resultsList.style.display = "block";
//     }
//   });

// });


// function autocomplete(inp, arr) {
//     console.log(inp);
//     console.log(arr);
    
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false;}
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//           /*check if the item starts with the same letters as the text field value:*/
//           if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//             /*create a DIV element for each matching element:*/
//             b = document.createElement("DIV");
//             /*make the matching letters bold:*/
//             b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//             b.innerHTML += arr[i].substr(val.length);
//             /*insert a input field that will hold the current array item's value:*/
//             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//             /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function(e) {
//                 /*insert the value for the autocomplete text field:*/
//                 inp.value = this.getElementsByTagName("input")[0].value;
//                 /*close the list of autocompleted values,
//                 (or any other open lists of autocompleted values:*/
//                 closeAllLists();
//             });
//             a.appendChild(b);
//           }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function(e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//           /*If the arrow DOWN key is pressed,
//           increase the currentFocus variable:*/
//           currentFocus++;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 38) { //up
//           /*If the arrow UP key is pressed,
//           decrease the currentFocus variable:*/
//           currentFocus--;
//           /*and and make the current item more visible:*/
//           addActive(x);
//         } else if (e.keyCode == 13) {
//           /*If the ENTER key is pressed, prevent the form from being submitted,*/
//           e.preventDefault();
//           if (currentFocus > -1) {
//             /*and simulate a click on the "active" item:*/
//             if (x) x[currentFocus].click();
//           }
//         }
//     });
//     function addActive(x) {
//       /*a function to classify an item as "active":*/
//       if (!x) return false;
//       /*start by removing the "active" class on all items:*/
//       removeActive(x);
//       if (currentFocus >= x.length) currentFocus = 0;
//       if (currentFocus < 0) currentFocus = (x.length - 1);
//       /*add class "autocomplete-active":*/
//       x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//       /*a function to remove the "active" class from all autocomplete items:*/
//       for (var i = 0; i < x.length; i++) {
//         x[i].classList.remove("autocomplete-active");
//       }
//     }
//     function closeAllLists(elmnt) {
//       /*close all autocomplete lists in the document,
//       except the one passed as an argument:*/
//       var x = document.getElementsByClassName("autocomplete-items");
//       for (var i = 0; i < x.length; i++) {
//         if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
//   /*execute a function when someone clicks in the document:*/
//   document.addEventListener("click", function (e) {
//       closeAllLists(e.target);
//   });
//   } 


// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//   typeof define === 'function' && define.amd ? define(factory) :
//   (global.autoComplete = factory());
// }(this, (function () { 'use strict';

//   function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//       throw new TypeError("Cannot call a class as a function");
//     }
//   }

//   function _defineProperties(target, props) {
//     for (var i = 0; i < props.length; i++) {
//       var descriptor = props[i];
//       descriptor.enumerable = descriptor.enumerable || false;
//       descriptor.configurable = true;
//       if ("value" in descriptor) descriptor.writable = true;
//       Object.defineProperty(target, descriptor.key, descriptor);
//     }
//   }

//   function _createClass(Constructor, protoProps, staticProps) {
//     if (protoProps) _defineProperties(Constructor.prototype, protoProps);
//     if (staticProps) _defineProperties(Constructor, staticProps);
//     return Constructor;
//   }

//   var dataAttribute = "data-id";
//   var select = {
//     resultsList: "autoComplete_list",
//     result: "autoComplete_result",
//     highlight: "autoComplete_highlighted",
//     selectedResult: "autoComplete_selected"
//   };
//   var keys = {
//     ENTER: 13,
//     ARROW_UP: 38,
//     ARROW_DOWN: 40
//   };
//   var getInput = function getInput(selector) {
//     return typeof selector === "string" ? document.querySelector(selector) : selector();
//   };
//   var createResultsList = function createResultsList(renderResults) {
//     var resultsList = document.createElement(renderResults.element);
//     resultsList.setAttribute("id", select.resultsList);
//     if (renderResults.container) {
//       renderResults.container(resultsList);
//     }
//     renderResults.destination.insertAdjacentElement(renderResults.position, resultsList);
//     return resultsList;
//   };
//   var highlight = function highlight(value) {
//     return "<span class=".concat(select.highlight, ">").concat(value, "</span>");
//   };
//   var addResultsToList = function addResultsToList(resultsList, dataSrc, resultItem) {
//     var fragment = document.createDocumentFragment();
//     dataSrc.forEach(function (event, record) {
//       var result = document.createElement(resultItem.element);
//       var resultIndex = dataSrc[record].index;
//       result.setAttribute(dataAttribute, resultIndex);
//       result.setAttribute("class", select.result);
//       resultItem.content ? resultItem.content(event, result) : result.innerHTML = event.match || event;
//       fragment.appendChild(result);
//     });
//     resultsList.appendChild(fragment);
//   };
//   var clearResults = function clearResults(resultsList) {
//     return resultsList.innerHTML = "";
//   };
//   var onSelection = function onSelection(event, field, resultsList, feedback, resultsValues, selection) {
//     feedback({
//       event: event,
//       query: field instanceof HTMLInputElement ? field.value : field.innerHTML,
//       matches: resultsValues.matches,
//       results: resultsValues.list.map(function (record) {
//         return record.value;
//       }),
//       selection: resultsValues.list.find(function (value) {
//         if (event.keyCode === keys.ENTER) {
//           return value.index === Number(selection.getAttribute(dataAttribute));
//         } else if (event.type === "mousedown") {
//           return value.index === Number(event.currentTarget.getAttribute(dataAttribute));
//         }
//       })
//     });
//     clearResults(resultsList);
//   };
//   var navigation = function navigation(input, resultsList, feedback, resultsValues) {
//     var li = resultsList.childNodes,
//         liLength = li.length - 1;
//     var liSelected = undefined,
//         next;
//     var removeSelection = function removeSelection(direction) {
//       liSelected.classList.remove(select.selectedResult);
//       if (direction === 1) {
//         next = liSelected.nextSibling;
//       } else {
//         next = liSelected.previousSibling;
//       }
//     };
//     var highlightSelection = function highlightSelection(current) {
//       liSelected = current;
//       liSelected.classList.add(select.selectedResult);
//     };
//     input.onkeydown = function (event) {
//       if (li.length > 0) {
//         switch (event.keyCode) {
//           case keys.ARROW_UP:
//             if (liSelected) {
//               removeSelection(0);
//               if (next) {
//                 highlightSelection(next);
//               } else {
//                 highlightSelection(li[liLength]);
//               }
//             } else {
//               highlightSelection(li[liLength]);
//             }
//             break;
//           case keys.ARROW_DOWN:
//             if (liSelected) {
//               removeSelection(1);
//               if (next) {
//                 highlightSelection(next);
//               } else {
//                 highlightSelection(li[0]);
//               }
//             } else {
//               highlightSelection(li[0]);
//             }
//             break;
//           case keys.ENTER:
//             if (liSelected) {
//               onSelection(event, input, resultsList, feedback, resultsValues, liSelected);
//             }
//         }
//       }
//     };
//     li.forEach(function (selection) {
//       selection.onmousedown = function (event) {
//         return onSelection(event, input, resultsList, feedback, resultsValues);
//       };
//     });
//   };
//   var autoCompleteView = {
//     getInput: getInput,
//     createResultsList: createResultsList,
//     highlight: highlight,
//     addResultsToList: addResultsToList,
//     navigation: navigation,
//     clearResults: clearResults
//   };

//   var CustomEventPolyfill = function CustomEventPolyfill(event, params) {
//     params = params || {
//       bubbles: false,
//       cancelable: false,
//       detail: undefined
//     };
//     var evt = document.createEvent("CustomEvent");
//     evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
//     return evt;
//   };
//   CustomEventPolyfill.prototype = window.Event.prototype;
//   var CustomEventWrapper = typeof window.CustomEvent === "function" && window.CustomEvent || CustomEventPolyfill;
//   var initElementClosestPolyfill = function initElementClosestPolyfill() {
//     if (!Element.prototype.matches) {
//       Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
//     }
//     if (!Element.prototype.closest) {
//       Element.prototype.closest = function (s) {
//         var el = this;
//         do {
//           if (el.matches(s)) {
//             return el;
//           }
//           el = el.parentElement || el.parentNode;
//         } while (el !== null && el.nodeType === 1);
//         return null;
//       };
//     }
//   };
//   var Polyfill = {
//     CustomEventWrapper: CustomEventWrapper,
//     initElementClosestPolyfill: initElementClosestPolyfill
//   };

//   var autoComplete =
//   function () {
//     function autoComplete(config) {
//       _classCallCheck(this, autoComplete);
//       var _config$selector = config.selector,
//           selector = _config$selector === void 0 ? "#search" : _config$selector,
//           _config$data = config.data,
//           key = _config$data.key,
//           _src = _config$data.src,
//           _config$data$cache = _config$data.cache,
//           cache = _config$data$cache === void 0 ? true : _config$data$cache,
//           query = config.query,
//           _config$trigger = config.trigger;
//       _config$trigger = _config$trigger === void 0 ? {} : _config$trigger;
//       var _config$trigger$event = _config$trigger.event,
//           event = _config$trigger$event === void 0 ? ["input"] : _config$trigger$event,
//           _config$trigger$condi = _config$trigger.condition,
//           condition = _config$trigger$condi === void 0 ? false : _config$trigger$condi,
//           _config$searchEngine = config.searchEngine,
//           searchEngine = _config$searchEngine === void 0 ? "strict" : _config$searchEngine,
//           _config$threshold = config.threshold,
//           threshold = _config$threshold === void 0 ? 0 : _config$threshold,
//           _config$debounce = config.debounce,
//           debounce = _config$debounce === void 0 ? 0 : _config$debounce,
//           _config$resultsList = config.resultsList;
//       _config$resultsList = _config$resultsList === void 0 ? {} : _config$resultsList;
//       var _config$resultsList$r = _config$resultsList.render,
//           render = _config$resultsList$r === void 0 ? false : _config$resultsList$r,
//           _config$resultsList$c = _config$resultsList.container,
//           container = _config$resultsList$c === void 0 ? false : _config$resultsList$c,
//           destination = _config$resultsList.destination,
//           _config$resultsList$p = _config$resultsList.position,
//           position = _config$resultsList$p === void 0 ? "afterend" : _config$resultsList$p,
//           _config$resultsList$e = _config$resultsList.element,
//           resultsListElement = _config$resultsList$e === void 0 ? "ul" : _config$resultsList$e,
//           _config$resultsList$n = _config$resultsList.navigation,
//           navigation = _config$resultsList$n === void 0 ? false : _config$resultsList$n,
//           _config$sort = config.sort,
//           sort = _config$sort === void 0 ? false : _config$sort,
//           placeHolder = config.placeHolder,
//           _config$maxResults = config.maxResults,
//           maxResults = _config$maxResults === void 0 ? 5 : _config$maxResults,
//           _config$resultItem = config.resultItem;
//       _config$resultItem = _config$resultItem === void 0 ? {} : _config$resultItem;
//       var _config$resultItem$co = _config$resultItem.content,
//           content = _config$resultItem$co === void 0 ? false : _config$resultItem$co,
//           _config$resultItem$el = _config$resultItem.element,
//           resultItemElement = _config$resultItem$el === void 0 ? "li" : _config$resultItem$el,
//           noResults = config.noResults,
//           _config$highlight = config.highlight,
//           highlight = _config$highlight === void 0 ? false : _config$highlight,
//           onSelection = config.onSelection;
//       var resultsListView = render ? autoCompleteView.createResultsList({
//         container: container,
//         destination: destination || autoCompleteView.getInput(selector),
//         position: position,
//         element: resultsListElement
//       }) : null;
//       this.selector = selector;
//       this.data = {
//         src: function src() {
//           return typeof _src === "function" ? _src() : _src;
//         },
//         key: key,
//         cache: cache
//       };
//       this.query = query;
//       this.trigger = {
//         event: event,
//         condition: condition
//       };
//       this.searchEngine = searchEngine === "loose" ? "loose" : typeof searchEngine === "function" ? searchEngine : "strict";
//       this.threshold = threshold;
//       this.debounce = debounce;
//       this.resultsList = {
//         render: render,
//         view: resultsListView,
//         navigation: navigation
//       };
//       this.sort = sort;
//       this.placeHolder = placeHolder;
//       this.maxResults = maxResults;
//       this.resultItem = {
//         content: content,
//         element: resultItemElement
//       };
//       this.noResults = noResults;
//       this.highlight = highlight;
//       this.onSelection = onSelection;
//       this.init();
//     }
//     _createClass(autoComplete, [{
//       key: "search",
//       value: function search(query, record) {
//         var recordLowerCase = record.toLowerCase();
//         if (this.searchEngine === "loose") {
//           query = query.replace(/ /g, "");
//           var match = [];
//           var searchPosition = 0;
//           for (var number = 0; number < recordLowerCase.length; number++) {
//             var recordChar = record[number];
//             if (searchPosition < query.length && recordLowerCase[number] === query[searchPosition]) {
//               recordChar = this.highlight ? autoCompleteView.highlight(recordChar) : recordChar;
//               searchPosition++;
//             }
//             match.push(recordChar);
//           }
//           if (searchPosition !== query.length) {
//             return false;
//           }
//           return match.join("");
//         } else {
//           if (recordLowerCase.includes(query)) {
//             var pattern = new RegExp("".concat(query), "i");
//             query = pattern.exec(record);
//             return this.highlight ? record.replace(query, autoCompleteView.highlight(query)) : record;
//           }
//         }
//       }
//     }, {
//       key: "listMatchedResults",
//       value: function listMatchedResults(data) {
//         var _this = this;
//         return new Promise(function (resolve) {
//           var resList = [];
//           data.filter(function (record, index) {
//             var search = function search(key) {
//               var recordValue = key ? record[key] : record;
//               if (recordValue) {
//                 var match = typeof _this.searchEngine === "function" ? _this.searchEngine(_this.queryValue, recordValue) : _this.search(_this.queryValue, recordValue);
//                 if (match && key) {
//                   resList.push({
//                     key: key,
//                     index: index,
//                     match: match,
//                     value: record
//                   });
//                 } else if (match && !key) {
//                   resList.push({
//                     index: index,
//                     match: match,
//                     value: record
//                   });
//                 }
//               }
//             };
//             if (_this.data.key) {
//               var _iteratorNormalCompletion = true;
//               var _didIteratorError = false;
//               var _iteratorError = undefined;
//               try {
//                 for (var _iterator = _this.data.key[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
//                   var key = _step.value;
//                   search(key);
//                 }
//               } catch (err) {
//                 _didIteratorError = true;
//                 _iteratorError = err;
//               } finally {
//                 try {
//                   if (!_iteratorNormalCompletion && _iterator["return"] != null) {
//                     _iterator["return"]();
//                   }
//                 } finally {
//                   if (_didIteratorError) {
//                     throw _iteratorError;
//                   }
//                 }
//               }
//             } else {
//               search();
//             }
//           });
//           var list = _this.sort ? resList.sort(_this.sort).slice(0, _this.maxResults) : resList.slice(0, _this.maxResults);
//           return resolve({
//             matches: resList.length,
//             list: list
//           });
//         });
//       }
//     }, {
//       key: "ignite",
//       value: function ignite() {
//         var _this2 = this;
//         var input = autoCompleteView.getInput(this.selector);
//         if (this.placeHolder) {
//           input.setAttribute("placeholder", this.placeHolder);
//         }
//         var debounce = function debounce(func, delay) {
//           var inDebounce;
//           return function () {
//             var context = this;
//             var args = arguments;
//             clearTimeout(inDebounce);
//             inDebounce = setTimeout(function () {
//               return func.apply(context, args);
//             }, delay);
//           };
//         };
//         var exec = function exec(event) {
//           var inputValue = input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement ? input.value.toLowerCase() : input.innerHTML.toLowerCase();
//           var queryValue = _this2.queryValue = _this2.query && _this2.query.manipulate ? _this2.query.manipulate(inputValue) : inputValue;
//           var renderResultsList = _this2.resultsList.render;
//           var triggerCondition = _this2.trigger.condition ? _this2.trigger.condition(queryValue) : queryValue.length > _this2.threshold && queryValue.replace(/ /g, "").length;
//           var eventEmitter = function eventEmitter(event, results) {
//             input.dispatchEvent(new Polyfill.CustomEventWrapper("search", {
//               bubbles: true,
//               detail: {
//                 event: event,
//                 input: inputValue,
//                 query: queryValue,
//                 matches: results ? results.matches : null,
//                 results: results ? results.list : null
//               },
//               cancelable: true
//             }));
//           };
//           if (renderResultsList) {
//             var resultsList = _this2.resultsList.view;
//             var clearResults = autoCompleteView.clearResults(resultsList);
//             if (triggerCondition) {
//               _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
//                 eventEmitter(event, list);
//                 if (_this2.resultsList.render) {
//                   if (list.list.length === 0 && _this2.noResults) {
//                     _this2.noResults();
//                   } else {
//                     autoCompleteView.addResultsToList(resultsList, list.list, _this2.resultItem);
//                     if (_this2.onSelection) {
//                       _this2.resultsList.navigation ? _this2.resultsList.navigation(event, input, resultsList, _this2.onSelection, list) : autoCompleteView.navigation(input, resultsList, _this2.onSelection, list);
//                     }
//                   }
//                 }
//               });
//             } else {
//               eventEmitter(event);
//             }
//           } else if (!renderResultsList && triggerCondition) {
//             _this2.listMatchedResults(_this2.dataStream, event).then(function (list) {
//               eventEmitter(event, list);
//             });
//           }
//         };
//         var run = function run(event) {
//           Promise.resolve(_this2.data.cache ? _this2.dataStream : _this2.data.src()).then(function (data) {
//             _this2.dataStream = data;
//             exec(event);
//           });
//         };
//         this.trigger.event.forEach(function (eventType) {
//           input.addEventListener(eventType, debounce(function (event) {
//             return run(event);
//           }, _this2.debounce));
//         });
//       }
//     }, {
//       key: "init",
//       value: function init() {
//         var _this3 = this;
//         if (this.data.cache) {
//           Promise.resolve(this.data.src()).then(function (data) {
//             _this3.dataStream = data;
//             _this3.ignite();
//           });
//         } else {
//           this.ignite();
//         }
//         Polyfill.initElementClosestPolyfill();
//       }
//     }]);
//     return autoComplete;
//   }();

//   return autoComplete;

// })));
