"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[719],{719:function(e,n,t){t.d(n,{xu:function(){return u}});var r=t(7294),o=t(5697),a=t.n(o),i=t(9680);const s=(0,t(8067).k)(((e,n)=>{let{padding:t}=n;return{root:{boxSizing:"border-box",padding:t&&e.spacing[t]}}}));function c(){return c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},c.apply(this,arguments)}const l={padding:a().number},u=(0,r.forwardRef)(((e,n)=>{let{className:t,noFlex:o,skipFlex:a,padding:l,...u}=e;const{classes:f,cx:p}=s({padding:l});return r.createElement(i.x,c({},u,{ref:n,className:p(f.root,t)}))}));u.defaultProps={},u.propTypes=l},9680:function(e,n,t){t.d(n,{x:function(){return k}});var r=t(7294),o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function s(e){const n=e,{m:t,mx:r,my:s,mt:c,mb:l,ml:u,mr:f,p:p,px:d,py:m,pt:y,pb:v,pl:g,pr:b}=n,h=((e,n)=>{var t={};for(var r in e)a.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&o)for(var r of o(e))n.indexOf(r)<0&&i.call(e,r)&&(t[r]=e[r]);return t})(n,["m","mx","my","mt","mb","ml","mr","p","px","py","pt","pb","pl","pr"]),x={m:t,mx:r,my:s,mt:c,mb:l,ml:u,mr:f,p:p,px:d,py:m,pt:y,pb:v,pl:g,pr:b};return Object.keys(x).forEach((e=>{void 0===x[e]&&delete x[e]})),{systemStyles:x,rest:h}}var c=t(573),l=t(878);const u={mt:"marginTop",mb:"marginBottom",ml:"marginLeft",mr:"marginRight",pt:"paddingTop",pb:"paddingBottom",pl:"paddingLeft",pr:"paddingRight"},f=["-xs","-sm","-md","-lg","-xl"];function p(e){return"string"==typeof e||"number"==typeof e}function d(e,n){return f.includes(e)?-1*n.fn.size({size:e.replace("-",""),sizes:n.spacing}):n.fn.size({size:e,sizes:n.spacing})}function m(e,n){const t={};if(p(e.p)){const r=d(e.p,n);t.padding=r}if(p(e.m)){const r=d(e.m,n);t.margin=r}if(p(e.py)){const r=d(e.py,n);t.paddingTop=r,t.paddingBottom=r}if(p(e.px)){const r=d(e.px,n);t.paddingLeft=r,t.paddingRight=r}if(p(e.my)){const r=d(e.my,n);t.marginTop=r,t.marginBottom=r}if(p(e.mx)){const r=d(e.mx,n);t.marginLeft=r,t.marginRight=r}return Object.keys(u).forEach((r=>{p(e[r])&&(t[u[r]]=n.fn.size({size:d(e[r],n),sizes:n.spacing}))})),t}function y(e,n){return"function"==typeof e?e(n):e}function v(e,n,t){const r=(0,c.rZ)(),{css:o,cx:a}=(0,l.Z)();return Array.isArray(e)?a(t,o(m(n,r)),e.map((e=>o(y(e,r))))):a(t,o(y(e,r)),o(m(n,r)))}var g=Object.defineProperty,b=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,O=(e,n,t)=>n in e?g(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;const k=(0,r.forwardRef)(((e,n)=>{var t=e,{className:o,component:a,style:i,sx:c}=t,l=((e,n)=>{var t={};for(var r in e)h.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&b)for(var r of b(e))n.indexOf(r)<0&&x.call(e,r)&&(t[r]=e[r]);return t})(t,["className","component","style","sx"]);const{systemStyles:u,rest:f}=s(l),p=a||"div";return r.createElement(p,((e,n)=>{for(var t in n||(n={}))h.call(n,t)&&O(e,t,n[t]);if(b)for(var t of b(n))x.call(n,t)&&O(e,t,n[t]);return e})({ref:n,className:v(c,u,o),style:i},f))}));k.displayName="@mantine/core/Box"},8067:function(e,n,t){t.d(n,{k:function(){return i}});var r=t(878),o=t(573);function a(e,n,t,r,o){return Object.keys(n).reduce(((a,i)=>(a[i]=e(n[i],null!==t&&t[i],null!=r&&r[i],o?`mantine-${o}-${i}`:null),a)),{})}function i(e){const n="function"==typeof e?e:()=>e;return function(e,t){const i=(0,o.rZ)(),{styles:s,classNames:c}=(0,o.sr)(null==t?void 0:t.name),{css:l,cx:u}=(0,r.Z)(),f=n(i,e,(function(e){return`__mantine-ref-${e||""}`})),p="function"==typeof(null==t?void 0:t.styles)?null==t?void 0:t.styles(i):(null==t?void 0:t.styles)||{},d="function"==typeof s?s(i,e||{}):s||{},m=function(e){const n={};return Object.keys(e).forEach((t=>{const[r,o]=e[t];n[r]=o})),n}(Object.keys(f).map((e=>[e,u(l(f[e]),l(d[e]),l(p[e]))])));return{classes:a(u,m,c,null==t?void 0:t.classNames,null==t?void 0:t.name),cx:u,theme:i}}}},878:function(e,n,t){t.d(n,{Z:function(){return q}});var r=t(6010),o=t(2506),a=t(351),i=t(7866),s=/[A-Z]|^ms/g,c=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},u=function(e){return null!=e&&"boolean"!=typeof e},f=(0,i.Z)((function(e){return l(e)?e:e.replace(s,"-$&").toLowerCase()})),p=function(e,n){switch(e){case"animation":case"animationName":if("string"==typeof n)return n.replace(c,(function(e,n,t){return m={name:n,styles:t,next:m},n}))}return 1===a.Z[e]||l(e)||"number"!=typeof n||0===n?n:n+"px"};function d(e,n,t){if(null==t)return"";if(void 0!==t.__emotion_styles)return t;switch(typeof t){case"boolean":return"";case"object":if(1===t.anim)return m={name:t.name,styles:t.styles,next:m},t.name;if(void 0!==t.styles){var r=t.next;if(void 0!==r)for(;void 0!==r;)m={name:r.name,styles:r.styles,next:m},r=r.next;return t.styles+";"}return function(e,n,t){var r="";if(Array.isArray(t))for(var o=0;o<t.length;o++)r+=d(e,n,t[o])+";";else for(var a in t){var i=t[a];if("object"!=typeof i)null!=n&&void 0!==n[i]?r+=a+"{"+n[i]+"}":u(i)&&(r+=f(a)+":"+p(a,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=n&&void 0!==n[i[0]]){var s=d(e,n,i);switch(a){case"animation":case"animationName":r+=f(a)+":"+s+";";break;default:r+=a+"{"+s+"}"}}else for(var c=0;c<i.length;c++)u(i[c])&&(r+=f(a)+":"+p(a,i[c])+";")}return r}(e,n,t);case"function":if(void 0!==e){var o=m,a=t(e);return m=o,d(e,n,a)}}if(null==n)return t;var i=n[t];return void 0!==i?i:t}var m,y=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var v=t(7294);var g=t(1526),b=t(6411),h=t(6686),x=t(4582),O=t(211),k=t(2190),j=function(e,n,t){for(var r=0,o=0;r=o,o=(0,b.fj)(),38===r&&12===o&&(n[t]=1),!(0,b.r)(o);)(0,b.lp)();return(0,b.tP)(e,b.FK)},w=function(e,n){return(0,b.cE)(function(e,n){var t=-1,r=44;do{switch((0,b.r)(r)){case 0:38===r&&12===(0,b.fj)()&&(n[t]=1),e[t]+=j(b.FK-1,n,t);break;case 2:e[t]+=(0,b.iF)(r);break;case 4:if(44===r){e[++t]=58===(0,b.fj)()?"&\f":"",n[t]=e[t].length;break}default:e[t]+=(0,h.Dp)(r)}}while(r=(0,b.lp)());return e}((0,b.un)(e),n))},A=new WeakMap,P=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var n=e.value,t=e.parent,r=e.column===t.column&&e.line===t.line;"rule"!==t.type;)if(!(t=t.parent))return;if((1!==e.props.length||58===n.charCodeAt(0)||A.get(t))&&!r){A.set(e,!0);for(var o=[],a=w(n,o),i=t.props,s=0,c=0;s<a.length;s++)for(var l=0;l<i.length;l++,c++)e.props[c]=o[s]?a[s].replace(/&\f/g,i[l]):i[l]+" "+a[s]}}},E=function(e){if("decl"===e.type){var n=e.value;108===n.charCodeAt(0)&&98===n.charCodeAt(2)&&(e.return="",e.value="")}},_=[x.Ji],z=function(e){var n=e.key;if("css"===n){var t=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(t,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r=e.stylisPlugins||_;var o,a,i={},s=[];o=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+n+' "]'),(function(e){for(var n=e.getAttribute("data-emotion").split(" "),t=1;t<n.length;t++)i[n[t]]=!0;s.push(e)}));var c=[P,E];var l,u=[O.P,(0,x.cD)((function(e){l.insert(e)}))],f=(0,x.qR)(c.concat(r,u));a=function(e,n,t,r){var o;l=t,o=e?e+"{"+n.styles+"}":n.styles,(0,O.q)((0,k.MY)(o),f),r&&(p.inserted[n.name]=!0)};var p={key:n,sheet:new g.m({key:n,container:o,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:a};return p.sheet.hydrate(s),p},C=t(573);const N={key:"mantine",prepend:!0},{getCache:Z}=(()=>{let e,n=N.key;return{getCache:function(t){return void 0!==e&&n===(null==t?void 0:t.key)||(n=(null==t?void 0:t.key)||"mantine",e=z((null==t?void 0:t.key)?t:N)),e}}})();var $=Object.defineProperty,R=Object.getOwnPropertySymbols,S=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable,B=(e,n,t)=>n in e?$(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;const D="ref";function L(e){let n;if(1!==e.length)return{args:e,ref:n};const[t]=e;if(!(t instanceof Object))return{args:e,ref:n};if(!(D in t))return{args:e,ref:n};n=t.ref;const r=((e,n)=>{for(var t in n||(n={}))S.call(n,t)&&B(e,t,n[t]);if(R)for(var t of R(n))F.call(n,t)&&B(e,t,n[t]);return e})({},t);return delete r.ref,{args:[r],ref:n}}const{cssFactory:T}={cssFactory:function(e){const{cache:n}=e,t=(...e)=>{const{ref:t,args:r}=L(e),a=function(e,n,t){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";m=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,a+=d(t,n,i)):a+=i[0];for(var s=1;s<e.length;s++)a+=d(t,n,e[s]),r&&(a+=i[s]);y.lastIndex=0;for(var c,l="";null!==(c=y.exec(a));)l+="-"+c[1];return{name:(0,o.Z)(a)+l,styles:a,next:m}}(r,n.registered);return function(e,n,t){var r=e.key+"-"+n.name;if(!1===t&&void 0===e.registered[r]&&(e.registered[r]=n.styles),void 0===e.inserted[n.name]){var o=n;do{e.insert(n===o?"."+r:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}}(n,a,!1),`${n.key}-${a.name}${void 0===t?"":` ${t}`}`};return{css:t,cx:(...e)=>function(e,n,t){const r=[],o=function(e,n,t){var r="";return t.split(" ").forEach((function(t){void 0!==e[t]?n.push(e[t]+";"):r+=t+" "})),r}(e,r,t);return r.length<2?t:o+n(r)}(n.registered,t,(0,r.Z)(e))}}};function q(){const e=function(){const e=(0,C.ly)();return Z(e)}();return function(e,n){const t=(0,v.useRef)();return(!t.current||n.length!==t.current.prevDeps.length||t.current.prevDeps.map(((e,t)=>e===n[t])).indexOf(!1)>=0)&&(t.current={v:e(),prevDeps:[...n]}),t.current.v}((()=>T({cache:e})),[e])}}}]);