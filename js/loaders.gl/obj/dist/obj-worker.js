!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=19)}([function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){var n=r(18);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){t.exports=r(13)},function(t,e){function r(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,o)}t.exports=function(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function s(t){r(a,o,i,s,u,"next",t)}function u(t){r(a,o,i,s,u,"throw",t)}s(void 0)}))}},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){var n=r(14),o=r(15),i=r(16),a=r(17);t.exports=function(t){return n(t)||o(t)||i(t)||a()},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){function r(e){return t.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.default=t.exports,t.exports.__esModule=!0,r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){var n=r(7).default,o=r(4);t.exports=function(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?o(t):e},t.exports.default=t.exports,t.exports.__esModule=!0},,function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return I()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=x(a,r);if(s){if(s===l)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=c(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function p(){}function h(){}var d={};d[o]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(j([])));y&&y!==e&&r.call(y,o)&&(d=y);var m=h.prototype=f.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var n;this._invoke=function(o,i){function a(){return new e((function(n,a){!function n(o,i,a,s){var u=c(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,s)}))}s(u.arg)}(o,i,n,a)}))}return n=n?n.then(a,a):a()}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=c(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function j(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:I}}function I(){return{value:void 0,done:!0}}return p.prototype=m.constructor=h,h.constructor=p,p.displayName=s(h,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,h):(t.__proto__=h,s(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(b.prototype),b.prototype[i]=function(){return this},t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),s(m,a,"Generator"),m[o]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:j(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,e,r){var n=r(10);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){var n=r(10);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},t.exports.default=t.exports,t.exports.__esModule=!0,r(e,n)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,r){"use strict";r.r(e);var n=r(2),o=r.n(n),i=r(6),a=r.n(i),s=r(5),u=r.n(s),c=r(0),l=r.n(c),f=r(3),p=r.n(f),h=r(7),d=r.n(h);function v(t){return!!t&&(t instanceof ArrayBuffer||("undefined"!=typeof MessagePort&&t instanceof MessagePort||("undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap||"undefined"!=typeof OffscreenCanvas&&t instanceof OffscreenCanvas)))}var y=new Map,m=function(){function t(){l()(this,t)}return p()(t,null,[{key:"onmessage",set:function(t){self.onmessage=function(e){if(g(e)){var r=e.data,n=r.type,o=r.payload;t(n,o)}}}},{key:"addEventListener",value:function(t){var e=y.get(t);e||(e=function(e){if(g(e)){var r=e.data,n=r.type,o=r.payload;t(n,o)}}),self.addEventListener("message",e)}},{key:"removeEventListener",value:function(t){var e=y.get(t);y.delete(t),self.removeEventListener("message",e)}},{key:"postMessage",value:function(t,e){if(self){var r={source:"loaders.gl",type:t,payload:e},n=function t(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2?arguments[2]:void 0,o=n||new Set;if(e){if(v(e))o.add(e);else if(v(e.buffer))o.add(e.buffer);else if(ArrayBuffer.isView(e));else if(r&&"object"===d()(e))for(var i in e)t(e[i],r,o)}else;return void 0===n?Array.from(o):[]}(e);self.postMessage(r,n)}}}]),t}();function g(t){var e=t.type,r=t.data;return"message"===e&&r&&"string"==typeof r.source&&r.source.startsWith("loaders.gl")}function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=0;function O(t,e){return new Promise((function(r,n){var o=w++;m.addEventListener((function t(e,i){if(i.id===o)switch(e){case"done":m.removeEventListener(t),r(i.result);break;case"error":m.removeEventListener(t),n(i.error)}}));var i={id:o,input:t,options:e};m.postMessage("process",i)}))}function S(t){return j.apply(this,arguments)}function j(){return(j=a()(u.a.mark((function t(e){var r,n,o,i,a,s,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.loader,n=e.arrayBuffer,o=e.options,i=e.context,!r.parseSync&&!r.parse){t.next=6;break}a=n,s=r.parseSync||r.parse,t.next=13;break;case 6:if(!r.parseTextSync){t.next=12;break}c=new TextDecoder,a=c.decode(n),s=r.parseTextSync,t.next=13;break;case 12:throw new Error("Could not load data with ".concat(r.name," loader"));case 13:return o=x(x({},o),{},{modules:r&&r.options&&r.options.modules||{},worker:!1}),t.next=16,s(a,x({},o),i,r);case 16:return t.abrupt("return",t.sent);case 17:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function I(t){for(var e=1/0,r=1/0,n=1/0,o=-1/0,i=-1/0,a=-1/0,s=t.POSITION?t.POSITION.value:[],u=s&&s.length,c=0;c<u;c+=3){var l=s[c],f=s[c+1],p=s[c+2];e=l<e?l:e,r=f<r?f:r,n=p<n?p:n,o=l>o?l:o,i=f>i?f:i,a=p>a?p:a}return[[e,r,n],[o,i,a]]}function k(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return _(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var M=/^[og]\s*(.+)?/,T=/^mtllib /,L=/^usemtl /,A=function(){function t(e){var r=e.index,n=e.name,o=void 0===n?"":n,i=e.mtllib,a=e.smooth,s=e.groupStart;l()(this,t),this.index=r,this.name=o,this.mtllib=i,this.smooth=a,this.groupStart=s,this.groupEnd=-1,this.groupCount=-1,this.inherited=!1}return p()(t,[{key:"clone",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.index;return new t({index:e,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0})}}]),t}(),E=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";l()(this,t),this.name=e,this.geometry={vertices:[],normals:[],colors:[],uvs:[]},this.materials=[],this.smooth=!0,this.fromDeclaration=null}return p()(t,[{key:"startMaterial",value:function(t,e){var r=this._finalize(!1);r&&(r.inherited||r.groupCount<=0)&&this.materials.splice(r.index,1);var n=new A({index:this.materials.length,name:t,mtllib:Array.isArray(e)&&e.length>0?e[e.length-1]:"",smooth:void 0!==r?r.smooth:this.smooth,groupStart:void 0!==r?r.groupEnd:0});return this.materials.push(n),n}},{key:"currentMaterial",value:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]}},{key:"_finalize",value:function(t){var e=this.currentMaterial();if(e&&-1===e.groupEnd&&(e.groupEnd=this.geometry.vertices.length/3,e.groupCount=e.groupEnd-e.groupStart,e.inherited=!1),t&&this.materials.length>1)for(var r=this.materials.length-1;r>=0;r--)this.materials[r].groupCount<=0&&this.materials.splice(r,1);return t&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),e}}]),t}(),F=function(){function t(){l()(this,t),this.objects=[],this.object=null,this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.materialLibraries=[],this.startObject("",!1)}return p()(t,[{key:"startObject",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this.object&&!this.object.fromDeclaration)return this.object.name=t,void(this.object.fromDeclaration=e);var r=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object=new E(t),this.object.fromDeclaration=e,r&&r.name&&"function"==typeof r.clone){var n=r.clone(0);n.inherited=!0,this.object.materials.push(n)}this.objects.push(this.object)}},{key:"finalize",value:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)}},{key:"parseVertexIndex",value:function(t,e){var r=parseInt(t);return 3*(r>=0?r-1:r+e/3)}},{key:"parseNormalIndex",value:function(t,e){var r=parseInt(t);return 3*(r>=0?r-1:r+e/3)}},{key:"parseUVIndex",value:function(t,e){var r=parseInt(t);return 2*(r>=0?r-1:r+e/2)}},{key:"addVertex",value:function(t,e,r){var n=this.vertices,o=this.object.geometry.vertices;o.push(n[t+0],n[t+1],n[t+2]),o.push(n[e+0],n[e+1],n[e+2]),o.push(n[r+0],n[r+1],n[r+2])}},{key:"addVertexPoint",value:function(t){var e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])}},{key:"addVertexLine",value:function(t){var e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])}},{key:"addNormal",value:function(t,e,r){var n=this.normals,o=this.object.geometry.normals;o.push(n[t+0],n[t+1],n[t+2]),o.push(n[e+0],n[e+1],n[e+2]),o.push(n[r+0],n[r+1],n[r+2])}},{key:"addColor",value:function(t,e,r){var n=this.colors,o=this.object.geometry.colors;o.push(n[t+0],n[t+1],n[t+2]),o.push(n[e+0],n[e+1],n[e+2]),o.push(n[r+0],n[r+1],n[r+2])}},{key:"addUV",value:function(t,e,r){var n=this.uvs,o=this.object.geometry.uvs;o.push(n[t+0],n[t+1]),o.push(n[e+0],n[e+1]),o.push(n[r+0],n[r+1])}},{key:"addUVLine",value:function(t){var e=this.uvs;this.object.geometry.uvs.push(e[t+0],e[t+1])}},{key:"addFace",value:function(t,e,r,n,o,i,a,s,u){var c=this.vertices.length,l=this.parseVertexIndex(t,c),f=this.parseVertexIndex(e,c),p=this.parseVertexIndex(r,c);if(this.addVertex(l,f,p),void 0!==n&&""!==n){var h=this.uvs.length;l=this.parseUVIndex(n,h),f=this.parseUVIndex(o,h),p=this.parseUVIndex(i,h),this.addUV(l,f,p)}if(void 0!==a&&""!==a){var d=this.normals.length;l=this.parseNormalIndex(a,d),f=a===s?l:this.parseNormalIndex(s,d),p=a===u?l:this.parseNormalIndex(u,d),this.addNormal(l,f,p)}this.colors.length>0&&this.addColor(l,f,p)}},{key:"addPointGeometry",value:function(t){this.object.geometry.type="Points";var e,r=this.vertices.length,n=k(t);try{for(n.s();!(e=n.n()).done;){var o=e.value;this.addVertexPoint(this.parseVertexIndex(o,r))}}catch(t){n.e(t)}finally{n.f()}}},{key:"addLineGeometry",value:function(t,e){this.object.geometry.type="Line";var r,n=this.vertices.length,o=this.uvs.length,i=k(t);try{for(i.s();!(r=i.n()).done;){var a=r.value;this.addVertexLine(this.parseVertexIndex(a,n))}}catch(t){i.e(t)}finally{i.f()}var s,u=k(e);try{for(u.s();!(s=u.n()).done;){var c=s.value;this.addUVLine(this.parseUVIndex(c,o))}}catch(t){u.e(t)}finally{u.f()}}}]),t}(),P=r(8),D=r.n(P);function N(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return U(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return U(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var z=function(){function t(e,r){l()(this,t),o()(this,"fields",void 0),o()(this,"metadata",void 0),function(t,e){if(!t)throw new Error(e||"loader assertion failed.")}(Array.isArray(e)),function(t){var e,r={},n=N(t);try{for(n.s();!(e=n.n()).done;){var o=e.value;r[o.name]&&console.warn("Schema: duplicated field name",o.name,o),r[o.name]=!0}}catch(t){n.e(t)}finally{n.f()}}(e),this.fields=e,this.metadata=r||new Map}return p()(t,[{key:"compareTo",value:function(t){if(this.metadata!==t.metadata)return!1;if(this.fields.length!==t.fields.length)return!1;for(var e=0;e<this.fields.length;++e)if(!this.fields[e].compareTo(t.fields[e]))return!1;return!0}},{key:"select",value:function(){for(var e=Object.create(null),r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];for(var i=0,a=n;i<a.length;i++){var s=a[i];e[s]=!0}var u=this.fields.filter((function(t){return e[t.name]}));return new t(u,this.metadata)}},{key:"selectAt",value:function(){for(var e=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];var i=n.map((function(t){return e.fields[t]})).filter(Boolean);return new t(i,this.metadata)}},{key:"assign",value:function(e){var r,n=this.metadata;if(e instanceof t){var o=e;r=o.fields,n=B(B(new Map,this.metadata),o.metadata)}else r=e;var i,a=Object.create(null),s=N(this.fields);try{for(s.s();!(i=s.n()).done;){var u=i.value;a[u.name]=u}}catch(t){s.e(t)}finally{s.f()}var c,l=N(r);try{for(l.s();!(c=l.n()).done;){var f=c.value;a[f.name]=f}}catch(t){l.e(t)}finally{l.f()}return new t(Object.values(a),n)}}]),t}();function B(t,e){return new Map([].concat(D()(t||new Map),D()(e||new Map)))}var C,V,R,G,W=r(4),Y=r.n(W),$=r(1),J=r.n($),X=r(11),q=r.n(X),H=r(9),K=r.n(H);function Q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=K()(t);if(e){var o=K()(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return q()(this,r)}}!function(t){t[t.NONE=0]="NONE",t[t.Null=1]="Null",t[t.Int=2]="Int",t[t.Float=3]="Float",t[t.Binary=4]="Binary",t[t.Utf8=5]="Utf8",t[t.Bool=6]="Bool",t[t.Decimal=7]="Decimal",t[t.Date=8]="Date",t[t.Time=9]="Time",t[t.Timestamp=10]="Timestamp",t[t.Interval=11]="Interval",t[t.List=12]="List",t[t.Struct=13]="Struct",t[t.Union=14]="Union",t[t.FixedSizeBinary=15]="FixedSizeBinary",t[t.FixedSizeList=16]="FixedSizeList",t[t.Map=17]="Map",t[t.Dictionary=-1]="Dictionary",t[t.Int8=-2]="Int8",t[t.Int16=-3]="Int16",t[t.Int32=-4]="Int32",t[t.Int64=-5]="Int64",t[t.Uint8=-6]="Uint8",t[t.Uint16=-7]="Uint16",t[t.Uint32=-8]="Uint32",t[t.Uint64=-9]="Uint64",t[t.Float16=-10]="Float16",t[t.Float32=-11]="Float32",t[t.Float64=-12]="Float64",t[t.DateDay=-13]="DateDay",t[t.DateMillisecond=-14]="DateMillisecond",t[t.TimestampSecond=-15]="TimestampSecond",t[t.TimestampMillisecond=-16]="TimestampMillisecond",t[t.TimestampMicrosecond=-17]="TimestampMicrosecond",t[t.TimestampNanosecond=-18]="TimestampNanosecond",t[t.TimeSecond=-19]="TimeSecond",t[t.TimeMillisecond=-20]="TimeMillisecond",t[t.TimeMicrosecond=-21]="TimeMicrosecond",t[t.TimeNanosecond=-22]="TimeNanosecond",t[t.DenseUnion=-23]="DenseUnion",t[t.SparseUnion=-24]="SparseUnion",t[t.IntervalDayTime=-25]="IntervalDayTime",t[t.IntervalYearMonth=-26]="IntervalYearMonth"}(C||(C={}));var Z=function(){function t(){l()(this,t)}return p()(t,[{key:"typeId",get:function(){return C.NONE}},{key:"compareTo",value:function(t){return this===t}}],[{key:"isNull",value:function(t){return t&&t.typeId===C.Null}},{key:"isInt",value:function(t){return t&&t.typeId===C.Int}},{key:"isFloat",value:function(t){return t&&t.typeId===C.Float}},{key:"isBinary",value:function(t){return t&&t.typeId===C.Binary}},{key:"isUtf8",value:function(t){return t&&t.typeId===C.Utf8}},{key:"isBool",value:function(t){return t&&t.typeId===C.Bool}},{key:"isDecimal",value:function(t){return t&&t.typeId===C.Decimal}},{key:"isDate",value:function(t){return t&&t.typeId===C.Date}},{key:"isTime",value:function(t){return t&&t.typeId===C.Time}},{key:"isTimestamp",value:function(t){return t&&t.typeId===C.Timestamp}},{key:"isInterval",value:function(t){return t&&t.typeId===C.Interval}},{key:"isList",value:function(t){return t&&t.typeId===C.List}},{key:"isStruct",value:function(t){return t&&t.typeId===C.Struct}},{key:"isUnion",value:function(t){return t&&t.typeId===C.Union}},{key:"isFixedSizeBinary",value:function(t){return t&&t.typeId===C.FixedSizeBinary}},{key:"isFixedSizeList",value:function(t){return t&&t.typeId===C.FixedSizeList}},{key:"isMap",value:function(t){return t&&t.typeId===C.Map}},{key:"isDictionary",value:function(t){return t&&t.typeId===C.Dictionary}}]),t}();V=Symbol.toStringTag;var tt=function(t){J()(r,t);var e=Q(r);function r(t,n){var i;return l()(this,r),i=e.call(this),o()(Y()(i),"isSigned",void 0),o()(Y()(i),"bitWidth",void 0),i.isSigned=t,i.bitWidth=n,i}return p()(r,[{key:"typeId",get:function(){return C.Int}},{key:V,get:function(){return"Int"}},{key:"toString",value:function(){return"".concat(this.isSigned?"I":"Ui","nt").concat(this.bitWidth)}}]),r}(Z),et=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!0,8)}return r}(tt),rt=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!0,16)}return r}(tt),nt=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!0,32)}return r}(tt),ot=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!1,8)}return r}(tt),it=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!1,16)}return r}(tt),at=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,!1,32)}return r}(tt),st=32,ut=64;R=Symbol.toStringTag;var ct=function(t){J()(r,t);var e=Q(r);function r(t){var n;return l()(this,r),n=e.call(this),o()(Y()(n),"precision",void 0),n.precision=t,n}return p()(r,[{key:"typeId",get:function(){return C.Float}},{key:R,get:function(){return"Float"}},{key:"toString",value:function(){return"Float".concat(this.precision)}}]),r}(Z),lt=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,st)}return r}(ct),ft=function(t){J()(r,t);var e=Q(r);function r(){return l()(this,r),e.call(this,ut)}return r}(ct);Symbol.toStringTag;Symbol.toStringTag;Symbol.toStringTag;Symbol.toStringTag;G=Symbol.toStringTag;var pt=function(t){J()(r,t);var e=Q(r);function r(t,n){var i;return l()(this,r),i=e.call(this),o()(Y()(i),"listSize",void 0),o()(Y()(i),"children",void 0),i.listSize=t,i.children=[n],i}return p()(r,[{key:"typeId",get:function(){return C.FixedSizeList}},{key:"valueType",get:function(){return this.children[0].type}},{key:"valueField",get:function(){return this.children[0]}},{key:G,get:function(){return"FixedSizeList"}},{key:"toString",value:function(){return"FixedSizeList[".concat(this.listSize,"]<").concat(this.valueType,">")}}]),r}(Z);Symbol.toStringTag;var ht=function(){function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Map;l()(this,t),o()(this,"name",void 0),o()(this,"type",void 0),o()(this,"nullable",void 0),o()(this,"metadata",void 0),this.name=e,this.type=r,this.nullable=n,this.metadata=i}return p()(t,[{key:"typeId",get:function(){return this.type&&this.type.typeId}},{key:"clone",value:function(){return new t(this.name,this.type,this.nullable,this.metadata)}},{key:"compareTo",value:function(t){return this.name===t.name&&this.type===t.type&&this.nullable===t.nullable&&this.metadata===t.metadata}},{key:"toString",value:function(){return"".concat(this.type).concat(this.nullable?", nullable":"").concat(this.metadata?", metadata: ".concat(this.metadata):"")}}]),t}();function dt(t,e){var r=new Map;for(var n in e)"value"!==n&&r.set(n,JSON.stringify(e[n]));var o=function(t){switch(t.constructor){case Int8Array:return new et;case Uint8Array:return new ot;case Int16Array:return new rt;case Uint16Array:return new it;case Int32Array:return new nt;case Uint32Array:return new at;case Float32Array:return new lt;case Float64Array:return new ft;default:throw new Error("array type not supported")}}(e.value),i=!("size"in e)||1===e.size;return new ht(t,i?o:new pt(e.size,new ht("value",o)),!1,r)}function vt(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return yt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return yt(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(s)throw i}}}}function yt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function mt(t,e){var r=function(t){var e=new F;-1!==t.indexOf("\r\n")&&(t=t.replace(/\r\n/g,"\n")),-1!==t.indexOf("\\\n")&&(t=t.replace(/\\\n/g,""));for(var r=t.split("\n"),n="",o="",i=[],a="function"==typeof"".trimLeft,s=0,u=r.length;s<u;s++)if(n=r[s],0!==(n=a?n.trimLeft():n.trim()).length&&"#"!==(o=n.charAt(0)))if("v"===o){var c=n.split(/\s+/);switch(c[0]){case"v":e.vertices.push(parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[3])),8===c.length&&e.colors.push(parseFloat(c[4]),parseFloat(c[5]),parseFloat(c[6]));break;case"vn":e.normals.push(parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[3]));break;case"vt":e.uvs.push(parseFloat(c[1]),parseFloat(c[2]))}}else if("f"===o){for(var l=n.substr(1).trim().split(/\s+/),f=[],p=0,h=l.length;p<h;p++){var d=l[p];if(d.length>0){var v=d.split("/");f.push(v)}}for(var y=f[0],m=1,g=f.length-1;m<g;m++){var b=f[m],x=f[m+1];e.addFace(y[0],b[0],x[0],y[1],b[1],x[1],y[2],b[2],x[2])}}else if("l"===o){var w=n.substring(1).trim().split(" "),O=void 0,S=[];if(-1===n.indexOf("/"))O=w;else{O=[];for(var j=0,I=w.length;j<I;j++){var _=w[j].split("/");""!==_[0]&&O.push(_[0]),""!==_[1]&&S.push(_[1])}}e.addLineGeometry(O,S)}else if("p"===o){var A=n.substr(1).trim().split(" ");e.addPointGeometry(A)}else if(null!==(i=M.exec(n))){var E=(" "+i[0].substr(1).trim()).substr(1);e.startObject(E)}else if(L.test(n))e.object.startMaterial(n.substring(7).trim(),e.materialLibraries);else if(T.test(n))e.materialLibraries.push(n.substring(7).trim());else{if("s"!==o){if("\0"===n)continue;throw new Error('Unexpected line: "'.concat(n,'"'))}if((i=n.split(" ")).length>1){var P=i[1].trim().toLowerCase();e.object.smooth="0"!==P&&"off"!==P}else e.object.smooth=!0;var D=e.object.currentMaterial();D&&(D.smooth=e.object.smooth)}e.finalize();var N,U=[],z=[],B=k(e.objects);try{for(B.s();!(N=B.n()).done;){var C=N.value,V=C.geometry;if(0!==V.vertices.length){var R={header:{vertexCount:V.vertices.length/3},attributes:{}};switch(V.type){case"Points":R.mode=0;break;case"Line":R.mode=1;break;default:R.mode=4}R.attributes.POSITION={value:new Float32Array(V.vertices),size:3},V.normals.length>0&&(R.attributes.NORMAL={value:new Float32Array(V.normals),size:3}),V.colors.length>0&&(R.attributes.COLOR_0={value:new Float32Array(V.colors),size:3}),V.uvs.length>0&&(R.attributes.TEXCOORD_0={value:new Float32Array(V.uvs),size:2}),R.materials=[];var G,W=k(C.materials);try{for(W.s();!(G=W.n()).done;){var Y=G.value,$={name:Y.name,flatShading:!Y.smooth};R.materials.push($),z.push($)}}catch(t){W.e(t)}finally{W.f()}R.name=C.name,U.push(R)}}}catch(t){B.e(t)}finally{B.f()}return{meshes:U,materials:z}}(t).meshes,n=r.reduce((function(t,e){return t+e.header.vertexCount}),0),o=function(t,e){var r,n,o,i,a=new Float32Array(3*e),s=0,u=vt(t);try{for(u.s();!(i=u.n()).done;){var c=i.value.attributes,l=c.POSITION,f=c.NORMAL,p=c.COLOR_0,h=c.TEXCOORD_0;a.set(l.value,3*s),f&&(r=r||new Float32Array(3*e)).set(f.value,3*s),p&&(n=n||new Float32Array(3*e)).set(p.value,3*s),h&&(o=o||new Float32Array(2*e)).set(h.value,2*s),s+=l.value.length/3}}catch(t){u.e(t)}finally{u.f()}var d={};d.POSITION={value:a,size:3},r&&(d.NORMAL={value:r,size:3});n&&(d.COLOR_0={value:n,size:3});o&&(d.TEXCOORD_0={value:o,size:2});return d}(r,n),i={vertexCount:n,boundingBox:I(o)};return{loaderData:{header:{}},schema:function(t){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var n in r)e=e||new Map,"value"!==n&&e.set(n,JSON.stringify(r[n]));var o=[];for(var i in t){var a=t[i],s=dt(i,a);o.push(s)}return new z(o,e)}(o,{mode:4,boundingBox:i.boundingBox}),header:i,mode:4,attributes:o}}var gt={name:"OBJ",id:"obj",module:"obj",version:"3.0.1",worker:!0,extensions:["obj"],mimeTypes:["text/plain"],testText:function(t){return"v"===t[0]},options:{obj:{}}};function bt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function xt(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?bt(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):bt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var wt,Ot,St=xt(xt({},gt),{},{parse:(wt=a()(u.a.mark((function t(e,r){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",mt((new TextDecoder).decode(e)));case 1:case"end":return t.stop()}}),t)}))),function(t,e){return wt.apply(this,arguments)}),parseTextSync:mt});Ot=St,"undefined"!=typeof self&&(m.onmessage=function(){var t=a()(u.a.mark((function t(e,r){var n,o,i,a,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=e,t.next="process"===t.t0?3:16;break;case 3:return t.prev=3,n=r.input,o=r.options,i=void 0===o?{}:o,t.next=7,S({loader:Ot,arrayBuffer:n,options:i,context:{parse:O}});case 7:a=t.sent,m.postMessage("done",{result:a}),t.next=15;break;case 11:t.prev=11,t.t1=t.catch(3),s=t.t1 instanceof Error?t.t1.message:"",m.postMessage("error",{error:s});case 15:return t.abrupt("break",16);case 16:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e,r){return t.apply(this,arguments)}}())}]);
//# sourceMappingURL=obj-worker.js.map