"use strict";(self.webpackChunkasteriods_3d=self.webpackChunkasteriods_3d||[]).push([[179],{133:()=>{function t(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return r(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}var n=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return r.reduce((function(t,r){return t+r}),0)},e=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return r[0].map((function(t,n){return r.map((function(t){return t[n]}))}))},o=function t(r,n){for(var e=r.filter((function(t){return n.includes(t)})),o=arguments.length,i=new Array(o>2?o-2:0),a=2;a<o;a++)i[a-2]=arguments[a];return i.length>0?t.apply(void 0,[e].concat(i)):e},i=function(){var r;return t(new Set((r=[]).concat.apply(r,arguments)))},a=["id"];function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t,r){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),n.push.apply(n,e)}return n}function l(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?c(Object(n),!0).forEach((function(r){f(t,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))}))}return t}function f(t,r,n){return r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}function d(t,r){if(null==t)return{};var n,e,o=function(t,r){if(null==t)return{};var n,e,o={},i=Object.keys(t);for(e=0;e<i.length;e++)n=i[e],r.indexOf(n)>=0||(o[n]=t[n]);return o}(t,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(e=0;e<i.length;e++)n=i[e],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function y(t){var r=function(t,r){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var e=n.call(t,r||"default");if("object"!==u(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"===u(r)?r:String(r)}var s=function(t,r){r in t.byId||console.warn("Missing item to remove",r);var n=t.byId,e=(n[r],d(n,[r].map(y)));return l(l({},t),{},{allIds:t.allIds.filter((function(t){return t!==r})),byId:e})},h=function(t,r){return r.id in t.byId||console.warn("Missing item to patch",r),l(l({},t),{},{byId:l(l({},t.byId),{},f({},r.id,l(l({},t.byId[r.id]),r)))})},p=function(t,r){return r.id in t.byId&&console.warn("Item already exists",r),l(l({},t),{},{allIds:i(t.allIds,r.id),byId:l(l({},t.byId),{},f({},r.id,l({},r)))})},v={allIds:[],byId:{}},m=function(t){var r=t.toUpperCase(),n="ADD_".concat(r),e="UPDATE_".concat(r),o="REMOVE_".concat(r),i="CLEAR".concat(r),u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,r=arguments.length>1?arguments[1]:void 0,i=r.type,u=r.payload,c=(u=void 0===u?{}:u).id,f=d(u,a);switch(i){case n:return p(t,l({id:c},f));case e:return h(t,l({id:c},f));case o:return s(t,c);default:return t}};return u.add=function(t,r){return{type:n,payload:l({id:t},r)}},u.update=function(t,r){return{type:e,payload:l({id:t},r)}},u.remove=function(t){return{type:o,payload:{id:t}}},u.clear=function(){return{type:i,payload:{}}},u};const b=m("stage");const g=m("position");const w=m("polyhedron");const I=m("rotation");const A=m("keyPressed");const M=m("orientation"),S=(O={stage:b,position:g,polyhedron:w,rotation:I,keyPressed:A,orientation:M},function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;return Object.keys(O).reduce((function(n,e){return n[e]=O[e](t[e],r),n}),{})});var O;function j(t){return function(t){if(Array.isArray(t))return E(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,r){if(!t)return;if("string"==typeof t)return E(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(t,r)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}const k=JSON.parse("[[[4,0,0],[-2,2,0],[0,0,1]],[[-2,2,0],[-2,-2,0],[0,0,1]],[[-2,-2,0],[4,0,0],[0,0,1]]]");function P(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var e,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(e=n.next()).done)&&(i.push(e.value),!r||i.length!==r);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}(t,r)||x(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(t){return function(t){if(Array.isArray(t))return R(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||x(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t,r){if(t){if("string"==typeof t)return R(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(t,r):void 0}}function R(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}var T=function(t){return Math.sqrt(n.apply(void 0,V(t.map((function(t){return Math.pow(t,2)})))))},C=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return r[0].map((function(t,n){return r.reduce((function(t,r){return t+r[n]}),0)}))},D=function(t,r){return t.map((function(t,n){return t-r[n]}))},U=function(t,r){return r.map((function(r){return r*t}))},L=function(t,r){var e=t.map((function(t,n){return t*r[n]}));return n.apply(void 0,V(e))},W=function(t,r){return L(t,r)/T(r)},_=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[1,0,0],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,1,0];return[W(t,r),W(t,n)]},q=function(t){return U(1/T(t),t)},F=function(t){return r=D(t[1],t[0]),n=D(t[2],t[0]),e=P(r,3),o=e[0],i=e[1],a=e[2],u=P(n,3),c=u[0],l=u[1],f=u[2],[i*f-a*l,a*c-o*f,o*l-i*c];var r,n,e,o,i,a,u,c,l,f},$=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),e=1;e<r;e++)n[e-1]=arguments[e];var o=t.map((function(t,r){return U(t,n[r])}));return C.apply(void 0,V(o))},H=function(t,r){return $.apply(void 0,[r].concat(V(e.apply(void 0,V(t)))))},N=function(t,r,n){return Math.max(r,Math.min(t,n))},J=function(t,r,n,e,o){return t+(r-t)*((o-n)/(e-n))},z=function(t,r){return Math.floor(Math.random()*(r-t+1)+t)},B=function(t,r){return Math.random()*(r-t)+t};function G(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var e,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(e=n.next()).done)&&(i.push(e.value),!r||i.length!==r);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return K(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return K(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}var Q=[1,2,3],X=[1,0,0],Y=[0,1,0];var Z,tt,rt,nt,et={width:128,height:72},ot=function(t){var r,n=[],e=function(e){r=t(r,e),n.forEach((function(t){return t()}))};return e({}),{getState:function(){return r},dispatch:e,subscribe:function(t){return n.push(t),function(){t=t.filter((function(r){return r!==t}))}}}}(S),it=function(t){var r,n,e=[],o=performance.now(),i=(r=function(){var r=performance.now(),n=r-o;e.forEach((function(r){return r(t.getState,t.dispatch,n)})),o=r},function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];n&&cancelAnimationFrame(n),n=requestAnimationFrame((function(){r.apply(void 0,e)}))});return{addTask:function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return e=[].concat(j(e),r),function(){e=e.filter((function(t){return t!==task}))}},run:i}}(ot),at=function(t){for(var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.createElement(t),e=0,o=Object.keys(r);e<o.length;e++){var i=o[e];n.setAttribute(i,r[i])}return n}("canvas",{width:480,height:270});document.body.appendChild(at),ot.subscribe(it.run),it.addTask((Z=0,function(t,r,n){var e=t().stage.byId[Z],o=e.ctx,i=e.width,a=e.height;o.clearRect(0,0,i,a)}),(function(t,r,n){var e=t(),i=e.orientation,a=e.rotation,u=o(i.allIds,a.allIds),c=n/1e3;u.forEach((function(t){var n=i.byId[t],e=n.roll,o=n.pitch,u=n.yaw,l=a.byId[t],f=l.rollVelocity,d=l.pitchVelocity,y=l.yawVelocity,s=l.maxRoll,h=void 0===s?1/0:s,p=l.minRoll,v=void 0===p?-1/0:p;0!==y&&r(M.update(t,{yaw:u+y*c})),0!==d&&r(M.update(t,{pitch:o+d*c})),0!==f&&(f<0&&e>=v&&r(M.update(t,{roll:e+f*c})),f>0&&e<=h&&r(M.update(t,{roll:e+f*c})))}))}),function(t){return function(r,n,e){var i=r(),a=i.polyhedron,u=i.position,c=i.orientation,l=i.stage,f=o(a.allIds,u.allIds,c.allIds),d=function(t,r){return t.face[0][2]-r.face[0][2]},y=[];f.forEach((function(t){var r=a.byId[t],n=r.faces,e=r.color,o=void 0===e?[0,0,0]:e,i=r.colors,u=void 0===i?[]:i,l=c.byId[t],f=l.roll,s=l.pitch,h=l.yaw;n.forEach((function(r,n){r=r.map((function(t){return function(t,r,n,e){var o=[[Math.cos(t)*Math.cos(r),Math.cos(t)*Math.sin(r)*Math.sin(n)-Math.sin(t)*Math.cos(n),Math.cos(t)*Math.sin(r)*Math.cos(n)+Math.sin(t)*Math.sin(n)],[Math.sin(t)*Math.cos(r),Math.sin(t)*Math.sin(r)*Math.sin(n)+Math.cos(t)*Math.cos(n),Math.sin(t)*Math.sin(r)*Math.cos(n)-Math.cos(t)*Math.sin(n)],[-Math.sin(r),Math.cos(r)*Math.sin(n),Math.cos(r)*Math.cos(n)]];return H(o,e)}(h,s,f,t)}));var e=u.length?u[n]:o;if(F(r)[2]>0){var i=function(t,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t,r){return t-r},e=0,o=t.length;e<o;){var i=Math.floor((e+o)/2);n(t[i],r)<0?e=i+1:o=i}return e}(y,{face:r},d);!function(t,r,n){t.splice(r,0,n)}(y,i,{id:t,face:r,color:e})}}))}));var s=l.byId[t],h=s.ctx,p=function(t,r,n,e){return function(o,i){return[t/2+t*o/n,r/2-r*i/e]}}(s.width,s.height,s.localWidth,s.localHeight);y.forEach((function(t){var r=t.id,n=t.face,e=function(t,r){var n=0;r>0?n=J(0,80,0,1,r):r<0&&(n=J(-100,0,-1,0,r));var e=N(t[0]+Math.floor(n/100*255),0,255),o=N(t[1]+Math.floor(n/100*255),0,255),i=N(t[2]+Math.floor(n/100*255),0,255);return"rgb(".concat(e,",").concat(o,",").concat(i,")")}(t.color,L(q(F(n)),q(Q))),o=u.byId[r].coords,i=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[1,0,0],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,1,0];return t.map((function(t){return _(t,r,n)}))}(n.map((function(t){return C(o,t)})),X,Y).map((function(t){var r=G(t,2),n=r[0],e=r[1];return p(n,e)}));!function(t,r){t.beginPath(),t.moveTo(r[0][0],r[0][1]);for(var n=1;n<r.length;n++)t.lineTo(r[n][0],r[n][1]);t.closePath()}(h,i),function(t,r){var n=r.fillStyle,e=r.strokeStyle,o=r.lineWidth;n&&(t.fillStyle=n,t.fill()),e&&o&&(t.strokeStyle=e,t.lineWidth=o,t.stroke())}(h,{lineWidth:1,strokeStyle:e,fillStyle:e})}))}}(0)),function(t,r,n){var e=n.canvasElement,o=n.world,i=n.id,a=e.getContext("2d"),u=e.width,c=e.height;r(b.add(i,{ctx:a,width:u,height:c,localWidth:o.width,localHeight:o.height}))}(ot.getState,ot.dispatch,{canvasElement:at,world:et,id:0}),tt=ot.getState,rt=ot.dispatch,nt={id:1}.id,rt(g.add(nt,{coords:[0,0,0]})),rt(M.add(nt,{roll:0,pitch:0,yaw:0})),rt(I.add(nt,{rollVelocity:0,pitchVelocity:0,yawVelocity:0})),rt(w.add(nt,{faces:k,color:[0,0,255]})),window.addEventListener("keydown",(function(t){t.repeat||("ArrowLeft"===t.code&&(rt({}),requestAnimationFrame((function(){rt(I.update(nt,{yawVelocity:2})),rt(I.update(nt,{rollVelocity:-4,minRoll:-.6}))}))),"ArrowRight"===t.code&&(rt({}),requestAnimationFrame((function(){rt(I.update(nt,{yawVelocity:-2})),rt(I.update(nt,{rollVelocity:4,maxRoll:.6}))}))))})),window.addEventListener("keyup",(function(t){var r=tt().rotation;if("ArrowLeft"===t.code||"ArrowRight"===t.code){rt(I.update(nt,{yawVelocity:0}));var n=r.byId[nt].rollVelocity<0?4:-4;rt(I.update(nt,{rollVelocity:n,minRoll:0,maxRoll:0}))}})),function(r,n,e){var o=e.minId,i=e.maxId,a=e.world,u=a.width/2,c=a.height/2;(function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t(Array(r).keys()).map((function(t){return t+n}))})(i-o+1,o).forEach((function(t){n(g.add(t,{coords:[z(-u,u),z(-c,c),0]})),n(M.add(t,{roll:0,pitch:B(0,2*Math.PI),yaw:B(0,2*Math.PI)})),n(I.add(t,{rollVelocity:B(.5,2),pitchVelocity:0,yawVelocity:0}));var r=B(1,2);n(w.add(t,{faces:[[[1,0,0],[0,1,0],[0,0,1]],[[1,0,0],[0,0,-1],[0,1,0]],[[1,0,0],[0,0,1],[0,-1,0]],[[1,0,0],[0,-1,0],[0,0,-1]],[[-1,0,0],[0,0,1],[0,1,0]],[[-1,0,0],[0,1,0],[0,0,-1]],[[-1,0,0],[0,-1,0],[0,0,1]],[[-1,0,0],[0,0,-1],[0,-1,0]]].map((function(t){return t.map((function(t){return U(r,t)}))})),color:[128,128,128]}))}))}(ot.getState,ot.dispatch,{minId:2,maxId:5,world:et})}},t=>{var r;r=133,t(t.s=r)}]);
//# sourceMappingURL=main.05f3b63249e2f465aa29.js.map