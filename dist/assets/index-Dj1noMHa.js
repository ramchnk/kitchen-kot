(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();const Ep=()=>{};var ul={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu=function(n){const t=[];let e=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?t[e++]=r:r<2048?(t[e++]=r>>6|192,t[e++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),t[e++]=r>>18|240,t[e++]=r>>12&63|128,t[e++]=r>>6&63|128,t[e++]=r&63|128):(t[e++]=r>>12|224,t[e++]=r>>6&63|128,t[e++]=r&63|128)}return t},wp=function(n){const t=[];let e=0,s=0;for(;e<n.length;){const r=n[e++];if(r<128)t[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[e++];t[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[e++],o=n[e++],l=n[e++],u=((r&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;t[s++]=String.fromCharCode(55296+(u>>10)),t[s++]=String.fromCharCode(56320+(u&1023))}else{const i=n[e++],o=n[e++];t[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return t.join("")},Xu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],o=r+1<n.length,l=o?n[r+1]:0,u=r+2<n.length,c=u?n[r+2]:0,h=i>>2,f=(i&3)<<4|l>>4;let p=(l&15)<<2|c>>6,_=c&63;u||(_=64,o||(p=64)),s.push(e[h],e[f],e[p],e[_])}return s.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Yu(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):wp(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=e[n.charAt(r++)],l=r<n.length?e[n.charAt(r)]:0;++r;const c=r<n.length?e[n.charAt(r)]:64;++r;const f=r<n.length?e[n.charAt(r)]:64;if(++r,i==null||l==null||c==null||f==null)throw new Tp;const p=i<<2|l>>4;if(s.push(p),c!==64){const _=l<<4&240|c>>2;if(s.push(_),f!==64){const C=c<<6&192|f;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Tp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ap=function(n){const t=Yu(n);return Xu.encodeByteArray(t,!0)},Yr=function(n){return Ap(n).replace(/\./g,"")},Zu=function(n){try{return Xu.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cp=()=>Sp().__FIREBASE_DEFAULTS__,Rp=()=>{if(typeof process>"u"||typeof ul>"u")return;const n=ul.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Pp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Zu(n[1]);return t&&JSON.parse(t)},wi=()=>{try{return Ep()||Cp()||Rp()||Pp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},td=n=>{var t,e;return(e=(t=wi())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},kp=n=>{const t=td(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),s]:[t.substring(0,e),s]},ed=()=>{var n;return(n=wi())==null?void 0:n.config},nd=n=>{var t;return(t=wi())==null?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,s)=>{e?this.reject(e):this.resolve(s),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function sd(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},s=t||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Yr(JSON.stringify(e)),Yr(JSON.stringify(o)),""].join(".")}const Ns={};function Np(){const n={prod:[],emulator:[]};for(const t of Object.keys(Ns))Ns[t]?n.emulator.push(t):n.prod.push(t);return n}function Lp(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let dl=!1;function rd(n,t){if(typeof window>"u"||typeof document>"u"||!ns(window.location.host)||Ns[n]===t||Ns[n]||dl)return;Ns[n]=t;function e(p){return`__firebase__banner__${p}`}const s="__firebase__banner",i=Np().prod.length>0;function o(){const p=document.getElementById(s);p&&p.remove()}function l(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function u(p,_){p.setAttribute("width","24"),p.setAttribute("id",_),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function c(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{dl=!0,o()},p}function h(p,_){p.setAttribute("id",_),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function f(){const p=Lp(s),_=e("text"),C=document.getElementById(_)||document.createElement("span"),A=e("learnmore"),S=document.getElementById(A)||document.createElement("a"),N=e("preprendIcon"),O=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const U=p.element;l(U),h(S,A);const tt=c();u(O,N),U.append(O,C,S,tt),document.body.appendChild(U)}i?(C.innerText="Preview backend disconnected.",O.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(O.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Op(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Lt())}function Vp(){var t;const n=(t=wi())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Mp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function $p(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Bp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Fp(){const n=Lt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Up(){return!Vp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function qp(){try{return typeof indexedDB=="object"}catch{return!1}}function jp(){return new Promise((n,t)=>{try{let e=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),e||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{e=!1},r.onerror=()=>{var i;t(((i=r.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp="FirebaseError";class Se extends Error{constructor(t,e,s){super(e),this.code=t,this.customData=s,this.name=zp,Object.setPrototypeOf(this,Se.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zs.prototype.create)}}class Zs{constructor(t,e,s){this.service=t,this.serviceName=e,this.errors=s}create(t,...e){const s=e[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?Hp(i,s):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new Se(r,l,s)}}function Hp(n,t){return n.replace(Wp,(e,s)=>{const r=t[s];return r!=null?String(r):`<${s}?>`})}const Wp=/\{\$([^}]+)}/g;function Gp(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function pn(n,t){if(n===t)return!0;const e=Object.keys(n),s=Object.keys(t);for(const r of e){if(!s.includes(r))return!1;const i=n[r],o=t[r];if(hl(i)&&hl(o)){if(!pn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!e.includes(r))return!1;return!0}function hl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(n){const t=[];for(const[e,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(r))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function Rs(n){const t={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");t[decodeURIComponent(r)]=decodeURIComponent(i)}}),t}function Ps(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function Kp(n,t){const e=new Qp(n,t);return e.subscribe.bind(e)}class Qp{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(s=>{this.error(s)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,s){let r;if(t===void 0&&e===void 0&&s===void 0)throw new Error("Missing Observer.");Jp(t,["next","error","complete"])?r=t:r={next:t,error:e,complete:s},r.next===void 0&&(r.next=ya),r.error===void 0&&(r.error=ya),r.complete===void 0&&(r.complete=ya);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jp(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function ya(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(n){return n&&n._delegate?n._delegate:n}class fn{constructor(t,e,s){this.name=t,this.instanceFactory=e,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const s=new xp;if(this.instancesDeferred.set(e,s),this.isInitialized(e)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:e});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Zp(t))try{this.getOrInitializeService({instanceIdentifier:un})}catch{}for(const[e,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(t=un){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=un){return this.instances.has(t)}getOptions(t=un){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:e});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);s===l&&o.resolve(r)}return r}onInit(t,e){const s=this.normalizeInstanceIdentifier(e),r=this.onInitCallbacks.get(s)??new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const s=this.onInitCallbacks.get(e);if(s)for(const r of s)try{r(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let s=this.instances.get(t);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Xp(t),options:e}),this.instances.set(t,s),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(s,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,s)}catch{}return s||null}normalizeInstanceIdentifier(t=un){return this.component?this.component.multipleInstances?t:un:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Xp(n){return n===un?void 0:n}function Zp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Yp(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const ef={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},nf=Q.INFO,sf={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},rf=(n,t,...e)=>{if(t<n.logLevel)return;const s=new Date().toISOString(),r=sf[t];if(r)console[r](`[${s}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class oo{constructor(t){this.name=t,this._logLevel=nf,this._logHandler=rf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ef[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...t),this._logHandler(this,Q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...t),this._logHandler(this,Q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...t),this._logHandler(this,Q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...t),this._logHandler(this,Q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...t),this._logHandler(this,Q.ERROR,...t)}}const af=(n,t)=>t.some(e=>n instanceof e);let ml,pl;function of(){return ml||(ml=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function cf(){return pl||(pl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const id=new WeakMap,La=new WeakMap,ad=new WeakMap,va=new WeakMap,co=new WeakMap;function lf(n){const t=new Promise((e,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(Ue(n.result)),r()},o=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&id.set(e,n)}).catch(()=>{}),co.set(t,n),t}function uf(n){if(La.has(n))return;const t=new Promise((e,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),r()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});La.set(n,t)}let Oa={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return La.get(n);if(t==="objectStoreNames")return n.objectStoreNames||ad.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Ue(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function df(n){Oa=n(Oa)}function hf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const s=n.call(_a(this),t,...e);return ad.set(s,t.sort?t.sort():[t]),Ue(s)}:cf().includes(n)?function(...t){return n.apply(_a(this),t),Ue(id.get(this))}:function(...t){return Ue(n.apply(_a(this),t))}}function mf(n){return typeof n=="function"?hf(n):(n instanceof IDBTransaction&&uf(n),af(n,of())?new Proxy(n,Oa):n)}function Ue(n){if(n instanceof IDBRequest)return lf(n);if(va.has(n))return va.get(n);const t=mf(n);return t!==n&&(va.set(n,t),co.set(t,n)),t}const _a=n=>co.get(n);function pf(n,t,{blocked:e,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(n,t),l=Ue(o);return s&&o.addEventListener("upgradeneeded",u=>{s(Ue(o.result),u.oldVersion,u.newVersion,Ue(o.transaction),u)}),e&&o.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const ff=["get","getKey","getAll","getAllKeys","count"],gf=["put","add","delete","clear"],Ia=new Map;function fl(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Ia.get(t))return Ia.get(t);const e=t.replace(/FromIndex$/,""),s=t!==e,r=gf.includes(e);if(!(e in(s?IDBIndex:IDBObjectStore).prototype)||!(r||ff.includes(e)))return;const i=async function(o,...l){const u=this.transaction(o,r?"readwrite":"readonly");let c=u.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[e](...l),r&&u.done]))[0]};return Ia.set(t,i),i}df(n=>({...n,get:(t,e,s)=>fl(t,e)||n.get(t,e,s),has:(t,e)=>!!fl(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(vf(e)){const s=e.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(e=>e).join(" ")}}function vf(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Va="@firebase/app",gl="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie=new oo("@firebase/app"),_f="@firebase/app-compat",If="@firebase/analytics-compat",bf="@firebase/analytics",Ef="@firebase/app-check-compat",wf="@firebase/app-check",Tf="@firebase/auth",Af="@firebase/auth-compat",Sf="@firebase/database",Cf="@firebase/data-connect",Rf="@firebase/database-compat",Pf="@firebase/functions",kf="@firebase/functions-compat",xf="@firebase/installations",Df="@firebase/installations-compat",Nf="@firebase/messaging",Lf="@firebase/messaging-compat",Of="@firebase/performance",Vf="@firebase/performance-compat",Mf="@firebase/remote-config",$f="@firebase/remote-config-compat",Bf="@firebase/storage",Ff="@firebase/storage-compat",Uf="@firebase/firestore",qf="@firebase/ai",jf="@firebase/firestore-compat",zf="firebase",Hf="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="[DEFAULT]",Wf={[Va]:"fire-core",[_f]:"fire-core-compat",[bf]:"fire-analytics",[If]:"fire-analytics-compat",[wf]:"fire-app-check",[Ef]:"fire-app-check-compat",[Tf]:"fire-auth",[Af]:"fire-auth-compat",[Sf]:"fire-rtdb",[Cf]:"fire-data-connect",[Rf]:"fire-rtdb-compat",[Pf]:"fire-fn",[kf]:"fire-fn-compat",[xf]:"fire-iid",[Df]:"fire-iid-compat",[Nf]:"fire-fcm",[Lf]:"fire-fcm-compat",[Of]:"fire-perf",[Vf]:"fire-perf-compat",[Mf]:"fire-rc",[$f]:"fire-rc-compat",[Bf]:"fire-gcs",[Ff]:"fire-gcs-compat",[Uf]:"fire-fst",[jf]:"fire-fst-compat",[qf]:"fire-vertex","fire-js":"fire-js",[zf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=new Map,Gf=new Map,$a=new Map;function yl(n,t){try{n.container.addComponent(t)}catch(e){Ie.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function zn(n){const t=n.name;if($a.has(t))return Ie.debug(`There were multiple attempts to register component ${t}.`),!1;$a.set(t,n);for(const e of Xr.values())yl(e,n);for(const e of Gf.values())yl(e,n);return!0}function lo(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Qt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},qe=new Zs("app","Firebase",Kf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(t,e,s){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw qe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=Hf;function od(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const s={name:Ma,automaticDataCollectionEnabled:!0,...t},r=s.name;if(typeof r!="string"||!r)throw qe.create("bad-app-name",{appName:String(r)});if(e||(e=ed()),!e)throw qe.create("no-options");const i=Xr.get(r);if(i){if(pn(e,i.options)&&pn(s,i.config))return i;throw qe.create("duplicate-app",{appName:r})}const o=new tf(r);for(const u of $a.values())o.addComponent(u);const l=new Qf(e,s,o);return Xr.set(r,l),l}function cd(n=Ma){const t=Xr.get(n);if(!t&&n===Ma&&ed())return od();if(!t)throw qe.create("no-app",{appName:n});return t}function je(n,t,e){let s=Wf[n]??n;e&&(s+=`-${e}`);const r=s.match(/\s|\//),i=t.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${t}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ie.warn(o.join(" "));return}zn(new fn(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="firebase-heartbeat-database",Yf=1,Fs="firebase-heartbeat-store";let ba=null;function ld(){return ba||(ba=pf(Jf,Yf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Fs)}catch(e){console.warn(e)}}}}).catch(n=>{throw qe.create("idb-open",{originalErrorMessage:n.message})})),ba}async function Xf(n){try{const e=(await ld()).transaction(Fs),s=await e.objectStore(Fs).get(ud(n));return await e.done,s}catch(t){if(t instanceof Se)Ie.warn(t.message);else{const e=qe.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ie.warn(e.message)}}}async function vl(n,t){try{const s=(await ld()).transaction(Fs,"readwrite");await s.objectStore(Fs).put(t,ud(n)),await s.done}catch(e){if(e instanceof Se)Ie.warn(e.message);else{const s=qe.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ie.warn(s.message)}}}function ud(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=1024,tg=30;class eg{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new sg(e),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var t,e;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=_l();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>tg){const o=rg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Ie.warn(s)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=_l(),{heartbeatsToSend:s,unsentEntries:r}=ng(this._heartbeatsCache.heartbeats),i=Yr(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Ie.warn(e),""}}}function _l(){return new Date().toISOString().substring(0,10)}function ng(n,t=Zf){const e=[];let s=n.slice();for(const r of n){const i=e.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Il(e)>t){i.dates.pop();break}}else if(e.push({agent:r.agent,dates:[r.date]}),Il(e)>t){e.pop();break}s=s.slice(1)}return{heartbeatsToSend:e,unsentEntries:s}}class sg{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qp()?jp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Xf(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return vl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const s=await this.read();return vl(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Il(n){return Yr(JSON.stringify({version:2,heartbeats:n})).length}function rg(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let s=1;s<n.length;s++)n[s].date<e&&(e=n[s].date,t=s);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(n){zn(new fn("platform-logger",t=>new yf(t),"PRIVATE")),zn(new fn("heartbeat",t=>new eg(t),"PRIVATE")),je(Va,gl,n),je(Va,gl,"esm2020"),je("fire-js","")}ig("");var ag="firebase",og="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je(ag,og,"app");var bl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ze,dd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(b,v){function y(){}y.prototype=v.prototype,b.F=v.prototype,b.prototype=new y,b.prototype.constructor=b,b.D=function(w,E,T){for(var I=Array(arguments.length-2),K=2;K<arguments.length;K++)I[K-2]=arguments[K];return v.prototype[E].apply(w,I)}}function e(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(s,e),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(b,v,y){y||(y=0);const w=Array(16);if(typeof v=="string")for(var E=0;E<16;++E)w[E]=v.charCodeAt(y++)|v.charCodeAt(y++)<<8|v.charCodeAt(y++)<<16|v.charCodeAt(y++)<<24;else for(E=0;E<16;++E)w[E]=v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24;v=b.g[0],y=b.g[1],E=b.g[2];let T=b.g[3],I;I=v+(T^y&(E^T))+w[0]+3614090360&4294967295,v=y+(I<<7&4294967295|I>>>25),I=T+(E^v&(y^E))+w[1]+3905402710&4294967295,T=v+(I<<12&4294967295|I>>>20),I=E+(y^T&(v^y))+w[2]+606105819&4294967295,E=T+(I<<17&4294967295|I>>>15),I=y+(v^E&(T^v))+w[3]+3250441966&4294967295,y=E+(I<<22&4294967295|I>>>10),I=v+(T^y&(E^T))+w[4]+4118548399&4294967295,v=y+(I<<7&4294967295|I>>>25),I=T+(E^v&(y^E))+w[5]+1200080426&4294967295,T=v+(I<<12&4294967295|I>>>20),I=E+(y^T&(v^y))+w[6]+2821735955&4294967295,E=T+(I<<17&4294967295|I>>>15),I=y+(v^E&(T^v))+w[7]+4249261313&4294967295,y=E+(I<<22&4294967295|I>>>10),I=v+(T^y&(E^T))+w[8]+1770035416&4294967295,v=y+(I<<7&4294967295|I>>>25),I=T+(E^v&(y^E))+w[9]+2336552879&4294967295,T=v+(I<<12&4294967295|I>>>20),I=E+(y^T&(v^y))+w[10]+4294925233&4294967295,E=T+(I<<17&4294967295|I>>>15),I=y+(v^E&(T^v))+w[11]+2304563134&4294967295,y=E+(I<<22&4294967295|I>>>10),I=v+(T^y&(E^T))+w[12]+1804603682&4294967295,v=y+(I<<7&4294967295|I>>>25),I=T+(E^v&(y^E))+w[13]+4254626195&4294967295,T=v+(I<<12&4294967295|I>>>20),I=E+(y^T&(v^y))+w[14]+2792965006&4294967295,E=T+(I<<17&4294967295|I>>>15),I=y+(v^E&(T^v))+w[15]+1236535329&4294967295,y=E+(I<<22&4294967295|I>>>10),I=v+(E^T&(y^E))+w[1]+4129170786&4294967295,v=y+(I<<5&4294967295|I>>>27),I=T+(y^E&(v^y))+w[6]+3225465664&4294967295,T=v+(I<<9&4294967295|I>>>23),I=E+(v^y&(T^v))+w[11]+643717713&4294967295,E=T+(I<<14&4294967295|I>>>18),I=y+(T^v&(E^T))+w[0]+3921069994&4294967295,y=E+(I<<20&4294967295|I>>>12),I=v+(E^T&(y^E))+w[5]+3593408605&4294967295,v=y+(I<<5&4294967295|I>>>27),I=T+(y^E&(v^y))+w[10]+38016083&4294967295,T=v+(I<<9&4294967295|I>>>23),I=E+(v^y&(T^v))+w[15]+3634488961&4294967295,E=T+(I<<14&4294967295|I>>>18),I=y+(T^v&(E^T))+w[4]+3889429448&4294967295,y=E+(I<<20&4294967295|I>>>12),I=v+(E^T&(y^E))+w[9]+568446438&4294967295,v=y+(I<<5&4294967295|I>>>27),I=T+(y^E&(v^y))+w[14]+3275163606&4294967295,T=v+(I<<9&4294967295|I>>>23),I=E+(v^y&(T^v))+w[3]+4107603335&4294967295,E=T+(I<<14&4294967295|I>>>18),I=y+(T^v&(E^T))+w[8]+1163531501&4294967295,y=E+(I<<20&4294967295|I>>>12),I=v+(E^T&(y^E))+w[13]+2850285829&4294967295,v=y+(I<<5&4294967295|I>>>27),I=T+(y^E&(v^y))+w[2]+4243563512&4294967295,T=v+(I<<9&4294967295|I>>>23),I=E+(v^y&(T^v))+w[7]+1735328473&4294967295,E=T+(I<<14&4294967295|I>>>18),I=y+(T^v&(E^T))+w[12]+2368359562&4294967295,y=E+(I<<20&4294967295|I>>>12),I=v+(y^E^T)+w[5]+4294588738&4294967295,v=y+(I<<4&4294967295|I>>>28),I=T+(v^y^E)+w[8]+2272392833&4294967295,T=v+(I<<11&4294967295|I>>>21),I=E+(T^v^y)+w[11]+1839030562&4294967295,E=T+(I<<16&4294967295|I>>>16),I=y+(E^T^v)+w[14]+4259657740&4294967295,y=E+(I<<23&4294967295|I>>>9),I=v+(y^E^T)+w[1]+2763975236&4294967295,v=y+(I<<4&4294967295|I>>>28),I=T+(v^y^E)+w[4]+1272893353&4294967295,T=v+(I<<11&4294967295|I>>>21),I=E+(T^v^y)+w[7]+4139469664&4294967295,E=T+(I<<16&4294967295|I>>>16),I=y+(E^T^v)+w[10]+3200236656&4294967295,y=E+(I<<23&4294967295|I>>>9),I=v+(y^E^T)+w[13]+681279174&4294967295,v=y+(I<<4&4294967295|I>>>28),I=T+(v^y^E)+w[0]+3936430074&4294967295,T=v+(I<<11&4294967295|I>>>21),I=E+(T^v^y)+w[3]+3572445317&4294967295,E=T+(I<<16&4294967295|I>>>16),I=y+(E^T^v)+w[6]+76029189&4294967295,y=E+(I<<23&4294967295|I>>>9),I=v+(y^E^T)+w[9]+3654602809&4294967295,v=y+(I<<4&4294967295|I>>>28),I=T+(v^y^E)+w[12]+3873151461&4294967295,T=v+(I<<11&4294967295|I>>>21),I=E+(T^v^y)+w[15]+530742520&4294967295,E=T+(I<<16&4294967295|I>>>16),I=y+(E^T^v)+w[2]+3299628645&4294967295,y=E+(I<<23&4294967295|I>>>9),I=v+(E^(y|~T))+w[0]+4096336452&4294967295,v=y+(I<<6&4294967295|I>>>26),I=T+(y^(v|~E))+w[7]+1126891415&4294967295,T=v+(I<<10&4294967295|I>>>22),I=E+(v^(T|~y))+w[14]+2878612391&4294967295,E=T+(I<<15&4294967295|I>>>17),I=y+(T^(E|~v))+w[5]+4237533241&4294967295,y=E+(I<<21&4294967295|I>>>11),I=v+(E^(y|~T))+w[12]+1700485571&4294967295,v=y+(I<<6&4294967295|I>>>26),I=T+(y^(v|~E))+w[3]+2399980690&4294967295,T=v+(I<<10&4294967295|I>>>22),I=E+(v^(T|~y))+w[10]+4293915773&4294967295,E=T+(I<<15&4294967295|I>>>17),I=y+(T^(E|~v))+w[1]+2240044497&4294967295,y=E+(I<<21&4294967295|I>>>11),I=v+(E^(y|~T))+w[8]+1873313359&4294967295,v=y+(I<<6&4294967295|I>>>26),I=T+(y^(v|~E))+w[15]+4264355552&4294967295,T=v+(I<<10&4294967295|I>>>22),I=E+(v^(T|~y))+w[6]+2734768916&4294967295,E=T+(I<<15&4294967295|I>>>17),I=y+(T^(E|~v))+w[13]+1309151649&4294967295,y=E+(I<<21&4294967295|I>>>11),I=v+(E^(y|~T))+w[4]+4149444226&4294967295,v=y+(I<<6&4294967295|I>>>26),I=T+(y^(v|~E))+w[11]+3174756917&4294967295,T=v+(I<<10&4294967295|I>>>22),I=E+(v^(T|~y))+w[2]+718787259&4294967295,E=T+(I<<15&4294967295|I>>>17),I=y+(T^(E|~v))+w[9]+3951481745&4294967295,b.g[0]=b.g[0]+v&4294967295,b.g[1]=b.g[1]+(E+(I<<21&4294967295|I>>>11))&4294967295,b.g[2]=b.g[2]+E&4294967295,b.g[3]=b.g[3]+T&4294967295}s.prototype.v=function(b,v){v===void 0&&(v=b.length);const y=v-this.blockSize,w=this.C;let E=this.h,T=0;for(;T<v;){if(E==0)for(;T<=y;)r(this,b,T),T+=this.blockSize;if(typeof b=="string"){for(;T<v;)if(w[E++]=b.charCodeAt(T++),E==this.blockSize){r(this,w),E=0;break}}else for(;T<v;)if(w[E++]=b[T++],E==this.blockSize){r(this,w),E=0;break}}this.h=E,this.o+=v},s.prototype.A=function(){var b=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);b[0]=128;for(var v=1;v<b.length-8;++v)b[v]=0;v=this.o*8;for(var y=b.length-8;y<b.length;++y)b[y]=v&255,v/=256;for(this.v(b),b=Array(16),v=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)b[v++]=this.g[y]>>>w&255;return b};function i(b,v){var y=l;return Object.prototype.hasOwnProperty.call(y,b)?y[b]:y[b]=v(b)}function o(b,v){this.h=v;const y=[];let w=!0;for(let E=b.length-1;E>=0;E--){const T=b[E]|0;w&&T==v||(y[E]=T,w=!1)}this.g=y}var l={};function u(b){return-128<=b&&b<128?i(b,function(v){return new o([v|0],v<0?-1:0)}):new o([b|0],b<0?-1:0)}function c(b){if(isNaN(b)||!isFinite(b))return f;if(b<0)return S(c(-b));const v=[];let y=1;for(let w=0;b>=y;w++)v[w]=b/y|0,y*=4294967296;return new o(v,0)}function h(b,v){if(b.length==0)throw Error("number format error: empty string");if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(b.charAt(0)=="-")return S(h(b.substring(1),v));if(b.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=c(Math.pow(v,8));let w=f;for(let T=0;T<b.length;T+=8){var E=Math.min(8,b.length-T);const I=parseInt(b.substring(T,T+E),v);E<8?(E=c(Math.pow(v,E)),w=w.j(E).add(c(I))):(w=w.j(y),w=w.add(c(I)))}return w}var f=u(0),p=u(1),_=u(16777216);n=o.prototype,n.m=function(){if(A(this))return-S(this).m();let b=0,v=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);b+=(w>=0?w:4294967296+w)*v,v*=4294967296}return b},n.toString=function(b){if(b=b||10,b<2||36<b)throw Error("radix out of range: "+b);if(C(this))return"0";if(A(this))return"-"+S(this).toString(b);const v=c(Math.pow(b,6));var y=this;let w="";for(;;){const E=tt(y,v).g;y=N(y,E.j(v));let T=((y.g.length>0?y.g[0]:y.h)>>>0).toString(b);if(y=E,C(y))return T+w;for(;T.length<6;)T="0"+T;w=T+w}},n.i=function(b){return b<0?0:b<this.g.length?this.g[b]:this.h};function C(b){if(b.h!=0)return!1;for(let v=0;v<b.g.length;v++)if(b.g[v]!=0)return!1;return!0}function A(b){return b.h==-1}n.l=function(b){return b=N(this,b),A(b)?-1:C(b)?0:1};function S(b){const v=b.g.length,y=[];for(let w=0;w<v;w++)y[w]=~b.g[w];return new o(y,~b.h).add(p)}n.abs=function(){return A(this)?S(this):this},n.add=function(b){const v=Math.max(this.g.length,b.g.length),y=[];let w=0;for(let E=0;E<=v;E++){let T=w+(this.i(E)&65535)+(b.i(E)&65535),I=(T>>>16)+(this.i(E)>>>16)+(b.i(E)>>>16);w=I>>>16,T&=65535,I&=65535,y[E]=I<<16|T}return new o(y,y[y.length-1]&-2147483648?-1:0)};function N(b,v){return b.add(S(v))}n.j=function(b){if(C(this)||C(b))return f;if(A(this))return A(b)?S(this).j(S(b)):S(S(this).j(b));if(A(b))return S(this.j(S(b)));if(this.l(_)<0&&b.l(_)<0)return c(this.m()*b.m());const v=this.g.length+b.g.length,y=[];for(var w=0;w<2*v;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let E=0;E<b.g.length;E++){const T=this.i(w)>>>16,I=this.i(w)&65535,K=b.i(E)>>>16,et=b.i(E)&65535;y[2*w+2*E]+=I*et,O(y,2*w+2*E),y[2*w+2*E+1]+=T*et,O(y,2*w+2*E+1),y[2*w+2*E+1]+=I*K,O(y,2*w+2*E+1),y[2*w+2*E+2]+=T*K,O(y,2*w+2*E+2)}for(b=0;b<v;b++)y[b]=y[2*b+1]<<16|y[2*b];for(b=v;b<2*v;b++)y[b]=0;return new o(y,0)};function O(b,v){for(;(b[v]&65535)!=b[v];)b[v+1]+=b[v]>>>16,b[v]&=65535,v++}function U(b,v){this.g=b,this.h=v}function tt(b,v){if(C(v))throw Error("division by zero");if(C(b))return new U(f,f);if(A(b))return v=tt(S(b),v),new U(S(v.g),S(v.h));if(A(v))return v=tt(b,S(v)),new U(S(v.g),v.h);if(b.g.length>30){if(A(b)||A(v))throw Error("slowDivide_ only works with positive integers.");for(var y=p,w=v;w.l(b)<=0;)y=st(y),w=st(w);var E=at(y,1),T=at(w,1);for(w=at(w,2),y=at(y,2);!C(w);){var I=T.add(w);I.l(b)<=0&&(E=E.add(y),T=I),w=at(w,1),y=at(y,1)}return v=N(b,E.j(v)),new U(E,v)}for(E=f;b.l(v)>=0;){for(y=Math.max(1,Math.floor(b.m()/v.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),T=c(y),I=T.j(v);A(I)||I.l(b)>0;)y-=w,T=c(y),I=T.j(v);C(T)&&(T=p),E=E.add(T),b=N(b,I)}return new U(E,b)}n.B=function(b){return tt(this,b).h},n.and=function(b){const v=Math.max(this.g.length,b.g.length),y=[];for(let w=0;w<v;w++)y[w]=this.i(w)&b.i(w);return new o(y,this.h&b.h)},n.or=function(b){const v=Math.max(this.g.length,b.g.length),y=[];for(let w=0;w<v;w++)y[w]=this.i(w)|b.i(w);return new o(y,this.h|b.h)},n.xor=function(b){const v=Math.max(this.g.length,b.g.length),y=[];for(let w=0;w<v;w++)y[w]=this.i(w)^b.i(w);return new o(y,this.h^b.h)};function st(b){const v=b.g.length+1,y=[];for(let w=0;w<v;w++)y[w]=b.i(w)<<1|b.i(w-1)>>>31;return new o(y,b.h)}function at(b,v){const y=v>>5;v%=32;const w=b.g.length-y,E=[];for(let T=0;T<w;T++)E[T]=v>0?b.i(T+y)>>>v|b.i(T+y+1)<<32-v:b.i(T+y);return new o(E,b.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,dd=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,ze=o}).apply(typeof bl<"u"?bl:typeof self<"u"?self:typeof window<"u"?window:{});var Dr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hd,ks,md,Fr,Ba,pd,fd,gd;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Dr=="object"&&Dr];for(var d=0;d<a.length;++d){var m=a[d];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var s=e(this);function r(a,d){if(d)t:{var m=s;a=a.split(".");for(var g=0;g<a.length-1;g++){var R=a[g];if(!(R in m))break t;m=m[R]}a=a[a.length-1],g=m[a],d=d(g),d!=g&&d!=null&&t(m,a,{configurable:!0,writable:!0,value:d})}}r("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(a){return a||function(d){var m=[],g;for(g in d)Object.prototype.hasOwnProperty.call(d,g)&&m.push([g,d[g]]);return m}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function l(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function u(a,d,m){return a.call.apply(a.bind,arguments)}function c(a,d,m){return c=u,c.apply(null,arguments)}function h(a,d){var m=Array.prototype.slice.call(arguments,1);return function(){var g=m.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function f(a,d){function m(){}m.prototype=d.prototype,a.Z=d.prototype,a.prototype=new m,a.prototype.constructor=a,a.Ob=function(g,R,P){for(var V=Array(arguments.length-2),G=2;G<arguments.length;G++)V[G-2]=arguments[G];return d.prototype[R].apply(g,V)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function _(a){const d=a.length;if(d>0){const m=Array(d);for(let g=0;g<d;g++)m[g]=a[g];return m}return[]}function C(a,d){for(let g=1;g<arguments.length;g++){const R=arguments[g];var m=typeof R;if(m=m!="object"?m:R?Array.isArray(R)?"array":m:"null",m=="array"||m=="object"&&typeof R.length=="number"){m=a.length||0;const P=R.length||0;a.length=m+P;for(let V=0;V<P;V++)a[m+V]=R[V]}else a.push(R)}}class A{constructor(d,m){this.i=d,this.j=m,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function S(a){o.setTimeout(()=>{throw a},0)}function N(){var a=b;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class O{constructor(){this.h=this.g=null}add(d,m){const g=U.get();g.set(d,m),this.h?this.h.next=g:this.g=g,this.h=g}}var U=new A(()=>new tt,a=>a.reset());class tt{constructor(){this.next=this.g=this.h=null}set(d,m){this.h=d,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let st,at=!1,b=new O,v=()=>{const a=Promise.resolve(void 0);st=()=>{a.then(y)}};function y(){for(var a;a=N();){try{a.h.call(a.g)}catch(m){S(m)}var d=U;d.j(a),d.h<100&&(d.h++,a.next=d.g,d.g=a)}at=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var T=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const m=()=>{};o.addEventListener("test",m,d),o.removeEventListener("test",m,d)}catch{}return a}();function I(a){return/^[\s\xa0]*$/.test(a)}function K(a,d){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,d)}f(K,E),K.prototype.init=function(a,d){const m=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget,d||(m=="mouseover"?d=a.fromElement:m=="mouseout"&&(d=a.toElement)),this.relatedTarget=d,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&K.Z.h.call(this)},K.prototype.h=function(){K.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var et="closure_listenable_"+(Math.random()*1e6|0),lt=0;function ut(a,d,m,g,R){this.listener=a,this.proxy=null,this.src=d,this.type=m,this.capture=!!g,this.ha=R,this.key=++lt,this.da=this.fa=!1}function Ce(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function me(a,d,m){for(const g in a)d.call(m,a[g],g,a)}function pe(a,d){for(const m in a)d.call(void 0,a[m],m,a)}function Cn(a){const d={};for(const m in a)d[m]=a[m];return d}const yr="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function vr(a,d){let m,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(m in g)a[m]=g[m];for(let P=0;P<yr.length;P++)m=yr[P],Object.prototype.hasOwnProperty.call(g,m)&&(a[m]=g[m])}}function _r(a){this.src=a,this.g={},this.h=0}_r.prototype.add=function(a,d,m,g,R){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const V=Ki(a,d,g,R);return V>-1?(d=a[V],m||(d.fa=!1)):(d=new ut(d,this.src,P,!!g,R),d.fa=m,a.push(d)),d};function Gi(a,d){const m=d.type;if(m in a.g){var g=a.g[m],R=Array.prototype.indexOf.call(g,d,void 0),P;(P=R>=0)&&Array.prototype.splice.call(g,R,1),P&&(Ce(d),a.g[m].length==0&&(delete a.g[m],a.h--))}}function Ki(a,d,m,g){for(let R=0;R<a.length;++R){const P=a[R];if(!P.da&&P.listener==d&&P.capture==!!m&&P.ha==g)return R}return-1}var Qi="closure_lm_"+(Math.random()*1e6|0),Ji={};function hc(a,d,m,g,R){if(Array.isArray(d)){for(let P=0;P<d.length;P++)hc(a,d[P],m,g,R);return null}return m=fc(m),a&&a[et]?a.J(d,m,l(g)?!!g.capture:!1,R):Gm(a,d,m,!1,g,R)}function Gm(a,d,m,g,R,P){if(!d)throw Error("Invalid event type");const V=l(R)?!!R.capture:!!R;let G=Xi(a);if(G||(a[Qi]=G=new _r(a)),m=G.add(d,m,g,V,P),m.proxy)return m;if(g=Km(),m.proxy=g,g.src=a,g.listener=m,a.addEventListener)T||(R=V),R===void 0&&(R=!1),a.addEventListener(d.toString(),g,R);else if(a.attachEvent)a.attachEvent(pc(d.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Km(){function a(m){return d.call(a.src,a.listener,m)}const d=Qm;return a}function mc(a,d,m,g,R){if(Array.isArray(d))for(var P=0;P<d.length;P++)mc(a,d[P],m,g,R);else g=l(g)?!!g.capture:!!g,m=fc(m),a&&a[et]?(a=a.i,P=String(d).toString(),P in a.g&&(d=a.g[P],m=Ki(d,m,g,R),m>-1&&(Ce(d[m]),Array.prototype.splice.call(d,m,1),d.length==0&&(delete a.g[P],a.h--)))):a&&(a=Xi(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Ki(d,m,g,R)),(m=a>-1?d[a]:null)&&Yi(m))}function Yi(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[et])Gi(d.i,a);else{var m=a.type,g=a.proxy;d.removeEventListener?d.removeEventListener(m,g,a.capture):d.detachEvent?d.detachEvent(pc(m),g):d.addListener&&d.removeListener&&d.removeListener(g),(m=Xi(d))?(Gi(m,a),m.h==0&&(m.src=null,d[Qi]=null)):Ce(a)}}}function pc(a){return a in Ji?Ji[a]:Ji[a]="on"+a}function Qm(a,d){if(a.da)a=!0;else{d=new K(d,this);const m=a.listener,g=a.ha||a.src;a.fa&&Yi(a),a=m.call(g,d)}return a}function Xi(a){return a=a[Qi],a instanceof _r?a:null}var Zi="__closure_events_fn_"+(Math.random()*1e9>>>0);function fc(a){return typeof a=="function"?a:(a[Zi]||(a[Zi]=function(d){return a.handleEvent(d)}),a[Zi])}function kt(){w.call(this),this.i=new _r(this),this.M=this,this.G=null}f(kt,w),kt.prototype[et]=!0,kt.prototype.removeEventListener=function(a,d,m,g){mc(this,a,d,m,g)};function Ot(a,d){var m,g=a.G;if(g)for(m=[];g;g=g.G)m.push(g);if(a=a.M,g=d.type||d,typeof d=="string")d=new E(d,a);else if(d instanceof E)d.target=d.target||a;else{var R=d;d=new E(g,a),vr(d,R)}R=!0;let P,V;if(m)for(V=m.length-1;V>=0;V--)P=d.g=m[V],R=Ir(P,g,!0,d)&&R;if(P=d.g=a,R=Ir(P,g,!0,d)&&R,R=Ir(P,g,!1,d)&&R,m)for(V=0;V<m.length;V++)P=d.g=m[V],R=Ir(P,g,!1,d)&&R}kt.prototype.N=function(){if(kt.Z.N.call(this),this.i){var a=this.i;for(const d in a.g){const m=a.g[d];for(let g=0;g<m.length;g++)Ce(m[g]);delete a.g[d],a.h--}}this.G=null},kt.prototype.J=function(a,d,m,g){return this.i.add(String(a),d,!1,m,g)},kt.prototype.K=function(a,d,m,g){return this.i.add(String(a),d,!0,m,g)};function Ir(a,d,m,g){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();let R=!0;for(let P=0;P<d.length;++P){const V=d[P];if(V&&!V.da&&V.capture==m){const G=V.listener,It=V.ha||V.src;V.fa&&Gi(a.i,V),R=G.call(It,g)!==!1&&R}}return R&&!g.defaultPrevented}function Jm(a,d){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:o.setTimeout(a,d||0)}function gc(a){a.g=Jm(()=>{a.g=null,a.i&&(a.i=!1,gc(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class Ym extends w{constructor(d,m){super(),this.m=d,this.l=m,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:gc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ds(a){w.call(this),this.h=a,this.g={}}f(ds,w);var yc=[];function vc(a){me(a.g,function(d,m){this.g.hasOwnProperty(m)&&Yi(d)},a),a.g={}}ds.prototype.N=function(){ds.Z.N.call(this),vc(this)},ds.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ta=o.JSON.stringify,Xm=o.JSON.parse,Zm=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function _c(){}function Ic(){}var hs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ea(){E.call(this,"d")}f(ea,E);function na(){E.call(this,"c")}f(na,E);var rn={},bc=null;function br(){return bc=bc||new kt}rn.Ia="serverreachability";function Ec(a){E.call(this,rn.Ia,a)}f(Ec,E);function ms(a){const d=br();Ot(d,new Ec(d))}rn.STAT_EVENT="statevent";function wc(a,d){E.call(this,rn.STAT_EVENT,a),this.stat=d}f(wc,E);function Vt(a){const d=br();Ot(d,new wc(d,a))}rn.Ja="timingevent";function Tc(a,d){E.call(this,rn.Ja,a),this.size=d}f(Tc,E);function ps(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},d)}function fs(){this.g=!0}fs.prototype.ua=function(){this.g=!1};function tp(a,d,m,g,R,P){a.info(function(){if(a.g)if(P){var V="",G=P.split("&");for(let it=0;it<G.length;it++){var It=G[it].split("=");if(It.length>1){const Et=It[0];It=It[1];const ne=Et.split("_");V=ne.length>=2&&ne[1]=="type"?V+(Et+"="+It+"&"):V+(Et+"=redacted&")}}}else V=null;else V=P;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+d+`
`+m+`
`+V})}function ep(a,d,m,g,R,P,V){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+d+`
`+m+`
`+P+" "+V})}function Rn(a,d,m,g){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+sp(a,m)+(g?" "+g:"")})}function np(a,d){a.info(function(){return"TIMEOUT: "+d})}fs.prototype.info=function(){};function sp(a,d){if(!a.g)return d;if(!d)return null;try{const P=JSON.parse(d);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var m=P[a];if(!(m.length<2)){var g=m[1];if(Array.isArray(g)&&!(g.length<1)){var R=g[0];if(R!="noop"&&R!="stop"&&R!="close")for(let V=1;V<g.length;V++)g[V]=""}}}}return ta(P)}catch{return d}}var Er={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ac={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Sc;function sa(){}f(sa,_c),sa.prototype.g=function(){return new XMLHttpRequest},Sc=new sa;function gs(a){return encodeURIComponent(String(a))}function rp(a){var d=1;a=a.split(":");const m=[];for(;d>0&&a.length;)m.push(a.shift()),d--;return a.length&&m.push(a.join(":")),m}function Re(a,d,m,g){this.j=a,this.i=d,this.l=m,this.S=g||1,this.V=new ds(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Cc}function Cc(){this.i=null,this.g="",this.h=!1}var Rc={},ra={};function ia(a,d,m){a.M=1,a.A=Tr(ee(d)),a.u=m,a.R=!0,Pc(a,null)}function Pc(a,d){a.F=Date.now(),wr(a),a.B=ee(a.A);var m=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),qc(m.i,"t",g),a.C=0,m=a.j.L,a.h=new Cc,a.g=al(a.j,m?d:null,!a.u),a.P>0&&(a.O=new Ym(c(a.Y,a,a.g),a.P)),d=a.V,m=a.g,g=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(yc[0]=R.toString()),R=yc);for(let P=0;P<R.length;P++){const V=hc(m,R[P],g||d.handleEvent,!1,d.h||d);if(!V)break;d.g[V.key]=V}d=a.J?Cn(a.J):{},a.u?(a.v||(a.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,d)):(a.v="GET",a.g.ea(a.B,a.v,null,d)),ms(),tp(a.i,a.v,a.B,a.l,a.S,a.u)}Re.prototype.ba=function(a){a=a.target;const d=this.O;d&&xe(a)==3?d.j():this.Y(a)},Re.prototype.Y=function(a){try{if(a==this.g)t:{const G=xe(this.g),It=this.g.ya(),it=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||Qc(this.g)))){this.K||G!=4||It==7||(It==8||it<=0?ms(3):ms(2)),aa(this);var d=this.g.ca();this.X=d;var m=ip(this);if(this.o=d==200,ep(this.i,this.v,this.B,this.l,this.S,G,d),this.o){if(this.U&&!this.L){e:{if(this.g){var g,R=this.g;if((g=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(g)){var P=g;break e}}P=null}if(a=P)Rn(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,oa(this,a);else{this.o=!1,this.m=3,Vt(12),an(this),ys(this);break t}}if(this.R){a=!0;let Et;for(;!this.K&&this.C<m.length;)if(Et=ap(this,m),Et==ra){G==4&&(this.m=4,Vt(14),a=!1),Rn(this.i,this.l,null,"[Incomplete Response]");break}else if(Et==Rc){this.m=4,Vt(15),Rn(this.i,this.l,m,"[Invalid Chunk]"),a=!1;break}else Rn(this.i,this.l,Et,null),oa(this,Et);if(kc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||m.length!=0||this.h.h||(this.m=1,Vt(16),a=!1),this.o=this.o&&a,!a)Rn(this.i,this.l,m,"[Invalid Chunked Response]"),an(this),ys(this);else if(m.length>0&&!this.W){this.W=!0;var V=this.j;V.g==this&&V.aa&&!V.P&&(V.j.info("Great, no buffering proxy detected. Bytes received: "+m.length),fa(V),V.P=!0,Vt(11))}}else Rn(this.i,this.l,m,null),oa(this,m);G==4&&an(this),this.o&&!this.K&&(G==4?nl(this.j,this):(this.o=!1,wr(this)))}else Ip(this.g),d==400&&m.indexOf("Unknown SID")>0?(this.m=3,Vt(12)):(this.m=0,Vt(13)),an(this),ys(this)}}}catch{}finally{}};function ip(a){if(!kc(a))return a.g.la();const d=Qc(a.g);if(d==="")return"";let m="";const g=d.length,R=xe(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return an(a),ys(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<g;P++)a.h.h=!0,m+=a.h.i.decode(d[P],{stream:!(R&&P==g-1)});return d.length=0,a.h.g+=m,a.C=0,a.h.g}function kc(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function ap(a,d){var m=a.C,g=d.indexOf(`
`,m);return g==-1?ra:(m=Number(d.substring(m,g)),isNaN(m)?Rc:(g+=1,g+m>d.length?ra:(d=d.slice(g,g+m),a.C=g+m,d)))}Re.prototype.cancel=function(){this.K=!0,an(this)};function wr(a){a.T=Date.now()+a.H,xc(a,a.H)}function xc(a,d){if(a.D!=null)throw Error("WatchDog timer not null");a.D=ps(c(a.aa,a),d)}function aa(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Re.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(np(this.i,this.B),this.M!=2&&(ms(),Vt(17)),an(this),this.m=2,ys(this)):xc(this,this.T-a)};function ys(a){a.j.I==0||a.K||nl(a.j,a)}function an(a){aa(a);var d=a.O;d&&typeof d.dispose=="function"&&d.dispose(),a.O=null,vc(a.V),a.g&&(d=a.g,a.g=null,d.abort(),d.dispose())}function oa(a,d){try{var m=a.j;if(m.I!=0&&(m.g==a||ca(m.h,a))){if(!a.L&&ca(m.h,a)&&m.I==3){try{var g=m.Ba.g.parse(d)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){t:if(!m.v){if(m.g)if(m.g.F+3e3<a.F)Pr(m),Cr(m);else break t;pa(m),Vt(18)}}else m.xa=R[1],0<m.xa-m.K&&R[2]<37500&&m.F&&m.A==0&&!m.C&&(m.C=ps(c(m.Va,m),6e3));Lc(m.h)<=1&&m.ta&&(m.ta=void 0)}else cn(m,11)}else if((a.L||m.g==a)&&Pr(m),!I(d))for(R=m.Ba.g.parse(d),d=0;d<R.length;d++){let it=R[d];const Et=it[0];if(!(Et<=m.K))if(m.K=Et,it=it[1],m.I==2)if(it[0]=="c"){m.M=it[1],m.ba=it[2];const ne=it[3];ne!=null&&(m.ka=ne,m.j.info("VER="+m.ka));const ln=it[4];ln!=null&&(m.za=ln,m.j.info("SVER="+m.za));const De=it[5];De!=null&&typeof De=="number"&&De>0&&(g=1.5*De,m.O=g,m.j.info("backChannelRequestTimeoutMs_="+g)),g=m;const Ne=a.g;if(Ne){const xr=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xr){var P=g.h;P.g||xr.indexOf("spdy")==-1&&xr.indexOf("quic")==-1&&xr.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(la(P,P.h),P.h=null))}if(g.G){const ga=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;ga&&(g.wa=ga,ot(g.J,g.G,ga))}}m.I=3,m.l&&m.l.ra(),m.aa&&(m.T=Date.now()-a.F,m.j.info("Handshake RTT: "+m.T+"ms")),g=m;var V=a;if(g.na=il(g,g.L?g.ba:null,g.W),V.L){Oc(g.h,V);var G=V,It=g.O;It&&(G.H=It),G.D&&(aa(G),wr(G)),g.g=V}else tl(g);m.i.length>0&&Rr(m)}else it[0]!="stop"&&it[0]!="close"||cn(m,7);else m.I==3&&(it[0]=="stop"||it[0]=="close"?it[0]=="stop"?cn(m,7):ma(m):it[0]!="noop"&&m.l&&m.l.qa(it),m.A=0)}}ms(4)}catch{}}var op=class{constructor(a,d){this.g=a,this.map=d}};function Dc(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Nc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Lc(a){return a.h?1:a.g?a.g.size:0}function ca(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function la(a,d){a.g?a.g.add(d):a.h=d}function Oc(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Dc.prototype.cancel=function(){if(this.i=Vc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Vc(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const m of a.g.values())d=d.concat(m.G);return d}return _(a.i)}var Mc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cp(a,d){if(a){a=a.split("&");for(let m=0;m<a.length;m++){const g=a[m].indexOf("=");let R,P=null;g>=0?(R=a[m].substring(0,g),P=a[m].substring(g+1)):R=a[m],d(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Pe(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;a instanceof Pe?(this.l=a.l,vs(this,a.j),this.o=a.o,this.g=a.g,_s(this,a.u),this.h=a.h,ua(this,jc(a.i)),this.m=a.m):a&&(d=String(a).match(Mc))?(this.l=!1,vs(this,d[1]||"",!0),this.o=Is(d[2]||""),this.g=Is(d[3]||"",!0),_s(this,d[4]),this.h=Is(d[5]||"",!0),ua(this,d[6]||"",!0),this.m=Is(d[7]||"")):(this.l=!1,this.i=new Es(null,this.l))}Pe.prototype.toString=function(){const a=[];var d=this.j;d&&a.push(bs(d,$c,!0),":");var m=this.g;return(m||d=="file")&&(a.push("//"),(d=this.o)&&a.push(bs(d,$c,!0),"@"),a.push(gs(m).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.u,m!=null&&a.push(":",String(m))),(m=this.h)&&(this.g&&m.charAt(0)!="/"&&a.push("/"),a.push(bs(m,m.charAt(0)=="/"?dp:up,!0))),(m=this.i.toString())&&a.push("?",m),(m=this.m)&&a.push("#",bs(m,mp)),a.join("")},Pe.prototype.resolve=function(a){const d=ee(this);let m=!!a.j;m?vs(d,a.j):m=!!a.o,m?d.o=a.o:m=!!a.g,m?d.g=a.g:m=a.u!=null;var g=a.h;if(m)_s(d,a.u);else if(m=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var R=d.h.lastIndexOf("/");R!=-1&&(g=d.h.slice(0,R+1)+g)}if(R=g,R==".."||R==".")g="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){g=R.lastIndexOf("/",0)==0,R=R.split("/");const P=[];for(let V=0;V<R.length;){const G=R[V++];G=="."?g&&V==R.length&&P.push(""):G==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),g&&V==R.length&&P.push("")):(P.push(G),g=!0)}g=P.join("/")}else g=R}return m?d.h=g:m=a.i.toString()!=="",m?ua(d,jc(a.i)):m=!!a.m,m&&(d.m=a.m),d};function ee(a){return new Pe(a)}function vs(a,d,m){a.j=m?Is(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function _s(a,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);a.u=d}else a.u=null}function ua(a,d,m){d instanceof Es?(a.i=d,pp(a.i,a.l)):(m||(d=bs(d,hp)),a.i=new Es(d,a.l))}function ot(a,d,m){a.i.set(d,m)}function Tr(a){return ot(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Is(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function bs(a,d,m){return typeof a=="string"?(a=encodeURI(a).replace(d,lp),m&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function lp(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var $c=/[#\/\?@]/g,up=/[#\?:]/g,dp=/[#\?]/g,hp=/[#\?@]/g,mp=/#/g;function Es(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function on(a){a.g||(a.g=new Map,a.h=0,a.i&&cp(a.i,function(d,m){a.add(decodeURIComponent(d.replace(/\+/g," ")),m)}))}n=Es.prototype,n.add=function(a,d){on(this),this.i=null,a=Pn(this,a);let m=this.g.get(a);return m||this.g.set(a,m=[]),m.push(d),this.h+=1,this};function Bc(a,d){on(a),d=Pn(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function Fc(a,d){return on(a),d=Pn(a,d),a.g.has(d)}n.forEach=function(a,d){on(this),this.g.forEach(function(m,g){m.forEach(function(R){a.call(d,R,g,this)},this)},this)};function Uc(a,d){on(a);let m=[];if(typeof d=="string")Fc(a,d)&&(m=m.concat(a.g.get(Pn(a,d))));else for(a=Array.from(a.g.values()),d=0;d<a.length;d++)m=m.concat(a[d]);return m}n.set=function(a,d){return on(this),this.i=null,a=Pn(this,a),Fc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},n.get=function(a,d){return a?(a=Uc(this,a),a.length>0?String(a[0]):d):d};function qc(a,d,m){Bc(a,d),m.length>0&&(a.i=null,a.g.set(Pn(a,d),_(m)),a.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(let g=0;g<d.length;g++){var m=d[g];const R=gs(m);m=Uc(this,m);for(let P=0;P<m.length;P++){let V=R;m[P]!==""&&(V+="="+gs(m[P])),a.push(V)}}return this.i=a.join("&")};function jc(a){const d=new Es;return d.i=a.i,a.g&&(d.g=new Map(a.g),d.h=a.h),d}function Pn(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function pp(a,d){d&&!a.j&&(on(a),a.i=null,a.g.forEach(function(m,g){const R=g.toLowerCase();g!=R&&(Bc(this,g),qc(this,R,m))},a)),a.j=d}function fp(a,d){const m=new fs;if(o.Image){const g=new Image;g.onload=h(ke,m,"TestLoadImage: loaded",!0,d,g),g.onerror=h(ke,m,"TestLoadImage: error",!1,d,g),g.onabort=h(ke,m,"TestLoadImage: abort",!1,d,g),g.ontimeout=h(ke,m,"TestLoadImage: timeout",!1,d,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else d(!1)}function gp(a,d){const m=new fs,g=new AbortController,R=setTimeout(()=>{g.abort(),ke(m,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(R),P.ok?ke(m,"TestPingServer: ok",!0,d):ke(m,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(R),ke(m,"TestPingServer: error",!1,d)})}function ke(a,d,m,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(m)}catch{}}function yp(){this.g=new Zm}function da(a){this.i=a.Sb||null,this.h=a.ab||!1}f(da,_c),da.prototype.g=function(){return new Ar(this.i,this.h)};function Ar(a,d){kt.call(this),this.H=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(Ar,kt),n=Ar.prototype,n.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=d,this.readyState=1,Ts(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(d.body=a),(this.H||o).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ws(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ts(this)),this.g&&(this.readyState=3,Ts(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;zc(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function zc(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?ws(this):Ts(this),this.readyState==3&&zc(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ws(this))},n.Na=function(a){this.g&&(this.response=a,ws(this))},n.ga=function(){this.g&&ws(this)};function ws(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Ts(a)}n.setRequestHeader=function(a,d){this.A.append(a,d)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var m=d.next();!m.done;)m=m.value,a.push(m[0]+": "+m[1]),m=d.next();return a.join(`\r
`)};function Ts(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Hc(a){let d="";return me(a,function(m,g){d+=g,d+=":",d+=m,d+=`\r
`}),d}function ha(a,d,m){t:{for(g in m){var g=!1;break t}g=!0}g||(m=Hc(m),typeof a=="string"?m!=null&&gs(m):ot(a,d,m))}function mt(a){kt.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(mt,kt);var vp=/^https?$/i,_p=["POST","PUT"];n=mt.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,d,m,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Sc.g(),this.g.onreadystatechange=p(c(this.Ca,this));try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(P){Wc(this,P);return}if(a=m||"",m=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)m.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())m.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(m.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(_p,d,void 0)>=0)||g||R||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,V]of m)this.g.setRequestHeader(P,V);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Wc(this,P)}};function Wc(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.o=5,Gc(a),Sr(a)}function Gc(a){a.A||(a.A=!0,Ot(a,"complete"),Ot(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ot(this,"complete"),Ot(this,"abort"),Sr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Sr(this,!0)),mt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Kc(this):this.Xa())},n.Xa=function(){Kc(this)};function Kc(a){if(a.h&&typeof i<"u"){if(a.v&&xe(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ot(a,"readystatechange"),xe(a)==4){a.h=!1;try{const P=a.ca();t:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break t;default:d=!1}var m;if(!(m=d)){var g;if(g=P===0){let V=String(a.D).match(Mc)[1]||null;!V&&o.self&&o.self.location&&(V=o.self.location.protocol.slice(0,-1)),g=!vp.test(V?V.toLowerCase():"")}m=g}if(m)Ot(a,"complete"),Ot(a,"success");else{a.o=6;try{var R=xe(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",Gc(a)}}finally{Sr(a)}}}}function Sr(a,d){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const m=a.g;a.g=null,d||Ot(a,"ready");try{m.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function xe(a){return a.g?a.g.readyState:0}n.ca=function(){try{return xe(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),Xm(d)}};function Qc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Ip(a){const d={};a=(a.g&&xe(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(I(a[g]))continue;var m=rp(a[g]);const R=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const P=d[R]||[];d[R]=P,P.push(m)}pe(d,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function As(a,d,m){return m&&m.internalChannelParams&&m.internalChannelParams[a]||d}function Jc(a){this.za=0,this.i=[],this.j=new fs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=As("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=As("baseRetryDelayMs",5e3,a),this.Za=As("retryDelaySeedMs",1e4,a),this.Ta=As("forwardChannelMaxRetries",2,a),this.va=As("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Dc(a&&a.concurrentRequestLimit),this.Ba=new yp,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Jc.prototype,n.ka=8,n.I=1,n.connect=function(a,d,m,g){Vt(0),this.W=a,this.H=d||{},m&&g!==void 0&&(this.H.OSID=m,this.H.OAID=g),this.F=this.X,this.J=il(this,null,this.W),Rr(this)};function ma(a){if(Yc(a),a.I==3){var d=a.V++,m=ee(a.J);if(ot(m,"SID",a.M),ot(m,"RID",d),ot(m,"TYPE","terminate"),Ss(a,m),d=new Re(a,a.j,d),d.M=2,d.A=Tr(ee(m)),m=!1,o.navigator&&o.navigator.sendBeacon)try{m=o.navigator.sendBeacon(d.A.toString(),"")}catch{}!m&&o.Image&&(new Image().src=d.A,m=!0),m||(d.g=al(d.j,null),d.g.ea(d.A)),d.F=Date.now(),wr(d)}rl(a)}function Cr(a){a.g&&(fa(a),a.g.cancel(),a.g=null)}function Yc(a){Cr(a),a.v&&(o.clearTimeout(a.v),a.v=null),Pr(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Rr(a){if(!Nc(a.h)&&!a.m){a.m=!0;var d=a.Ea;st||v(),at||(st(),at=!0),b.add(d,a),a.D=0}}function bp(a,d){return Lc(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=d.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=ps(c(a.Ea,a,d),sl(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new Re(this,this.j,a);let P=this.o;if(this.U&&(P?(P=Cn(P),vr(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)t:{for(var d=0,m=0;m<this.i.length;m++){e:{var g=this.i[m];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(d+=g,d>4096){d=m;break t}if(d===4096||m===this.i.length-1){d=m+1;break t}}d=1e3}else d=1e3;d=Zc(this,R,d),m=ee(this.J),ot(m,"RID",a),ot(m,"CVER",22),this.G&&ot(m,"X-HTTP-Session-Id",this.G),Ss(this,m),P&&(this.R?d="headers="+gs(Hc(P))+"&"+d:this.u&&ha(m,this.u,P)),la(this.h,R),this.Ra&&ot(m,"TYPE","init"),this.S?(ot(m,"$req",d),ot(m,"SID","null"),R.U=!0,ia(R,m,null)):ia(R,m,d),this.I=2}}else this.I==3&&(a?Xc(this,a):this.i.length==0||Nc(this.h)||Xc(this))};function Xc(a,d){var m;d?m=d.l:m=a.V++;const g=ee(a.J);ot(g,"SID",a.M),ot(g,"RID",m),ot(g,"AID",a.K),Ss(a,g),a.u&&a.o&&ha(g,a.u,a.o),m=new Re(a,a.j,m,a.D+1),a.u===null&&(m.J=a.o),d&&(a.i=d.G.concat(a.i)),d=Zc(a,m,1e3),m.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),la(a.h,m),ia(m,g,d)}function Ss(a,d){a.H&&me(a.H,function(m,g){ot(d,g,m)}),a.l&&me({},function(m,g){ot(d,g,m)})}function Zc(a,d,m){m=Math.min(a.i.length,m);const g=a.l?c(a.l.Ka,a.l,a):null;t:{var R=a.i;let G=-1;for(;;){const It=["count="+m];G==-1?m>0?(G=R[0].g,It.push("ofs="+G)):G=0:It.push("ofs="+G);let it=!0;for(let Et=0;Et<m;Et++){var P=R[Et].g;const ne=R[Et].map;if(P-=G,P<0)G=Math.max(0,R[Et].g-100),it=!1;else try{P="req"+P+"_"||"";try{var V=ne instanceof Map?ne:Object.entries(ne);for(const[ln,De]of V){let Ne=De;l(De)&&(Ne=ta(De)),It.push(P+ln+"="+encodeURIComponent(Ne))}}catch(ln){throw It.push(P+"type="+encodeURIComponent("_badmap")),ln}}catch{g&&g(ne)}}if(it){V=It.join("&");break t}}V=void 0}return a=a.i.splice(0,m),d.G=a,V}function tl(a){if(!a.g&&!a.v){a.Y=1;var d=a.Da;st||v(),at||(st(),at=!0),b.add(d,a),a.A=0}}function pa(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=ps(c(a.Da,a),sl(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,el(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=ps(c(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Vt(10),Cr(this),el(this))};function fa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function el(a){a.g=new Re(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var d=ee(a.na);ot(d,"RID","rpc"),ot(d,"SID",a.M),ot(d,"AID",a.K),ot(d,"CI",a.F?"0":"1"),!a.F&&a.ia&&ot(d,"TO",a.ia),ot(d,"TYPE","xmlhttp"),Ss(a,d),a.u&&a.o&&ha(d,a.u,a.o),a.O&&(a.g.H=a.O);var m=a.g;a=a.ba,m.M=1,m.A=Tr(ee(d)),m.u=null,m.R=!0,Pc(m,a)}n.Va=function(){this.C!=null&&(this.C=null,Cr(this),pa(this),Vt(19))};function Pr(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function nl(a,d){var m=null;if(a.g==d){Pr(a),fa(a),a.g=null;var g=2}else if(ca(a.h,d))m=d.G,Oc(a.h,d),g=1;else return;if(a.I!=0){if(d.o)if(g==1){m=d.u?d.u.length:0,d=Date.now()-d.F;var R=a.D;g=br(),Ot(g,new Tc(g,m)),Rr(a)}else tl(a);else if(R=d.m,R==3||R==0&&d.X>0||!(g==1&&bp(a,d)||g==2&&pa(a)))switch(m&&m.length>0&&(d=a.h,d.i=d.i.concat(m)),R){case 1:cn(a,5);break;case 4:cn(a,10);break;case 3:cn(a,6);break;default:cn(a,2)}}}function sl(a,d){let m=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(m*=2),m*d}function cn(a,d){if(a.j.info("Error code "+d),d==2){var m=c(a.bb,a),g=a.Ua;const R=!g;g=new Pe(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||vs(g,"https"),Tr(g),R?fp(g.toString(),m):gp(g.toString(),m)}else Vt(2);a.I=0,a.l&&a.l.pa(d),rl(a),Yc(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Vt(2)):(this.j.info("Failed to ping google.com"),Vt(1))};function rl(a){if(a.I=0,a.ja=[],a.l){const d=Vc(a.h);(d.length!=0||a.i.length!=0)&&(C(a.ja,d),C(a.ja,a.i),a.h.i.length=0,_(a.i),a.i.length=0),a.l.oa()}}function il(a,d,m){var g=m instanceof Pe?ee(m):new Pe(m);if(g.g!="")d&&(g.g=d+"."+g.g),_s(g,g.u);else{var R=o.location;g=R.protocol,d=d?d+"."+R.hostname:R.hostname,R=+R.port;const P=new Pe(null);g&&vs(P,g),d&&(P.g=d),R&&_s(P,R),m&&(P.h=m),g=P}return m=a.G,d=a.wa,m&&d&&ot(g,m,d),ot(g,"VER",a.ka),Ss(a,g),g}function al(a,d,m){if(d&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Aa&&!a.ma?new mt(new da({ab:m})):new mt(a.ma),d.Fa(a.L),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ol(){}n=ol.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function kr(){}kr.prototype.g=function(a,d){return new jt(a,d)};function jt(a,d){kt.call(this),this.g=new Jc(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(a?a["X-WebChannel-Client-Profile"]=d.sa:a={"X-WebChannel-Client-Profile":d.sa}),this.g.U=a,(a=d&&d.Qb)&&!I(a)&&(this.g.u=a),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!I(d)&&(this.g.G=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new kn(this)}f(jt,kt),jt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){ma(this.g)},jt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var m={};m.__data__=a,a=m}else this.v&&(m={},m.__data__=ta(a),a=m);d.i.push(new op(d.Ya++,a)),d.I==3&&Rr(d)},jt.prototype.N=function(){this.g.l=null,delete this.j,ma(this.g),delete this.g,jt.Z.N.call(this)};function cl(a){ea.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){t:{for(const m in d){a=m;break t}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}f(cl,ea);function ll(){na.call(this),this.status=1}f(ll,na);function kn(a){this.g=a}f(kn,ol),kn.prototype.ra=function(){Ot(this.g,"a")},kn.prototype.qa=function(a){Ot(this.g,new cl(a))},kn.prototype.pa=function(a){Ot(this.g,new ll)},kn.prototype.oa=function(){Ot(this.g,"b")},kr.prototype.createWebChannel=kr.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,gd=function(){return new kr},fd=function(){return br()},pd=rn,Ba={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Er.NO_ERROR=0,Er.TIMEOUT=8,Er.HTTP_ERROR=6,Fr=Er,Ac.COMPLETE="complete",md=Ac,Ic.EventType=hs,hs.OPEN="a",hs.CLOSE="b",hs.ERROR="c",hs.MESSAGE="d",kt.prototype.listen=kt.prototype.J,ks=Ic,mt.prototype.listenOnce=mt.prototype.K,mt.prototype.getLastError=mt.prototype.Ha,mt.prototype.getLastErrorCode=mt.prototype.ya,mt.prototype.getStatus=mt.prototype.ca,mt.prototype.getResponseJson=mt.prototype.La,mt.prototype.getResponseText=mt.prototype.la,mt.prototype.send=mt.prototype.ea,mt.prototype.setWithCredentials=mt.prototype.Fa,hd=mt}).apply(typeof Dr<"u"?Dr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Dt.UNAUTHENTICATED=new Dt(null),Dt.GOOGLE_CREDENTIALS=new Dt("google-credentials-uid"),Dt.FIRST_PARTY=new Dt("first-party-uid"),Dt.MOCK_USER=new Dt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rs="12.10.0";function cg(n){rs=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new oo("@firebase/firestore");function xn(){return gn.logLevel}function F(n,...t){if(gn.logLevel<=Q.DEBUG){const e=t.map(uo);gn.debug(`Firestore (${rs}): ${n}`,...e)}}function be(n,...t){if(gn.logLevel<=Q.ERROR){const e=t.map(uo);gn.error(`Firestore (${rs}): ${n}`,...e)}}function yn(n,...t){if(gn.logLevel<=Q.WARN){const e=t.map(uo);gn.warn(`Firestore (${rs}): ${n}`,...e)}}function uo(n){if(typeof n=="string")return n;try{return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n,t,e){let s="Unexpected state";typeof t=="string"?s=t:e=t,yd(n,s,e)}function yd(n,t,e){let s=`FIRESTORE (${rs}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{s+=" CONTEXT: "+JSON.stringify(e)}catch{s+=" CONTEXT: "+e}throw be(s),new Error(s)}function Z(n,t,e,s){let r="Unexpected state";typeof e=="string"?r=e:s=e,n||yd(t,r,s)}function W(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Se{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class lg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(Dt.UNAUTHENTICATED))}shutdown(){}}class ug{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class dg{constructor(t){this.t=t,this.currentUser=Dt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Z(this.o===void 0,42304);let s=this.i;const r=u=>this.i!==s?(s=this.i,e(u)):Promise.resolve();let i=new re;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new re,t.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const u=i;t.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},l=u=>{F("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(F("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new re)}},0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(s=>this.i!==t?(F("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Z(typeof s.accessToken=="string",31837,{l:s}),new vd(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Z(t===null||typeof t=="string",2055,{h:t}),new Dt(t)}}class hg{constructor(t,e,s){this.P=t,this.T=e,this.I=s,this.type="FirstParty",this.user=Dt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class mg{constructor(t,e,s){this.P=t,this.T=e,this.I=s}getToken(){return Promise.resolve(new hg(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(Dt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class El{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pg{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qt(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Z(this.o===void 0,3512);const s=i=>{i.error!=null&&F("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,F("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>s(i))};const r=i=>{F("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):F("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new El(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new El(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fg(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let s=0;s<n;s++)e[s]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=fg(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<e&&(s+=t.charAt(r[i]%62))}return s}}function J(n,t){return n<t?-1:n>t?1:0}function Fa(n,t){const e=Math.min(n.length,t.length);for(let s=0;s<e;s++){const r=n.charAt(s),i=t.charAt(s);if(r!==i)return Ea(r)===Ea(i)?J(r,i):Ea(r)?1:-1}return J(n.length,t.length)}const gg=55296,yg=57343;function Ea(n){const t=n.charCodeAt(0);return t>=gg&&t<=yg}function Hn(n,t,e){return n.length===t.length&&n.every((s,r)=>e(s,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="__name__";class se{constructor(t,e,s){e===void 0?e=0:e>t.length&&j(637,{offset:e,range:t.length}),s===void 0?s=t.length-e:s>t.length-e&&j(1746,{length:s,range:t.length-e}),this.segments=t,this.offset=e,this.len=s}get length(){return this.len}isEqual(t){return se.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof se?t.forEach(s=>{e.push(s)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,s=this.limit();e<s;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const s=Math.min(t.length,e.length);for(let r=0;r<s;r++){const i=se.compareSegments(t.get(r),e.get(r));if(i!==0)return i}return J(t.length,e.length)}static compareSegments(t,e){const s=se.isNumericId(t),r=se.isNumericId(e);return s&&!r?-1:!s&&r?1:s&&r?se.extractNumericId(t).compare(se.extractNumericId(e)):Fa(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ze.fromString(t.substring(4,t.length-2))}}class rt extends se{construct(t,e,s){return new rt(t,e,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const s of t){if(s.indexOf("//")>=0)throw new M(k.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);e.push(...s.split("/").filter(r=>r.length>0))}return new rt(e)}static emptyPath(){return new rt([])}}const vg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ct extends se{construct(t,e,s){return new Ct(t,e,s)}static isValidIdentifier(t){return vg.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ct.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===wl}static keyField(){return new Ct([wl])}static fromServerFormat(t){const e=[];let s="",r=0;const i=()=>{if(s.length===0)throw new M(k.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(s),s=""};let o=!1;for(;r<t.length;){const l=t[r];if(l==="\\"){if(r+1===t.length)throw new M(k.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=u,r+=2}else l==="`"?(o=!o,r++):l!=="."||o?(s+=l,r++):(i(),r++)}if(i(),o)throw new M(k.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Ct(e)}static emptyPath(){return new Ct([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(t){this.path=t}static fromPath(t){return new q(rt.fromString(t))}static fromName(t){return new q(rt.fromString(t).popFirst(5))}static empty(){return new q(rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return rt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new q(new rt(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(n,t,e){if(!e)throw new M(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function _g(n,t,e,s){if(t===!0&&s===!0)throw new M(k.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Tl(n){if(!q.isDocumentKey(n))throw new M(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Al(n){if(q.isDocumentKey(n))throw new M(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Id(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ti(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(s){return s.constructor?s.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function ue(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new M(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ti(n);throw new M(k.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(n,t){const e={typeString:n};return t&&(e.value=t),e}function er(n,t){if(!Id(n))throw new M(k.INVALID_ARGUMENT,"JSON must be an object");let e;for(const s in t)if(t[s]){const r=t[s].typeString,i="value"in t[s]?{value:t[s].value}:void 0;if(!(s in n)){e=`JSON missing required field: '${s}'`;break}const o=n[s];if(r&&typeof o!==r){e=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${s}' field to equal '${i.value}'`;break}}if(e)throw new M(k.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=-62135596800,Cl=1e6;class ct{static now(){return ct.fromMillis(Date.now())}static fromDate(t){return ct.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),s=Math.floor((t-1e3*e)*Cl);return new ct(e,s)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new M(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new M(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Sl)throw new M(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new M(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Cl}_compareTo(t){return this.seconds===t.seconds?J(this.nanoseconds,t.nanoseconds):J(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ct._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(er(t,ct._jsonSchema))return new ct(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Sl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ct._jsonSchemaVersion="firestore/timestamp/1.0",ct._jsonSchema={type:vt("string",ct._jsonSchemaVersion),seconds:vt("number"),nanoseconds:vt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(t){return new z(t)}static min(){return new z(new ct(0,0))}static max(){return new z(new ct(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=-1;function Ig(n,t){const e=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=z.fromTimestamp(s===1e9?new ct(e+1,0):new ct(e,s));return new Ge(r,q.empty(),t)}function bg(n){return new Ge(n.readTime,n.key,Us)}class Ge{constructor(t,e,s){this.readTime=t,this.documentKey=e,this.largestBatchId=s}static min(){return new Ge(z.min(),q.empty(),Us)}static max(){return new Ge(z.max(),q.empty(),Us)}}function Eg(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=q.comparator(n.documentKey,t.documentKey),e!==0?e:J(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==wg)throw n;F("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new D((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(e,i).next(s,r)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof D?e:D.resolve(e)}catch(e){return D.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):D.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):D.reject(e)}static resolve(t){return new D((e,s)=>{e(t)})}static reject(t){return new D((e,s)=>{s(t)})}static waitFor(t){return new D((e,s)=>{let r=0,i=0,o=!1;t.forEach(l=>{++r,l.next(()=>{++i,o&&i===r&&e()},u=>s(u))}),o=!0,i===r&&e()})}static or(t){let e=D.resolve(!1);for(const s of t)e=e.next(r=>r?D.resolve(r):s());return e}static forEach(t,e){const s=[];return t.forEach((r,i)=>{s.push(e.call(this,r,i))}),this.waitFor(s)}static mapArray(t,e){return new D((s,r)=>{const i=t.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const c=u;e(t[c]).next(h=>{o[c]=h,++l,l===i&&s(o)},h=>r(h))}})}static doWhile(t,e){return new D((s,r)=>{const i=()=>{t()===!0?e().next(()=>{i()},r):s()};i()})}}function Ag(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function as(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>e.writeSequenceNumber(s))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Ai.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo=-1;function nr(n){return n==null}function Zr(n){return n===0&&1/n==-1/0}function Sg(n){return typeof n=="number"&&Number.isInteger(n)&&!Zr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="";function Cg(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Rl(t)),t=Rg(n.get(e),t);return Rl(t)}function Rg(n,t){let e=t;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":e+="";break;case bd:e+="";break;default:e+=i}}return e}function Rl(n){return n+bd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pl(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function tn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ed(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t,e){this.comparator=t,this.root=e||St.EMPTY}insert(t,e){return new ht(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,St.BLACK,null,null))}remove(t){return new ht(this.comparator,this.root.remove(t,this.comparator).copy(null,null,St.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const s=this.comparator(t,e.key);if(s===0)return e.value;s<0?e=e.left:s>0&&(e=e.right)}return null}indexOf(t){let e=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(t,s.key);if(r===0)return e+s.left.size;r<0?s=s.left:(e+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,s)=>(t(e,s),!1))}toString(){const t=[];return this.inorderTraversal((e,s)=>(t.push(`${e}:${s}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Nr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Nr(this.root,t,this.comparator,!1)}getReverseIterator(){return new Nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Nr(this.root,t,this.comparator,!0)}}class Nr{constructor(t,e,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?s(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class St{constructor(t,e,s,r,i){this.key=t,this.value=e,this.color=s??St.RED,this.left=r??St.EMPTY,this.right=i??St.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,s,r,i){return new St(t??this.key,e??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,s){let r=this;const i=s(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,s),null):i===0?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return St.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let s,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),e(t,r.key)===0){if(r.right.isEmpty())return St.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,St.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,St.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw j(27949);return t+(this.isRed()?0:1)}}St.EMPTY=null,St.RED=!0,St.BLACK=!1;St.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(t,e,s,r,i){return this}insert(t,e,s){return new St(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.comparator=t,this.data=new ht(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,s)=>(t(e),!1))}forEachInRange(t,e){const s=this.data.getIteratorFrom(t[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let s;for(s=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();s.hasNext();)if(!t(s.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new kl(this.data.getIterator())}getIteratorFrom(t){return new kl(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(s=>{e=e.add(s)}),e}isEqual(t){if(!(t instanceof bt)||this.size!==t.size)return!1;const e=this.data.getIterator(),s=t.data.getIterator();for(;e.hasNext();){const r=e.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new bt(this.comparator);return e.data=t,e}}class kl{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t){this.fields=t,t.sort(Ct.comparator)}static empty(){return new Wt([])}unionWith(t){let e=new bt(Ct.comparator);for(const s of this.fields)e=e.add(s);for(const s of t)e=e.add(s);return new Wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Hn(this.fields,t.fields,(e,s)=>e.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new wd("Invalid base64 string: "+i):i}}(t);return new Pt(e)}static fromUint8Array(t){const e=function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i}(t);return new Pt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const s=new Uint8Array(e.length);for(let r=0;r<e.length;r++)s[r]=e.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return J(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Pt.EMPTY_BYTE_STRING=new Pt("");const Pg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ke(n){if(Z(!!n,39018),typeof n=="string"){let t=0;const e=Pg.exec(n);if(Z(!!e,46558,{timestamp:n}),e[1]){let r=e[1];r=(r+"000000000").substr(0,9),t=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:pt(n.seconds),nanos:pt(n.nanos)}}function pt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qe(n){return typeof n=="string"?Pt.fromBase64String(n):Pt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td="server_timestamp",Ad="__type__",Sd="__previous_value__",Cd="__local_write_time__";function po(n){var e,s;return((s=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Ad])==null?void 0:s.stringValue)===Td}function Si(n){const t=n.mapValue.fields[Sd];return po(t)?Si(t):t}function qs(n){const t=Ke(n.mapValue.fields[Cd].timestampValue);return new ct(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(t,e,s,r,i,o,l,u,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=h,this.apiKey=f}}const ti="(default)";class js{constructor(t,e){this.projectId=t,this.database=e||ti}static empty(){return new js("","")}get isDefaultDatabase(){return this.database===ti}isEqual(t){return t instanceof js&&t.projectId===this.projectId&&t.database===this.database}}function xg(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new M(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new js(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd="__type__",Dg="__max__",Lr={mapValue:{}},Pd="__vector__",ei="value";function Je(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?po(n)?4:Lg(n)?9007199254740991:Ng(n)?10:11:j(28295,{value:n})}function de(n,t){if(n===t)return!0;const e=Je(n);if(e!==Je(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return qs(n).isEqual(qs(t));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const o=Ke(r.timestampValue),l=Ke(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(r,i){return Qe(r.bytesValue).isEqual(Qe(i.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(r,i){return pt(r.geoPointValue.latitude)===pt(i.geoPointValue.latitude)&&pt(r.geoPointValue.longitude)===pt(i.geoPointValue.longitude)}(n,t);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return pt(r.integerValue)===pt(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const o=pt(r.doubleValue),l=pt(i.doubleValue);return o===l?Zr(o)===Zr(l):isNaN(o)&&isNaN(l)}return!1}(n,t);case 9:return Hn(n.arrayValue.values||[],t.arrayValue.values||[],de);case 10:case 11:return function(r,i){const o=r.mapValue.fields||{},l=i.mapValue.fields||{};if(Pl(o)!==Pl(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!de(o[u],l[u])))return!1;return!0}(n,t);default:return j(52216,{left:n})}}function zs(n,t){return(n.values||[]).find(e=>de(e,t))!==void 0}function Wn(n,t){if(n===t)return 0;const e=Je(n),s=Je(t);if(e!==s)return J(e,s);switch(e){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,t.booleanValue);case 2:return function(i,o){const l=pt(i.integerValue||i.doubleValue),u=pt(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,t);case 3:return xl(n.timestampValue,t.timestampValue);case 4:return xl(qs(n),qs(t));case 5:return Fa(n.stringValue,t.stringValue);case 6:return function(i,o){const l=Qe(i),u=Qe(o);return l.compareTo(u)}(n.bytesValue,t.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const h=J(l[c],u[c]);if(h!==0)return h}return J(l.length,u.length)}(n.referenceValue,t.referenceValue);case 8:return function(i,o){const l=J(pt(i.latitude),pt(o.latitude));return l!==0?l:J(pt(i.longitude),pt(o.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Dl(n.arrayValue,t.arrayValue);case 10:return function(i,o){var p,_,C,A;const l=i.fields||{},u=o.fields||{},c=(p=l[ei])==null?void 0:p.arrayValue,h=(_=u[ei])==null?void 0:_.arrayValue,f=J(((C=c==null?void 0:c.values)==null?void 0:C.length)||0,((A=h==null?void 0:h.values)==null?void 0:A.length)||0);return f!==0?f:Dl(c,h)}(n.mapValue,t.mapValue);case 11:return function(i,o){if(i===Lr.mapValue&&o===Lr.mapValue)return 0;if(i===Lr.mapValue)return 1;if(o===Lr.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),c=o.fields||{},h=Object.keys(c);u.sort(),h.sort();for(let f=0;f<u.length&&f<h.length;++f){const p=Fa(u[f],h[f]);if(p!==0)return p;const _=Wn(l[u[f]],c[h[f]]);if(_!==0)return _}return J(u.length,h.length)}(n.mapValue,t.mapValue);default:throw j(23264,{he:e})}}function xl(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return J(n,t);const e=Ke(n),s=Ke(t),r=J(e.seconds,s.seconds);return r!==0?r:J(e.nanos,s.nanos)}function Dl(n,t){const e=n.values||[],s=t.values||[];for(let r=0;r<e.length&&r<s.length;++r){const i=Wn(e[r],s[r]);if(i)return i}return J(e.length,s.length)}function Gn(n){return Ua(n)}function Ua(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const s=Ke(e);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Qe(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return q.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let s="[",r=!0;for(const i of e.values||[])r?r=!1:s+=",",s+=Ua(i);return s+"]"}(n.arrayValue):"mapValue"in n?function(e){const s=Object.keys(e.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${Ua(e.fields[o])}`;return r+"}"}(n.mapValue):j(61005,{value:n})}function Ur(n){switch(Je(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Si(n);return t?16+Ur(t):16;case 5:return 2*n.stringValue.length;case 6:return Qe(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((r,i)=>r+Ur(i),0)}(n.arrayValue);case 10:case 11:return function(s){let r=0;return tn(s.fields,(i,o)=>{r+=i.length+Ur(o)}),r}(n.mapValue);default:throw j(13486,{value:n})}}function Nl(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function qa(n){return!!n&&"integerValue"in n}function fo(n){return!!n&&"arrayValue"in n}function Ll(n){return!!n&&"nullValue"in n}function Ol(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function qr(n){return!!n&&"mapValue"in n}function Ng(n){var e,s;return((s=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Rd])==null?void 0:s.stringValue)===Pd}function Ls(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return tn(n.mapValue.fields,(e,s)=>t.mapValue.fields[e]=Ls(s)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ls(n.arrayValue.values[e]);return t}return{...n}}function Lg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Dg}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this.value=t}static empty(){return new Mt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let s=0;s<t.length-1;++s)if(e=(e.mapValue.fields||{})[t.get(s)],!qr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ls(e)}setAll(t){let e=Ct.emptyPath(),s={},r=[];t.forEach((o,l)=>{if(!e.isImmediateParentOf(l)){const u=this.getFieldsMap(e);this.applyChanges(u,s,r),s={},r=[],e=l.popLast()}o?s[l.lastSegment()]=Ls(o):r.push(l.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,s,r)}delete(t){const e=this.field(t.popLast());qr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return de(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let s=0;s<t.length;++s){let r=e.mapValue.fields[t.get(s)];qr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(s)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,s){tn(e,(r,i)=>t[r]=i);for(const r of s)delete t[r]}clone(){return new Mt(Ls(this.value))}}function kd(n){const t=[];return tn(n.fields,(e,s)=>{const r=new Ct([e]);if(qr(s)){const i=kd(s.mapValue).fields;if(i.length===0)t.push(r);else for(const o of i)t.push(r.child(o))}else t.push(r)}),new Wt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t,e,s,r,i,o,l){this.key=t,this.documentType=e,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(t){return new Tt(t,0,z.min(),z.min(),z.min(),Mt.empty(),0)}static newFoundDocument(t,e,s,r){return new Tt(t,1,e,z.min(),s,r,0)}static newNoDocument(t,e){return new Tt(t,2,e,z.min(),z.min(),Mt.empty(),0)}static newUnknownDocument(t,e){return new Tt(t,3,e,z.min(),z.min(),Mt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Tt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(t,e){this.position=t,this.inclusive=e}}function Vl(n,t,e){let s=0;for(let r=0;r<n.position.length;r++){const i=t[r],o=n.position[r];if(i.field.isKeyField()?s=q.comparator(q.fromName(o.referenceValue),e.key):s=Wn(o,e.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function Ml(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!de(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(t,e="asc"){this.field=t,this.dir=e}}function Og(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{}class yt extends xd{constructor(t,e,s){super(),this.field=t,this.op=e,this.value=s}static create(t,e,s){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,s):new Mg(t,e,s):e==="array-contains"?new Fg(t,s):e==="in"?new Ug(t,s):e==="not-in"?new qg(t,s):e==="array-contains-any"?new jg(t,s):new yt(t,e,s)}static createKeyFieldInFilter(t,e,s){return e==="in"?new $g(t,s):new Bg(t,s)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Wn(e,this.value)):e!==null&&Je(this.value)===Je(e)&&this.matchesComparison(Wn(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Zt extends xd{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Zt(t,e)}matches(t){return Dd(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Dd(n){return n.op==="and"}function Nd(n){return Vg(n)&&Dd(n)}function Vg(n){for(const t of n.filters)if(t instanceof Zt)return!1;return!0}function ja(n){if(n instanceof yt)return n.field.canonicalString()+n.op.toString()+Gn(n.value);if(Nd(n))return n.filters.map(t=>ja(t)).join(",");{const t=n.filters.map(e=>ja(e)).join(",");return`${n.op}(${t})`}}function Ld(n,t){return n instanceof yt?function(s,r){return r instanceof yt&&s.op===r.op&&s.field.isEqual(r.field)&&de(s.value,r.value)}(n,t):n instanceof Zt?function(s,r){return r instanceof Zt&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,o,l)=>i&&Ld(o,r.filters[l]),!0):!1}(n,t):void j(19439)}function Od(n){return n instanceof yt?function(e){return`${e.field.canonicalString()} ${e.op} ${Gn(e.value)}`}(n):n instanceof Zt?function(e){return e.op.toString()+" {"+e.getFilters().map(Od).join(" ,")+"}"}(n):"Filter"}class Mg extends yt{constructor(t,e,s){super(t,e,s),this.key=q.fromName(s.referenceValue)}matches(t){const e=q.comparator(t.key,this.key);return this.matchesComparison(e)}}class $g extends yt{constructor(t,e){super(t,"in",e),this.keys=Vd("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Bg extends yt{constructor(t,e){super(t,"not-in",e),this.keys=Vd("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Vd(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(s=>q.fromName(s.referenceValue))}class Fg extends yt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return fo(e)&&zs(e.arrayValue,this.value)}}class Ug extends yt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&zs(this.value.arrayValue,e)}}class qg extends yt{constructor(t,e){super(t,"not-in",e)}matches(t){if(zs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!zs(this.value.arrayValue,e)}}class jg extends yt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!fo(e)||!e.arrayValue.values)&&e.arrayValue.values.some(s=>zs(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(t,e=null,s=[],r=[],i=null,o=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=l,this.Te=null}}function $l(n,t=null,e=[],s=[],r=null,i=null,o=null){return new zg(n,t,e,s,r,i,o)}function go(n){const t=W(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(s=>ja(s)).join(","),e+="|ob:",e+=t.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),nr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(s=>Gn(s)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(s=>Gn(s)).join(",")),t.Te=e}return t.Te}function yo(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Og(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Ld(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Ml(n.startAt,t.startAt)&&Ml(n.endAt,t.endAt)}function za(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(t,e=null,s=[],r=[],i=null,o="F",l=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Hg(n,t,e,s,r,i,o,l){return new sr(n,t,e,s,r,i,o,l)}function vo(n){return new sr(n)}function Bl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Wg(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Md(n){return n.collectionGroup!==null}function Os(n){const t=W(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const s=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new bt(Ct.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new si(i,s))}),e.has(Ct.keyField().canonicalString())||t.Ie.push(new si(Ct.keyField(),s))}return t.Ie}function ie(n){const t=W(n);return t.Ee||(t.Ee=Gg(t,Os(n))),t.Ee}function Gg(n,t){if(n.limitType==="F")return $l(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new si(r.field,i)});const e=n.endAt?new ni(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new ni(n.startAt.position,n.startAt.inclusive):null;return $l(n.path,n.collectionGroup,t,n.filters,n.limit,e,s)}}function Ha(n,t){const e=n.filters.concat([t]);return new sr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Wa(n,t,e){return new sr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ci(n,t){return yo(ie(n),ie(t))&&n.limitType===t.limitType}function $d(n){return`${go(ie(n))}|lt:${n.limitType}`}function Dn(n){return`Query(target=${function(e){let s=e.path.canonicalString();return e.collectionGroup!==null&&(s+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(s+=`, filters: [${e.filters.map(r=>Od(r)).join(", ")}]`),nr(e.limit)||(s+=", limit: "+e.limit),e.orderBy.length>0&&(s+=`, orderBy: [${e.orderBy.map(r=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(r)).join(", ")}]`),e.startAt&&(s+=", startAt: ",s+=e.startAt.inclusive?"b:":"a:",s+=e.startAt.position.map(r=>Gn(r)).join(",")),e.endAt&&(s+=", endAt: ",s+=e.endAt.inclusive?"a:":"b:",s+=e.endAt.position.map(r=>Gn(r)).join(",")),`Target(${s})`}(ie(n))}; limitType=${n.limitType})`}function Ri(n,t){return t.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):q.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(n,t)&&function(s,r){for(const i of Os(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,t)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(n,t)&&function(s,r){return!(s.startAt&&!function(o,l,u){const c=Vl(o,l,u);return o.inclusive?c<=0:c<0}(s.startAt,Os(s),r)||s.endAt&&!function(o,l,u){const c=Vl(o,l,u);return o.inclusive?c>=0:c>0}(s.endAt,Os(s),r))}(n,t)}function Kg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bd(n){return(t,e)=>{let s=!1;for(const r of Os(n)){const i=Qg(r,t,e);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Qg(n,t,e){const s=n.field.isKeyField()?q.comparator(t.key,e.key):function(i,o,l){const u=o.data.field(i),c=l.data.field(i);return u!==null&&c!==null?Wn(u,c):j(42886)}(n.field,t,e);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return j(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const s=this.mapKeyFn(t),r=this.inner[s];if(r===void 0)return this.inner[s]=[[t,e]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return void(r[i]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return s.length===1?delete this.inner[e]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(t){tn(this.inner,(e,s)=>{for(const[r,i]of s)t(r,i)})}isEmpty(){return Ed(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg=new ht(q.comparator);function Ee(){return Jg}const Fd=new ht(q.comparator);function xs(...n){let t=Fd;for(const e of n)t=t.insert(e.key,e);return t}function Ud(n){let t=Fd;return n.forEach((e,s)=>t=t.insert(e,s.overlayedDocument)),t}function hn(){return Vs()}function qd(){return Vs()}function Vs(){return new wn(n=>n.toString(),(n,t)=>n.isEqual(t))}const Yg=new ht(q.comparator),Xg=new bt(q.comparator);function Y(...n){let t=Xg;for(const e of n)t=t.add(e);return t}const Zg=new bt(J);function ty(){return Zg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zr(t)?"-0":t}}function jd(n){return{integerValue:""+n}}function ey(n,t){return Sg(t)?jd(t):_o(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(){this._=void 0}}function ny(n,t,e){return n instanceof ri?function(r,i){const o={fields:{[Ad]:{stringValue:Td},[Cd]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&po(i)&&(i=Si(i)),i&&(o.fields[Sd]=i),{mapValue:o}}(e,t):n instanceof Hs?Hd(n,t):n instanceof Ws?Wd(n,t):function(r,i){const o=zd(r,i),l=Fl(o)+Fl(r.Ae);return qa(o)&&qa(r.Ae)?jd(l):_o(r.serializer,l)}(n,t)}function sy(n,t,e){return n instanceof Hs?Hd(n,t):n instanceof Ws?Wd(n,t):e}function zd(n,t){return n instanceof ii?function(s){return qa(s)||function(i){return!!i&&"doubleValue"in i}(s)}(t)?t:{integerValue:0}:null}class ri extends Pi{}class Hs extends Pi{constructor(t){super(),this.elements=t}}function Hd(n,t){const e=Gd(t);for(const s of n.elements)e.some(r=>de(r,s))||e.push(s);return{arrayValue:{values:e}}}class Ws extends Pi{constructor(t){super(),this.elements=t}}function Wd(n,t){let e=Gd(t);for(const s of n.elements)e=e.filter(r=>!de(r,s));return{arrayValue:{values:e}}}class ii extends Pi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Fl(n){return pt(n.integerValue||n.doubleValue)}function Gd(n){return fo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function ry(n,t){return n.field.isEqual(t.field)&&function(s,r){return s instanceof Hs&&r instanceof Hs||s instanceof Ws&&r instanceof Ws?Hn(s.elements,r.elements,de):s instanceof ii&&r instanceof ii?de(s.Ae,r.Ae):s instanceof ri&&r instanceof ri}(n.transform,t.transform)}class iy{constructor(t,e){this.version=t,this.transformResults=e}}class At{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new At}static exists(t){return new At(void 0,t)}static updateTime(t){return new At(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function jr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class ki{}function Kd(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ir(n.key,At.none()):new rr(n.key,n.data,At.none());{const e=n.data,s=Mt.empty();let r=new bt(Ct.comparator);for(let i of t.fields)if(!r.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new en(n.key,s,new Wt(r.toArray()),At.none())}}function ay(n,t,e){n instanceof rr?function(r,i,o){const l=r.value.clone(),u=ql(r.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,t,e):n instanceof en?function(r,i,o){if(!jr(r.precondition,i))return void i.convertToUnknownDocument(o.version);const l=ql(r.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Qd(r)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,t,e):function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,t,e)}function Ms(n,t,e,s){return n instanceof rr?function(i,o,l,u){if(!jr(i.precondition,o))return l;const c=i.value.clone(),h=jl(i.fieldTransforms,u,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(n,t,e,s):n instanceof en?function(i,o,l,u){if(!jr(i.precondition,o))return l;const c=jl(i.fieldTransforms,u,o),h=o.data;return h.setAll(Qd(i)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,t,e,s):function(i,o,l){return jr(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(n,t,e)}function oy(n,t){let e=null;for(const s of n.fieldTransforms){const r=t.data.field(s.field),i=zd(s.transform,r||null);i!=null&&(e===null&&(e=Mt.empty()),e.set(s.field,i))}return e||null}function Ul(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Hn(s,r,(i,o)=>ry(i,o))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class rr extends ki{constructor(t,e,s,r=[]){super(),this.key=t,this.value=e,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class en extends ki{constructor(t,e,s,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Qd(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const s=n.data.field(e);t.set(e,s)}}),t}function ql(n,t,e){const s=new Map;Z(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let r=0;r<e.length;r++){const i=n[r],o=i.transform,l=t.data.field(i.field);s.set(i.field,sy(o,l,e[r]))}return s}function jl(n,t,e){const s=new Map;for(const r of n){const i=r.transform,o=e.data.field(r.field);s.set(r.field,ny(i,o,t))}return s}class ir extends ki{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Jd extends ki{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(t,e,s,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(t,e){const s=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(t.key)&&ay(i,t,s[r])}}applyToLocalView(t,e){for(const s of this.baseMutations)s.key.isEqual(t.key)&&(e=Ms(s,t,e,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(t.key)&&(e=Ms(s,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const s=qd();return this.mutations.forEach(r=>{const i=t.get(r.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=e.has(r.key)?null:l;const u=Kd(o,l);u!==null&&s.set(r.key,u),o.isValidDocument()||o.convertToNoDocument(z.min())}),s}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),Y())}isEqual(t){return this.batchId===t.batchId&&Hn(this.mutations,t.mutations,(e,s)=>Ul(e,s))&&Hn(this.baseMutations,t.baseMutations,(e,s)=>Ul(e,s))}}class Io{constructor(t,e,s,r){this.batch=t,this.commitVersion=e,this.mutationResults=s,this.docVersions=r}static from(t,e,s){Z(t.mutations.length===s.length,58842,{me:t.mutations.length,fe:s.length});let r=function(){return Yg}();const i=t.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Io(t,e,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gt,X;function Yd(n){switch(n){case k.OK:return j(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function Xd(n){if(n===void 0)return be("GRPC error has no .code"),k.UNKNOWN;switch(n){case gt.OK:return k.OK;case gt.CANCELLED:return k.CANCELLED;case gt.UNKNOWN:return k.UNKNOWN;case gt.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case gt.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case gt.INTERNAL:return k.INTERNAL;case gt.UNAVAILABLE:return k.UNAVAILABLE;case gt.UNAUTHENTICATED:return k.UNAUTHENTICATED;case gt.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case gt.NOT_FOUND:return k.NOT_FOUND;case gt.ALREADY_EXISTS:return k.ALREADY_EXISTS;case gt.PERMISSION_DENIED:return k.PERMISSION_DENIED;case gt.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case gt.ABORTED:return k.ABORTED;case gt.OUT_OF_RANGE:return k.OUT_OF_RANGE;case gt.UNIMPLEMENTED:return k.UNIMPLEMENTED;case gt.DATA_LOSS:return k.DATA_LOSS;default:return j(39323,{code:n})}}(X=gt||(gt={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy=new ze([4294967295,4294967295],0);function zl(n){const t=dy().encode(n),e=new dd;return e.update(t),new Uint8Array(e.digest())}function Hl(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),s=t.getUint32(4,!0),r=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ze([e,s],0),new ze([r,i],0)]}class bo{constructor(t,e,s){if(this.bitmap=t,this.padding=e,this.hashCount=s,e<0||e>=8)throw new Ds(`Invalid padding: ${e}`);if(s<0)throw new Ds(`Invalid hash count: ${s}`);if(t.length>0&&this.hashCount===0)throw new Ds(`Invalid hash count: ${s}`);if(t.length===0&&e!==0)throw new Ds(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=ze.fromNumber(this.ge)}ye(t,e,s){let r=t.add(e.multiply(ze.fromNumber(s)));return r.compare(hy)===1&&(r=new ze([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=zl(t),[s,r]=Hl(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);if(!this.we(o))return!1}return!0}static create(t,e,s){const r=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new bo(i,r,e);return s.forEach(l=>o.insert(l)),o}insert(t){if(this.ge===0)return;const e=zl(t),[s,r]=Hl(e);for(let i=0;i<this.hashCount;i++){const o=this.ye(s,r,i);this.be(o)}}be(t){const e=Math.floor(t/8),s=t%8;this.bitmap[e]|=1<<s}}class Ds extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(t,e,s,r,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,s){const r=new Map;return r.set(t,ar.createSynthesizedTargetChangeForCurrentChange(t,e,s)),new xi(z.min(),r,new ht(J),Ee(),Y())}}class ar{constructor(t,e,s,r,i){this.resumeToken=t,this.current=e,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,s){return new ar(s,e,Y(),Y(),Y())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(t,e,s,r){this.Se=t,this.removedTargetIds=e,this.key=s,this.De=r}}class Zd{constructor(t,e){this.targetId=t,this.Ce=e}}class th{constructor(t,e,s=Pt.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=s,this.cause=r}}class Wl{constructor(){this.ve=0,this.Fe=Gl(),this.Me=Pt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=Y(),e=Y(),s=Y();return this.Fe.forEach((r,i)=>{switch(i){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:s=s.add(r);break;default:j(38017,{changeType:i})}}),new ar(this.Me,this.xe,t,e,s)}Ke(){this.Oe=!1,this.Fe=Gl()}qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,Z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class my{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ee(),this.He=Or(),this.Je=Or(),this.Ze=new ht(J)}Xe(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const s=this.nt(e);switch(t.state){case 0:this.rt(e)&&s.Le(t.resumeToken);break;case 1:s.We(),s.Ne||s.Ke(),s.Le(t.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(s.Qe(),s.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),s.Le(t.resumeToken));break;default:j(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((s,r)=>{this.rt(r)&&e(r)})}st(t){const e=t.targetId,s=t.Ce.count,r=this.ot(e);if(r){const i=r.target;if(za(i))if(s===0){const o=new q(i.path);this.et(e,o,Tt.newNoDocument(o,z.min()))}else Z(s===1,20013,{expectedCount:s});else{const o=this._t(e);if(o!==s){const l=this.ut(t),u=l?this.ct(l,t,o):1;if(u!==0){this.it(e);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,c)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=e;let o,l;try{o=Qe(s).toUint8Array()}catch(u){if(u instanceof wd)return yn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new bo(o,r,i)}catch(u){return yn(u instanceof Ds?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(t,e,s){return e.Ce.count===s-this.Pt(t,e.targetId)?0:2}Pt(t,e){const s=this.Ge.getRemoteKeysForTarget(e);let r=0;return s.forEach(i=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(l)||(this.et(e,i,null),r++)}),r}Tt(t){const e=new Map;this.ze.forEach((i,o)=>{const l=this.ot(o);if(l){if(i.current&&za(l.target)){const u=new q(l.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,Tt.newNoDocument(u,t))}i.Be&&(e.set(o,i.ke()),i.Ke())}});let s=Y();this.Je.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(i))}),this.je.forEach((i,o)=>o.setReadTime(t));const r=new xi(t,e,this.Ze,this.je,s);return this.je=Ee(),this.He=Or(),this.Je=Or(),this.Ze=new ht(J),r}Ye(t,e){if(!this.rt(t))return;const s=this.Et(t,e.key)?2:0;this.nt(t).qe(e.key,s),this.je=this.je.insert(e.key,e),this.He=this.He.insert(e.key,this.It(e.key).add(t)),this.Je=this.Je.insert(e.key,this.Rt(e.key).add(t))}et(t,e,s){if(!this.rt(t))return;const r=this.nt(t);this.Et(t,e)?r.qe(e,1):r.Ue(e),this.Je=this.Je.insert(e,this.Rt(e).delete(t)),this.Je=this.Je.insert(e,this.Rt(e).add(t)),s&&(this.je=this.je.insert(e,s))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Wl,this.ze.set(t,e)),e}Rt(t){let e=this.Je.get(t);return e||(e=new bt(J),this.Je=this.Je.insert(t,e)),e}It(t){let e=this.He.get(t);return e||(e=new bt(J),this.He=this.He.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||F("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Wl),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Or(){return new ht(q.comparator)}function Gl(){return new ht(q.comparator)}const py={asc:"ASCENDING",desc:"DESCENDING"},fy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gy={and:"AND",or:"OR"};class yy{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Ga(n,t){return n.useProto3Json||nr(t)?t:{value:t}}function ai(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function eh(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function vy(n,t){return ai(n,t.toTimestamp())}function Gt(n){return Z(!!n,49232),z.fromTimestamp(function(e){const s=Ke(e);return new ct(s.seconds,s.nanos)}(n))}function Eo(n,t){return Ka(n,t).canonicalString()}function Ka(n,t){const e=function(r){return new rt(["projects",r.projectId,"databases",r.database])}(n).child("documents");return t===void 0?e:e.child(t)}function nh(n){const t=rt.fromString(n);return Z(ch(t),10190,{key:t.toString()}),t}function oi(n,t){return Eo(n.databaseId,t.path)}function $s(n,t){const e=nh(t);if(e.get(1)!==n.databaseId.projectId)throw new M(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new M(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new q(rh(e))}function sh(n,t){return Eo(n.databaseId,t)}function _y(n){const t=nh(n);return t.length===4?rt.emptyPath():rh(t)}function Qa(n){return new rt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function rh(n){return Z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Kl(n,t,e){return{name:oi(n,t),fields:e.value.mapValue.fields}}function Iy(n,t){return"found"in t?function(s,r){Z(!!r.found,43571),r.found.name,r.found.updateTime;const i=$s(s,r.found.name),o=Gt(r.found.updateTime),l=r.found.createTime?Gt(r.found.createTime):z.min(),u=new Mt({mapValue:{fields:r.found.fields}});return Tt.newFoundDocument(i,o,l,u)}(n,t):"missing"in t?function(s,r){Z(!!r.missing,3894),Z(!!r.readTime,22933);const i=$s(s,r.missing),o=Gt(r.readTime);return Tt.newNoDocument(i,o)}(n,t):j(7234,{result:t})}function by(n,t){let e;if("targetChange"in t){t.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:j(39313,{state:c})}(t.targetChange.targetChangeType||"NO_CHANGE"),r=t.targetChange.targetIds||[],i=function(c,h){return c.useProto3Json?(Z(h===void 0||typeof h=="string",58123),Pt.fromBase64String(h||"")):(Z(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Pt.fromUint8Array(h||new Uint8Array))}(n,t.targetChange.resumeToken),o=t.targetChange.cause,l=o&&function(c){const h=c.code===void 0?k.UNKNOWN:Xd(c.code);return new M(h,c.message||"")}(o);e=new th(s,r,i,l||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const r=$s(n,s.document.name),i=Gt(s.document.updateTime),o=s.document.createTime?Gt(s.document.createTime):z.min(),l=new Mt({mapValue:{fields:s.document.fields}}),u=Tt.newFoundDocument(r,i,o,l),c=s.targetIds||[],h=s.removedTargetIds||[];e=new zr(c,h,u.key,u)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const r=$s(n,s.document),i=s.readTime?Gt(s.readTime):z.min(),o=Tt.newNoDocument(r,i),l=s.removedTargetIds||[];e=new zr([],l,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const r=$s(n,s.document),i=s.removedTargetIds||[];e=new zr([],i,r,null)}else{if(!("filter"in t))return j(11601,{Vt:t});{t.filter;const s=t.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new uy(r,i),l=s.targetId;e=new Zd(l,o)}}return e}function ih(n,t){let e;if(t instanceof rr)e={update:Kl(n,t.key,t.value)};else if(t instanceof ir)e={delete:oi(n,t.key)};else if(t instanceof en)e={update:Kl(n,t.key,t.data),updateMask:ky(t.fieldMask)};else{if(!(t instanceof Jd))return j(16599,{dt:t.type});e={verify:oi(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(s=>function(i,o){const l=o.transform;if(l instanceof ri)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Hs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ws)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ii)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw j(20930,{transform:o.transform})}(0,s))),t.precondition.isNone||(e.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:vy(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j(27497)}(n,t.precondition)),e}function Ey(n,t){return n&&n.length>0?(Z(t!==void 0,14353),n.map(e=>function(r,i){let o=r.updateTime?Gt(r.updateTime):Gt(i);return o.isEqual(z.min())&&(o=Gt(i)),new iy(o,r.transformResults||[])}(e,t))):[]}function wy(n,t){return{documents:[sh(n,t.path)]}}function Ty(n,t){const e={structuredQuery:{}},s=t.path;let r;t.collectionGroup!==null?(r=s,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(r=s.popLast(),e.structuredQuery.from=[{collectionId:s.lastSegment()}]),e.parent=sh(n,r);const i=function(c){if(c.length!==0)return oh(Zt.create(c,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:Nn(p.field),direction:Cy(p.dir)}}(h))}(t.orderBy);o&&(e.structuredQuery.orderBy=o);const l=Ga(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(t.endAt)),{ft:e,parent:r}}function Ay(n){let t=_y(n.parent);const e=n.structuredQuery,s=e.from?e.from.length:0;let r=null;if(s>0){Z(s===1,65062);const h=e.from[0];h.allDescendants?r=h.collectionId:t=t.child(h.collectionId)}let i=[];e.where&&(i=function(f){const p=ah(f);return p instanceof Zt&&Nd(p)?p.getFilters():[p]}(e.where));let o=[];e.orderBy&&(o=function(f){return f.map(p=>function(C){return new si(Ln(C.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(p))}(e.orderBy));let l=null;e.limit&&(l=function(f){let p;return p=typeof f=="object"?f.value:f,nr(p)?null:p}(e.limit));let u=null;e.startAt&&(u=function(f){const p=!!f.before,_=f.values||[];return new ni(_,p)}(e.startAt));let c=null;return e.endAt&&(c=function(f){const p=!f.before,_=f.values||[];return new ni(_,p)}(e.endAt)),Hg(t,r,o,i,l,"F",u,c)}function Sy(n,t){const e=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:r})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ah(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const s=Ln(e.unaryFilter.field);return yt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=Ln(e.unaryFilter.field);return yt.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ln(e.unaryFilter.field);return yt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ln(e.unaryFilter.field);return yt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(e){return yt.create(Ln(e.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Zt.create(e.compositeFilter.filters.map(s=>ah(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(e.compositeFilter.op))}(n):j(30097,{filter:n})}function Cy(n){return py[n]}function Ry(n){return fy[n]}function Py(n){return gy[n]}function Nn(n){return{fieldPath:n.canonicalString()}}function Ln(n){return Ct.fromServerFormat(n.fieldPath)}function oh(n){return n instanceof yt?function(e){if(e.op==="=="){if(Ol(e.value))return{unaryFilter:{field:Nn(e.field),op:"IS_NAN"}};if(Ll(e.value))return{unaryFilter:{field:Nn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Ol(e.value))return{unaryFilter:{field:Nn(e.field),op:"IS_NOT_NAN"}};if(Ll(e.value))return{unaryFilter:{field:Nn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nn(e.field),op:Ry(e.op),value:e.value}}}(n):n instanceof Zt?function(e){const s=e.getFilters().map(r=>oh(r));return s.length===1?s[0]:{compositeFilter:{op:Py(e.op),filters:s}}}(n):j(54877,{filter:n})}function ky(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function ch(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function lh(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t,e,s,r,i=z.min(),o=z.min(),l=Pt.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(t){return new Be(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Be(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(t){this.yt=t}}function Dy(n){const t=Ay({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Wa(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ny{constructor(){this.Sn=new Ly}addToCollectionParentIndex(t,e){return this.Sn.add(e),D.resolve()}getCollectionParents(t,e){return D.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return D.resolve()}deleteFieldIndex(t,e){return D.resolve()}deleteAllFieldIndexes(t){return D.resolve()}createTargetIndexes(t,e){return D.resolve()}getDocumentsMatchingTarget(t,e){return D.resolve(null)}getIndexType(t,e){return D.resolve(0)}getFieldIndexes(t,e){return D.resolve([])}getNextCollectionGroupToUpdate(t){return D.resolve(null)}getMinOffset(t,e){return D.resolve(Ge.min())}getMinOffsetFromCollectionGroup(t,e){return D.resolve(Ge.min())}updateCollectionGroup(t,e,s){return D.resolve()}updateIndexEntries(t,e){return D.resolve()}}class Ly{constructor(){this.index={}}add(t){const e=t.lastSegment(),s=t.popLast(),r=this.index[e]||new bt(rt.comparator),i=!r.has(s);return this.index[e]=r.add(s),i}has(t){const e=t.lastSegment(),s=t.popLast(),r=this.index[e];return r&&r.has(s)}getEntries(t){return(this.index[t]||new bt(rt.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},uh=41943040;class Bt{static withCacheSize(t){return new Bt(t,Bt.DEFAULT_COLLECTION_PERCENTILE,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,s){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bt.DEFAULT_COLLECTION_PERCENTILE=10,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Bt.DEFAULT=new Bt(uh,Bt.DEFAULT_COLLECTION_PERCENTILE,Bt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Bt.DISABLED=new Bt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new Kn(0)}static ar(){return new Kn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="LruGarbageCollector",Oy=1048576;function Yl([n,t],[e,s]){const r=J(n,e);return r===0?J(t,s):r}class Vy{constructor(t){this.Pr=t,this.buffer=new bt(Yl),this.Tr=0}Ir(){return++this.Tr}Er(t){const e=[t,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const s=this.buffer.last();Yl(e,s)<0&&(this.buffer=this.buffer.delete(s).add(e))}}get maxValue(){return this.buffer.last()[0]}}class My{constructor(t,e,s){this.garbageCollector=t,this.asyncQueue=e,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){F(Jl,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){as(e)?F(Jl,"Ignoring IndexedDB error during garbage collection: ",e):await is(e)}await this.Ar(3e5)})}}class $y{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next(s=>Math.floor(e/100*s))}nthSequenceNumber(t,e){if(e===0)return D.resolve(Ai.ce);const s=new Vy(e);return this.Vr.forEachTarget(t,r=>s.Er(r.sequenceNumber)).next(()=>this.Vr.mr(t,r=>s.Er(r))).next(()=>s.maxValue)}removeTargets(t,e,s){return this.Vr.removeTargets(t,e,s)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(F("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Ql)):this.getCacheSize(t).next(s=>s<this.params.cacheSizeCollectionThreshold?(F("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ql):this.gr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let s,r,i,o,l,u,c;const h=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(F("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),r=this.params.maximumSequenceNumbersToCollect):r=f,o=Date.now(),this.nthSequenceNumber(t,r))).next(f=>(s=f,l=Date.now(),this.removeTargets(t,s,e))).next(f=>(i=f,u=Date.now(),this.removeOrphanedDocuments(t,s))).next(f=>(c=Date.now(),xn()<=Q.DEBUG&&F("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${r} in `+(l-o)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${f} documents in `+(c-u)+`ms
Total Duration: ${c-h}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:f})))}}function By(n,t){return new $y(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fy{constructor(){this.changes=new wn(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Tt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const s=this.changes.get(e);return s!==void 0?D.resolve(s):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uy{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(t,e,s,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=s,this.indexManager=r}getDocument(t,e){let s=null;return this.documentOverlayCache.getOverlay(t,e).next(r=>(s=r,this.remoteDocumentCache.getEntry(t,e))).next(r=>(s!==null&&Ms(s.mutation,r,Wt.empty(),ct.now()),r))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(s=>this.getLocalViewOfDocuments(t,s,Y()).next(()=>s))}getLocalViewOfDocuments(t,e,s=Y()){const r=hn();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,s).next(i=>{let o=xs();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(t,e){const s=hn();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,Y()))}populateOverlays(t,e,s){const r=[];return s.forEach(i=>{e.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(t,r).next(i=>{i.forEach((o,l)=>{e.set(o,l)})})}computeViews(t,e,s,r){let i=Ee();const o=Vs(),l=function(){return Vs()}();return e.forEach((u,c)=>{const h=s.get(c.key);r.has(c.key)&&(h===void 0||h.mutation instanceof en)?i=i.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),Ms(h.mutation,c,h.mutation.getFieldMask(),ct.now())):o.set(c.key,Wt.empty())}),this.recalculateAndSaveOverlays(t,i).next(u=>(u.forEach((c,h)=>o.set(c,h)),e.forEach((c,h)=>l.set(c,new Uy(h,o.get(c)??null))),l))}recalculateAndSaveOverlays(t,e){const s=Vs();let r=new ht((o,l)=>o-l),i=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=e.get(u);if(c===null)return;let h=s.get(u)||Wt.empty();h=l.applyToLocalView(c,h),s.set(u,h);const f=(r.get(l.batchId)||Y()).add(u);r=r.insert(l.batchId,f)})}).next(()=>{const o=[],l=r.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,h=u.value,f=qd();h.forEach(p=>{if(!i.has(p)){const _=Kd(e.get(p),s.get(p));_!==null&&f.set(p,_),i=i.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(t,c,f))}return D.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(s=>this.recalculateAndSaveOverlays(t,s))}getDocumentsMatchingQuery(t,e,s,r){return Wg(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Md(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,s,r):this.getDocumentsMatchingCollectionQuery(t,e,s,r)}getNextDocuments(t,e,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,s.largestBatchId,r-i.size):D.resolve(hn());let l=Us,u=i;return o.next(c=>D.forEach(c,(h,f)=>(l<f.largestBatchId&&(l=f.largestBatchId),i.get(h)?D.resolve():this.remoteDocumentCache.getEntry(t,h).next(p=>{u=u.insert(h,p)}))).next(()=>this.populateOverlays(t,c,i)).next(()=>this.computeViews(t,u,c,Y())).next(h=>({batchId:l,changes:Ud(h)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new q(e)).next(s=>{let r=xs();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(t,e,s,r){const i=e.collectionGroup;let o=xs();return this.indexManager.getCollectionParents(t,i).next(l=>D.forEach(l,u=>{const c=function(f,p){return new sr(p,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,c,s,r).next(h=>{h.forEach((f,p)=>{o=o.insert(f,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(t,e,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,s.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,s,i,r))).next(o=>{i.forEach((u,c)=>{const h=c.getKey();o.get(h)===null&&(o=o.insert(h,Tt.newInvalidDocument(h)))});let l=xs();return o.forEach((u,c)=>{const h=i.get(u);h!==void 0&&Ms(h.mutation,c,Wt.empty(),ct.now()),Ri(e,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return D.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,function(r){return{id:r.id,version:r.version,createTime:Gt(r.createTime)}}(e)),D.resolve()}getNamedQuery(t,e){return D.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,function(r){return{name:r.name,query:Dy(r.bundledQuery),readTime:Gt(r.readTime)}}(e)),D.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(){this.overlays=new ht(q.comparator),this.Lr=new Map}getOverlay(t,e){return D.resolve(this.overlays.get(e))}getOverlays(t,e){const s=hn();return D.forEach(e,r=>this.getOverlay(t,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(t,e,s){return s.forEach((r,i)=>{this.bt(t,e,i)}),D.resolve()}removeOverlaysForBatchId(t,e,s){const r=this.Lr.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(s)),D.resolve()}getOverlaysForCollection(t,e,s){const r=hn(),i=e.length+1,o=new q(e.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!e.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>s&&r.set(u.getKey(),u)}return D.resolve(r)}getOverlaysForCollectionGroup(t,e,s,r){let i=new ht((c,h)=>c-h);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===e&&c.largestBatchId>s){let h=i.get(c.largestBatchId);h===null&&(h=hn(),i=i.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const l=hn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,h)=>l.set(c,h)),!(l.size()>=r)););return D.resolve(l)}bt(t,e,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Lr.get(r.largestBatchId).delete(s.key);this.Lr.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new ly(e,s));let i=this.Lr.get(e);i===void 0&&(i=Y(),this.Lr.set(e,i)),this.Lr.set(e,i.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(){this.sessionToken=Pt.EMPTY_BYTE_STRING}getSessionToken(t){return D.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(){this.kr=new bt(wt.Kr),this.qr=new bt(wt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const s=new wt(t,e);this.kr=this.kr.add(s),this.qr=this.qr.add(s)}$r(t,e){t.forEach(s=>this.addReference(s,e))}removeReference(t,e){this.Wr(new wt(t,e))}Qr(t,e){t.forEach(s=>this.removeReference(s,e))}Gr(t){const e=new q(new rt([])),s=new wt(e,t),r=new wt(e,t+1),i=[];return this.qr.forEachInRange([s,r],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(t=>this.Wr(t))}Wr(t){this.kr=this.kr.delete(t),this.qr=this.qr.delete(t)}jr(t){const e=new q(new rt([])),s=new wt(e,t),r=new wt(e,t+1);let i=Y();return this.qr.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(t){const e=new wt(t,0),s=this.kr.firstAfterOrEqual(e);return s!==null&&t.isEqual(s.key)}}class wt{constructor(t,e){this.key=t,this.Hr=e}static Kr(t,e){return q.comparator(t.key,e.key)||J(t.Hr,e.Hr)}static Ur(t,e){return J(t.Hr,e.Hr)||q.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Jr=new bt(wt.Kr)}checkEmpty(t){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,s,r){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cy(i,e,s,r);this.mutationQueue.push(o);for(const l of r)this.Jr=this.Jr.add(new wt(l.key,i)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return D.resolve(o)}lookupMutationBatch(t,e){return D.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const s=e+1,r=this.Xr(s),i=r<0?0:r;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?mo:this.Yn-1)}getAllMutationBatches(t){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const s=new wt(e,0),r=new wt(e,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([s,r],o=>{const l=this.Zr(o.Hr);i.push(l)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let s=new bt(J);return e.forEach(r=>{const i=new wt(r,0),o=new wt(r,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,o],l=>{s=s.add(l.Hr)})}),D.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(t,e){const s=e.path,r=s.length+1;let i=s;q.isDocumentKey(i)||(i=i.child(""));const o=new wt(new q(i),0);let l=new bt(J);return this.Jr.forEachWhile(u=>{const c=u.key.path;return!!s.isPrefixOf(c)&&(c.length===r&&(l=l.add(u.Hr)),!0)},o),D.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach(s=>{const r=this.Zr(s);r!==null&&e.push(r)}),e}removeMutationBatch(t,e){Z(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Jr;return D.forEach(e.mutations,r=>{const i=new wt(r.key,e.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)}).next(()=>{this.Jr=s})}nr(t){}containsKey(t,e){const s=new wt(e,0),r=this.Jr.firstAfterOrEqual(s);return D.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,D.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(t){this.ti=t,this.docs=function(){return new ht(q.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const s=e.key,r=this.docs.get(s),i=r?r.size:0,o=this.ti(e);return this.docs=this.docs.insert(s,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,s.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const s=this.docs.get(e);return D.resolve(s?s.document.mutableCopy():Tt.newInvalidDocument(e))}getEntries(t,e){let s=Ee();return e.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Tt.newInvalidDocument(r))}),D.resolve(s)}getDocumentsMatchingQuery(t,e,s,r){let i=Ee();const o=e.path,l=new q(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:h}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||Eg(bg(h),s)<=0||(r.has(h.key)||Ri(e,h))&&(i=i.insert(h.key,h.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(t,e,s,r){j(9500)}ni(t,e){return D.forEach(this.docs,s=>e(s))}newChangeBuffer(t){return new Ky(this)}getSize(t){return D.resolve(this.size)}}class Ky extends Fy{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?e.push(this.Mr.addEntry(t,r)):this.Mr.removeEntry(s)}),D.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(t){this.persistence=t,this.ri=new wn(e=>go(e),yo),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.ii=0,this.si=new wo,this.targetCount=0,this.oi=Kn._r()}forEachTarget(t,e){return this.ri.forEach((s,r)=>e(r)),D.resolve()}getLastRemoteSnapshotVersion(t){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return D.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(t,e,s){return s&&(this.lastRemoteSnapshotVersion=s),e>this.ii&&(this.ii=e),D.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new Kn(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,D.resolve()}updateTargetData(t,e){return this.lr(e),D.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,D.resolve()}removeTargets(t,e,s){let r=0;const i=[];return this.ri.forEach((o,l)=>{l.sequenceNumber<=e&&s.get(l.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(t,l.targetId)),r++)}),D.waitFor(i).next(()=>r)}getTargetCount(t){return D.resolve(this.targetCount)}getTargetData(t,e){const s=this.ri.get(e)||null;return D.resolve(s)}addMatchingKeys(t,e,s){return this.si.$r(e,s),D.resolve()}removeMatchingKeys(t,e,s){this.si.Qr(e,s);const r=this.persistence.referenceDelegate,i=[];return r&&e.forEach(o=>{i.push(r.markPotentiallyOrphaned(t,o))}),D.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),D.resolve()}getMatchingKeysForTargetId(t,e){const s=this.si.jr(e);return D.resolve(s)}containsKey(t,e){return D.resolve(this.si.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(t,e){this._i={},this.overlays={},this.ai=new Ai(0),this.ui=!1,this.ui=!0,this.ci=new Hy,this.referenceDelegate=t(this),this.li=new Qy(this),this.indexManager=new Ny,this.remoteDocumentCache=function(r){return new Gy(r)}(s=>this.referenceDelegate.hi(s)),this.serializer=new xy(e),this.Pi=new jy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zy,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let s=this._i[t.toKey()];return s||(s=new Wy(e,this.referenceDelegate),this._i[t.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,s){F("MemoryPersistence","Starting transaction:",t);const r=new Jy(this.ai.next());return this.referenceDelegate.Ti(),s(r).next(i=>this.referenceDelegate.Ii(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ei(t,e){return D.or(Object.values(this._i).map(s=>()=>s.containsKey(t,e)))}}class Jy extends Tg{constructor(t){super(),this.currentSequenceNumber=t}}class To{constructor(t){this.persistence=t,this.Ri=new wo,this.Ai=null}static Vi(t){return new To(t)}get di(){if(this.Ai)return this.Ai;throw j(60996)}addReference(t,e,s){return this.Ri.addReference(s,e),this.di.delete(s.toString()),D.resolve()}removeReference(t,e,s){return this.Ri.removeReference(s,e),this.di.add(s.toString()),D.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),D.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach(r=>this.di.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(t,e.targetId).next(r=>{r.forEach(i=>this.di.add(i.toString()))}).next(()=>s.removeTargetData(t,e))}Ti(){this.Ai=new Set}Ii(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.di,s=>{const r=q.fromPath(s);return this.mi(t,r).next(i=>{i||e.removeEntry(r,z.min())})}).next(()=>(this.Ai=null,e.apply(t)))}updateLimboDocument(t,e){return this.mi(t,e).next(s=>{s?this.di.delete(e.toString()):this.di.add(e.toString())})}hi(t){return 0}mi(t,e){return D.or([()=>D.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class ci{constructor(t,e){this.persistence=t,this.fi=new wn(s=>Cg(s.path),(s,r)=>s.isEqual(r)),this.garbageCollector=By(this,e)}static Vi(t,e){return new ci(t,e)}Ti(){}Ii(t){return D.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next(s=>e.next(r=>s+r))}pr(t){let e=0;return this.mr(t,s=>{e++}).next(()=>e)}mr(t,e){return D.forEach(this.fi,(s,r)=>this.wr(t,s,r).next(i=>i?D.resolve():e(r)))}removeTargets(t,e,s){return this.persistence.getTargetCache().removeTargets(t,e,s)}removeOrphanedDocuments(t,e){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(t,o=>this.wr(t,o,e).next(l=>{l||(s++,i.removeEntry(o,z.min()))})).next(()=>i.apply(t)).next(()=>s)}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),D.resolve()}removeTarget(t,e){const s=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,s)}addReference(t,e,s){return this.fi.set(s,t.currentSequenceNumber),D.resolve()}removeReference(t,e,s){return this.fi.set(s,t.currentSequenceNumber),D.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),D.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Ur(t.data.value)),e}wr(t,e,s){return D.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const r=this.fi.get(e);return D.resolve(r!==void 0&&r>s)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(t,e,s,r){this.targetId=t,this.fromCache=e,this.Ts=s,this.Is=r}static Es(t,e){let s=Y(),r=Y();for(const i of e.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ao(t,e.fromCache,s,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Up()?8:Ag(Lt())>0?6:4}()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,s,r){const i={result:null};return this.gs(t,e).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(t,e,r,s).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new Yy;return this.ys(t,e,o).next(l=>{if(i.result=l,this.As)return this.ws(t,e,o,l.size)})}).next(()=>i.result)}ws(t,e,s,r){return s.documentReadCount<this.Vs?(xn()<=Q.DEBUG&&F("QueryEngine","SDK will not create cache indexes for query:",Dn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),D.resolve()):(xn()<=Q.DEBUG&&F("QueryEngine","Query:",Dn(e),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.ds*r?(xn()<=Q.DEBUG&&F("QueryEngine","The SDK decides to create cache indexes for query:",Dn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ie(e))):D.resolve())}gs(t,e){if(Bl(e))return D.resolve(null);let s=ie(e);return this.indexManager.getIndexType(t,s).next(r=>r===0?null:(e.limit!==null&&r===1&&(e=Wa(e,null,"F"),s=ie(e)),this.indexManager.getDocumentsMatchingTarget(t,s).next(i=>{const o=Y(...i);return this.fs.getDocuments(t,o).next(l=>this.indexManager.getMinOffset(t,s).next(u=>{const c=this.bs(e,l);return this.Ss(e,c,o,u.readTime)?this.gs(t,Wa(e,null,"F")):this.Ds(t,c,e,u)}))})))}ps(t,e,s,r){return Bl(e)||r.isEqual(z.min())?D.resolve(null):this.fs.getDocuments(t,s).next(i=>{const o=this.bs(e,i);return this.Ss(e,o,s,r)?D.resolve(null):(xn()<=Q.DEBUG&&F("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Dn(e)),this.Ds(t,o,e,Ig(r,Us)).next(l=>l))})}bs(t,e){let s=new bt(Bd(t));return e.forEach((r,i)=>{Ri(t,i)&&(s=s.add(i))}),s}Ss(t,e,s,r){if(t.limit===null)return!1;if(s.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(t,e,s){return xn()<=Q.DEBUG&&F("QueryEngine","Using full collection scan to execute query:",Dn(e)),this.fs.getDocumentsMatchingQuery(t,e,Ge.min(),s)}Ds(t,e,s,r){return this.fs.getDocumentsMatchingQuery(t,s,r).next(i=>(e.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So="LocalStore",Zy=3e8;class tv{constructor(t,e,s,r){this.persistence=t,this.Cs=e,this.serializer=r,this.vs=new ht(J),this.Fs=new wn(i=>go(i),yo),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(s)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qy(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.vs))}}function ev(n,t,e,s){return new tv(n,t,e,s)}async function hh(n,t){const e=W(n);return await e.persistence.runTransaction("Handle user change","readonly",s=>{let r;return e.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,e.Os(t),e.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],l=[];let u=Y();for(const c of r){o.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}for(const c of i){l.push(c.batchId);for(const h of c.mutations)u=u.add(h.key)}return e.localDocuments.getDocuments(s,u).next(c=>({Ns:c,removedBatchIds:o,addedBatchIds:l}))})})}function nv(n,t){const e=W(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=t.batch.keys(),i=e.xs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,h){const f=c.batch,p=f.keys();let _=D.resolve();return p.forEach(C=>{_=_.next(()=>h.getEntry(u,C)).next(A=>{const S=c.docVersions.get(C);Z(S!==null,48541),A.version.compareTo(S)<0&&(f.applyToRemoteDocument(A,c),A.isValidDocument()&&(A.setReadTime(c.commitVersion),h.addEntry(A)))})}),_.next(()=>l.mutationQueue.removeMutationBatch(u,f))}(e,s,t,i).next(()=>i.apply(s)).next(()=>e.mutationQueue.performConsistencyCheck(s)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(s,r,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let u=Y();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(t))).next(()=>e.localDocuments.getDocuments(s,r))})}function mh(n){const t=W(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function sv(n,t){const e=W(n),s=t.snapshotVersion;let r=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=e.xs.newChangeBuffer({trackRemovals:!0});r=e.vs;const l=[];t.targetChanges.forEach((h,f)=>{const p=r.get(f);if(!p)return;l.push(e.li.removeMatchingKeys(i,h.removedDocuments,f).next(()=>e.li.addMatchingKeys(i,h.addedDocuments,f)));let _=p.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(f)!==null?_=_.withResumeToken(Pt.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,s)),r=r.insert(f,_),function(A,S,N){return A.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-A.snapshotVersion.toMicroseconds()>=Zy?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(p,_,h)&&l.push(e.li.updateTargetData(i,_))});let u=Ee(),c=Y();if(t.documentUpdates.forEach(h=>{t.resolvedLimboDocuments.has(h)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(i,h))}),l.push(rv(i,o,t.documentUpdates).next(h=>{u=h.Bs,c=h.Ls})),!s.isEqual(z.min())){const h=e.li.getLastRemoteSnapshotVersion(i).next(f=>e.li.setTargetsMetadata(i,i.currentSequenceNumber,s));l.push(h)}return D.waitFor(l).next(()=>o.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(e.vs=r,i))}function rv(n,t,e){let s=Y(),r=Y();return e.forEach(i=>s=s.add(i)),t.getEntries(n,s).next(i=>{let o=Ee();return e.forEach((l,u)=>{const c=i.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(r=r.add(l)),u.isNoDocument()&&u.version.isEqual(z.min())?(t.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(t.addEntry(u),o=o.insert(l,u)):F(So,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Bs:o,Ls:r}})}function iv(n,t){const e=W(n);return e.persistence.runTransaction("Get next mutation batch","readonly",s=>(t===void 0&&(t=mo),e.mutationQueue.getNextMutationBatchAfterBatchId(s,t)))}function av(n,t){const e=W(n);return e.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return e.li.getTargetData(s,t).next(i=>i?(r=i,D.resolve(r)):e.li.allocateTargetId(s).next(o=>(r=new Be(t,o,"TargetPurposeListen",s.currentSequenceNumber),e.li.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=e.vs.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(e.vs=e.vs.insert(s.targetId,s),e.Fs.set(t,s.targetId)),s})}async function Ja(n,t,e){const s=W(n),r=s.vs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!as(o))throw o;F(So,`Failed to update sequence numbers for target ${t}: ${o}`)}s.vs=s.vs.remove(t),s.Fs.delete(r.target)}function Xl(n,t,e){const s=W(n);let r=z.min(),i=Y();return s.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,h){const f=W(u),p=f.Fs.get(h);return p!==void 0?D.resolve(f.vs.get(p)):f.li.getTargetData(c,h)}(s,o,ie(t)).next(l=>{if(l)return r=l.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>s.Cs.getDocumentsMatchingQuery(o,t,e?r:z.min(),e?i:Y())).next(l=>(ov(s,Kg(t),l),{documents:l,ks:i})))}function ov(n,t,e){let s=n.Ms.get(t)||z.min();e.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),n.Ms.set(t,s)}class Zl{constructor(){this.activeTargetIds=ty()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class cv{constructor(){this.vo=new Zl,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,s){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,s){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new Zl,Promise.resolve()}handleUserChange(t,e,s){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{Mo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="ConnectivityMonitor";class eu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){F(tu,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){F(tu,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vr=null;function Ya(){return Vr===null?Vr=function(){return 268435456+Math.round(2147483648*Math.random())}():Vr++,"0x"+Vr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="RestConnection",uv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class dv{get Ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Uo=`projects/${s}/databases/${r}`,this.$o=this.databaseId.database===ti?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Wo(t,e,s,r,i){const o=Ya(),l=this.Qo(t,e.toUriEncodedString());F(wa,`Sending RPC '${t}' ${o}:`,l,s);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,r,i);const{host:c}=new URL(l),h=ns(c);return this.zo(t,l,u,s,h).then(f=>(F(wa,`Received RPC '${t}' ${o}: `,f),f),f=>{throw yn(wa,`RPC '${t}' ${o} failed with error: `,f,"url: ",l,"request:",s),f})}jo(t,e,s,r,i,o){return this.Wo(t,e,s,r,i)}Go(t,e,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+rs}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((r,i)=>t[i]=r),s&&s.headers.forEach((r,i)=>t[i]=r)}Qo(t,e){const s=uv[t];let r=`${this.qo}/v1/${e}:${s}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(t){this.Ho=t.Ho,this.Jo=t.Jo}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Jo()}send(t){this.Ho(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection",Cs=(n,t,e)=>{n.listen(t,s=>{try{e(s)}catch(r){setTimeout(()=>{throw r},0)}})};class Mn extends dv{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!Mn.c_){const t=fd();Cs(t,pd.STAT_EVENT,e=>{e.stat===Ba.PROXY?F(xt,"STAT_EVENT: detected buffering proxy"):e.stat===Ba.NOPROXY&&F(xt,"STAT_EVENT: detected no buffering proxy")}),Mn.c_=!0}}zo(t,e,s,r,i){const o=Ya();return new Promise((l,u)=>{const c=new hd;c.setWithCredentials(!0),c.listenOnce(md.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Fr.NO_ERROR:const f=c.getResponseJson();F(xt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(f)),l(f);break;case Fr.TIMEOUT:F(xt,`RPC '${t}' ${o} timed out`),u(new M(k.DEADLINE_EXCEEDED,"Request time out"));break;case Fr.HTTP_ERROR:const p=c.getStatus();if(F(xt,`RPC '${t}' ${o} failed with status:`,p,"response text:",c.getResponseText()),p>0){let _=c.getResponseJson();Array.isArray(_)&&(_=_[0]);const C=_==null?void 0:_.error;if(C&&C.status&&C.message){const A=function(N){const O=N.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(O)>=0?O:k.UNKNOWN}(C.status);u(new M(A,C.message))}else u(new M(k.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new M(k.UNAVAILABLE,"Connection failed."));break;default:j(9055,{l_:t,streamId:o,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{F(xt,`RPC '${t}' ${o} completed.`)}});const h=JSON.stringify(r);F(xt,`RPC '${t}' ${o} sending request:`,r),c.send(e,"POST",h,s,15)})}T_(t,e,s){const r=Ya(),i=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,s),l.encodeInitMessageHeaders=!0;const c=i.join("");F(xt,`Creating RPC '${t}' stream ${r}: ${c}`,l);const h=o.createWebChannel(c,l);this.I_(h);let f=!1,p=!1;const _=new hv({Ho:C=>{p?F(xt,`Not sending because RPC '${t}' stream ${r} is closed:`,C):(f||(F(xt,`Opening RPC '${t}' stream ${r} transport.`),h.open(),f=!0),F(xt,`RPC '${t}' stream ${r} sending:`,C),h.send(C))},Jo:()=>h.close()});return Cs(h,ks.EventType.OPEN,()=>{p||(F(xt,`RPC '${t}' stream ${r} transport opened.`),_.i_())}),Cs(h,ks.EventType.CLOSE,()=>{p||(p=!0,F(xt,`RPC '${t}' stream ${r} transport closed`),_.o_(),this.E_(h))}),Cs(h,ks.EventType.ERROR,C=>{p||(p=!0,yn(xt,`RPC '${t}' stream ${r} transport errored. Name:`,C.name,"Message:",C.message),_.o_(new M(k.UNAVAILABLE,"The operation could not be completed")))}),Cs(h,ks.EventType.MESSAGE,C=>{var A;if(!p){const S=C.data[0];Z(!!S,16349);const N=S,O=(N==null?void 0:N.error)||((A=N[0])==null?void 0:A.error);if(O){F(xt,`RPC '${t}' stream ${r} received error:`,O);const U=O.status;let tt=function(b){const v=gt[b];if(v!==void 0)return Xd(v)}(U),st=O.message;U==="NOT_FOUND"&&st.includes("database")&&st.includes("does not exist")&&st.includes(this.databaseId.database)&&yn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),tt===void 0&&(tt=k.INTERNAL,st="Unknown error status: "+U+" with message "+O.message),p=!0,_.o_(new M(tt,st)),h.close()}else F(xt,`RPC '${t}' stream ${r} received:`,S),_.__(S)}}),Mn.u_(),setTimeout(()=>{_.s_()},0),_}terminate(){this.a_.forEach(t=>t.close()),this.a_=[]}I_(t){this.a_.push(t)}E_(t){this.a_=this.a_.filter(e=>e===t)}Go(t,e,s){super.Go(t,e,s),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return gd()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mv(n){return new Mn(n)}function Ta(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Di(n){return new yy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mn.c_=!1;class Co{constructor(t,e,s=1e3,r=1.5,i=6e4){this.Ci=t,this.timerId=e,this.R_=s,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,e-s);r>0&&F("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),t())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="PersistentStream";class ph{constructor(t,e,s,r,i,o,l,u){this.Ci=t,this.b_=s,this.S_=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Co(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(t){this.q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===k.RESOURCE_EXHAUSTED?(be(e.toString()),be("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.D_===e&&this.G_(s,r)},s=>{t(()=>{const r=new M(k.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)})})}G_(t,e){const s=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo(()=>{s(()=>this.listener.Zo())}),this.stream.Yo(()=>{s(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(r=>{s(()=>this.z_(r))}),this.stream.onMessage(r=>{s(()=>++this.F_==1?this.H_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return F(nu,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget(()=>this.D_===t?e():(F(nu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class pv extends ph{constructor(t,e,s,r,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,s,r,o),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}H_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=by(this.serializer,t),s=function(i){if(!("targetChange"in i))return z.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?Gt(o.readTime):z.min()}(t);return this.listener.J_(e,s)}Z_(t){const e={};e.database=Qa(this.serializer),e.addTarget=function(i,o){let l;const u=o.target;if(l=za(u)?{documents:wy(i,u)}:{query:Ty(i,u).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=eh(i,o.resumeToken);const c=Ga(i,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(z.min())>0){l.readTime=ai(i,o.snapshotVersion.toTimestamp());const c=Ga(i,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,t);const s=Sy(this.serializer,t);s&&(e.labels=s),this.K_(e)}X_(t){const e={};e.database=Qa(this.serializer),e.removeTarget=t,this.K_(e)}}class fv extends ph{constructor(t,e,s,r,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,s,r,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}H_(t){return Z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){Z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Ey(t.writeResults,t.commitTime),s=Gt(t.commitTime);return this.listener.na(s,e)}ra(){const t={};t.database=Qa(this.serializer),this.K_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(s=>ih(this.serializer,s))};this.K_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{}class yv extends gv{constructor(t,e,s,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new M(k.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(t,Ka(e,s),r,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new M(k.UNKNOWN,i.toString())})}jo(t,e,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.jo(t,Ka(e,s),r,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(k.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function vv(n,t,e,s){return new yv(n,t,e,s)}class _v{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(be(e),this.aa=!1):F("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="RemoteStore";class Iv{constructor(t,e,s,r,i){this.localStore=t,this.datastore=e,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{s.enqueueAndForget(async()=>{Tn(this)&&(F(vn,"Restarting streams for network reachability change."),await async function(u){const c=W(u);c.Ea.add(4),await or(c),c.Va.set("Unknown"),c.Ea.delete(4),await Ni(c)}(this))})}),this.Va=new _v(s,r)}}async function Ni(n){if(Tn(n))for(const t of n.Ra)await t(!0)}async function or(n){for(const t of n.Ra)await t(!1)}function fh(n,t){const e=W(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),xo(e)?ko(e):os(e).O_()&&Po(e,t))}function Ro(n,t){const e=W(n),s=os(e);e.Ia.delete(t),s.O_()&&gh(e,t),e.Ia.size===0&&(s.O_()?s.L_():Tn(e)&&e.Va.set("Unknown"))}function Po(n,t){if(n.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(z.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}os(n).Z_(t)}function gh(n,t){n.da.$e(t),os(n).X_(t)}function ko(n){n.da=new my({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),os(n).start(),n.Va.ua()}function xo(n){return Tn(n)&&!os(n).x_()&&n.Ia.size>0}function Tn(n){return W(n).Ea.size===0}function yh(n){n.da=void 0}async function bv(n){n.Va.set("Online")}async function Ev(n){n.Ia.forEach((t,e)=>{Po(n,t)})}async function wv(n,t){yh(n),xo(n)?(n.Va.ha(t),ko(n)):n.Va.set("Unknown")}async function Tv(n,t,e){if(n.Va.set("Online"),t instanceof th&&t.state===2&&t.cause)try{await async function(r,i){const o=i.cause;for(const l of i.targetIds)r.Ia.has(l)&&(await r.remoteSyncer.rejectListen(l,o),r.Ia.delete(l),r.da.removeTarget(l))}(n,t)}catch(s){F(vn,"Failed to remove targets %s: %s ",t.targetIds.join(","),s),await li(n,s)}else if(t instanceof zr?n.da.Xe(t):t instanceof Zd?n.da.st(t):n.da.tt(t),!e.isEqual(z.min()))try{const s=await mh(n.localStore);e.compareTo(s)>=0&&await function(i,o){const l=i.da.Tt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const h=i.Ia.get(c);h&&i.Ia.set(c,h.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const h=i.Ia.get(u);if(!h)return;i.Ia.set(u,h.withResumeToken(Pt.EMPTY_BYTE_STRING,h.snapshotVersion)),gh(i,u);const f=new Be(h.target,u,c,h.sequenceNumber);Po(i,f)}),i.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(s){F(vn,"Failed to raise snapshot:",s),await li(n,s)}}async function li(n,t,e){if(!as(t))throw t;n.Ea.add(1),await or(n),n.Va.set("Offline"),e||(e=()=>mh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{F(vn,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Ni(n)})}function vh(n,t){return t().catch(e=>li(n,e,t))}async function Li(n){const t=W(n),e=Ye(t);let s=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:mo;for(;Av(t);)try{const r=await iv(t.localStore,s);if(r===null){t.Ta.length===0&&e.L_();break}s=r.batchId,Sv(t,r)}catch(r){await li(t,r)}_h(t)&&Ih(t)}function Av(n){return Tn(n)&&n.Ta.length<10}function Sv(n,t){n.Ta.push(t);const e=Ye(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function _h(n){return Tn(n)&&!Ye(n).x_()&&n.Ta.length>0}function Ih(n){Ye(n).start()}async function Cv(n){Ye(n).ra()}async function Rv(n){const t=Ye(n);for(const e of n.Ta)t.ea(e.mutations)}async function Pv(n,t,e){const s=n.Ta.shift(),r=Io.from(s,t,e);await vh(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Li(n)}async function kv(n,t){t&&Ye(n).Y_&&await async function(s,r){if(function(o){return Yd(o)&&o!==k.ABORTED}(r.code)){const i=s.Ta.shift();Ye(s).B_(),await vh(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Li(s)}}(n,t),_h(n)&&Ih(n)}async function su(n,t){const e=W(n);e.asyncQueue.verifyOperationInProgress(),F(vn,"RemoteStore received new credentials");const s=Tn(e);e.Ea.add(3),await or(e),s&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Ni(e)}async function xv(n,t){const e=W(n);t?(e.Ea.delete(2),await Ni(e)):t||(e.Ea.add(2),await or(e),e.Va.set("Unknown"))}function os(n){return n.ma||(n.ma=function(e,s,r){const i=W(e);return i.sa(),new pv(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Zo:bv.bind(null,n),Yo:Ev.bind(null,n),t_:wv.bind(null,n),J_:Tv.bind(null,n)}),n.Ra.push(async t=>{t?(n.ma.B_(),xo(n)?ko(n):n.Va.set("Unknown")):(await n.ma.stop(),yh(n))})),n.ma}function Ye(n){return n.fa||(n.fa=function(e,s,r){const i=W(e);return i.sa(),new fv(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Cv.bind(null,n),t_:kv.bind(null,n),ta:Rv.bind(null,n),na:Pv.bind(null,n)}),n.Ra.push(async t=>{t?(n.fa.B_(),await Li(n)):(await n.fa.stop(),n.Ta.length>0&&(F(vn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(t,e,s,r,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new re,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,s,r,i){const o=Date.now()+s,l=new Do(t,e,o,r,i);return l.start(s),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(k.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function No(n,t){if(be("AsyncQueue",`${t}: ${n}`),as(n))return new M(k.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{static emptySet(t){return new $n(t.comparator)}constructor(t){this.comparator=t?(e,s)=>t(e,s)||q.comparator(e.key,s.key):(e,s)=>q.comparator(e.key,s.key),this.keyedMap=xs(),this.sortedSet=new ht(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,s)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof $n)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),s=t.sortedSet.getIterator();for(;e.hasNext();){const r=e.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const s=new $n;return s.comparator=this.comparator,s.keyedMap=t,s.sortedSet=e,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(){this.ga=new ht(q.comparator)}track(t){const e=t.doc.key,s=this.ga.get(e);s?t.type!==0&&s.type===3?this.ga=this.ga.insert(e,t):t.type===3&&s.type!==1?this.ga=this.ga.insert(e,{type:s.type,doc:t.doc}):t.type===2&&s.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&s.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&s.type===0?this.ga=this.ga.remove(e):t.type===1&&s.type===2?this.ga=this.ga.insert(e,{type:1,doc:s.doc}):t.type===0&&s.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):j(63341,{Vt:t,pa:s}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,s)=>{t.push(s)}),t}}class Qn{constructor(t,e,s,r,i,o,l,u,c){this.query=t,this.docs=e,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(t,e,s,r,i){const o=[];return e.forEach(l=>{o.push({type:0,doc:l})}),new Qn(t,e,$n.emptySet(e),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ci(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,s=t.docChanges;if(e.length!==s.length)return!1;for(let r=0;r<e.length;r++)if(e[r].type!==s[r].type||!e[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(t=>t.Da())}}class Nv{constructor(){this.queries=iu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,s){const r=W(e),i=r.queries;r.queries=iu(),i.forEach((o,l)=>{for(const u of l.ba)u.onError(s)})})(this,new M(k.ABORTED,"Firestore shutting down"))}}function iu(){return new wn(n=>$d(n),Ci)}async function bh(n,t){const e=W(n);let s=3;const r=t.query;let i=e.queries.get(r);i?!i.Sa()&&t.Da()&&(s=2):(i=new Dv,s=t.Da()?0:1);try{switch(s){case 0:i.wa=await e.onListen(r,!0);break;case 1:i.wa=await e.onListen(r,!1);break;case 2:await e.onFirstRemoteStoreListen(r)}}catch(o){const l=No(o,`Initialization of query '${Dn(t.query)}' failed`);return void t.onError(l)}e.queries.set(r,i),i.ba.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&Lo(e)}async function Eh(n,t){const e=W(n),s=t.query;let r=3;const i=e.queries.get(s);if(i){const o=i.ba.indexOf(t);o>=0&&(i.ba.splice(o,1),i.ba.length===0?r=t.Da()?0:1:!i.Sa()&&t.Da()&&(r=2))}switch(r){case 0:return e.queries.delete(s),e.onUnlisten(s,!0);case 1:return e.queries.delete(s),e.onUnlisten(s,!1);case 2:return e.onLastRemoteStoreUnlisten(s);default:return}}function Lv(n,t){const e=W(n);let s=!1;for(const r of t){const i=r.query,o=e.queries.get(i);if(o){for(const l of o.ba)l.Fa(r)&&(s=!0);o.wa=r}}s&&Lo(e)}function Ov(n,t,e){const s=W(n),r=s.queries.get(t);if(r)for(const i of r.ba)i.onError(e);s.queries.delete(t)}function Lo(n){n.Ca.forEach(t=>{t.next()})}var Xa,au;(au=Xa||(Xa={})).Ma="default",au.Cache="cache";class wh{constructor(t,e,s){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(t){if(!this.options.includeMetadataChanges){const s=[];for(const r of t.docChanges)r.type!==3&&s.push(r);t=new Qn(t.query,t.docs,t.oldDocs,s,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const s=e!=="Offline";return(!this.options.Ka||!s)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Qn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Xa.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(t){this.key=t}}class Ah{constructor(t){this.key=t}}class Vv{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Y(),this.mutatedKeys=Y(),this.eu=Bd(t),this.tu=new $n(this.eu)}get nu(){return this.Za}ru(t,e){const s=e?e.iu:new ru,r=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,o=r,l=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,c=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal((h,f)=>{const p=r.get(h),_=Ri(this.query,f)?f:null,C=!!p&&this.mutatedKeys.has(p.key),A=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let S=!1;p&&_?p.data.isEqual(_.data)?C!==A&&(s.track({type:3,doc:_}),S=!0):this.su(p,_)||(s.track({type:2,doc:_}),S=!0,(u&&this.eu(_,u)>0||c&&this.eu(_,c)<0)&&(l=!0)):!p&&_?(s.track({type:0,doc:_}),S=!0):p&&!_&&(s.track({type:1,doc:p}),S=!0,(u||c)&&(l=!0)),S&&(_?(o=o.add(_),i=A?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),s.track({type:1,doc:h})}return{tu:o,iu:s,Ss:l,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,s,r){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort((h,f)=>function(_,C){const A=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Vt:S})}};return A(_)-A(C)}(h.type,f.type)||this.eu(h.doc,f.doc)),this.ou(s),r=r??!1;const l=e&&!r?this._u():[],u=this.Ya.size===0&&this.current&&!r?1:0,c=u!==this.Xa;return this.Xa=u,o.length!==0||c?{snapshot:new Qn(this.query,t.tu,i,o,t.mutatedKeys,u===0,c,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ru,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=Y(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))});const e=[];return t.forEach(s=>{this.Ya.has(s)||e.push(new Ah(s))}),this.Ya.forEach(s=>{t.has(s)||e.push(new Th(s))}),e}cu(t){this.Za=t.ks,this.Ya=Y();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Qn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Oo="SyncEngine";class Mv{constructor(t,e,s){this.query=t,this.targetId=e,this.view=s}}class $v{constructor(t){this.key=t,this.hu=!1}}class Bv{constructor(t,e,s,r,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new wn(l=>$d(l),Ci),this.Iu=new Map,this.Eu=new Set,this.Ru=new ht(q.comparator),this.Au=new Map,this.Vu=new wo,this.du={},this.mu=new Map,this.fu=Kn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Fv(n,t,e=!0){const s=xh(n);let r;const i=s.Tu.get(t);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await Sh(s,t,e,!0),r}async function Uv(n,t){const e=xh(n);await Sh(e,t,!0,!1)}async function Sh(n,t,e,s){const r=await av(n.localStore,ie(t)),i=r.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let l;return s&&(l=await qv(n,t,i,o==="current",r.resumeToken)),n.isPrimaryClient&&e&&fh(n.remoteStore,r),l}async function qv(n,t,e,s,r){n.pu=(f,p,_)=>async function(A,S,N,O){let U=S.view.ru(N);U.Ss&&(U=await Xl(A.localStore,S.query,!1).then(({documents:b})=>S.view.ru(b,U)));const tt=O&&O.targetChanges.get(S.targetId),st=O&&O.targetMismatches.get(S.targetId)!=null,at=S.view.applyChanges(U,A.isPrimaryClient,tt,st);return cu(A,S.targetId,at.au),at.snapshot}(n,f,p,_);const i=await Xl(n.localStore,t,!0),o=new Vv(t,i.ks),l=o.ru(i.documents),u=ar.createSynthesizedTargetChangeForCurrentChange(e,s&&n.onlineState!=="Offline",r),c=o.applyChanges(l,n.isPrimaryClient,u);cu(n,e,c.au);const h=new Mv(t,e,o);return n.Tu.set(t,h),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),c.snapshot}async function jv(n,t,e){const s=W(n),r=s.Tu.get(t),i=s.Iu.get(r.targetId);if(i.length>1)return s.Iu.set(r.targetId,i.filter(o=>!Ci(o,t))),void s.Tu.delete(t);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Ja(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),e&&Ro(s.remoteStore,r.targetId),Za(s,r.targetId)}).catch(is)):(Za(s,r.targetId),await Ja(s.localStore,r.targetId,!0))}async function zv(n,t){const e=W(n),s=e.Tu.get(t),r=e.Iu.get(s.targetId);e.isPrimaryClient&&r.length===1&&(e.sharedClientState.removeLocalQueryTarget(s.targetId),Ro(e.remoteStore,s.targetId))}async function Hv(n,t,e){const s=Xv(n);try{const r=await function(o,l){const u=W(o),c=ct.now(),h=l.reduce((_,C)=>_.add(C.key),Y());let f,p;return u.persistence.runTransaction("Locally write mutations","readwrite",_=>{let C=Ee(),A=Y();return u.xs.getEntries(_,h).next(S=>{C=S,C.forEach((N,O)=>{O.isValidDocument()||(A=A.add(N))})}).next(()=>u.localDocuments.getOverlayedDocuments(_,C)).next(S=>{f=S;const N=[];for(const O of l){const U=oy(O,f.get(O.key).overlayedDocument);U!=null&&N.push(new en(O.key,U,kd(U.value.mapValue),At.exists(!0)))}return u.mutationQueue.addMutationBatch(_,c,N,l)}).next(S=>{p=S;const N=S.applyToLocalDocumentSet(f,A);return u.documentOverlayCache.saveOverlays(_,S.batchId,N)})}).then(()=>({batchId:p.batchId,changes:Ud(f)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(r.batchId),function(o,l,u){let c=o.du[o.currentUser.toKey()];c||(c=new ht(J)),c=c.insert(l,u),o.du[o.currentUser.toKey()]=c}(s,r.batchId,e),await cr(s,r.changes),await Li(s.remoteStore)}catch(r){const i=No(r,"Failed to persist write");e.reject(i)}}async function Ch(n,t){const e=W(n);try{const s=await sv(e.localStore,t);t.targetChanges.forEach((r,i)=>{const o=e.Au.get(i);o&&(Z(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?o.hu=!0:r.modifiedDocuments.size>0?Z(o.hu,14607):r.removedDocuments.size>0&&(Z(o.hu,42227),o.hu=!1))}),await cr(e,s,t)}catch(s){await is(s)}}function ou(n,t,e){const s=W(n);if(s.isPrimaryClient&&e===0||!s.isPrimaryClient&&e===1){const r=[];s.Tu.forEach((i,o)=>{const l=o.view.va(t);l.snapshot&&r.push(l.snapshot)}),function(o,l){const u=W(o);u.onlineState=l;let c=!1;u.queries.forEach((h,f)=>{for(const p of f.ba)p.va(l)&&(c=!0)}),c&&Lo(u)}(s.eventManager,t),r.length&&s.Pu.J_(r),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function Wv(n,t,e){const s=W(n);s.sharedClientState.updateQueryState(t,"rejected",e);const r=s.Au.get(t),i=r&&r.key;if(i){let o=new ht(q.comparator);o=o.insert(i,Tt.newNoDocument(i,z.min()));const l=Y().add(i),u=new xi(z.min(),new Map,new ht(J),o,l);await Ch(s,u),s.Ru=s.Ru.remove(i),s.Au.delete(t),Vo(s)}else await Ja(s.localStore,t,!1).then(()=>Za(s,t,e)).catch(is)}async function Gv(n,t){const e=W(n),s=t.batch.batchId;try{const r=await nv(e.localStore,t);Ph(e,s,null),Rh(e,s),e.sharedClientState.updateMutationState(s,"acknowledged"),await cr(e,r)}catch(r){await is(r)}}async function Kv(n,t,e){const s=W(n);try{const r=await function(o,l){const u=W(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return u.mutationQueue.lookupMutationBatch(c,l).next(f=>(Z(f!==null,37113),h=f.keys(),u.mutationQueue.removeMutationBatch(c,f))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,h,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>u.localDocuments.getDocuments(c,h))})}(s.localStore,t);Ph(s,t,e),Rh(s,t),s.sharedClientState.updateMutationState(t,"rejected",e),await cr(s,r)}catch(r){await is(r)}}function Rh(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function Ph(n,t,e){const s=W(n);let r=s.du[s.currentUser.toKey()];if(r){const i=r.get(t);i&&(e?i.reject(e):i.resolve(),r=r.remove(t)),s.du[s.currentUser.toKey()]=r}}function Za(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const s of n.Iu.get(t))n.Tu.delete(s),e&&n.Pu.yu(s,e);n.Iu.delete(t),n.isPrimaryClient&&n.Vu.Gr(t).forEach(s=>{n.Vu.containsKey(s)||kh(n,s)})}function kh(n,t){n.Eu.delete(t.path.canonicalString());const e=n.Ru.get(t);e!==null&&(Ro(n.remoteStore,e),n.Ru=n.Ru.remove(t),n.Au.delete(e),Vo(n))}function cu(n,t,e){for(const s of e)s instanceof Th?(n.Vu.addReference(s.key,t),Qv(n,s)):s instanceof Ah?(F(Oo,"Document no longer in limbo: "+s.key),n.Vu.removeReference(s.key,t),n.Vu.containsKey(s.key)||kh(n,s.key)):j(19791,{wu:s})}function Qv(n,t){const e=t.key,s=e.path.canonicalString();n.Ru.get(e)||n.Eu.has(s)||(F(Oo,"New document in limbo: "+e),n.Eu.add(s),Vo(n))}function Vo(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new q(rt.fromString(t)),s=n.fu.next();n.Au.set(s,new $v(e)),n.Ru=n.Ru.insert(e,s),fh(n.remoteStore,new Be(ie(vo(e.path)),s,"TargetPurposeLimboResolution",Ai.ce))}}async function cr(n,t,e){const s=W(n),r=[],i=[],o=[];s.Tu.isEmpty()||(s.Tu.forEach((l,u)=>{o.push(s.pu(u,t,e).then(c=>{var h;if((c||e)&&s.isPrimaryClient){const f=c?!c.fromCache:(h=e==null?void 0:e.targetChanges.get(u.targetId))==null?void 0:h.current;s.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(c){r.push(c);const f=Ao.Es(u.targetId,c);i.push(f)}}))}),await Promise.all(o),s.Pu.J_(r),await async function(u,c){const h=W(u);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>D.forEach(c,p=>D.forEach(p.Ts,_=>h.persistence.referenceDelegate.addReference(f,p.targetId,_)).next(()=>D.forEach(p.Is,_=>h.persistence.referenceDelegate.removeReference(f,p.targetId,_)))))}catch(f){if(!as(f))throw f;F(So,"Failed to update sequence numbers: "+f)}for(const f of c){const p=f.targetId;if(!f.fromCache){const _=h.vs.get(p),C=_.snapshotVersion,A=_.withLastLimboFreeSnapshotVersion(C);h.vs=h.vs.insert(p,A)}}}(s.localStore,i))}async function Jv(n,t){const e=W(n);if(!e.currentUser.isEqual(t)){F(Oo,"User change. New user:",t.toKey());const s=await hh(e.localStore,t);e.currentUser=t,function(i,o){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new M(k.CANCELLED,o))})}),i.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),await cr(e,s.Ns)}}function Yv(n,t){const e=W(n),s=e.Au.get(t);if(s&&s.hu)return Y().add(s.key);{let r=Y();const i=e.Iu.get(t);if(!i)return r;for(const o of i){const l=e.Tu.get(o);r=r.unionWith(l.view.nu)}return r}}function xh(n){const t=W(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ch.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yv.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Wv.bind(null,t),t.Pu.J_=Lv.bind(null,t.eventManager),t.Pu.yu=Ov.bind(null,t.eventManager),t}function Xv(n){const t=W(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Gv.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Kv.bind(null,t),t}class ui{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Di(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return ev(this.persistence,new Xy,t.initialUser,this.serializer)}Cu(t){return new dh(To.Vi,this.serializer)}Du(t){return new cv}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ui.provider={build:()=>new ui};class Zv extends ui{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){Z(this.persistence.referenceDelegate instanceof ci,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new My(s,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Bt.withCacheSize(this.cacheSizeBytes):Bt.DEFAULT;return new dh(s=>ci.Vi(s,e),this.serializer)}}class to{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>ou(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=Jv.bind(null,this.syncEngine),await xv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Nv}()}createDatastore(t){const e=Di(t.databaseInfo.databaseId),s=mv(t.databaseInfo);return vv(t.authCredentials,t.appCheckCredentials,s,e)}createRemoteStore(t){return function(s,r,i,o,l){return new Iv(s,r,i,o,l)}(this.localStore,this.datastore,t.asyncQueue,e=>ou(this.syncEngine,e,0),function(){return eu.v()?new eu:new lv}())}createSyncEngine(t,e){return function(r,i,o,l,u,c,h){const f=new Bv(r,i,o,l,u,c);return h&&(f.gu=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(r){const i=W(r);F(vn,"RemoteStore shutting down."),i.Ea.add(5),await or(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}to.provider={build:()=>new to};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):be("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t_=class{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new M(k.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await async function(r,i){const o=W(r),l={documents:i.map(f=>oi(o.serializer,f))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,rt.emptyPath(),l,i.length),c=new Map;u.forEach(f=>{const p=Iy(o.serializer,f);c.set(p.key.toString(),p)});const h=[];return i.forEach(f=>{const p=c.get(f.toString());Z(!!p,55234,{key:f}),h.push(p)}),h}(this.datastore,t);return e.forEach(s=>this.recordVersion(s)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(s){this.lastTransactionError=s}this.writtenDocs.add(t.toString())}delete(t){this.write(new ir(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,s)=>{const r=q.fromPath(s);this.mutations.push(new Jd(r,this.precondition(r)))}),await async function(s,r){const i=W(s),o={writes:r.map(l=>ih(i.serializer,l))};await i.Wo("Commit",i.serializer.databaseId,rt.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw j(50498,{Gu:t.constructor.name});e=z.min()}const s=this.readVersions.get(t.key.toString());if(s){if(!e.isEqual(s))throw new M(k.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(z.min())?At.exists(!1):At.updateTime(e):At.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(z.min()))throw new M(k.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return At.updateTime(e)}return At.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(t,e,s,r,i){this.asyncQueue=t,this.datastore=e,this.options=s,this.updateFunction=r,this.deferred=i,this.zu=s.maxAttempts,this.M_=new Co(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Hu()}Hu(){this.M_.p_(async()=>{const t=new t_(this.datastore),e=this.Ju(t);e&&e.then(s=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(s)}).catch(r=>{this.Zu(r)}))}).catch(s=>{this.Zu(s)})})}Ju(t){try{const e=this.updateFunction(t);return!nr(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Zu(t){this.zu>0&&this.Xu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Hu(),Promise.resolve()))):this.deferred.reject(t)}Xu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Yd(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="FirestoreClient";class n_{constructor(t,e,s,r,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=s,this._databaseInfo=r,this.user=Dt.UNAUTHENTICATED,this.clientId=ho.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async o=>{F(Xe,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(s,o=>(F(Xe,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new re;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const s=No(e,"Failed to shutdown persistence");t.reject(s)}}),t.promise}}async function Aa(n,t){n.asyncQueue.verifyOperationInProgress(),F(Xe,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let s=e.initialUser;n.setCredentialChangeListener(async r=>{s.isEqual(r)||(await hh(t.localStore,r),s=r)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function lu(n,t){n.asyncQueue.verifyOperationInProgress();const e=await s_(n);F(Xe,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(s=>su(t.remoteStore,s)),n.setAppCheckTokenChangeListener((s,r)=>su(t.remoteStore,r)),n._onlineComponents=t}async function s_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){F(Xe,"Using user provided OfflineComponentProvider");try{await Aa(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(r){return r.name==="FirebaseError"?r.code===k.FAILED_PRECONDITION||r.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(e))throw e;yn("Error using user provided cache. Falling back to memory cache: "+e),await Aa(n,new ui)}}else F(Xe,"Using default OfflineComponentProvider"),await Aa(n,new Zv(void 0));return n._offlineComponents}async function Mo(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(F(Xe,"Using user provided OnlineComponentProvider"),await lu(n,n._uninitializedComponentsProvider._online)):(F(Xe,"Using default OnlineComponentProvider"),await lu(n,new to))),n._onlineComponents}function r_(n){return Mo(n).then(t=>t.syncEngine)}function i_(n){return Mo(n).then(t=>t.datastore)}async function Nh(n){const t=await Mo(n),e=t.eventManager;return e.onListen=Fv.bind(null,t.syncEngine),e.onUnlisten=jv.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Uv.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=zv.bind(null,t.syncEngine),e}function a_(n,t,e={}){const s=new re;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const h=new Dh({next:p=>{h.Nu(),o.enqueueAndForget(()=>Eh(i,f));const _=p.docs.has(l);!_&&p.fromCache?c.reject(new M(k.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&p.fromCache&&u&&u.source==="server"?c.reject(new M(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),f=new wh(vo(l.path),h,{includeMetadataChanges:!0,Ka:!0});return bh(i,f)}(await Nh(n),n.asyncQueue,t,e,s)),s.promise}function o_(n,t,e={}){const s=new re;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const h=new Dh({next:p=>{h.Nu(),o.enqueueAndForget(()=>Eh(i,f)),p.fromCache&&u.source==="server"?c.reject(new M(k.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),f=new wh(l,h,{includeMetadataChanges:!0,Ka:!0});return bh(i,f)}(await Nh(n),n.asyncQueue,t,e,s)),s.promise}function c_(n,t){const e=new re;return n.asyncQueue.enqueueAndForget(async()=>Hv(await r_(n),t,e)),e.promise}function l_(n,t,e){const s=new re;return n.asyncQueue.enqueueAndForget(async()=>{const r=await i_(n);new e_(n.asyncQueue,r,e,t,s).ju()}),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="ComponentProvider",uu=new Map;function d_(n,t,e,s,r){return new kg(n,t,e,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,Lh(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh="firestore.googleapis.com",du=!0;class hu{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new M(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Oh,this.ssl=du}else this.host=t.host,this.ssl=t.ssl??du;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=uh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Oy)throw new M(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}_g("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lh(t.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new M(k.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Oi{constructor(t,e,s,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new M(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hu(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new lg;switch(s.type){case"firstParty":return new mg(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new M(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const s=uu.get(e);s&&(F(u_,"Removing Datastore"),uu.delete(e),s.terminate())}(this),Promise.resolve()}}function h_(n,t,e,s={}){var c;n=ue(n,Oi);const r=ns(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;r&&(sd(`https://${l}`),rd("Firestore",!0)),i.host!==Oh&&i.host!==l&&yn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:r,emulatorOptions:s};if(!pn(u,o)&&(n._setSettings(u),s.mockUserToken)){let h,f;if(typeof s.mockUserToken=="string")h=s.mockUserToken,f=Dt.MOCK_USER;else{h=Dp(s.mockUserToken,(c=n._app)==null?void 0:c.options.projectId);const p=s.mockUserToken.sub||s.mockUserToken.user_id;if(!p)throw new M(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Dt(p)}n._authCredentials=new ug(new vd(h,f))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(t,e,s){this.converter=e,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new cs(this.firestore,t,this._query)}}class ft{constructor(t,e,s){this.converter=e,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new He(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ft(this.firestore,t,this._key)}toJSON(){return{type:ft._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,s){if(er(e,ft._jsonSchema))return new ft(t,s||null,new q(rt.fromString(e.referencePath)))}}ft._jsonSchemaVersion="firestore/documentReference/1.0",ft._jsonSchema={type:vt("string",ft._jsonSchemaVersion),referencePath:vt("string")};class He extends cs{constructor(t,e,s){super(t,e,vo(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ft(this.firestore,null,new q(t))}withConverter(t){return new He(this.firestore,t,this._path)}}function m_(n,t,...e){if(n=_t(n),_d("collection","path",t),n instanceof Oi){const s=rt.fromString(t,...e);return Al(s),new He(n,null,s)}{if(!(n instanceof ft||n instanceof He))throw new M(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(rt.fromString(t,...e));return Al(s),new He(n.firestore,null,s)}}function he(n,t,...e){if(n=_t(n),arguments.length===1&&(t=ho.newId()),_d("doc","path",t),n instanceof Oi){const s=rt.fromString(t,...e);return Tl(s),new ft(n,null,new q(s))}{if(!(n instanceof ft||n instanceof He))throw new M(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(rt.fromString(t,...e));return Tl(s),new ft(n.firestore,n instanceof He?n.converter:null,new q(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu="AsyncQueue";class pu{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Co(this,"async_queue_retry"),this._c=()=>{const s=Ta();s&&F(mu,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=t;const e=Ta();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ta();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new re;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Yu.push(t),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!as(t))throw t;F(mu,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(s=>{throw this.nc=s,this.rc=!1,be("INTERNAL UNHANDLED ERROR: ",fu(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=e,e}enqueueAfterDelay(t,e,s){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const r=Do.createAndSchedule(this,t,e,s,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&j(47125,{Pc:fu(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,s)=>e.targetTimeMs-s.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function fu(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class An extends Oi{constructor(t,e,s,r){super(t,e,s,r),this.type="firestore",this._queue=new pu,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new pu(t),this._firestoreClient=void 0,await t}}}function p_(n,t){const e=typeof n=="object"?n:cd(),s=typeof n=="string"?n:ti,r=lo(e,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=kp("firestore");i&&h_(r,...i)}return r}function lr(n){if(n._terminated)throw new M(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||f_(n),n._firestoreClient}function f_(n){var s,r,i,o;const t=n._freezeSettings(),e=d_(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,(r=n._app)==null?void 0:r.options.apiKey,t);n._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new n_(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ht(Pt.fromBase64String(t))}catch(e){throw new M(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ht(Pt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ht._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(er(t,Ht._jsonSchema))return Ht.fromBase64String(t.bytes)}}Ht._jsonSchemaVersion="firestore/bytes/1.0",Ht._jsonSchema={type:vt("string",Ht._jsonSchemaVersion),bytes:vt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new M(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new M(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new M(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return J(this._lat,t._lat)||J(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ae._jsonSchemaVersion}}static fromJSON(t){if(er(t,ae._jsonSchema))return new ae(t.latitude,t.longitude)}}ae._jsonSchemaVersion="firestore/geoPoint/1.0",ae._jsonSchema={type:vt("string",ae._jsonSchemaVersion),latitude:vt("number"),longitude:vt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Xt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(er(t,Xt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new Xt(t.vectorValues);throw new M(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Xt._jsonSchemaVersion="firestore/vectorValue/1.0",Xt._jsonSchema={type:vt("string",Xt._jsonSchemaVersion),vectorValues:vt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=/^__.*__$/;class y_{constructor(t,e,s){this.data=t,this.fieldMask=e,this.fieldTransforms=s}toMutation(t,e){return this.fieldMask!==null?new en(t,this.data,this.fieldMask,e,this.fieldTransforms):new rr(t,this.data,e,this.fieldTransforms)}}class Vh{constructor(t,e,s){this.data=t,this.fieldMask=e,this.fieldTransforms=s}toMutation(t,e){return new en(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Mh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{dataSource:n})}}class Bo{constructor(t,e,s,r,i,o){this.settings=t,this.databaseId=e,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new Bo({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var r;const e=(r=this.path)==null?void 0:r.child(t),s=this.contextWith({path:e,arrayElement:!1});return s.validatePathSegment(t),s}childContextForFieldPath(t){var r;const e=(r=this.path)==null?void 0:r.child(t),s=this.contextWith({path:e,arrayElement:!1});return s.validatePath(),s}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return di(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(Mh(this.dataSource)&&g_.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class v_{constructor(t,e,s){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=s||Di(t)}createContext(t,e,s,r=!1){return new Bo({dataSource:t,methodName:e,targetDoc:s,path:Ct.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mi(n){const t=n._freezeSettings(),e=Di(n._databaseId);return new v_(n._databaseId,!!t.ignoreUndefinedProperties,e)}function Fo(n,t,e,s,r,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,t,e,r);Uo("Data must be an object, but it was:",o,s);const l=Fh(s,o);let u,c;if(i.merge)u=new Wt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const f of i.mergeFields){const p=Jn(t,f,e);if(!o.contains(p))throw new M(k.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);jh(h,p)||h.push(p)}u=new Wt(h),c=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,c=o.fieldTransforms;return new y_(new Mt(l),u,c)}class $i extends $o{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.createError(`${this._methodName}() can only appear at the top level of your update data`):t.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof $i}}function $h(n,t,e,s){const r=n.createContext(1,t,e);Uo("Data must be an object, but it was:",r,s);const i=[],o=Mt.empty();tn(s,(u,c)=>{const h=qh(t,u,e);c=_t(c);const f=r.childContextForFieldPath(h);if(c instanceof $i)i.push(h);else{const p=ur(c,f);p!=null&&(i.push(h),o.set(h,p))}});const l=new Wt(i);return new Vh(o,l,r.fieldTransforms)}function Bh(n,t,e,s,r,i){const o=n.createContext(1,t,e),l=[Jn(t,s,e)],u=[r];if(i.length%2!=0)throw new M(k.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)l.push(Jn(t,i[p])),u.push(i[p+1]);const c=[],h=Mt.empty();for(let p=l.length-1;p>=0;--p)if(!jh(c,l[p])){const _=l[p];let C=u[p];C=_t(C);const A=o.childContextForFieldPath(_);if(C instanceof $i)c.push(_);else{const S=ur(C,A);S!=null&&(c.push(_),h.set(_,S))}}const f=new Wt(c);return new Vh(h,f,o.fieldTransforms)}function __(n,t,e,s=!1){return ur(e,n.createContext(s?4:3,t))}function ur(n,t){if(Uh(n=_t(n)))return Uo("Unsupported field value:",t,n),Fh(n,t);if(n instanceof $o)return function(s,r){if(!Mh(r.dataSource))throw r.createError(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.createError(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return function(s,r){const i=[];let o=0;for(const l of s){let u=ur(l,r.childContextForArray(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,t)}return function(s,r){if((s=_t(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return ey(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=ct.fromDate(s);return{timestampValue:ai(r.serializer,i)}}if(s instanceof ct){const i=new ct(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ai(r.serializer,i)}}if(s instanceof ae)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ht)return{bytesValue:eh(r.serializer,s._byteString)};if(s instanceof ft){const i=r.databaseId,o=s.firestore._databaseId;if(!o.isEqual(i))throw r.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Eo(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof Xt)return function(o,l){const u=o instanceof Xt?o.toArray():o;return{mapValue:{fields:{[Rd]:{stringValue:Pd},[ei]:{arrayValue:{values:u.map(h=>{if(typeof h!="number")throw l.createError("VectorValues must only contain numeric values.");return _o(l.serializer,h)})}}}}}}(s,r);if(lh(s))return s._toProto(r.serializer);throw r.createError(`Unsupported field value: ${Ti(s)}`)}(n,t)}function Fh(n,t){const e={};return Ed(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):tn(n,(s,r)=>{const i=ur(r,t.childContextForField(s));i!=null&&(e[s]=i)}),{mapValue:{fields:e}}}function Uh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ct||n instanceof ae||n instanceof Ht||n instanceof ft||n instanceof $o||n instanceof Xt||lh(n))}function Uo(n,t,e){if(!Uh(e)||!Id(e)){const s=Ti(e);throw s==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+s)}}function Jn(n,t,e){if((t=_t(t))instanceof Vi)return t._internalPath;if(typeof t=="string")return qh(n,t);throw di("Field path arguments must be of type string or ",n,!1,void 0,e)}const I_=new RegExp("[~\\*/\\[\\]]");function qh(n,t,e){if(t.search(I_)>=0)throw di(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Vi(...t.split("."))._internalPath}catch{throw di(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function di(n,t,e,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${s}`),o&&(u+=` in document ${r}`),u+=")"),new M(k.INVALID_ARGUMENT,l+n+u)}function jh(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{convertValue(t,e="none"){switch(Je(t)){case 0:return null;case 1:return t.booleanValue;case 2:return pt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Qe(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw j(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const s={};return tn(t,(r,i)=>{s[r]=this.convertValue(i,e)}),s}convertVectorValue(t){var s,r,i;const e=(i=(r=(s=t.fields)==null?void 0:s[ei].arrayValue)==null?void 0:r.values)==null?void 0:i.map(o=>pt(o.doubleValue));return new Xt(e)}convertGeoPoint(t){return new ae(pt(t.latitude),pt(t.longitude))}convertArray(t,e){return(t.values||[]).map(s=>this.convertValue(s,e))}convertServerTimestamp(t,e){switch(e){case"previous":const s=Si(t);return s==null?null:this.convertValue(s,e);case"estimate":return this.convertTimestamp(qs(t));default:return null}}convertTimestamp(t){const e=Ke(t);return new ct(e.seconds,e.nanos)}convertDocumentKey(t,e){const s=rt.fromString(t);Z(ch(s),9688,{name:t});const r=new js(s.get(1),s.get(3)),i=new q(s.popFirst(5));return r.isEqual(e)||be(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo extends zh{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ht(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ft(this.firestore,null,e)}}const gu="@firebase/firestore",yu="4.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,e,s,r,i){this._firestore=t,this._userDataWriter=e,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new b_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Jn("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class b_ extends hi{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(k.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jo{}class w_ extends jo{}function T_(n,t,...e){let s=[];t instanceof jo&&s.push(t),s=s.concat(e),function(i){const o=i.filter(u=>u instanceof zo).length,l=i.filter(u=>u instanceof Bi).length;if(o>1||o>0&&l>0)throw new M(k.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const r of s)n=r._apply(n);return n}class Bi extends w_{constructor(t,e,s){super(),this._field=t,this._op=e,this._value=s,this.type="where"}static _create(t,e,s){return new Bi(t,e,s)}_apply(t){const e=this._parse(t);return Hh(t._query,e),new cs(t.firestore,t.converter,Ha(t._query,e))}_parse(t){const e=Mi(t.firestore);return function(i,o,l,u,c,h,f){let p;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new M(k.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){_u(f,h);const C=[];for(const A of f)C.push(vu(u,i,A));p={arrayValue:{values:C}}}else p=vu(u,i,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||_u(f,h),p=__(l,o,f,h==="in"||h==="not-in");return yt.create(c,h,p)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function A_(n,t,e){const s=t,r=Jn("where",n);return Bi._create(r,s,e)}class zo extends jo{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new zo(t,e)}_parse(t){const e=this._queryConstraints.map(s=>s._parse(t)).filter(s=>s.getFilters().length>0);return e.length===1?e[0]:Zt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(r,i){let o=r;const l=i.getFlattenedFilters();for(const u of l)Hh(o,u),o=Ha(o,u)}(t._query,e),new cs(t.firestore,t.converter,Ha(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function vu(n,t,e){if(typeof(e=_t(e))=="string"){if(e==="")throw new M(k.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Md(t)&&e.indexOf("/")!==-1)throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const s=t.path.child(rt.fromString(e));if(!q.isDocumentKey(s))throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Nl(n,new q(s))}if(e instanceof ft)return Nl(n,e._key);throw new M(k.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ti(e)}.`)}function _u(n,t){if(!Array.isArray(n)||n.length===0)throw new M(k.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Hh(n,t){const e=function(r,i){for(const o of r)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new M(k.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new M(k.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Ho(n,t,e){let s;return s=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,s}class S_ extends zh{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ht(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ft(this.firestore,null,e)}}class On{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class We extends hi{constructor(t,e,s,r,i,o){super(t,e,s,r,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const s=this._document.data.field(Jn("DocumentSnapshot.get",t));if(s!==null)return this._userDataWriter.convertValue(s,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=We._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}We._jsonSchemaVersion="firestore/documentSnapshot/1.0",We._jsonSchema={type:vt("string",We._jsonSchemaVersion),bundleSource:vt("string","DocumentSnapshot"),bundleName:vt("string"),bundle:vt("string")};class Hr extends We{data(t={}){return super.data(t)}}class Bn{constructor(t,e,s,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new On(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(s=>{t.call(e,new Hr(this._firestore,this._userDataWriter,s.key,s,new On(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new M(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map(l=>{const u=new Hr(r._firestore,r._userDataWriter,l.doc.key,l.doc,new On(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Hr(r._firestore,r._userDataWriter,l.doc.key,l.doc,new On(r._snapshot.mutatedKeys.has(l.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,h=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),h=o.indexOf(l.doc.key)),{type:C_(l.type),doc:u,oldIndex:c,newIndex:h}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Bn._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ho.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],s=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(e.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function C_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Bn._jsonSchemaVersion="firestore/querySnapshot/1.0",Bn._jsonSchema={type:vt("string",Bn._jsonSchemaVersion),bundleSource:vt("string","QuerySnapshot"),bundleName:vt("string"),bundle:vt("string")};const R_={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Mi(t)}set(t,e,s){this._verifyNotCommitted();const r=Fe(t,this._firestore),i=Ho(r.converter,e,s),o=Fo(this._dataReader,"WriteBatch.set",r._key,i,r.converter!==null,s);return this._mutations.push(o.toMutation(r._key,At.none())),this}update(t,e,s,...r){this._verifyNotCommitted();const i=Fe(t,this._firestore);let o;return o=typeof(e=_t(e))=="string"||e instanceof Vi?Bh(this._dataReader,"WriteBatch.update",i._key,e,s,r):$h(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(o.toMutation(i._key,At.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Fe(t,this._firestore);return this._mutations=this._mutations.concat(new ir(e._key,At.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new M(k.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Fe(n,t){if((n=_t(n)).firestore!==t)throw new M(k.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Mi(t)}get(t){const e=Fe(t,this._firestore),s=new S_(this._firestore);return this._transaction.lookup([e._key]).then(r=>{if(!r||r.length!==1)return j(24041);const i=r[0];if(i.isFoundDocument())return new hi(this._firestore,s,i.key,i,e.converter);if(i.isNoDocument())return new hi(this._firestore,s,e._key,null,e.converter);throw j(18433,{doc:i})})}set(t,e,s){const r=Fe(t,this._firestore),i=Ho(r.converter,e,s),o=Fo(this._dataReader,"Transaction.set",r._key,i,r.converter!==null,s);return this._transaction.set(r._key,o),this}update(t,e,s,...r){const i=Fe(t,this._firestore);let o;return o=typeof(e=_t(e))=="string"||e instanceof Vi?Bh(this._dataReader,"Transaction.update",i._key,e,s,r):$h(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,o),this}delete(t){const e=Fe(t,this._firestore);return this._transaction.delete(e._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_ extends k_{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Fe(t,this._firestore),s=new qo(this._firestore);return super.get(t).then(r=>new We(this._firestore,s,e._key,r._document,new On(!1,!1),e.converter))}}function Wh(n,t,e){n=ue(n,An);const s={...R_,...e};(function(o){if(o.maxAttempts<1)throw new M(k.INVALID_ARGUMENT,"Max attempts must be at least 1")})(s);const r=lr(n);return l_(r,i=>t(new x_(n,i)),s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(n){n=ue(n,ft);const t=ue(n.firestore,An),e=lr(t);return a_(e,n._key).then(s=>N_(t,n,s))}function Wo(n){n=ue(n,cs);const t=ue(n.firestore,An),e=lr(t),s=new qo(t);return E_(n._query),o_(e,n._query).then(r=>new Bn(t,s,n,r))}function Gs(n,t,e){n=ue(n,ft);const s=ue(n.firestore,An),r=Ho(n.converter,t,e),i=Mi(s);return Go(s,[Fo(i,"setDoc",n._key,r,n.converter!==null,e).toMutation(n._key,At.none())])}function D_(n){return Go(ue(n.firestore,An),[new ir(n._key,At.none())])}function Go(n,t){const e=lr(n);return c_(e,t)}function N_(n,t,e){const s=e.docs.get(t._key),r=new qo(n);return new We(n,r,t._key,s,new On(e.hasPendingWrites,e.fromCache),t.converter)}function L_(n){return n=ue(n,An),lr(n),new P_(n,t=>Go(n,t))}(function(t,e=!0){cg(ss),zn(new fn("firestore",(s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),l=new An(new dg(s.getProvider("auth-internal")),new pg(o,s.getProvider("app-check-internal")),xg(o,r),o);return i={useFetchStreams:e,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),je(gu,yu,t),je(gu,yu,"esm2020")})();const O_={apiKey:"AIzaSyD93Wq4iwQkUsw1JA_ej8ThQu4J_Lmy4-E",authDomain:"kitchen-kot.firebaseapp.com",projectId:"kitchen-kot",storageBucket:"kitchen-kot.firebasestorage.app",messagingSenderId:"191789378070",appId:"1:191789378070:web:e77adb2cda31f91b84a337",measurementId:"G-V7DBSNZ5L9"},V_=od(O_),Ut=p_(V_);let Ze=null;function M_(n){Ze=n}function $_(){return Ze}function Ko(n){if(!Ze)throw new Error("Account not set. Please login first.");return m_(Ut,"accounts",Ze,n)}function Fi(n,t){if(!Ze)throw new Error("Account not set. Please login first.");return he(Ut,"accounts",Ze,n,String(t))}function Gh(n){if(!Ze)throw new Error("Account not set. Please login first.");return he(Ut,"accounts",Ze,"_counters",n)}const mi={},Kh=3e4;function Ui(n){delete mi[n]}async function Qh(n){const t=mi[n];if(t&&Date.now()-t.timestamp<Kh)return t.data;const s=(await Wo(Ko(n))).docs.map(r=>r.data());return mi[n]={data:s,timestamp:Date.now()},s}async function B_(n,t){const e=mi[n];if(e&&Date.now()-e.timestamp<Kh){const r=e.data.find(i=>i.id===t);if(r)return r}const s=await Yn(Fi(n,t));return s.exists()?s.data():void 0}async function fe(n,t){const e=Gh(n),s=await Wh(Ut,async r=>{const i=await r.get(e),o=(i.exists()?i.data().value:0)+1;return r.set(e,{value:o}),o});return t.id=s,await Gs(Fi(n,s),t),Ui(n),s}async function F_(n,t){if(!t.id&&t.id!==0)throw new Error("Data must have an id field");return await Gs(Fi(n,t.id),t),Ui(n),t.id}async function U_(n,t){await D_(Fi(n,t)),Ui(n)}async function q_(n,t,e){const s=T_(Ko(n),A_(t,"==",e));return(await Wo(s)).docs.map(i=>i.data())}async function j_(n){const t=await Wo(Ko(n));if(t.docs.length===0)return;const e=L_(Ut);t.docs.forEach(s=>e.delete(s.ref)),await e.commit(),Ui(n)}async function z_(){const n=Gh("orderNumber");return await Wh(Ut,async t=>{const e=await t.get(n),s=(e.exists()?e.data().value:0)+1;t.set(n,{value:s});const r=new Date;return`ORD-${`${String(r.getDate()).padStart(2,"0")}${String(r.getMonth()+1).padStart(2,"0")}`}-${String(s).padStart(4,"0")}`})}async function H_(){return!0}async function W_(){if((await Qh("items")).length>0)return;const t=[{name:"Default Supplier",contact:"9876543210",incentiveEnabled:!0,active:!0,createdAt:new Date().toISOString()},{name:"Fresh Foods Co.",contact:"9876543211",incentiveEnabled:!0,active:!0,createdAt:new Date().toISOString()},{name:"Daily Mart",contact:"9876543212",incentiveEnabled:!1,active:!0,createdAt:new Date().toISOString()}];for(const u of t)await fe("suppliers",u);const e=[{name:"Table 1",active:!0},{name:"Table 2",active:!0},{name:"Table 3",active:!0},{name:"Table 4",active:!0},{name:"Table 5",active:!0},{name:"Parcel",active:!0},{name:"Takeaway",active:!0}];for(const u of e)await fe("tables",u);const s=[{name:"Chicken 65",category:"Starters",sellingPrice:220,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Paneer Tikka",category:"Starters",sellingPrice:200,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Gobi Manchurian",category:"Starters",sellingPrice:160,incentivePercent:3,active:!0,createdAt:new Date().toISOString()},{name:"Chicken Biryani",category:"Main Course",sellingPrice:280,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Mutton Biryani",category:"Main Course",sellingPrice:350,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Veg Biryani",category:"Main Course",sellingPrice:180,incentivePercent:3,active:!0,createdAt:new Date().toISOString()},{name:"Butter Naan",category:"Breads",sellingPrice:45,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Garlic Naan",category:"Breads",sellingPrice:55,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Tandoori Roti",category:"Breads",sellingPrice:30,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Dal Tadka",category:"Main Course",sellingPrice:150,incentivePercent:3,active:!0,createdAt:new Date().toISOString()},{name:"Palak Paneer",category:"Main Course",sellingPrice:190,incentivePercent:4,active:!0,createdAt:new Date().toISOString()},{name:"Chicken Curry",category:"Main Course",sellingPrice:240,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Fish Fry",category:"Starters",sellingPrice:260,incentivePercent:5,active:!0,createdAt:new Date().toISOString()},{name:"Masala Dosa",category:"South Indian",sellingPrice:90,incentivePercent:3,active:!0,createdAt:new Date().toISOString()},{name:"Idli Sambar",category:"South Indian",sellingPrice:60,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Lime Soda",category:"Beverages",sellingPrice:40,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Lassi",category:"Beverages",sellingPrice:50,incentivePercent:2,active:!0,createdAt:new Date().toISOString()},{name:"Gulab Jamun",category:"Desserts",sellingPrice:60,incentivePercent:2,active:!0,createdAt:new Date().toISOString()}];for(const u of s)await fe("items",u);const r=[{name:"Chicken",unit:"g",currentStock:5e3,active:!0},{name:"Mutton",unit:"g",currentStock:3e3,active:!0},{name:"Paneer",unit:"g",currentStock:2e3,active:!0},{name:"Rice",unit:"g",currentStock:1e4,active:!0},{name:"Salt",unit:"g",currentStock:5e3,active:!0},{name:"Chilli Powder",unit:"g",currentStock:1e3,active:!0},{name:"Oil",unit:"ml",currentStock:5e3,active:!0},{name:"Flour",unit:"g",currentStock:5e3,active:!0},{name:"Cauliflower",unit:"g",currentStock:2e3,active:!0},{name:"Onion",unit:"g",currentStock:3e3,active:!0},{name:"Tomato",unit:"g",currentStock:2e3,active:!0},{name:"Garlic",unit:"g",currentStock:500,active:!0},{name:"Fish",unit:"g",currentStock:2e3,active:!0},{name:"Butter",unit:"g",currentStock:1e3,active:!0},{name:"Milk",unit:"ml",currentStock:3e3,active:!0},{name:"Sugar",unit:"g",currentStock:2e3,active:!0},{name:"Lemon",unit:"qty",currentStock:50,active:!0},{name:"Curd",unit:"ml",currentStock:2e3,active:!0},{name:"Dal",unit:"g",currentStock:3e3,active:!0},{name:"Spinach",unit:"g",currentStock:1e3,active:!0}];for(const u of r)await fe("ingredients",u);const i=[{itemId:1,ingredientId:1,quantity:100},{itemId:1,ingredientId:5,quantity:5},{itemId:1,ingredientId:6,quantity:10},{itemId:1,ingredientId:7,quantity:50},{itemId:4,ingredientId:1,quantity:200},{itemId:4,ingredientId:4,quantity:150},{itemId:4,ingredientId:10,quantity:50},{itemId:4,ingredientId:7,quantity:30},{itemId:5,ingredientId:2,quantity:200},{itemId:5,ingredientId:4,quantity:150},{itemId:5,ingredientId:10,quantity:50},{itemId:2,ingredientId:3,quantity:150},{itemId:2,ingredientId:7,quantity:20},{itemId:7,ingredientId:8,quantity:80},{itemId:7,ingredientId:14,quantity:10}];for(const u of i)await fe("itemIngredients",u);const o=[{name:"Metro Wholesale",contact:"9876500001",address:"Market Road, Chennai",gstNumber:"33AABCU9603R1ZM",active:!0,createdAt:new Date().toISOString()},{name:"Reliance Fresh",contact:"9876500002",address:"Anna Nagar, Chennai",gstNumber:"",active:!0,createdAt:new Date().toISOString()},{name:"Local Vegetables",contact:"9876500003",address:"Vegetable Market",gstNumber:"",active:!0,createdAt:new Date().toISOString()}];for(const u of o)await fe("grocerySuppliers",u);const l=[{category:"Grocery",description:"Monthly milk supply advance",amount:2500,date:new Date().toISOString().split("T")[0],createdAt:new Date().toISOString()},{category:"Maintenance",description:"AC Repairing charges",amount:1200,date:new Date().toISOString().split("T")[0],createdAt:new Date().toISOString()},{category:"Salary",description:"Part-time cleaning staff",amount:3e3,date:new Date().toISOString().split("T")[0],createdAt:new Date().toISOString()}];for(const u of l)await fe("expenses",u)}const x={openDB:H_,setAccountId:M_,getAccountId:$_,getAll:Qh,getById:B_,add:fe,update:F_,remove:U_,getByIndex:q_,clearStore:j_,getNextOrderNumber:z_,seedDemoData:W_,recordWalletTransaction:async(n,t,e,s=null)=>{const r={type:n,amount:Number(t),description:e,sourceId:String(s),date:new Date().toISOString().split("T")[0],createdAt:new Date().toISOString()};return await fe("walletTransactions",r)}};function Jh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const G_=Jh,Yh=new Zs("auth","Firebase",Jh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi=new oo("@firebase/auth");function K_(n,...t){pi.logLevel<=Q.WARN&&pi.warn(`Auth (${ss}): ${n}`,...t)}function Wr(n,...t){pi.logLevel<=Q.ERROR&&pi.error(`Auth (${ss}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,...t){throw Qo(n,...t)}function oe(n,...t){return Qo(n,...t)}function Xh(n,t,e){const s={...G_(),[t]:e};return new Zs("auth","Firebase",s).create(t,{appName:n.name})}function ve(n){return Xh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qo(n,...t){if(typeof n!="string"){const e=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(e,...s)}return Yh.create(n,...t)}function H(n,t,...e){if(!n)throw Qo(t,...e)}function ge(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Wr(t),new Error(t)}function we(n,t){n||ge(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Q_(){return Iu()==="http:"||Iu()==="https:"}function Iu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Q_()||$p()||"connection"in navigator)?navigator.onLine:!0}function Y_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e){this.shortDelay=t,this.longDelay=e,we(e>t,"Short delay should be less than long delay!"),this.isMobile=Op()||Bp()}get(){return J_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n,t){we(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{static initialize(t,e,s){this.fetchImpl=t,e&&(this.headersImpl=e),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ge("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ge("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ge("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],tI=new dr(3e4,6e4);function nn(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function sn(n,t,e,s,r={}){return tm(n,r,async()=>{let i={},o={};s&&(t==="GET"?o=s:i={body:JSON.stringify(s)});const l=tr({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const c={method:t,headers:u,...i};return Mp()||(c.referrerPolicy="no-referrer"),n.emulatorConfig&&ns(n.emulatorConfig.host)&&(c.credentials="include"),Zh.fetch()(await em(n,n.config.apiHost,e,l),c)})}async function tm(n,t,e){n._canInitEmulator=!1;const s={...X_,...t};try{const r=new nI(n),i=await Promise.race([e(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Mr(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mr(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Mr(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Mr(n,"user-disabled",o);const h=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Xh(n,h,c);te(n,h)}}catch(r){if(r instanceof Se)throw r;te(n,"network-request-failed",{message:String(r)})}}async function hr(n,t,e,s,r={}){const i=await sn(n,t,e,s,r);return"mfaPendingCredential"in i&&te(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function em(n,t,e,s){const r=`${t}${e}?${s}`,i=n,o=i.config.emulator?Jo(n.config,r):`${n.config.apiScheme}://${r}`;return Z_.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function eI(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class nI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,s)=>{this.timer=setTimeout(()=>s(oe(this.auth,"network-request-failed")),tI.get())})}}function Mr(n,t,e){const s={appName:n.name};e.email&&(s.email=e.email),e.phoneNumber&&(s.phoneNumber=e.phoneNumber);const r=oe(n,t,s);return r.customData._tokenResponse=e,r}function bu(n){return n!==void 0&&n.enterprise!==void 0}class sI{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return eI(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function rI(n,t){return sn(n,"GET","/v2/recaptchaConfig",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iI(n,t){return sn(n,"POST","/v1/accounts:delete",t)}async function fi(n,t){return sn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function aI(n,t=!1){const e=_t(n),s=await e.getIdToken(t),r=Yo(s);H(r&&r.exp&&r.auth_time&&r.iat,e.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Bs(Sa(r.auth_time)),issuedAtTime:Bs(Sa(r.iat)),expirationTime:Bs(Sa(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Sa(n){return Number(n)*1e3}function Yo(n){const[t,e,s]=n.split(".");if(t===void 0||e===void 0||s===void 0)return Wr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Zu(e);return r?JSON.parse(r):(Wr("Failed to decode base64 JWT payload"),null)}catch(r){return Wr("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Eu(n){const t=Yo(n);return H(t,"internal-error"),H(typeof t.exp<"u","internal-error"),H(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ks(n,t,e=!1){if(e)return t;try{return await t}catch(s){throw s instanceof Se&&oI(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function oI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Bs(this.lastLoginAt),this.creationTime=Bs(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gi(n){var f;const t=n.auth,e=await n.getIdToken(),s=await Ks(n,fi(t,{idToken:e}));H(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(f=r.providerUserInfo)!=null&&f.length?nm(r.providerUserInfo):[],o=uI(n.providerData,i),l=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!(o!=null&&o.length),c=l?u:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new no(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(n,h)}async function lI(n){const t=_t(n);await gi(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function uI(n,t){return[...n.filter(s=>!t.some(r=>r.providerId===s.providerId)),...t]}function nm(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dI(n,t){const e=await tm(n,{},async()=>{const s=tr({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,o=await em(n,r,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:s};return n.emulatorConfig&&ns(n.emulatorConfig.host)&&(u.credentials="include"),Zh.fetch()(o,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function hI(n,t){return sn(n,"POST","/v2/accounts:revokeToken",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){H(t.idToken,"internal-error"),H(typeof t.idToken<"u","internal-error"),H(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Eu(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){H(t.length!==0,"internal-error");const e=Eu(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:s,refreshToken:r,expiresIn:i}=await dI(t,e);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(t,e,s){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(t,e){const{refreshToken:s,accessToken:r,expirationTime:i}=e,o=new Fn;return s&&(H(typeof s=="string","internal-error",{appName:t}),o.refreshToken=s),r&&(H(typeof r=="string","internal-error",{appName:t}),o.accessToken=r),i&&(H(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Fn,this.toJSON())}_performRefresh(){return ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n,t){H(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Yt{constructor({uid:t,auth:e,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new cI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new no(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(t){const e=await Ks(this,this.stsTokenManager.getToken(this.auth,t));return H(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return aI(this,t)}reload(){return lI(this)}_assign(t){this!==t&&(H(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Yt({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let s=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),s=!0),e&&await gi(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qt(this.auth.app))return Promise.reject(ve(this.auth));const t=await this.getIdToken();return await Ks(this,iI(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const s=e.displayName??void 0,r=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,l=e.tenantId??void 0,u=e._redirectEventId??void 0,c=e.createdAt??void 0,h=e.lastLoginAt??void 0,{uid:f,emailVerified:p,isAnonymous:_,providerData:C,stsTokenManager:A}=e;H(f&&A,t,"internal-error");const S=Fn.fromJSON(this.name,A);H(typeof f=="string",t,"internal-error"),Le(s,t.name),Le(r,t.name),H(typeof p=="boolean",t,"internal-error"),H(typeof _=="boolean",t,"internal-error"),Le(i,t.name),Le(o,t.name),Le(l,t.name),Le(u,t.name),Le(c,t.name),Le(h,t.name);const N=new Yt({uid:f,auth:t,email:r,emailVerified:p,displayName:s,isAnonymous:_,photoURL:o,phoneNumber:i,tenantId:l,stsTokenManager:S,createdAt:c,lastLoginAt:h});return C&&Array.isArray(C)&&(N.providerData=C.map(O=>({...O}))),u&&(N._redirectEventId=u),N}static async _fromIdTokenResponse(t,e,s=!1){const r=new Fn;r.updateFromServerResponse(e);const i=new Yt({uid:e.localId,auth:t,stsTokenManager:r,isAnonymous:s});return await gi(i),i}static async _fromGetAccountInfoResponse(t,e,s){const r=e.users[0];H(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?nm(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),l=new Fn;l.updateFromIdToken(s);const u=new Yt({uid:r.localId,auth:t,stsTokenManager:l,isAnonymous:o}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new no(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu=new Map;function ye(n){we(n instanceof Function,"Expected a class definition");let t=wu.get(n);return t?(we(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,wu.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}sm.type="NONE";const Tu=sm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(n,t,e){return`firebase:${n}:${t}:${e}`}class Un{constructor(t,e,s){this.persistence=t,this.auth=e,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Gr(this.userKey,r.apiKey,i),this.fullPersistenceKey=Gr("persistence",r.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await fi(this.auth,{idToken:t}).catch(()=>{});return e?Yt._fromGetAccountInfoResponse(this.auth,e,t):null}return Yt._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,s="authUser"){if(!e.length)return new Un(ye(Tu),t,s);const r=(await Promise.all(e.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=r[0]||ye(Tu);const o=Gr(s,t.config.apiKey,t.name);let l=null;for(const c of e)try{const h=await c._get(o);if(h){let f;if(typeof h=="string"){const p=await fi(t,{idToken:h}).catch(()=>{});if(!p)break;f=await Yt._fromGetAccountInfoResponse(t,p,h)}else f=Yt._fromJSON(t,h);c!==i&&(l=f),i=c;break}}catch{}const u=r.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Un(i,t,s):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(e.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Un(i,t,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(om(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(rm(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(lm(t))return"Blackberry";if(um(t))return"Webos";if(im(t))return"Safari";if((t.includes("chrome/")||am(t))&&!t.includes("edge/"))return"Chrome";if(cm(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(e);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function rm(n=Lt()){return/firefox\//i.test(n)}function im(n=Lt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function am(n=Lt()){return/crios\//i.test(n)}function om(n=Lt()){return/iemobile/i.test(n)}function cm(n=Lt()){return/android/i.test(n)}function lm(n=Lt()){return/blackberry/i.test(n)}function um(n=Lt()){return/webos/i.test(n)}function Xo(n=Lt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mI(n=Lt()){var t;return Xo(n)&&!!((t=window.navigator)!=null&&t.standalone)}function pI(){return Fp()&&document.documentMode===10}function dm(n=Lt()){return Xo(n)||cm(n)||um(n)||lm(n)||/windows phone/i.test(n)||om(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hm(n,t=[]){let e;switch(n){case"Browser":e=Au(Lt());break;case"Worker":e=`${Au(Lt())}-${n}`;break;default:e=n}const s=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${ss}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const s=i=>new Promise((o,l)=>{try{const u=t(i);o(u)}catch(u){l(u)}});s.onAbort=e,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const s of this.queue)await s(t),s.onAbort&&e.push(s.onAbort)}catch(s){e.reverse();for(const r of e)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gI(n,t={}){return sn(n,"GET","/v2/passwordPolicy",nn(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI=6;class vI{constructor(t){var s;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??yI,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=t.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(e.meetsMinPasswordLength=t.length>=s),r&&(e.meetsMaxPasswordLength=t.length<=r)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let s;for(let r=0;r<t.length;r++)s=t.charAt(r),this.updatePasswordCharacterOptionsStatuses(e,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(t,e,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(t,e,s,r){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Su(this),this.idTokenSubscription=new Su(this),this.beforeStateQueue=new fI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Yh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=ye(e)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await Un.create(this,t),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await fi(this,{idToken:t}),s=await Yt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(s)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(Qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let s=e,r=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(t);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await gi(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Y_()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Qt(this.app))return Promise.reject(ve(this));const e=t?_t(t):null;return e&&H(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&H(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Qt(this.app)?Promise.reject(ve(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Qt(this.app)?Promise.reject(ve(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ye(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await gI(this),e=new vI(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Zs("auth","Firebase",t())}onAuthStateChanged(t,e,s){return this.registerStateListener(this.authStateSubscription,t,e,s)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,s){return this.registerStateListener(this.idTokenSubscription,t,e,s)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const s=this.onAuthStateChanged(()=>{s(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(s.tenantId=this.tenantId),await hI(this,s)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const s=await this.getOrInitRedirectPersistenceManager(e);return t===null?s.removeCurrentUser():s.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&ye(t)||this._popupRedirectResolver;H(e,this,"argument-error"),this.redirectPersistenceManager=await Un.create(this,[ye(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,s;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,s,r){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,s,r);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=hm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&K_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Sn(n){return _t(n)}class Su{constructor(t){this.auth=t,this.observer=null,this.addObserver=Kp(e=>this.observer=e)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function II(n){qi=n}function mm(n){return qi.loadJS(n)}function bI(){return qi.recaptchaEnterpriseScript}function EI(){return qi.gapiScript}function wI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class TI{constructor(){this.enterprise=new AI}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class AI{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const SI="recaptcha-enterprise",pm="NO_RECAPTCHA";class CI{constructor(t){this.type=SI,this.auth=Sn(t)}async verify(t="verify",e=!1){async function s(i){if(!e){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{rI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new sI(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function r(i,o,l){const u=window.grecaptcha;bu(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:t}).then(c=>{o(c)}).catch(()=>{o(pm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new TI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(l=>{if(!e&&bu(window.grecaptcha))r(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=bI();u.length!==0&&(u+=l),mm(u).then(()=>{r(l,i,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Cu(n,t,e,s=!1,r=!1){const i=new CI(n);let o;if(r)o=pm;else try{o=await i.verify(e)}catch{o=await i.verify(e,!0)}const l={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return s?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function so(n,t,e,s,r){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Cu(n,t,e,e==="getOobCode");return s(n,o)}else return s(n,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Cu(n,t,e,e==="getOobCode");return s(n,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(n,t){const e=lo(n,"auth");if(e.isInitialized()){const r=e.getImmediate(),i=e.getOptions();if(pn(i,t??{}))return r;te(r,"already-initialized")}return e.initialize({options:t})}function PI(n,t){const e=(t==null?void 0:t.persistence)||[],s=(Array.isArray(e)?e:[e]).map(ye);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(s,t==null?void 0:t.popupRedirectResolver)}function kI(n,t,e){const s=Sn(n);H(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const r=!1,i=fm(t),{host:o,port:l}=xI(t),u=l===null?"":`:${l}`,c={url:`${i}//${o}${u}/`},h=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){H(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),H(pn(c,s.config.emulator)&&pn(h,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=c,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,ns(o)?(sd(`${i}//${o}${u}`),rd("Auth",!0)):DI()}function fm(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function xI(n){const t=fm(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const s=e[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Ru(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Ru(o)}}}function Ru(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function DI(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return ge("not implemented")}_getIdTokenResponse(t){return ge("not implemented")}_linkToIdToken(t,e){return ge("not implemented")}_getReauthenticationResolver(t){return ge("not implemented")}}async function NI(n,t){return sn(n,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(n,t){return hr(n,"POST","/v1/accounts:signInWithPassword",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OI(n,t){return hr(n,"POST","/v1/accounts:signInWithEmailLink",nn(n,t))}async function VI(n,t){return hr(n,"POST","/v1/accounts:signInWithEmailLink",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs extends Zo{constructor(t,e,s,r=null){super("password",s),this._email=t,this._password=e,this._tenantId=r}static _fromEmailAndPassword(t,e){return new Qs(t,e,"password")}static _fromEmailAndCode(t,e,s=null){return new Qs(t,e,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return so(t,e,"signInWithPassword",LI);case"emailLink":return OI(t,{email:this._email,oobCode:this._password});default:te(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const s={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return so(t,s,"signUpPassword",NI);case"emailLink":return VI(t,{idToken:e,email:this._email,oobCode:this._password});default:te(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qn(n,t){return hr(n,"POST","/v1/accounts:signInWithIdp",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI="http://localhost";class _n extends Zo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new _n(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):te("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:s,signInMethod:r,...i}=e;if(!s||!r)return null;const o=new _n(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return qn(t,e)}_linkToIdToken(t,e){const s=this.buildRequest();return s.idToken=e,qn(t,s)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,qn(t,e)}buildRequest(){const t={requestUri:MI,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=tr(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $I(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function BI(n){const t=Rs(Ps(n)).link,e=t?Rs(Ps(t)).deep_link_id:null,s=Rs(Ps(n)).deep_link_id;return(s?Rs(Ps(s)).link:null)||s||e||t||n}class tc{constructor(t){const e=Rs(Ps(t)),s=e.apiKey??null,r=e.oobCode??null,i=$I(e.mode??null);H(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=BI(t);try{return new tc(e)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(){this.providerId=ls.PROVIDER_ID}static credential(t,e){return Qs._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const s=tc.parseLink(e);return H(s,"argument-error"),Qs._fromEmailAndCode(t,s.code,s.tenantId)}}ls.PROVIDER_ID="password";ls.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ls.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends gm{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends mr{constructor(){super("facebook.com")}static credential(t){return _n._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Oe.credentialFromTaggedObject(t)}static credentialFromError(t){return Oe.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Oe.credential(t.oauthAccessToken)}catch{return null}}}Oe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Oe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends mr{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return _n._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return Ve.credentialFromTaggedObject(t)}static credentialFromError(t){return Ve.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:s}=t;if(!e&&!s)return null;try{return Ve.credential(e,s)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me extends mr{constructor(){super("github.com")}static credential(t){return _n._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Me.credentialFromTaggedObject(t)}static credentialFromError(t){return Me.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Me.credential(t.oauthAccessToken)}catch{return null}}}Me.GITHUB_SIGN_IN_METHOD="github.com";Me.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e extends mr{constructor(){super("twitter.com")}static credential(t,e){return _n._fromParams({providerId:$e.PROVIDER_ID,signInMethod:$e.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return $e.credentialFromTaggedObject(t)}static credentialFromError(t){return $e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:s}=t;if(!e||!s)return null;try{return $e.credential(e,s)}catch{return null}}}$e.TWITTER_SIGN_IN_METHOD="twitter.com";$e.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(n,t){return hr(n,"POST","/v1/accounts:signUp",nn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,s,r=!1){const i=await Yt._fromIdTokenResponse(t,s,r),o=Pu(s);return new In({user:i,providerId:o,_tokenResponse:s,operationType:e})}static async _forOperation(t,e,s){await t._updateTokensIfNecessary(s,!0);const r=Pu(s);return new In({user:t,providerId:r,_tokenResponse:s,operationType:e})}}function Pu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi extends Se{constructor(t,e,s,r){super(e.code,e.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,yi.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(t,e,s,r){return new yi(t,e,s,r)}}function ym(n,t,e,s){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?yi._fromErrorAndOperation(n,i,t,s):i})}async function UI(n,t,e=!1){const s=await Ks(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return In._forOperation(n,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qI(n,t,e=!1){const{auth:s}=n;if(Qt(s.app))return Promise.reject(ve(s));const r="reauthenticate";try{const i=await Ks(n,ym(s,r,t,n),e);H(i.idToken,s,"internal-error");const o=Yo(i.idToken);H(o,s,"internal-error");const{sub:l}=o;return H(n.uid===l,s,"user-mismatch"),In._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&te(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vm(n,t,e=!1){if(Qt(n.app))return Promise.reject(ve(n));const s="signIn",r=await ym(n,s,t),i=await In._fromIdTokenResponse(n,s,r);return e||await n._updateCurrentUser(i.user),i}async function jI(n,t){return vm(Sn(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _m(n){const t=Sn(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Im(n,t,e){if(Qt(n.app))return Promise.reject(ve(n));const s=Sn(n),o=await so(s,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",FI).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&_m(n),u}),l=await In._fromIdTokenResponse(s,"signIn",o);return await s._updateCurrentUser(l.user),l}function zI(n,t,e){return Qt(n.app)?Promise.reject(ve(n)):jI(_t(n),ls.credential(t,e)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&_m(n),s})}function HI(n,t,e,s){return _t(n).onIdTokenChanged(t,e,s)}function WI(n,t,e){return _t(n).beforeAuthStateChanged(t,e)}function GI(n,t,e,s){return _t(n).onAuthStateChanged(t,e,s)}function KI(n){return _t(n).signOut()}const vi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(vi,"1"),this.storage.removeItem(vi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QI=1e3,JI=10;class Em extends bm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dm(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const s=this.storage.getItem(e),r=this.localCache[e];s!==r&&t(e,r,s)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const s=t.key;e?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!e&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);pI()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,JI):r()}notifyListeners(t,e){this.localCache[t]=e;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:s}),!0)})},QI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Em.type="LOCAL";const YI=Em;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm extends bm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}wm.type="SESSION";const Tm=wm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XI(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(r=>r.isListeningto(t));if(e)return e;const s=new ji(t);return this.receivers.push(s),s}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:s,eventType:r,data:i}=e.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const l=Array.from(o).map(async c=>c(e.origin,i)),u=await XI(l);e.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ji.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n="",t=10){let e="";for(let s=0;s<t;s++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const c=ec("",20);r.port1.start();const h=setTimeout(()=>{u(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const p=f;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(p.data.response);break;default:clearTimeout(h),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:c,data:e},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(){return window}function tb(n){ce().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Am(){return typeof ce().WorkerGlobalScope<"u"&&typeof ce().importScripts=="function"}async function eb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function nb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function sb(){return Am()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sm="firebaseLocalStorageDb",rb=1,_i="firebaseLocalStorage",Cm="fbase_key";class pr{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function zi(n,t){return n.transaction([_i],t?"readwrite":"readonly").objectStore(_i)}function ib(){const n=indexedDB.deleteDatabase(Sm);return new pr(n).toPromise()}function ro(){const n=indexedDB.open(Sm,rb);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(_i,{keyPath:Cm})}catch(r){e(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(_i)?t(s):(s.close(),await ib(),t(await ro()))})})}async function ku(n,t,e){const s=zi(n,!0).put({[Cm]:t,value:e});return new pr(s).toPromise()}async function ab(n,t){const e=zi(n,!1).get(t),s=await new pr(e).toPromise();return s===void 0?null:s.value}function xu(n,t){const e=zi(n,!0).delete(t);return new pr(e).toPromise()}const ob=800,cb=3;class Rm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ro(),this.db)}async _withRetries(t){let e=0;for(;;)try{const s=await this._openDb();return await t(s)}catch(s){if(e++>cb)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Am()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ji._getInstance(sb()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,s;if(this.activeServiceWorker=await eb(),!this.activeServiceWorker)return;this.sender=new ZI(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(s=t[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||nb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await ro();return await ku(t,vi,"1"),await xu(t,vi),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(s=>ku(s,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(s=>ab(s,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>xu(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(r=>{const i=zi(r,!1).getAll();return new pr(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],s=new Set;if(t.length!==0)for(const{fbase_key:r,value:i}of t)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),e.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),e.push(r));return e}notifyListeners(t,e){this.localCache[t]=e;const s=this.listeners[t];if(s)for(const r of Array.from(s))r(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ob)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Rm.type="LOCAL";const lb=Rm;new dr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(n,t){return t?ye(t):(H(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc extends Zo{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return qn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return qn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return qn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function db(n){return vm(n.auth,new nc(n),n.bypassAuthState)}function hb(n){const{auth:t,user:e}=n;return H(e,t,"internal-error"),qI(e,new nc(n),n.bypassAuthState)}async function mb(n){const{auth:t,user:e}=n;return H(e,t,"internal-error"),UI(e,new nc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(t,e,s,r,i=!1){this.auth=t,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:s,postBody:r,tenantId:i,error:o,type:l}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return db;case"linkViaPopup":case"linkViaRedirect":return mb;case"reauthViaPopup":case"reauthViaRedirect":return hb;default:te(this.auth,"internal-error")}}resolve(t){we(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){we(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=new dr(2e3,1e4);class Vn extends Pm{constructor(t,e,s,r,i){super(t,e,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Vn.currentPopupAction&&Vn.currentPopupAction.cancel(),Vn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return H(t,this.auth,"internal-error"),t}async onExecution(){we(this.filter.length===1,"Popup operations only handle one event");const t=ec();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(oe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(oe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Vn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,s;if((s=(e=this.authWindow)==null?void 0:e.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(oe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,pb.get())};t()}}Vn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fb="pendingRedirect",Kr=new Map;class gb extends Pm{constructor(t,e,s=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,s),this.eventId=null}async execute(){let t=Kr.get(this.auth._key());if(!t){try{const s=await yb(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(s)}catch(e){t=()=>Promise.reject(e)}Kr.set(this.auth._key(),t)}return this.bypassAuthState||Kr.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yb(n,t){const e=Ib(t),s=_b(n);if(!await s._isAvailable())return!1;const r=await s._get(e)==="true";return await s._remove(e),r}function vb(n,t){Kr.set(n._key(),t)}function _b(n){return ye(n._redirectPersistence)}function Ib(n){return Gr(fb,n.config.apiKey,n.name)}async function bb(n,t,e=!1){if(Qt(n.app))return Promise.reject(ve(n));const s=Sn(n),r=ub(s,t),o=await new gb(s,r,e).execute();return o&&!e&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eb=10*60*1e3;class wb{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(t,s)&&(e=!0,this.sendToConsumer(t,s),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!Tb(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var s;if(t.error&&!km(t)){const r=((s=t.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";e.onError(oe(this.auth,r))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const s=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&s}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=Eb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Du(t))}saveEventToCache(t){this.cachedEventUids.add(Du(t)),this.lastProcessedEventTime=Date.now()}}function Du(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function km({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function Tb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return km(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ab(n,t={}){return sn(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Cb=/^https?/;async function Rb(n){if(n.config.emulator)return;const{authorizedDomains:t}=await Ab(n);for(const e of t)try{if(Pb(e))return}catch{}te(n,"unauthorized-domain")}function Pb(n){const t=eo(),{protocol:e,hostname:s}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===s}if(!Cb.test(e))return!1;if(Sb.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb=new dr(3e4,6e4);function Nu(){const n=ce().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function xb(n){return new Promise((t,e)=>{var r,i,o;function s(){Nu(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Nu(),e(oe(n,"network-request-failed"))},timeout:kb.get()})}if((i=(r=ce().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=ce().gapi)!=null&&o.load)s();else{const l=wI("iframefcb");return ce()[l]=()=>{gapi.load?s():e(oe(n,"network-request-failed"))},mm(`${EI()}?onload=${l}`).catch(u=>e(u))}}).catch(t=>{throw Qr=null,t})}let Qr=null;function Db(n){return Qr=Qr||xb(n),Qr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb=new dr(5e3,15e3),Lb="__/auth/iframe",Ob="emulator/auth/iframe",Vb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Mb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $b(n){const t=n.config;H(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Jo(t,Ob):`https://${n.config.authDomain}/${Lb}`,s={apiKey:t.apiKey,appName:n.name,v:ss},r=Mb.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${e}?${tr(s).slice(1)}`}async function Bb(n){const t=await Db(n),e=ce().gapi;return H(e,n,"internal-error"),t.open({where:document.body,url:$b(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vb,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=oe(n,"network-request-failed"),l=ce().setTimeout(()=>{i(o)},Nb.get());function u(){ce().clearTimeout(l),r(s)}s.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ub=500,qb=600,jb="_blank",zb="http://localhost";class Lu{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Hb(n,t,e,s=Ub,r=qb){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const u={...Fb,width:s.toString(),height:r.toString(),top:i,left:o},c=Lt().toLowerCase();e&&(l=am(c)?jb:e),rm(c)&&(t=t||zb,u.scrollbars="yes");const h=Object.entries(u).reduce((p,[_,C])=>`${p}${_}=${C},`,"");if(mI(c)&&l!=="_self")return Wb(t||"",l),new Lu(null);const f=window.open(t||"",l,h);H(f,n,"popup-blocked");try{f.focus()}catch{}return new Lu(f)}function Wb(n,t){const e=document.createElement("a");e.href=n,e.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb="__/auth/handler",Kb="emulator/auth/handler",Qb=encodeURIComponent("fac");async function Ou(n,t,e,s,r,i){H(n.config.authDomain,n,"auth-domain-config-required"),H(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:s,v:ss,eventId:r};if(t instanceof gm){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",Gp(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(t instanceof mr){const h=t.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const u=await n._getAppCheckToken(),c=u?`#${Qb}=${encodeURIComponent(u)}`:"";return`${Jb(n)}?${tr(l).slice(1)}${c}`}function Jb({config:n}){return n.emulator?Jo(n,Kb):`https://${n.authDomain}/${Gb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca="webStorageSupport";class Yb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Tm,this._completeRedirectFn=bb,this._overrideRedirectResult=vb}async _openPopup(t,e,s,r){var o;we((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await Ou(t,e,s,eo(),r);return Hb(t,i,ec())}async _openRedirect(t,e,s,r){await this._originValidation(t);const i=await Ou(t,e,s,eo(),r);return tb(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:r,promise:i}=this.eventManagers[e];return r?Promise.resolve(r):(we(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(t);return this.eventManagers[e]={promise:s},s.catch(()=>{delete this.eventManagers[e]}),s}async initAndGetManager(t){const e=await Bb(t),s=new wb(t);return e.register("authEvent",r=>(H(r==null?void 0:r.authEvent,t,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:s},this.iframes[t._key()]=e,s}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Ca,{type:Ca},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[Ca];i!==void 0&&e(!!i),te(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=Rb(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return dm()||im()||Xo()}}const Xb=Yb;var Vu="@firebase/auth",Mu="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(s=>{t((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function eE(n){zn(new fn("auth",(t,{options:e})=>{const s=t.getProvider("app").getImmediate(),r=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=s.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:hm(n)},c=new _I(s,r,i,u);return PI(c,e),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,s)=>{t.getProvider("auth-internal").initialize()})),zn(new fn("auth-internal",t=>{const e=Sn(t.getProvider("auth").getImmediate());return(s=>new Zb(s))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),je(Vu,Mu,tE(n)),je(Vu,Mu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE=5*60,sE=nd("authIdTokenMaxAge")||nE;let $u=null;const rE=n=>async t=>{const e=t&&await t.getIdTokenResult(),s=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(s&&s>sE)return;const r=e==null?void 0:e.token;$u!==r&&($u=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function iE(n=cd()){const t=lo(n,"auth");if(t.isInitialized())return t.getImmediate();const e=RI(n,{popupRedirectResolver:Xb,persistence:[lb,YI,Tm]}),s=nd("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=rE(i.toString());WI(e,o,()=>o(e.currentUser)),HI(e,l=>o(l))}}const r=td("auth");return r&&kI(e,`http://${r}`),e}function aE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}II({loadJS(n){return new Promise((t,e)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=t,s.onerror=r=>{const i=oe("internal-error");i.customData=r,e(i)},s.type="text/javascript",s.charset="UTF-8",aE().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});eE("Browser");const xm="https://tnfl2-cb6ea45c64b3.herokuapp.com/services",Hi="liquor_api_token",bn="liquor_api_creds";let le=null,Jt=[],fr=!1;function Dm(){if(le)return!0;const n=localStorage.getItem(Hi);return n?(le=n,fr=!0,!0):!1}async function io(){if(le||Dm())return!0;const n=localStorage.getItem(bn);if(n)try{const{email:t,password:e}=JSON.parse(n);return await sc(t,e)}catch(t){console.warn("Failed to restore liquor credentials:",t)}return!1}async function sc(n,t){try{const e=await fetch(`${xm}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:t})});return e.ok?(le=(await e.json()).accessToken,fr=!0,localStorage.setItem(Hi,le),localStorage.setItem(bn,JSON.stringify({email:n,password:t})),console.log("Liquor API authenticated successfully"),!0):(console.warn("Liquor API auth failed:",e.status),!1)}catch(e){return console.warn("Liquor API auth error:",e.message),!1}}async function jn(n=!1){if(console.log("LiquorApi.fetchProducts called, background:",n),!le&&!await io())return console.warn("No liquor token available, cannot fetch products"),[];try{const t=await fetch(`${xm}/productmaster`,{method:"GET",headers:{Authorization:`Bearer ${le}`,"Content-Type":"application/json"}});if(t.status===401||t.status===403)return console.warn("Liquor token expired, re-authenticating..."),le=null,localStorage.removeItem(Hi),await io()?await jn(n):[];if(!t.ok)return console.warn("Liquor products fetch failed:",t.status),[];Jt=((await t.json()).productList||[]).map((i,o)=>({id:`liquor_${o}_${i.SKU}`,name:i.SKU,category:"LIQUOR",sellingPrice:i.salePrice||0,purchasePrice:i.purchasePrice||0,profitAmount:i.profitAmount||0,currentStock:i.stock||0,openingStock:i.openingStock||0,purchaseStock:i.purchaseStock||0,sku:i.SKU,brand:i.brand,upc:i.UPC,code:i.UPC,incentivePercent:0,active:!0,isLiquor:!0}));const r=localStorage.getItem(bn)?JSON.parse(localStorage.getItem(bn)).email:"default";return localStorage.setItem(`cached_liquor_products_${r}`,JSON.stringify(Jt)),localStorage.setItem(`cached_liquor_timestamp_${r}`,Date.now().toString()),console.log(`Loaded ${Jt.length} liquor products from API`),n&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("liquor-data-refreshed",{detail:Jt})),Jt}catch(t){return console.warn("Liquor products fetch error:",t.message),[]}}async function oE(n,t){return await sc(n,t)&&await jn(),fr}async function cE(){if(Jt.length>0)return jn(!0),!0;const n=localStorage.getItem(bn);let t="default";if(n)try{t=JSON.parse(n).email}catch{}const e=localStorage.getItem(`cached_liquor_products_${t}`);if(e)try{return Jt=JSON.parse(e),console.log(`Restored ${Jt.length} liquor products from local cache`),jn(!0),!0}catch(r){console.warn("Failed to parse cached liquor products",r)}return await io()?(await jn(),Jt.length>0):!1}function lE(){return Jt}function uE(){return fr||Dm()}function dE(){return le}function hE(){const n=localStorage.getItem(bn);if(n)try{const t=JSON.parse(n).email;localStorage.removeItem(`cached_liquor_products_${t}`),localStorage.removeItem(`cached_liquor_timestamp_${t}`)}catch{}le=null,Jt=[],fr=!1,localStorage.removeItem(Hi),localStorage.removeItem(bn)}const Xn={initialize:oE,authenticate:sc,fetchProducts:jn,ensureReady:cE,getProducts:lE,isEnabled:uE,getToken:dE,reset:hE},gr=iE();let dt=null,Ft=null;async function mE(n,t){const e=await zI(gr,n,t),s=await Yn(he(Ut,"users",e.user.uid));if(!s.exists())throw new Error("User profile not found. Please register first.");dt={uid:e.user.uid,...s.data()};const r=await Yn(he(Ut,"accounts",dt.accountId));if(!r.exists())throw new Error("Account not found.");return Ft={id:dt.accountId,...r.data()},Ft.isLiquorEnabled&&await Xn.initialize(n,t),dt}async function pE(n,t,e,s){const r=await Im(gr,t,e),i=r.user.uid;return await Gs(he(Ut,"accounts",i),{name:s,ownerId:r.user.uid,createdAt:new Date().toISOString()}),await Gs(he(Ut,"users",r.user.uid),{name:n,email:t,role:"admin",accountId:i,active:!0,createdAt:new Date().toISOString()}),dt={uid:r.user.uid,name:n,email:t,role:"admin",accountId:i,active:!0},Ft={id:i,name:s},dt}async function fE(n,t,e,s){const r=await Yn(he(Ut,"accounts",s));if(!r.exists())throw new Error("Invalid restaurant join code. Please check with your admin.");const i=await Im(gr,t,e);return await Gs(he(Ut,"users",i.user.uid),{name:n,email:t,role:"salesman",accountId:s,active:!0,createdAt:new Date().toISOString()}),dt={uid:i.user.uid,name:n,email:t,role:"salesman",accountId:s,active:!0},Ft={id:s,...r.data()},dt}async function gE(){await KI(gr),dt=null,Ft=null,Xn.reset()}function yE(){return dt}function vE(){return Ft}function _E(){return(Ft==null?void 0:Ft.id)||null}function IE(){return(dt==null?void 0:dt.role)||null}function bE(){return(dt==null?void 0:dt.role)==="admin"}function EE(n){return GI(gr,async t=>{if(t)try{const e=await Yn(he(Ut,"users",t.uid));if(e.exists()){dt={uid:t.uid,...e.data()};const s=await Yn(he(Ut,"accounts",dt.accountId));s.exists()&&(Ft={id:dt.accountId,...s.data()},Ft.isLiquorEnabled&&await Xn.ensureReady())}else dt=null,Ft=null}catch(e){console.error("Error loading user profile:",e),dt=null,Ft=null}else dt=null,Ft=null;n(dt)})}const nt={login:mE,registerAdmin:pE,registerSalesman:fE,logout:gE,getCurrentUser:yE,getCurrentAccount:vE,getAccountId:_E,getUserRole:IE,isAdmin:bE,onAuthChange:EE},Ii=new Map;function dn(n,t,e=""){Ii.set(n.toLowerCase(),{handler:t,description:e})}function Ra(n){Ii.delete(n.toLowerCase())}function wE(n){const t=[];(n.ctrlKey||n.metaKey)&&t.push("ctrl"),n.altKey&&t.push("alt"),n.shiftKey&&t.push("shift");let e=n.key;return e===" "&&(e="space"),e=e.toLowerCase(),t.push(e),t.join("+")}function TE(n){if(n.key==="Escape"){const s=document.getElementById("modal-overlay");if(s&&!s.classList.contains("hidden")){s.classList.add("hidden"),document.getElementById("modal-content").innerHTML="",n.preventDefault(),n.stopPropagation();return}}const t=wE(n),e=Ii.get(t);if(e){n.preventDefault(),n.stopPropagation(),e.handler(n);return}if(["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12"].includes(n.key.toLowerCase())){const s=n.key.toLowerCase(),r=Ii.get(s);r&&(n.preventDefault(),n.stopPropagation(),r.handler(n))}}document.addEventListener("keydown",TE);const Nm="kot-theme",AE={dark:"Dark",light:"Light",ocean:"Ocean",forest:"Forest",crimson:"Crimson",amber:"Amber"};function SE(){return localStorage.getItem(Nm)||"dark"}function Bu(n){n==="dark"?document.documentElement.removeAttribute("data-theme"):document.documentElement.setAttribute("data-theme",n);const t=document.getElementById("current-theme-label");t&&(t.textContent=AE[n]||"Dark"),document.querySelectorAll(".theme-option").forEach(e=>{e.classList.toggle("active",e.dataset.theme===n)}),localStorage.setItem(Nm,n)}function CE(){const n=SE();Bu(n);const t=document.getElementById("theme-picker-btn"),e=document.getElementById("theme-picker-dropdown");t&&e&&(t.addEventListener("click",s=>{s.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",s=>{!e.contains(s.target)&&s.target!==t&&e.classList.remove("open")}),e.querySelectorAll(".theme-option").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.theme;Bu(r),e.classList.remove("open")})}))}function L(n){return"₹"+Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}function $t(n){return n?new Date(n).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"—"}function bi(n){if(!n)return"—";const t=new Date(n);return t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+" "+t.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}function Lm(n){return n?new Date(n).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"—"}function us(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function RE(n){if(!n)return!1;const t=new Date(n),e=new Date;return t.getDate()===e.getDate()&&t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()}function $(n,t="info",e=3e3){const s=document.getElementById("toast-container"),r=document.createElement("div");r.className=`toast toast-${t}`,r.innerHTML=`
    <span class="material-symbols-outlined">${t==="success"?"check_circle":t==="error"?"error":t==="warning"?"warning":"info"}</span>
    <span>${n}</span>
  `,s.appendChild(r),setTimeout(()=>{r.classList.add("toast-out"),setTimeout(()=>r.remove(),300)},e)}function qt(n,t,e={}){const s=document.getElementById("modal-overlay"),r=document.getElementById("modal-container"),i=document.getElementById("modal-content");return e.large?r.classList.add("modal-lg"):r.classList.remove("modal-lg"),i.innerHTML=`
    <div class="modal-header">
      <h2 class="modal-title">${n}</h2>
      <button class="modal-close" id="modal-close-btn" title="Close (Esc)">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">${t}</div>
    ${e.footer?`<div class="modal-footer">${e.footer}</div>`:""}
  `,s.classList.remove("hidden"),document.getElementById("modal-close-btn").addEventListener("click",Kt),s.addEventListener("click",l=>{l.target===s&&Kt()}),setTimeout(()=>{const l=i.querySelector("input, select, textarea");l&&l.focus()},100),i}function Kt(){document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-content").innerHTML=""}function Rt(n,t="roll"){const e=document.getElementById("print-container");t==="a4"?e.classList.add("print-a4"):e.classList.remove("print-a4"),e.innerHTML=n,window.print(),setTimeout(()=>{e.innerHTML="",e.classList.remove("print-a4")},1e3)}function Js(n,t,e){const s=n.items.map(r=>`
    <tr>
      <td class="item-name">${r.itemName}</td>
      <td class="item-qty">${r.quantity}</td>
    </tr>
  `).join("");return`
    <div class="print-header">
      <h2>KITCHEN ORDER</h2>
    </div>
    <div class="print-kot-title">KOT #${n.orderNumber}</div>
    <div class="print-meta">
      <div><span>Table:</span><span><strong>${e}</strong></span></div>
      <div><span>Time:</span><span>${Lm(n.createdAt)}</span></div>
      ${t?`<div><span>Waiter:</span><span>${t}</span></div>`:""}
    </div>
    <table class="print-kot-items">${s}</table>
    <div class="print-footer">
      <p>--- Kitchen Copy ---</p>
    </div>
  `}function Ys(n,t,e,s){const r=s.map(i=>`
    <tr>
      <td class="item-name">${i.itemName}</td>
      <td class="item-qty">${i.quantity}</td>
    </tr>
  `).join("");return`
    <div class="print-header">
      <h2>LIQUOR / COUNTER</h2>
    </div>
    <div class="print-kot-title">KOT #${n.orderNumber}</div>
    <div class="print-meta">
      <div><span>Table:</span><span><strong>${e}</strong></span></div>
      <div><span>Time:</span><span>${Lm(n.createdAt)}</span></div>
      ${t?`<div><span>Waiter:</span><span>${t}</span></div>`:""}
    </div>
    <table class="print-kot-items">${r}</table>
    <div class="print-footer">
      <p>--- Liquor/Counter Copy ---</p>
    </div>
  `}function rc(n,t,e){const s=n.items.map((r,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${r.itemName}</td>
      <td style="text-align:center">${r.quantity}</td>
      <td style="text-align:right">${L(r.price)}</td>
      <td style="text-align:right">${L(r.amount)}</td>
    </tr>
  `).join("");return`
    <div class="print-header">
      <h2>RESTAURANT</h2>
      <p>Thank you for dining with us!</p>
    </div>
    <div class="print-title">BILL</div>
    <div class="print-meta">
      <div><span>Bill No:</span><span>${n.orderNumber}</span></div>
      <div><span>Table:</span><span>${e}</span></div>
      <div><span>Date:</span><span>${bi(n.billedAt||n.createdAt)}</span></div>
      ${t?`<div><span>Waiter:</span><span>${t}</span></div>`:""}
    </div>
    <table class="print-items">
      <thead>
        <tr><th>#</th><th>Item</th><th>Qty</th><th>Rate</th><th>Amt</th></tr>
      </thead>
      <tbody>${s}</tbody>
    </table>
    <div class="print-total">
      <div><span>Sub Total:</span><span>${L(n.subTotal||n.totalAmount)}</span></div>
      ${n.acCharge?`<div><span>AC Charge (10%):</span><span>${L(n.acCharge)}</span></div>`:""}
      <div class="grand-total"><span>TOTAL:</span><span>${L(n.totalAmount)}</span></div>
    </div>
    <div class="print-footer">
      <p>Thank you! Visit Again!</p>
    </div>
  `}function PE(n,t){const e=$t(t),s=Object.values(n.items).filter(r=>r.incentiveAmount>0).map(r=>`
    <tr>
      <td>${r.name}</td>
      <td style="text-align:center">${r.quantity}</td>
      <td style="text-align:right">${r.incentivePercent}%</td>
      <td style="text-align:right">${L(r.incentiveAmount)}</td>
    </tr>
  `).join("");return`
    <div class="print-header">
      <h2>WAITER INCENTIVE</h2>
      <p>Daily Earnings Report</p>
    </div>
    <div class="print-title">${n.name}</div>
    <div class="print-meta">
      <div><span>Date:</span><span>${e}</span></div>
      <div><span>Total Sales:</span><span>${L(n.totalSales)}</span></div>
    </div>
    <table class="print-items">
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Inc%</th><th>Amount</th></tr>
      </thead>
      <tbody>${s}</tbody>
    </table>
    <div class="print-total">
      <div><span>Total Sales:</span><span>${L(n.totalSales)}</span></div>
      <div class="grand-total"><span>INCENTIVE EARNED:</span><span>${L(n.totalIncentive)}</span></div>
    </div>
    <div class="print-footer">
      <p>--- Waiter Copy ---</p>
    </div>
  `}function kE(n){const t=new Date,e=t.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})+" "+t.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),s=n.map(r=>`
    <tr>
      <td>${r.name}</td>
      <td style="text-align:center;">${r.currentStock||0} ${r.unit}</td>
      <td style="text-align:right;">${r.currentStock||0} ${r.unit}</td>
      <td style="text-align:right;">______________</td>
    </tr>
  `).join("");return`
    <div class="print-header">
      <h2>STOCK CHECKLIST</h2>
    </div>
    <div class="print-meta" style="margin-bottom: 20px;">
      <div><span>Date:</span><span>${e}</span></div>
    </div>
    <table class="print-items" style="width:100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="width:40%; text-align: left;">Item</th>
          <th style="text-align:center;width:20%">System Stock</th>
          <th style="text-align:right;width:20%">Opening Stock</th>
          <th style="text-align:right;width:20%">Closing Actual</th>
        </tr>
      </thead>
      <tbody>${s}</tbody>
    </table>
    <div style="margin-top:20px; font-weight:normal;">
      <b>Instructions:</b> Opening stock is prefilled from system records. Write down the Closing Actual stock for cross-checking.
    </div>
    <div class="print-footer">
      <p>--- End of Checklist ---</p>
    </div>
  `}function En(n){const t=["LIQUOR","COOL DRINKS","CIGARETTE","CIGARATE","CIGARETTES"],e=(n.category||"").toUpperCase().trim();return t.includes(e)}let B={supplierId:null,tableId:null,items:[],editingOrderId:null},Te=[],Ae=[],Nt=[];function xE(){B={supplierId:null,tableId:null,items:[],editingOrderId:null}}function _e(){const n=B.items.reduce((e,s)=>e+s.amount,0);let t=0;if(B.tableId){const e=Ae.find(s=>s.id===B.tableId);e&&e.name.trim().toUpperCase().startsWith("AC")&&(t=n*.1)}return{subTotal:n,acCharge:t,totalAmount:n+t}}async function DE(n){Te.length===0&&(Te=(await x.getAll("suppliers")).filter(e=>e.active)),Ae.length===0&&(Ae=(await x.getAll("tables")).filter(e=>e.active)),Nt.length===0&&(Nt=(await x.getAll("items")).filter(e=>e.active));const t=nt.getCurrentAccount();if(t!=null&&t.isLiquorEnabled)try{console.log("Liquor enabled, ensuring ready..."),await Xn.ensureReady();const e=Xn.getProducts();console.log(`Adding ${e.length} liquor items to menu`),e.length>0&&(Nt=[...Nt,...e])}catch(e){console.error("Error loading liquor products:",e)}n.innerHTML=`
    <div class="order-layout">
      <!-- Left Panel: Order Entry -->
      <div class="order-entry-panel">
        <div class="view-header" style="margin-bottom:12px">
          <div class="view-header-left">
            <span class="material-symbols-outlined view-header-icon">receipt_long</span>
            <div>
              <h2 class="view-title" id="order-view-title">New Order</h2>
              <p class="view-subtitle" id="order-view-subtitle">Keyboard-driven order entry</p>
            </div>
          </div>
          <div style="display:flex;gap:6px">
            ${nt.isAdmin()?`<button class="btn btn-ghost" id="btn-completed-bills" title="Completed Bills">
              <span class="material-symbols-outlined">receipt_long</span> Completed Bills
            </button>`:""}
            ${t!=null&&t.isLiquorEnabled?`<button class="btn btn-ghost" id="btn-sync-liquor" title="Sync Liquor from API">
              <span class="material-symbols-outlined">sync</span> Sync Liquor
            </button>`:""}
            <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
              <span class="material-symbols-outlined">restart_alt</span> Clear
            </button>
          </div>
        </div>

        <!-- Table & Waiter Selection -->
        <div class="order-meta-row">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Table</label>
            <div class="search-container">
              <span class="material-symbols-outlined">table_restaurant</span>
              <input type="text" class="form-input" id="table-search" placeholder="Search table..." autocomplete="off">
              <div class="search-dropdown" id="table-dropdown"></div>
            </div>
            <input type="hidden" id="table-id-input">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Waiter</label>
            <div class="search-container">
              <span class="material-symbols-outlined">badge</span>
              <input type="text" class="form-input" id="supplier-search" placeholder="Search waiter..." autocomplete="off">
              <div class="search-dropdown" id="supplier-dropdown"></div>
            </div>
            <input type="hidden" id="supplier-id-input">
          </div>
        </div>

        <!-- Item Search -->
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Add Item <span class="text-muted" style="text-transform:none;font-weight:400">(Type to search, Enter to add)</span></label>
          <div style="display:flex;gap:10px">
            <div class="search-container" style="flex:1">
              <span class="material-symbols-outlined">search</span>
              <input type="text" class="form-input form-input-lg" id="item-search" placeholder="Type item name..." autocomplete="off">
              <div class="search-dropdown" id="item-dropdown"></div>
            </div>
            <div style="width:90px">
              <input type="number" class="form-input form-input-lg" id="item-qty" value="1" min="1" placeholder="Qty" style="text-align:center;font-family:'JetBrains Mono',monospace">
            </div>
          </div>
        </div>

        <!-- Order Items Table -->
        <div class="order-items-container">
          <div class="order-items-table-wrapper">
            <table class="order-items-table">
              <thead>
                <tr>
                  <th style="width:30px">#</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th class="text-center" style="width:80px">Qty</th>
                  <th class="text-right" style="width:100px">Rate</th>
                  <th class="text-right" style="width:110px">Amount</th>
                  <th style="width:40px"></th>
                </tr>
              </thead>
              <tbody id="order-items-body">
                <tr>
                  <td colspan="7">
                    <div class="empty-state" style="padding:40px">
                      <span class="material-symbols-outlined">add_shopping_cart</span>
                      <p>No items added yet. Start typing to search items.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Panel: Order Summary -->
      <div class="order-summary-panel">
        <div class="order-summary-header">
          <span class="material-symbols-outlined">summarize</span>
          <h3>Order Summary</h3>
        </div>
        <div class="order-summary-body">
          <div class="summary-row">
            <span class="summary-label">Table</span>
            <span class="summary-value" id="summary-table">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Waiter</span>
            <span class="summary-value" id="summary-supplier">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Items</span>
            <span class="summary-value" id="summary-items-count">0</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Total Quantity</span>
            <span class="summary-value" id="summary-total-qty">0</span>
          </div>
          <div class="summary-row" id="summary-ac-row" style="display:none">
            <span class="summary-label">AC Charge (10%)</span>
            <span class="summary-value" id="summary-ac-charge">${L(0)}</span>
          </div>
          <div class="summary-row total">
            <span class="summary-label" style="font-size:1rem;font-weight:600;color:var(--text-primary)">Total Amount</span>
            <span class="summary-value total-amount" id="summary-total-amount">${L(0)}</span>
          </div>
        </div>
        <div class="order-summary-actions">
          <button class="btn btn-warning btn-lg" id="btn-kot" title="Print Kitchen Order Ticket (F1)">
            <span class="material-symbols-outlined">print</span> Print KOT (F1)
          </button>
          <button class="btn btn-success btn-lg" id="btn-bill" title="Generate Direct Bill (F2)">
            <span class="material-symbols-outlined">receipt</span> Direct Bill (F2)
          </button>
          <button class="btn btn-secondary" id="btn-save-order" title="KOT & Complete — Print KOT only, mark as completed (F3)">
            <span class="material-symbols-outlined">done_all</span> KOT & Complete (F3)
          </button>
        </div>
      </div>
    </div>
  `,NE(),OE(),setTimeout(()=>{var e;(e=document.getElementById("table-search"))==null||e.focus()},200)}function NE(){var n,t,e,s,r,i;Fu("table-search","table-dropdown","table-id-input",Ae,o=>o.name,o=>o.id,o=>{B.tableId=o.id,document.getElementById("summary-table").textContent=o.name,ME(o.id)},"supplier-search",o=>`<div>${o.name}</div>`),Fu("supplier-search","supplier-dropdown","supplier-id-input",Te,o=>o.name,o=>o.id,o=>{B.supplierId=o.id,document.getElementById("summary-supplier").textContent=o.name},"item-search",o=>`${o.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${o.code}</code>`:""}${o.name}`,(o,l)=>o.name.toLowerCase().includes(l)||(o.code||"").toLowerCase().includes(l)),LE(),(n=document.getElementById("btn-clear-order"))==null||n.addEventListener("click",()=>{es(),$("Order cleared","info")}),(t=document.getElementById("btn-completed-bills"))==null||t.addEventListener("click",()=>$E()),(e=document.getElementById("btn-sync-liquor"))==null||e.addEventListener("click",VE),(s=document.getElementById("btn-kot"))==null||s.addEventListener("click",Om),(r=document.getElementById("btn-bill"))==null||r.addEventListener("click",Vm),(i=document.getElementById("btn-save-order"))==null||i.addEventListener("click",Mm),window._liquorRefreshHandler||(window._liquorRefreshHandler=o=>{const l=o.detail;if(!l||!Array.isArray(l))return;Nt=[...Nt.filter(c=>!c.isLiquor),...l],console.log(`Menu items updated with ${l.length} fresh liquor products`)},window.addEventListener("liquor-data-refreshed",window._liquorRefreshHandler))}function Fu(n,t,e,s,r,i,o,l,u,c){const h=document.getElementById(n),f=document.getElementById(t),p=document.getElementById(e);let _=-1;if(!h||!f)return;h.addEventListener("input",()=>{const S=h.value.toLowerCase().trim(),N=c?s.filter(O=>c(O,S)):s.filter(O=>r(O).toLowerCase().includes(S));_=-1,C(N)}),h.addEventListener("focus",()=>{const S=h.value.toLowerCase().trim(),N=c?s.filter(O=>c(O,S)):s.filter(O=>r(O).toLowerCase().includes(S));C(N)}),h.addEventListener("blur",()=>{setTimeout(()=>{f.classList.remove("visible")},200)}),h.addEventListener("keydown",S=>{var O;const N=f.querySelectorAll(".search-dropdown-item");if(S.key==="ArrowDown")S.preventDefault(),_=Math.min(_+1,N.length-1),A(N);else if(S.key==="ArrowUp")S.preventDefault(),_=Math.max(_-1,0),A(N);else if(S.key==="Enter"){S.preventDefault();const U=_>=0?_:0;N[U]&&N[U].click()}else S.key==="Tab"&&(S.preventDefault(),f.classList.remove("visible"),l&&((O=document.getElementById(l))==null||O.focus()))});function C(S){S.length===0?f.innerHTML='<div class="search-no-results">No results found</div>':f.innerHTML=S.map((N,O)=>`<div class="search-dropdown-item" data-idx="${O}" data-value="${i(N)}">${u?u(N):r(N)}</div>`).join(""),f.classList.add("visible"),f.querySelectorAll(".search-dropdown-item").forEach((N,O)=>{N.addEventListener("click",()=>{var tt;const U=S[O];h.value=r(U),p.value=i(U),f.classList.remove("visible"),o(U),l&&((tt=document.getElementById(l))==null||tt.focus())})})}function A(S){S.forEach((N,O)=>{N.classList.toggle("highlighted",O===_)}),S[_]&&S[_].scrollIntoView({block:"nearest"})}}function LE(){const n=document.getElementById("item-search"),t=document.getElementById("item-dropdown"),e=document.getElementById("item-qty");let s=-1,r=[];if(!n||!t)return;function i(c){return c.filter(h=>!h.isLiquor||(h.currentStock||0)>0)}n.addEventListener("input",()=>{const c=n.value.toLowerCase().trim();if(c.length===0){const h=Nt.filter(p=>!p.isLiquor).slice(0,10),f=Nt.filter(p=>p.isLiquor&&(p.currentStock||0)>0).slice(0,10);r=[...h,...f]}else if(r=i(Nt).filter(h=>h.name.toLowerCase().includes(c)||(h.category||"").toLowerCase().includes(c)||(h.brand||"").toLowerCase().includes(c)||(h.code||"").toLowerCase().includes(c)||(h.barcode||"").toLowerCase().includes(c)).sort((h,f)=>{const p=String(h.code||""),_=String(f.code||"");if(p.toLowerCase()===c&&_.toLowerCase()!==c)return-1;if(_.toLowerCase()===c&&p.toLowerCase()!==c)return 1;if(p&&_){const C=parseInt(p),A=parseInt(_);return!isNaN(C)&&!isNaN(A)?C-A:p.localeCompare(_,void 0,{numeric:!0})}return p?-1:_?1:h.name.localeCompare(f.name)}),c.length>=8){const h=Nt.find(f=>(f.code||"").toLowerCase()===c||(f.barcode||"").toLowerCase()===c);if(h){r.includes(h)||(r=[h,...r]);const f=r.indexOf(h);n.dataset.selectedIdx=f,t.classList.remove("visible");const p=document.getElementById("item-qty");p==null||p.focus(),p==null||p.select(),console.log(`Barcode match found: ${h.name}`)}}s=r.length>0?0:-1,o()}),n.addEventListener("focus",()=>{const c=n.value.toLowerCase().trim();if(c.length===0){const h=Nt.filter(p=>!p.isLiquor).slice(0,10),f=Nt.filter(p=>p.isLiquor&&(p.currentStock||0)>0).slice(0,10);r=[...h,...f]}else r=i(Nt).filter(h=>h.name.toLowerCase().includes(c)||(h.category||"").toLowerCase().includes(c)||(h.brand||"").toLowerCase().includes(c)||(h.code||"").toLowerCase().includes(c)||(h.barcode||"").toLowerCase().includes(c)).sort((h,f)=>{const p=String(h.code||""),_=String(f.code||"");if(p.toLowerCase()===c&&_.toLowerCase()!==c)return-1;if(_.toLowerCase()===c&&p.toLowerCase()!==c)return 1;if(p&&_){const C=parseInt(p),A=parseInt(_);return!isNaN(C)&&!isNaN(A)?C-A:p.localeCompare(_,void 0,{numeric:!0})}return p?-1:_?1:h.name.localeCompare(f.name)});s=r.length>0?0:-1,o()}),n.addEventListener("blur",()=>{setTimeout(()=>{t.classList.remove("visible")},200)}),n.addEventListener("keydown",c=>{const h=t.querySelectorAll(".search-dropdown-item");if(c.key==="ArrowDown")c.preventDefault(),s=Math.min(s+1,h.length-1),l(h);else if(c.key==="ArrowUp")c.preventDefault(),s=Math.max(s-1,0),l(h);else if(c.key==="Enter"){c.preventDefault();const f=s>=0?s:0;if(r[f]){const p=document.getElementById("item-qty");n.dataset.selectedIdx=f,t.classList.remove("visible"),p==null||p.focus(),p==null||p.select()}}else c.key==="Tab"&&(c.preventDefault(),e.focus(),e.select())}),e.addEventListener("keydown",c=>{if(c.key==="Enter"){c.preventDefault();const h=parseInt(n.dataset.selectedIdx);!isNaN(h)&&r[h]?u(r[h]):s>=0&&r[s]?u(r[s]):($("Please select an item first","warning"),n.focus())}else(c.key==="Tab"&&c.shiftKey||c.key==="Tab"&&!c.shiftKey)&&(c.preventDefault(),n.focus())});function o(){r.length===0?t.innerHTML='<div class="search-no-results">No items found</div>':t.innerHTML=r.map((c,h)=>`<div class="search-dropdown-item ${h===s?"highlighted":""}" data-idx="${h}">
          <div style="flex:1">
            ${c.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.7rem;font-weight:700;margin-right:4px">${c.code}</code>`:""}
            ${c.barcode?`<span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-muted);margin-right:8px">[${c.barcode}]</span>`:""}
            <span style="font-weight:600">${c.name}</span>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              ${c.category} ${c.brand?`• ${c.brand}`:""}
              ${c.isLiquor?`<span class="status-badge" style="background:#7c3aed20;color:#7c3aed;font-size:0.6rem;padding:1px 4px;margin-left:4px">🍺 LIQUOR</span>
              <span style="margin-left:8px">Stock: <strong>${c.currentStock||0}</strong></span>`:""}
            </div>
          </div>
          <span class="item-price">${L(c.sellingPrice)}</span>
        </div>`).join(""),t.classList.add("visible"),t.querySelectorAll(".search-dropdown-item").forEach((c,h)=>{c.addEventListener("click",()=>{u(r[h])})})}function l(c){c.forEach((h,f)=>{h.classList.toggle("highlighted",f===s)}),c[s]&&c[s].scrollIntoView({block:"nearest"})}function u(c){var p,_;if(!B.tableId){$("Please select a Table first","warning"),(p=document.getElementById("table-search"))==null||p.focus();return}if(!B.supplierId){$("Please select a Waiter first","warning"),(_=document.getElementById("supplier-search"))==null||_.focus();return}const h=parseInt(e.value)||1;if(h<=0){$("Quantity must be at least 1","warning"),e.focus(),e.select();return}const f=B.items.find(C=>C.itemId===c.id);f?(f.quantity+=h,f.amount=f.quantity*f.price):B.items.push({itemId:c.id,itemName:c.name,category:c.category,quantity:h,price:c.sellingPrice,amount:h*c.sellingPrice,incentivePercent:c.incentivePercent||0,kotPrintedQty:0}),Zn(),ts(),n.value="",n.dataset.selectedIdx="",e.value="1",t.classList.remove("visible"),n.focus(),$(`${c.name} × ${h} added`,"success",1500)}}function Zn(){const n=document.getElementById("order-items-body");if(n){if(B.items.length===0){n.innerHTML=`
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;return}n.innerHTML=B.items.map((t,e)=>`
    <tr>
      <td class="text-muted">${e+1}</td>
      <td><strong>${t.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${t.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${e}" value="${t.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${L(t.price)}</td>
      <td class="text-right amount font-mono">${L(t.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${e}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),n.querySelectorAll(".qty-input").forEach(t=>{t.addEventListener("change",e=>{const s=parseInt(e.target.dataset.index),r=parseInt(e.target.value)||1;B.items[s].quantity=r,B.items[s].amount=r*B.items[s].price,Zn(),ts()}),t.addEventListener("keydown",e=>{var s;e.key==="Enter"&&(e.preventDefault(),(s=document.getElementById("item-search"))==null||s.focus())})}),n.querySelectorAll(".remove-btn").forEach(t=>{t.addEventListener("click",()=>{const e=parseInt(t.dataset.index),s=B.items.splice(e,1)[0];Zn(),ts(),$(`${s.itemName} removed`,"warning",1500)})})}}function ts(){const n=_e(),t=B.items.reduce((r,i)=>r+i.quantity,0),e=r=>document.getElementById(r);e("summary-items-count")&&(e("summary-items-count").textContent=B.items.length),e("summary-total-qty")&&(e("summary-total-qty").textContent=t);const s=e("summary-ac-row");s&&(n.acCharge>0?(s.style.display="",e("summary-ac-charge")&&(e("summary-ac-charge").textContent=L(n.acCharge))):(s.style.display="none",e("summary-ac-charge")&&(e("summary-ac-charge").textContent=L(0)))),e("summary-total-amount")&&(e("summary-total-amount").textContent=L(n.totalAmount))}function OE(){dn("f1",Om,"Print KOT"),dn("f2",Vm,"Direct Bill"),dn("f3",Mm,"KOT & Complete"),dn("escape",()=>{es(),$("Order cleared","info")},"Cancel"),dn("alt+n",()=>{es(),$("New order started","info")},"New Order")}async function Om(){if(B.items.length===0){$("Add items before printing KOT","warning");return}try{const n=[];for(const c of B.items){const h=c.kotPrintedQty||0,f=c.quantity-h;f>0&&n.push({...c,quantity:f})}if(n.length===0){$("No new items to print. All items already sent via KOT.","warning");return}let t;if(B.editingOrderId){t=await x.getById("orders",B.editingOrderId);const c=B.items.map(f=>({...f,kotPrintedQty:f.quantity}));t.items=c;const h=_e();t.subTotal=h.subTotal,t.acCharge=h.acCharge,t.totalAmount=h.totalAmount,t.supplierId=B.supplierId,t.tableId=B.tableId,await x.update("orders",t),B.items=c}else{const c=await x.getNextOrderNumber(),h=B.items.map(p=>({...p,kotPrintedQty:p.quantity})),f=_e();t={orderNumber:c,supplierId:B.supplierId,tableId:B.tableId,items:h,subTotal:f.subTotal,acCharge:f.acCharge,totalAmount:f.totalAmount,status:"open",type:"kot",createdAt:new Date().toISOString(),billedAt:null},await x.add("orders",t),B.items=h}const e=B.supplierId?Te.find(c=>c.id===B.supplierId):null,s=B.tableId?Ae.find(c=>c.id===B.tableId):null,r=(e==null?void 0:e.name)||"",i=(s==null?void 0:s.name)||"N/A",o=n.filter(c=>!En(c)),l=n.filter(c=>En(c));if(o.length>0&&l.length>0){const c={...t,items:o};Rt(Js(c,r,i)),setTimeout(()=>{Rt(Ys(t,r,i,l))},1e3)}else if(l.length>0)Rt(Ys(t,r,i,l));else{const c={...t,items:o};Rt(Js(c,r,i))}const u=n.map(c=>`${c.itemName} ×${c.quantity}`).join(", ");$(`KOT #${t.orderNumber} — ${u}`,"success"),es()}catch(n){$("Failed to create KOT: "+n.message,"error")}}async function Vm(){var n,t;if(B.items.length===0){$("Add items before generating bill","warning");return}try{const e=new Date().toISOString();let s;const r=[];for(const f of B.items){const p=f.kotPrintedQty||0,_=f.quantity-p;_>0&&r.push({...f,quantity:_})}const i=B.items.map(f=>({...f,kotPrintedQty:f.quantity}));if(B.editingOrderId){s=await x.getById("orders",B.editingOrderId),s.items=i;const f=_e();s.subTotal=f.subTotal,s.acCharge=f.acCharge,s.totalAmount=f.totalAmount,s.supplierId=B.supplierId,s.tableId=B.tableId,s.status="billed",s.type="bill",s.billedAt=e,await x.update("orders",s)}else{const f=await x.getNextOrderNumber(),p=_e();s={orderNumber:f,supplierId:B.supplierId,tableId:B.tableId,items:i,subTotal:p.subTotal,acCharge:p.acCharge,totalAmount:p.totalAmount,status:"billed",type:"bill",createdAt:e,billedAt:e},await x.add("orders",s)}if(r.length>0){const f=((n=Te.find(A=>A.id===B.supplierId))==null?void 0:n.name)||"",p=((t=Ae.find(A=>A.id===B.tableId))==null?void 0:t.name)||"N/A",_=r.filter(A=>!En(A)),C=r.filter(A=>En(A));if(_.length>0){const A={...s,items:_};Rt(Js(A,f,p))}C.length>0&&Rt(Ys(s,f,p,C))}await $m(s.items);const o=B.supplierId?Te.find(f=>f.id===B.supplierId):null,l=B.tableId?Ae.find(f=>f.id===B.tableId):null,u=rc(s,(o==null?void 0:o.name)||"",(l==null?void 0:l.name)||"N/A");Rt(u);const c=f=>(f.category||"").toUpperCase().trim()==="LIQUOR"||f.isLiquor,h=i.filter(f=>!c(f)).reduce((f,p)=>f+p.amount,0);if(h>0){const f=_e(),p=f.subTotal>0?h/f.subTotal*f.acCharge:0,_=h+p;await x.recordWalletTransaction("income",_,`Bill Income: #${s.orderNumber}`,s.id)}$(`Bill #${s.orderNumber} generated!`,"success"),es()}catch(e){$("Failed to generate bill: "+e.message,"error")}}async function Mm(){var n,t;if(B.items.length===0){$("Add items before saving","warning");return}try{const e=new Date().toISOString();let s;const r=[];for(const u of B.items){const c=u.kotPrintedQty||0,h=u.quantity-c;h>0&&r.push({...u,quantity:h})}const i=B.items.map(u=>({...u,kotPrintedQty:u.quantity}));if(B.editingOrderId){s=await x.getById("orders",B.editingOrderId),s.items=i;const u=_e();s.subTotal=u.subTotal,s.acCharge=u.acCharge,s.totalAmount=u.totalAmount,s.supplierId=B.supplierId,s.tableId=B.tableId,s.status="billed",s.type="kot-complete",s.billedAt=e,await x.update("orders",s)}else{const u=await x.getNextOrderNumber(),c=_e();s={orderNumber:u,supplierId:B.supplierId,tableId:B.tableId,items:i,subTotal:c.subTotal,acCharge:c.acCharge,totalAmount:c.totalAmount,status:"billed",type:"kot-complete",createdAt:e,billedAt:e},await x.add("orders",s)}if(r.length>0){const u=((n=Te.find(p=>p.id===B.supplierId))==null?void 0:n.name)||"",c=((t=Ae.find(p=>p.id===B.tableId))==null?void 0:t.name)||"N/A",h=r.filter(p=>!En(p)),f=r.filter(p=>En(p));if(h.length>0&&f.length>0){const p={...s,items:h};Rt(Js(p,u,c)),setTimeout(()=>{Rt(Ys(s,u,c,f))},1e3)}else if(f.length>0)Rt(Ys(s,u,c,f));else{const p={...s,items:h};Rt(Js(p,u,c))}}await $m(s.items);const o=u=>(u.category||"").toUpperCase().trim()==="LIQUOR"||u.isLiquor,l=i.filter(u=>!o(u)).reduce((u,c)=>u+c.amount,0);if(l>0){const u=_e(),c=u.subTotal>0?l/u.subTotal*u.acCharge:0,h=l+c;await x.recordWalletTransaction("income",h,`Bill Income: #${s.orderNumber}`,s.id)}$(`KOT #${s.orderNumber} printed & completed!`,"success"),es()}catch(e){$("Failed: "+e.message,"error")}}async function VE(){console.log("Sync Liquor button clicked");const n=document.getElementById("btn-sync-liquor");if(!n){console.warn("Sync button not found in DOM");return}const t=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="material-symbols-outlined spinning">sync</span> Syncing...';try{$("Syncing liquor products from API...","info"),console.log("Calling LiquorApi.fetchProducts()...");const e=await Xn.fetchProducts();console.log(`LiquorApi.fetchProducts() returned ${e?e.length:"null"} products`),e&&e.length>0?(Nt=[...Nt.filter(r=>!r.isLiquor),...e],$(`Successfully synced ${e.length} liquor products`,"success"),console.log(`Liquor sync complete. Total menu items: ${Nt.length}`)):$("No liquor products found or sync failed","warning")}catch(e){console.error("Liquor sync error:",e),$("Sync failed: "+e.message,"error")}finally{n.disabled=!1,n.innerHTML=t}}function es(){var n;xE(),document.getElementById("table-search").value="",document.getElementById("supplier-search").value="",document.getElementById("summary-table").textContent="—",document.getElementById("summary-supplier").textContent="—",Zn(),ts(),ao(),(n=document.getElementById("table-search"))==null||n.focus()}function ao(){const n=document.getElementById("order-view-title"),t=document.getElementById("order-view-subtitle");if(B.editingOrderId){const e=B._orderNumber||"";n.textContent=`Editing Order #${e}`,t.innerHTML='<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>'}else n.textContent="New Order",t.textContent="Keyboard-driven order entry"}async function ME(n){const e=(await x.getByIndex("orders","status","open")).find(s=>s.tableId===n);if(e){if(B.editingOrderId=e.id,B._orderNumber=e.orderNumber,B.items=[...e.items],B.supplierId=e.supplierId,B.tableId=e.tableId,e.supplierId){const s=Te.find(r=>r.id===e.supplierId);s&&(document.getElementById("supplier-search").value=s.name,document.getElementById("supplier-id-input").value=s.id,document.getElementById("summary-supplier").textContent=s.name)}Zn(),ts(),ao(),$(`Active Order #${e.orderNumber} loaded for this table`,"info"),setTimeout(()=>{var s;return(s=document.getElementById("item-search"))==null?void 0:s.focus()},100)}else B.editingOrderId=null,B._orderNumber=null,B.items=[],Zn(),ts(),ao()}async function $m(n){const t=["COOL DRINKS","CIGARETTE"];for(const e of n){const s=await x.getById("items",e.itemId);if(s&&t.includes((s.category||"").toUpperCase()))s.currentStock=Math.max(0,(s.currentStock||0)-e.quantity),await x.update("items",s);else{const r=await x.getByIndex("itemIngredients","itemId",e.itemId);for(const i of r){const o=await x.getById("ingredients",i.ingredientId);if(o){const l=i.quantity*e.quantity;o.currentStock=Math.max(0,(o.currentStock||0)-l),await x.update("ingredients",o)}}}}}async function $E(){const n=us(),e=(await x.getByIndex("orders","status","billed")).filter(o=>(o.billedAt||o.createdAt||"").startsWith(n)).sort((o,l)=>(l.billedAt||l.createdAt||"").localeCompare(o.billedAt||o.createdAt||"")),s=Object.fromEntries(Te.map(o=>[o.id,o])),r=Object.fromEntries(Ae.map(o=>[o.id,o])),i=e.length===0?`<div class="empty-state" style="padding:40px">
        <span class="material-symbols-outlined">receipt_long</span>
        <p>No completed bills for today</p>
      </div>`:`<table class="data-table">
        <thead>
          <tr>
            <th>Bill #</th>
            <th>Table</th>
            <th>Waiter</th>
            <th>Items</th>
            <th class="text-right">Amount</th>
            <th>Time</th>
            <th class="text-center">Reprint</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(o=>{const l=r[o.tableId],u=s[o.supplierId],c=o.billedAt||o.createdAt||"",h=c?new Date(c).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}):"—",f=(o.items||[]).reduce((p,_)=>p+_.quantity,0);return`
              <tr>
                <td><strong>${o.orderNumber||o.id}</strong></td>
                <td>${(l==null?void 0:l.name)||"—"}</td>
                <td>${(u==null?void 0:u.name)||"—"}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${f} item(s)</span></td>
                <td class="text-right amount font-mono">${L(o.totalAmount)}</td>
                <td class="text-muted">${h}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${o.id}" title="Reprint Bill">
                    <span class="material-symbols-outlined" style="font-size:16px">print</span>
                  </button>
                </td>
              </tr>`}).join("")}
        </tbody>
        <tfoot>
          <tr style="font-weight:700">
            <td colspan="4" class="text-right">Total (${e.length} bills)</td>
            <td class="text-right amount font-mono">${L(e.reduce((o,l)=>o+l.totalAmount,0))}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>`;qt(`Completed Bills — ${$t(n)}`,i,{large:!0,footer:`<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`}),document.querySelectorAll(".btn-reprint-bill").forEach(o=>{o.addEventListener("click",async()=>{const l=await x.getById("orders",parseInt(o.dataset.id));if(!l){$("Order not found","error");return}const u=s[l.supplierId],c=r[l.tableId],h=rc(l,(u==null?void 0:u.name)||"",(c==null?void 0:c.name)||"N/A");Rt(h),$(`Reprinting Bill #${l.orderNumber||l.id}`,"success")})})}function BE(){Ra("f1"),Ra("f2"),Ra("ctrl+s")}async function Jr(n){var o;const t=(await x.getByIndex("orders","status","open")).sort((l,u)=>new Date(u.createdAt)-new Date(l.createdAt)),e=await x.getAll("suppliers"),s=await x.getAll("tables"),r=Object.fromEntries(e.map(l=>[l.id,l.name])),i=Object.fromEntries(s.map(l=>[l.id,l.name]));n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${t.length} open order(s)</p>
        </div>
      </div>
      <button class="btn btn-secondary" id="btn-refresh-active">
        <span class="material-symbols-outlined">refresh</span> Refresh
      </button>
    </div>

    ${t.length===0?`
      <div class="empty-state">
        <span class="material-symbols-outlined">check_circle</span>
        <p>No active orders. All clear!</p>
      </div>
    `:`
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Waiter</th>
              <th>Table</th>
              <th>Items</th>
              <th class="text-right">Total</th>
              <th>Time</th>
              <th>Type</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(l=>{var u;return`
              <tr>
                <td><strong class="text-accent">${l.orderNumber}</strong></td>
                <td>${r[l.supplierId]||"—"}</td>
                <td>${i[l.tableId]||"—"}</td>
                <td>${l.items.length} items</td>
                <td class="text-right amount">${L(l.totalAmount)}</td>
                <td class="text-muted">${bi(l.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${((u=l.type)==null?void 0:u.toUpperCase())||"KOT"}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${l.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${l.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${nt.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${l.id}" title="Cancel Order">
                      <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join("")}
          </tbody>
        </table>
      </div>
    `}
  `,(o=document.getElementById("btn-refresh-active"))==null||o.addEventListener("click",()=>Jr(n)),n.querySelectorAll(".btn-convert-bill").forEach(l=>{l.addEventListener("click",async()=>{const u=parseInt(l.dataset.id),c=await x.getById("orders",u);if(!c)return;c.status="billed",c.billedAt=new Date().toISOString(),await x.update("orders",c);for(const C of c.items){const A=await x.getByIndex("itemIngredients","itemId",C.itemId);for(const S of A){const N=await x.getById("ingredients",S.ingredientId);if(N){const O=S.quantity*C.quantity;N.currentStock=Math.max(0,(N.currentStock||0)-O),await x.update("ingredients",N)}}}const h=c.supplierId?r[c.supplierId]:"",f=c.tableId?i[c.tableId]:"N/A",p=rc(c,h,f);Rt(p);const _=c.items.filter(C=>!En(C)).reduce((C,A)=>C+A.amount,0);if(_>0){const C=c.subTotal||c.items.reduce((O,U)=>O+U.amount,0),A=c.acCharge||0,S=C>0?_/C*A:0,N=_+S;await x.recordWalletTransaction("income",N,`Bill Income: #${c.orderNumber}`,c.id)}$(`Order #${c.orderNumber} billed!`,"success"),Jr(n)})}),n.querySelectorAll(".btn-view-order").forEach(l=>{l.addEventListener("click",async()=>{const u=parseInt(l.dataset.id),c=await x.getById("orders",u);if(!c)return;const h=c.items.map((f,p)=>`<tr>
          <td>${p+1}</td>
          <td>${f.itemName}</td>
          <td class="text-center">${f.quantity}</td>
          <td class="text-right font-mono">${L(f.price)}</td>
          <td class="text-right font-mono amount">${L(f.amount)}</td>
        </tr>`).join("");qt(`Order #${c.orderNumber}`,`
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${r[c.supplierId]||"—"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${i[c.tableId]||"—"}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${bi(c.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${h}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${L(c.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `)})}),n.querySelectorAll(".btn-cancel-order").forEach(l=>{l.addEventListener("click",async()=>{const u=parseInt(l.dataset.id),c=await x.getById("orders",u);c&&confirm(`Cancel order #${c.orderNumber}?`)&&(c.status="cancelled",await x.update("orders",c),$(`Order #${c.orderNumber} cancelled`,"warning"),Jr(n))})})}const FE=["COOL DRINKS","CIGARETTE"];function UE(n){return FE.includes((n||"").toUpperCase())}async function ic(n){var s,r;const t=await x.getAll("items"),e=[...new Set(t.map(i=>i.category))].sort();n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">lunch_dining</span>
        <div>
          <h2 class="view-title">Item Master</h2>
          <p class="view-subtitle">${t.length} menu items</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:250px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="item-filter" placeholder="Filter items...">
        </div>
        ${nt.isAdmin()?`
        <button class="btn btn-primary" id="btn-add-item">
          <span class="material-symbols-outlined">add</span> Add Item
        </button>
        `:""}
      </div>
    </div>

    <div class="card">
      <table class="data-table" id="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Bar Code</th>
            <th>Item Name</th>
            <th>Category</th>
            <th class="text-right">Selling Price</th>
            <th class="text-right">Stock</th>
            <th class="text-right">Incentive %</th>
            <th class="text-center">Status</th>
            ${nt.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${Uu(t,nt.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(s=document.getElementById("item-filter"))==null||s.addEventListener("input",i=>{const o=i.target.value.toLowerCase(),l=t.filter(u=>u.name.toLowerCase().includes(o)||u.category.toLowerCase().includes(o)||(u.code||"").toLowerCase().includes(o));document.getElementById("items-table-body").innerHTML=Uu(l,nt.isAdmin()),qu(n,t,e)}),(r=document.getElementById("btn-add-item"))==null||r.addEventListener("click",()=>{Bm(null,e,n)}),qu(n,t,e)}function Uu(n,t){return n.length===0?`<tr><td colspan="${t?9:8}"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>`:n.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${e.code||"—"}</code></td>
      <td><span class="text-muted" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem">${e.barcode||"—"}</span></td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td class="text-right amount font-mono">${L(e.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${UE(e.category)?`<span class="status-badge ${(e.currentStock||0)>0?"status-active":"status-inactive"}" style="font-weight:600">${e.currentStock||0}</span>`:'<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${e.incentivePercent||0}%</td>
      <td class="text-center">
        <span class="status-badge ${e.active?"status-active":"status-inactive"}">
          ${e.active?"Active":"Inactive"}
        </span>
      </td>
      ${t?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-item" data-id="${e.id}" title="Edit">
            <span class="material-symbols-outlined" style="font-size:16px">edit</span>
          </button>
          <button class="btn btn-sm btn-ghost text-danger btn-delete-item" data-id="${e.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:16px">delete</span>
          </button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function qu(n,t,e){n.querySelectorAll(".btn-edit-item").forEach(s=>{s.addEventListener("click",async()=>{const r=await x.getById("items",parseInt(s.dataset.id));r&&Bm(r,e,n)})}),n.querySelectorAll(".btn-delete-item").forEach(s=>{s.addEventListener("click",async()=>{const r=parseInt(s.dataset.id),i=await x.getById("items",r);i&&confirm(`Delete "${i.name}"?`)&&(await x.remove("items",r),$(`"${i.name}" deleted`,"warning"),ic(n))})})}function Bm(n,t,e){var o;const s=!!n,r=t.map(l=>`<option value="${l}" ${(n==null?void 0:n.category)===l?"selected":""}>${l}</option>`).join(""),i=`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Item Code</label>
        <input type="text" class="form-input" id="modal-item-code" value="${(n==null?void 0:n.code)||""}" placeholder="e.g. CB" style="text-transform:uppercase">
      </div>
      <div class="form-group">
        <label class="form-label">Bar Code (Scanner)</label>
        <input type="text" class="form-input" id="modal-item-barcode" value="${(n==null?void 0:n.barcode)||""}" placeholder="Scan or type barcode...">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:2">
        <label class="form-label">Item Name *</label>
        <input type="text" class="form-input" id="modal-item-name" value="${(n==null?void 0:n.name)||""}" placeholder="e.g. Chicken Biryani" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category *</label>
        <div style="display:flex;gap:8px">
          <select class="form-select" id="modal-item-category" style="flex:1">
            <option value="">Select category</option>
            ${r}
          </select>
          <input type="text" class="form-input" id="modal-item-new-category" placeholder="Or new..." style="flex:1">
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Selling Price (₹) *</label>
        <input type="number" class="form-input" id="modal-item-price" value="${(n==null?void 0:n.sellingPrice)||""}" min="0" step="0.01" placeholder="0.00">
      </div>
      <div class="form-group">
        <label class="form-label">Waiter Incentive %</label>
        <input type="number" class="form-input" id="modal-item-incentive" value="${(n==null?void 0:n.incentivePercent)||0}" min="0" max="100" step="0.1">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-item-active" ${(n==null?void 0:n.active)!==!1?"checked":""}>
      <label for="modal-item-active">Active</label>
    </div>
  `;qt(s?"Edit Item":"Add New Item",i,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${s?"Update":"Save"}
      </button>
    `}),(o=document.getElementById("modal-item-save"))==null||o.addEventListener("click",async()=>{const l=document.getElementById("modal-item-name").value.trim(),u=document.getElementById("modal-item-category").value,h=document.getElementById("modal-item-new-category").value.trim()||u,f=parseFloat(document.getElementById("modal-item-price").value)||0,p=parseFloat(document.getElementById("modal-item-incentive").value)||0,_=document.getElementById("modal-item-active").checked,C=(document.getElementById("modal-item-code").value||"").trim().toUpperCase(),A=(document.getElementById("modal-item-barcode").value||"").trim();if(!l||!h||f<=0){$("Please fill all required fields","error");return}const S={name:l,category:h,sellingPrice:f,incentivePercent:p,active:_,code:C,barcode:A,createdAt:(n==null?void 0:n.createdAt)||new Date().toISOString()};s?(S.id=n.id,await x.update("items",S),$(`"${l}" updated`,"success")):(await x.add("items",S),$(`"${l}" added`,"success")),Kt(),ic(e)})}async function ac(n){var s;const t=await x.getAll("suppliers"),e=nt.isAdmin();n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${t.length} waiter(s)</p>
        </div>
      </div>
      ${e?`
      <button class="btn btn-primary" id="btn-add-supplier">
        <span class="material-symbols-outlined">add</span> Add Waiter
      </button>
      `:""}
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Waiter Name</th>
            <th>Contact</th>
            <th class="text-center">Incentive Tracking</th>
            <th class="text-center">Status</th>
            ${e?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody>
          ${t.length===0?`
            <tr><td colspan="${e?7:6}"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          `:t.map(r=>`
            <tr>
              <td class="text-muted">${r.id}</td>
              <td><code style="background:var(--bg-elevated);padding:2px 6px;border-radius:4px;font-size:0.8rem;font-weight:600">${r.code||"—"}</code></td>
              <td><strong>${r.name}</strong></td>
              <td>${r.contact||"—"}</td>
              <td class="text-center">
                <span class="status-badge ${r.incentiveEnabled?"status-active":"status-inactive"}">
                  ${r.incentiveEnabled?"Enabled":"Disabled"}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${r.active?"status-active":"status-inactive"}">
                  ${r.active?"Active":"Inactive"}
                </span>
              </td>
              ${e?`
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${r.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${r.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                  </button>
                </div>
              </td>
              `:""}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,(s=document.getElementById("btn-add-supplier"))==null||s.addEventListener("click",()=>ju(null,n)),n.querySelectorAll(".btn-edit-supplier").forEach(r=>{r.addEventListener("click",async()=>{const i=await x.getById("suppliers",parseInt(r.dataset.id));i&&ju(i,n)})}),n.querySelectorAll(".btn-delete-supplier").forEach(r=>{r.addEventListener("click",async()=>{const i=parseInt(r.dataset.id),o=await x.getById("suppliers",i);o&&confirm(`Delete "${o.name}"?`)&&(await x.remove("suppliers",i),$(`"${o.name}" deleted`,"warning"),ac(n))})})}function ju(n,t){var s;const e=!!n;qt(e?"Edit Waiter":"Add New Waiter",`
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Code</label>
        <input type="text" class="form-input" id="modal-sup-code" value="${(n==null?void 0:n.code)||""}" placeholder="e.g. RJ" style="text-transform:uppercase">
      </div>
      <div class="form-group" style="flex:2">
        <label class="form-label">Waiter Name *</label>
        <input type="text" class="form-input" id="modal-sup-name" value="${(n==null?void 0:n.name)||""}" placeholder="Waiter name">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Contact Number</label>
      <input type="text" class="form-input" id="modal-sup-contact" value="${(n==null?void 0:n.contact)||""}" placeholder="Phone number">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-sup-incentive" ${(n==null?void 0:n.incentiveEnabled)!==!1?"checked":""}>
      <label for="modal-sup-incentive">Enable Incentive Tracking</label>
    </div>
    <div class="form-check mt-1">
      <input type="checkbox" id="modal-sup-active" ${(n==null?void 0:n.active)!==!1?"checked":""}>
      <label for="modal-sup-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-sup-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(s=document.getElementById("modal-sup-save"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("modal-sup-name").value.trim();if(!r){$("Name is required","error");return}const i={name:r,code:(document.getElementById("modal-sup-code").value||"").trim().toUpperCase(),contact:document.getElementById("modal-sup-contact").value.trim(),incentiveEnabled:document.getElementById("modal-sup-incentive").checked,active:document.getElementById("modal-sup-active").checked,createdAt:(n==null?void 0:n.createdAt)||new Date().toISOString()};e?(i.id=n.id,await x.update("suppliers",i),$(`"${r}" updated`,"success")):(await x.add("suppliers",i),$(`"${r}" added`,"success")),Kt(),ac(t)})}async function oc(n){var e,s,r;const t=await x.getAll("ingredients");n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <p class="view-subtitle">${t.length} ingredient(s)</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:220px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="ingredient-filter" placeholder="Filter...">
        </div>
        <button class="btn btn-secondary" id="btn-print-stock" title="Print Stock Checklist">
          <span class="material-symbols-outlined">print</span> Print
        </button>
        ${nt.isAdmin()?`
        <button class="btn btn-primary" id="btn-add-ingredient">
          <span class="material-symbols-outlined">add</span> Add Ingredient
        </button>
        `:""}
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th class="text-right">Current Stock</th>
            <th class="text-center">Status</th>
            ${nt.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${zu(t,nt.isAdmin())}
        </tbody>
      </table>
    </div>
  `,(e=document.getElementById("ingredient-filter"))==null||e.addEventListener("input",i=>{const o=i.target.value.toLowerCase(),l=t.filter(u=>u.name.toLowerCase().includes(o));document.getElementById("ingredients-tbody").innerHTML=zu(l,nt.isAdmin()),Hu(n)}),(s=document.getElementById("btn-add-ingredient"))==null||s.addEventListener("click",()=>Fm(null,n)),(r=document.getElementById("btn-print-stock"))==null||r.addEventListener("click",()=>{const i=t.filter(l=>l.active!==!1),o=kE(i);Rt(o,"a4")}),Hu(n)}function zu(n,t){return n.length===0?`<tr><td colspan="${t?6:5}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`:n.map(e=>`
    <tr>
      <td class="text-muted">${e.id}</td>
      <td><strong>${e.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.unit}</span></td>
      <td class="text-right font-mono">${e.currentStock??0} ${e.unit}</td>
      <td class="text-center"><span class="status-badge ${e.active!==!1?"status-active":"status-inactive"}">${e.active!==!1?"Active":"Inactive"}</span></td>
      ${t?`
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${e.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      `:""}
    </tr>
  `).join("")}function Hu(n){n.querySelectorAll(".btn-edit-ing").forEach(t=>{t.addEventListener("click",async()=>{const e=await x.getById("ingredients",parseInt(t.dataset.id));e&&Fm(e,n)})}),n.querySelectorAll(".btn-del-ing").forEach(t=>{t.addEventListener("click",async()=>{const e=parseInt(t.dataset.id),s=await x.getById("ingredients",e);s&&confirm(`Delete "${s.name}"?`)&&(await x.remove("ingredients",e),$(`"${s.name}" deleted`,"warning"),oc(n))})})}function Fm(n,t){var s;const e=!!n;qt(e?"Edit Ingredient":"Add New Ingredient",`
    <div class="form-group">
      <label class="form-label">Ingredient Name *</label>
      <input type="text" class="form-input" id="modal-ing-name" value="${(n==null?void 0:n.name)||""}" placeholder="e.g. Chicken">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Unit *</label>
        <select class="form-select" id="modal-ing-unit">
          <option value="g" ${(n==null?void 0:n.unit)==="g"?"selected":""}>g (grams)</option>
          <option value="kg" ${(n==null?void 0:n.unit)==="kg"?"selected":""}>kg (kilograms)</option>
          <option value="ml" ${(n==null?void 0:n.unit)==="ml"?"selected":""}>ml (millilitres)</option>
          <option value="l" ${(n==null?void 0:n.unit)==="l"?"selected":""}>l (litres)</option>
          <option value="qty" ${(n==null?void 0:n.unit)==="qty"?"selected":""}>qty (quantity/pieces)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Current Stock</label>
        <input type="number" class="form-input" id="modal-ing-stock" value="${(n==null?void 0:n.currentStock)??0}" min="0" step="0.01">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-ing-active" ${(n==null?void 0:n.active)!==!1?"checked":""}>
      <label for="modal-ing-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-ing-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(s=document.getElementById("modal-ing-save"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("modal-ing-name").value.trim();if(!r){$("Name is required","error");return}const i={name:r,unit:document.getElementById("modal-ing-unit").value,currentStock:parseFloat(document.getElementById("modal-ing-stock").value)||0,active:document.getElementById("modal-ing-active").checked};e?(i.id=n.id,await x.update("ingredients",i),$(`"${r}" updated`,"success")):(await x.add("ingredients",i),$(`"${r}" added`,"success")),Kt(),oc(t)})}async function cc(n){var u;const t=["LIQUOR","CIGARETTE","COOL DRINKS"],e=(await x.getAll("items")).filter(c=>c.active&&!t.includes((c.category||"").toUpperCase())),s=await x.getAll("ingredients"),r=await x.getAll("itemIngredients"),i=Object.fromEntries(s.map(c=>[c.id,c])),o=nt.isAdmin(),l={};r.forEach(c=>{l[c.itemId]||(l[c.itemId]=[]),l[c.itemId].push(c)}),n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">menu_book</span>
        <div>
          <h2 class="view-title">Recipe Configuration</h2>
          <p class="view-subtitle">Map ingredients to menu items</p>
        </div>
      </div>
    </div>

    <div class="search-container mb-2" style="max-width:350px">
      <span class="material-symbols-outlined">search</span>
      <input type="text" class="form-input" id="recipe-filter" placeholder="Search items...">
    </div>

    <div id="recipe-cards-container">
      ${e.map(c=>{const h=l[c.id]||[];return`
          <div class="card mb-2 recipe-card" data-item-name="${c.name.toLowerCase()}">
            <div class="card-header">
              <div>
                <strong style="font-size:1rem">${c.name}</strong>
                <span class="status-badge" style="margin-left:8px;background:var(--bg-elevated);color:var(--text-secondary)">${c.category}</span>
                <span class="text-muted" style="margin-left:8px;font-size:0.78rem">${h.length} ingredient(s)</span>
              </div>
              ${o?`
              <button class="btn btn-sm btn-primary btn-add-recipe" data-item-id="${c.id}">
                <span class="material-symbols-outlined" style="font-size:16px">add</span> Add Ingredient
              </button>
              `:""}
            </div>
            ${h.length>0?`
              <table class="data-table" style="margin-top:8px">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    ${o?'<th class="text-center" style="width:60px">Remove</th>':""}
                  </tr>
                </thead>
                <tbody>
                  ${h.map(f=>{const p=i[f.ingredientId];return`
                      <tr>
                        <td><strong>${(p==null?void 0:p.name)||"Unknown"}</strong></td>
                        <td class="font-mono">${f.quantity}</td>
                        <td>${(p==null?void 0:p.unit)||"—"}</td>
                        ${o?`
                        <td class="text-center">
                          <button class="btn btn-sm btn-ghost text-danger btn-del-recipe" data-id="${f.id}">
                            <span class="material-symbols-outlined" style="font-size:16px">close</span>
                          </button>
                        </td>
                        `:""}
                      </tr>
                    `}).join("")}
                </tbody>
              </table>
            `:`
              <div class="text-muted" style="padding:12px 0;font-size:0.85rem">No ingredients mapped. Click "Add Ingredient" to configure recipe.</div>
            `}
          </div>
        `}).join("")}
    </div>
  `,(u=document.getElementById("recipe-filter"))==null||u.addEventListener("input",c=>{const h=c.target.value.toLowerCase();n.querySelectorAll(".recipe-card").forEach(f=>{f.style.display=f.dataset.itemName.includes(h)?"":"none"})}),n.querySelectorAll(".btn-add-recipe").forEach(c=>{c.addEventListener("click",()=>{const h=parseInt(c.dataset.itemId),f=e.find(p=>p.id===h);qE(h,(f==null?void 0:f.name)||"",s,n)})}),n.querySelectorAll(".btn-del-recipe").forEach(c=>{c.addEventListener("click",async()=>{const h=parseInt(c.dataset.id);confirm("Remove this ingredient from recipe?")&&(await x.remove("itemIngredients",h),$("Ingredient removed from recipe","warning"),cc(n))})})}function qE(n,t,e,s){var i;const r=e.filter(o=>o.active!==!1).map(o=>`<option value="${o.id}">${o.name} (${o.unit})</option>`).join("");qt(`Add Ingredient to ${t}`,`
    <div class="form-group">
      <label class="form-label">Ingredient *</label>
      <select class="form-select" id="modal-recipe-ingredient">
        <option value="">Select ingredient</option>
        ${r}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Quantity per serving *</label>
      <input type="number" class="form-input" id="modal-recipe-qty" min="0.01" step="0.01" placeholder="e.g. 100">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-recipe-save"><span class="material-symbols-outlined">save</span> Add</button>
    `}),(i=document.getElementById("modal-recipe-save"))==null||i.addEventListener("click",async()=>{const o=parseInt(document.getElementById("modal-recipe-ingredient").value),l=parseFloat(document.getElementById("modal-recipe-qty").value);if(!o||!l||l<=0){$("Please fill all fields","error");return}await x.add("itemIngredients",{itemId:n,ingredientId:o,quantity:l}),$("Ingredient added to recipe","success"),Kt(),cc(s)})}async function lc(n){var s;const t=await x.getAll("tables"),e=nt.isAdmin();n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">table_restaurant</span>
        <div>
          <h2 class="view-title">Table Master</h2>
          <p class="view-subtitle">${t.length} table(s)</p>
        </div>
      </div>
      ${e?`
      <button class="btn btn-primary" id="btn-add-table">
        <span class="material-symbols-outlined">add</span> Add Table
      </button>
      `:""}
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
      ${t.map(r=>`
        <div class="stat-card" style="cursor:pointer;position:relative">
          <div class="stat-icon ${r.active?"green":"orange"}">
            <span class="material-symbols-outlined">table_restaurant</span>
          </div>
          <div style="flex:1">
            <div class="stat-value" style="font-size:1.1rem">${r.name}</div>
            <div class="stat-label">
              <span class="status-badge ${r.active?"status-active":"status-inactive"}" style="font-size:0.65rem">
                ${r.active?"Active":"Inactive"}
              </span>
            </div>
          </div>
          ${e?`
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="btn btn-sm btn-ghost btn-edit-table" data-id="${r.id}" title="Edit">
              <span class="material-symbols-outlined" style="font-size:16px">edit</span>
            </button>
            <button class="btn btn-sm btn-ghost text-danger btn-del-table" data-id="${r.id}" title="Delete">
              <span class="material-symbols-outlined" style="font-size:16px">delete</span>
            </button>
          </div>
          `:""}
        </div>
      `).join("")}
    </div>
  `,(s=document.getElementById("btn-add-table"))==null||s.addEventListener("click",()=>Wu(null,n)),n.querySelectorAll(".btn-edit-table").forEach(r=>{r.addEventListener("click",async()=>{const i=await x.getById("tables",parseInt(r.dataset.id));i&&Wu(i,n)})}),n.querySelectorAll(".btn-del-table").forEach(r=>{r.addEventListener("click",async()=>{const i=parseInt(r.dataset.id),o=await x.getById("tables",i);o&&confirm(`Delete "${o.name}"?`)&&(await x.remove("tables",i),$(`"${o.name}" deleted`,"warning"),lc(n))})})}function Wu(n,t){var s;const e=!!n;qt(e?"Edit Table":"Add New Table",`
    <div class="form-group">
      <label class="form-label">Table Name / Number *</label>
      <input type="text" class="form-input" id="modal-tbl-name" value="${(n==null?void 0:n.name)||""}" placeholder="e.g. Table 1, Parcel, Takeaway">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-tbl-active" ${(n==null?void 0:n.active)!==!1?"checked":""}>
      <label for="modal-tbl-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-tbl-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(s=document.getElementById("modal-tbl-save"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("modal-tbl-name").value.trim();if(!r){$("Name is required","error");return}const i={name:r,active:document.getElementById("modal-tbl-active").checked};e?(i.id=n.id,await x.update("tables",i),$(`"${r}" updated`,"success")):(await x.add("tables",i),$(`"${r}" added`,"success")),Kt(),lc(t)})}const jE=["COOL DRINKS","CIGARETTE"];let zt=[],Um=[],qm=[],jm=[],mn=null;function zm(){zt=[],mn=null}function zE(n){return jE.includes((n||"").toUpperCase())}async function uc(n){var f;const t=(await x.getAll("purchases")).sort((p,_)=>new Date(_.date||_.createdAt)-new Date(p.date||p.createdAt)),e=await x.getAll("ingredients"),s=await x.getAll("grocerySuppliers"),r=await x.getAll("items");Um=e.filter(p=>p.active!==!1),qm=s.filter(p=>p.active!==!1),jm=r.filter(p=>p.active!==!1&&zE(p.category));const i=Object.fromEntries(e.map(p=>[p.id,p])),o=Object.fromEntries(r.map(p=>[p.id,p])),l=Object.fromEntries(s.map(p=>[p.id,p])),u=t.reduce((p,_)=>p+(_.cost||0),0),c={};t.forEach(p=>{const _=p.batchId||`single_${p.id}`;c[_]||(c[_]={batchId:p.batchId||null,supplierId:p.supplierId,date:p.date,items:[],totalCost:0}),c[_].items.push(p),c[_].totalCost+=p.cost||0});const h=Object.values(c);n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">shopping_cart</span>
        <div>
          <h2 class="view-title">Purchase Entry</h2>
          <p class="view-subtitle">${t.length} item(s) in ${h.length} purchase(s) • Total: ${L(u)}</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-add-purchase">
        <span class="material-symbols-outlined">add</span> New Purchase
      </button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Supplier</th>
            <th>Items</th>
            <th class="text-right">Total Cost (₹)</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${h.length===0?`
            <tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded yet</p></div></td></tr>
          `:h.map(p=>{var A;const _=l[p.supplierId],C=p.items.map(S=>{if(S.productId){const N=o[S.productId];return`${(N==null?void 0:N.name)||"Unknown"} (${S.quantity})`}else{const N=i[S.ingredientId];return`${(N==null?void 0:N.name)||"Unknown"} (${S.quantity} ${(N==null?void 0:N.unit)||""})`}}).join(", ");return`
              <tr>
                <td class="text-muted">${$t(p.date)}</td>
                <td><strong>${(_==null?void 0:_.name)||"—"}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${C}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${p.items.length} item(s)</span>
                  ${C}
                </td>
                <td class="text-right amount font-mono">
                  ${L(p.totalCost)}
                  ${((A=p.items[0])==null?void 0:A.paymentType)==="credit"?' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>':' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(p.items.map(S=>S.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${nt.isAdmin()?`
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(p.items.map(S=>S.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                    </button>
                    `:""}
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `,(f=document.getElementById("btn-add-purchase"))==null||f.addEventListener("click",()=>{zm(),WE(n)}),n.querySelectorAll(".btn-view-purchase").forEach(p=>{p.addEventListener("click",async()=>{const _=JSON.parse(p.dataset.batch),C=[];for(const A of _){const S=await x.getById("purchases",A);S&&C.push(S)}HE(C,i,o,l)})}),n.querySelectorAll(".btn-del-batch").forEach(p=>{p.addEventListener("click",async()=>{const _=JSON.parse(p.dataset.batch);if(confirm(`Delete this purchase with ${_.length} item(s)? Stock will be reversed.`)){for(const C of _){const A=await x.getById("purchases",C);if(A){if(A.ingredientId){const S=await x.getById("ingredients",A.ingredientId);S&&(S.currentStock=Math.max(0,(S.currentStock||0)-(A.quantity||0)),await x.update("ingredients",S))}if(A.productId){const S=await x.getById("items",A.productId);S&&(S.currentStock=Math.max(0,(S.currentStock||0)-(A.quantity||0)),await x.update("items",S))}}await x.remove("purchases",C)}$("Purchase deleted and stock reversed","warning"),uc(n)}})})}function HE(n,t,e,s){var l,u;const r=s[(l=n[0])==null?void 0:l.supplierId],i=n.reduce((c,h)=>c+(h.cost||0),0),o=n.map((c,h)=>{let f,p;if(c.productId){const _=e[c.productId];f=(_==null?void 0:_.name)||"Unknown",p="pcs"}else{const _=t[c.ingredientId];f=(_==null?void 0:_.name)||"Unknown",p=(_==null?void 0:_.unit)||"—"}return`
      <tr>
        <td class="text-muted">${h+1}</td>
        <td><strong>${f}</strong>${c.productId?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}</td>
        <td class="text-right font-mono">${c.quantity}</td>
        <td>${p}</td>
        <td class="text-right amount font-mono">${L(c.cost)}</td>
      </tr>
    `}).join("");qt(`Purchase Details — ${$t((u=n[0])==null?void 0:u.date)}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${(r==null?void 0:r.name)||"—"}</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th class="text-right">Quantity</th>
          <th>Unit</th>
          <th class="text-right">Cost (₹)</th>
        </tr>
      </thead>
      <tbody>${o}</tbody>
      <tfoot>
        <tr style="font-weight:700">
          <td colspan="4" class="text-right">Total</td>
          <td class="text-right amount total font-mono">${L(i)}</td>
        </tr>
      </tfoot>
    </table>
  `,{large:!0})}function WE(n){var i,o,l,u,c,h,f,p,_,C;const t=qm.map(A=>`<option value="${A.id}">${A.name}</option>`).join("");qt("New Purchase — Multi-Item Entry",`
    <div class="form-row" style="margin-bottom:16px">
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Supplier *</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier</option>
          ${t}
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="modal-pur-date" value="${us()}">
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Payment *</label>
        <div style="display:flex;gap:6px;height:38px;align-items:center">
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="cash" style="margin:0"> 💵 Cash
          </label>
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="credit" checked style="margin:0"> 📝 Credit
          </label>
        </div>
      </div>
    </div>

    <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;background:var(--bg-tertiary);margin-bottom:16px">
      <label class="form-label" style="margin-bottom:8px">Add Item</label>
      <div style="display:flex;gap:8px;align-items:flex-end">
        <div style="flex:2;position:relative">
          <div class="search-container" style="margin-bottom:0">
            <span class="material-symbols-outlined">search</span>
            <input type="text" class="form-input" id="modal-pur-item-search" placeholder="Type to search items..." autocomplete="off" style="margin-bottom:0">
            <div class="search-dropdown" id="modal-pur-item-dropdown" style="max-height:250px;overflow-y:auto"></div>
          </div>
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-qty" min="0.01" step="0.01" placeholder="Qty" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-unit-cost" min="0" step="0.01" placeholder="Cost/Unit ₹" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-cost" min="0" step="0.01" placeholder="Total ₹" style="margin-bottom:0">
        </div>
        <button class="btn btn-primary btn-sm" id="modal-pur-add-item" style="height:38px;padding:0 14px" title="Add Item">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
        </button>
      </div>
    </div>

    <div id="modal-pur-items-container">
      <table class="data-table" id="modal-pur-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Qty</th>
            <th>Unit</th>
            <th class="text-right">Cost/Unit</th>
            <th class="text-right">Total (₹)</th>
            <th style="width:40px"></th>
          </tr>
        </thead>
        <tbody id="modal-pur-items-body">
          <tr id="modal-pur-empty-row">
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot id="modal-pur-items-footer" style="display:none">
          <tr style="font-weight:700">
            <td colspan="5" class="text-right">Total</td>
            <td class="text-right amount total font-mono" id="modal-pur-total">₹0.00</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-pur-save"><span class="material-symbols-outlined">save</span> Save Purchase</button>
    `,large:!0});const e=[...Um.map(A=>({type:"ingredient",id:A.id,name:A.name,unit:A.unit,category:"🥬 Ingredient",code:"",barcode:A.barcode||""})),...jm.map(A=>({type:"product",id:A.id,name:A.name,unit:"pcs",category:`📦 ${A.category}`,price:A.sellingPrice,code:A.code||"",barcode:A.barcode||""}))];GE(e),(i=document.getElementById("modal-pur-supplier"))==null||i.addEventListener("keydown",A=>{var S;A.key==="Enter"&&(A.preventDefault(),(S=document.getElementById("modal-pur-date"))==null||S.focus())}),(o=document.getElementById("modal-pur-date"))==null||o.addEventListener("keydown",A=>{var S;A.key==="Enter"&&(A.preventDefault(),(S=document.getElementById("modal-pur-item-search"))==null||S.focus())}),(l=document.getElementById("modal-pur-qty"))==null||l.addEventListener("keydown",A=>{var S;A.key==="Enter"&&(A.preventDefault(),(S=document.getElementById("modal-pur-unit-cost"))==null||S.focus())}),(u=document.getElementById("modal-pur-unit-cost"))==null||u.addEventListener("keydown",A=>{var S;A.key==="Enter"&&(A.preventDefault(),(S=document.getElementById("modal-pur-cost"))==null||S.focus())}),(c=document.getElementById("modal-pur-add-item"))==null||c.addEventListener("click",()=>Gu()),(h=document.getElementById("modal-pur-cost"))==null||h.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),Gu())});function s(){var N,O;const A=parseFloat((N=document.getElementById("modal-pur-qty"))==null?void 0:N.value)||0,S=parseFloat((O=document.getElementById("modal-pur-unit-cost"))==null?void 0:O.value)||0;A>0&&S>0&&(document.getElementById("modal-pur-cost").value=(A*S).toFixed(2))}function r(){var N,O;const A=parseFloat((N=document.getElementById("modal-pur-qty"))==null?void 0:N.value)||0,S=parseFloat((O=document.getElementById("modal-pur-cost"))==null?void 0:O.value)||0;A>0&&S>0&&(document.getElementById("modal-pur-unit-cost").value=(S/A).toFixed(2))}(f=document.getElementById("modal-pur-qty"))==null||f.addEventListener("input",s),(p=document.getElementById("modal-pur-unit-cost"))==null||p.addEventListener("input",s),(_=document.getElementById("modal-pur-cost"))==null||_.addEventListener("input",r),(C=document.getElementById("modal-pur-save"))==null||C.addEventListener("click",async()=>{var at;const A=document.getElementById("modal-pur-supplier").value,S=document.getElementById("modal-pur-date").value,N=((at=document.querySelector('input[name="pur-payment-type"]:checked'))==null?void 0:at.value)||"credit";if(!A){$("Please select a supplier","error");return}if(!S){$("Please select a date","error");return}if(zt.length===0){$("Please add at least one item","error");return}const O=`PUR-${Date.now()}`;for(const b of zt){const v={quantity:b.quantity,unitCost:b.unitCost||0,cost:b.cost,supplierId:parseInt(A),date:S,batchId:O,paymentType:N,createdAt:new Date().toISOString()};if(b.type==="product"){v.productId=b.itemId,v.ingredientId=null;const y=await x.getById("items",b.itemId);y&&(y.currentStock=(y.currentStock||0)+b.quantity,await x.update("items",y))}else{v.ingredientId=b.itemId,v.productId=null;const y=await x.getById("ingredients",b.itemId);y&&(y.currentStock=(y.currentStock||0)+b.quantity,await x.update("ingredients",y))}await x.add("purchases",v)}const U=zt.reduce((b,v)=>b+v.cost,0);if(N==="cash"){const b=zt.map(v=>v.itemName).join(", ");await x.recordWalletTransaction("purchase",U,`Cash Purchase: ${b}`,O)}const tt=await x.add("supplierBills",{supplierId:parseInt(A),totalAmount:U,batchId:O,date:S,description:`Purchase: ${zt.map(b=>b.itemName).join(", ")}`,paymentType:N,createdAt:new Date().toISOString()});N==="cash"&&await x.add("supplierPayments",{supplierId:parseInt(A),billId:tt,amount:U,paymentDate:S,paymentMode:"cash",notes:`Auto-paid: Cash purchase (Batch ${O})`,createdAt:new Date().toISOString()});const st=N==="credit"?" (Credit — added to outstanding)":" (Cash)";$(`Purchase saved! ${zt.length} item(s) — ${L(U)}${st}`,"success"),zm(),Kt(),uc(n)})}function GE(n){const t=document.getElementById("modal-pur-item-search"),e=document.getElementById("modal-pur-item-dropdown");if(!t||!e)return;let s=-1,r=[];function i(c){if(c=c.toLowerCase().trim(),c.length===0?r=n:r=n.filter(h=>h.name.toLowerCase().includes(c)||h.category.toLowerCase().includes(c)||h.code&&h.code.toLowerCase().includes(c)||h.barcode&&h.barcode.toLowerCase().includes(c)),s=r.length>0?0:-1,c.length>=8){const h=n.find(f=>(f.code||"").toLowerCase()===c||(f.barcode||"").toLowerCase()===c);if(h){r.includes(h)||(r=[h,...r]);const f=r.indexOf(h);l(f);return}}o()}function o(){if(r.length===0){e.innerHTML='<div class="search-no-results">No items found</div>',e.classList.add("visible");return}const c={};r.forEach(p=>{c[p.category]||(c[p.category]=[]),c[p.category].push(p)});let h=0,f="";for(const[p,_]of Object.entries(c)){f+=`<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${p}</div>`;for(const C of _){const A=C.price?` — ${L(C.price)}`:"",S=C.type==="ingredient"?` (${C.unit})`:"",N=C.code?`<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${C.code}</code>`:"";f+=`<div class="search-dropdown-item ${h===s?"highlighted":""}" data-flat-idx="${h}">
                  <div>
                    ${N}<span>${C.name}</span>
                    <span style="color:var(--text-muted);font-size:0.78rem">${S}</span>
                    ${C.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem;margin-left:4px">PRODUCT</span>':""}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${A}</span>
                </div>`,h++}}e.innerHTML=f,e.classList.add("visible"),e.querySelectorAll(".search-dropdown-item").forEach(p=>{p.addEventListener("click",()=>{l(parseInt(p.dataset.flatIdx))})})}function l(c){var f,p;if(c<0||c>=r.length)return;const h=r[c];mn=h,t.value=h.name,e.classList.remove("visible"),(f=document.getElementById("modal-pur-qty"))==null||f.focus(),(p=document.getElementById("modal-pur-qty"))==null||p.select()}function u(){const c=e.querySelectorAll(".search-dropdown-item");c.forEach((h,f)=>h.classList.toggle("highlighted",f===s)),c[s]&&c[s].scrollIntoView({block:"nearest"})}t.addEventListener("input",()=>{mn=null,i(t.value)}),t.addEventListener("focus",()=>{mn=null,i(t.value)}),t.addEventListener("blur",()=>{setTimeout(()=>e.classList.remove("visible"),200)}),t.addEventListener("keydown",c=>{const h=e.querySelectorAll(".search-dropdown-item");if(c.key==="ArrowDown")c.preventDefault(),s=Math.min(s+1,h.length-1),u();else if(c.key==="ArrowUp")c.preventDefault(),s=Math.max(s-1,0),u();else if(c.key==="Enter"){c.preventDefault();const f=s>=0?s:0;r[f]&&l(f)}else c.key==="Tab"&&e.classList.remove("visible")})}function Gu(){const n=document.getElementById("modal-pur-item-search"),t=document.getElementById("modal-pur-qty"),e=document.getElementById("modal-pur-unit-cost"),s=document.getElementById("modal-pur-cost"),r=parseFloat(t.value),i=parseFloat(e.value)||0,o=parseFloat(s.value)||0;if(!mn){$("Please search and select an item first","warning"),n==null||n.focus();return}if(!r||r<=0){$("Please enter a valid quantity","warning"),t==null||t.focus();return}const l=mn,u=zt.find(c=>c.itemId===l.id&&c.type===l.type);u?(u.quantity+=r,u.cost+=o,u.unitCost=i||u.unitCost):zt.push({type:l.type,itemId:l.id,itemName:l.name,unit:l.unit,quantity:r,unitCost:i,cost:o}),Hm(),mn=null,n.value="",t.value="",e.value="",s.value="",n.focus(),$(`${l.name} added`,"success",1500)}function Hm(){const n=document.getElementById("modal-pur-items-body"),t=document.getElementById("modal-pur-items-footer");if(!n)return;if(zt.length===0){n.innerHTML=`
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`,t&&(t.style.display="none");return}const e=zt.reduce((s,r)=>s+r.cost,0);n.innerHTML=zt.map((s,r)=>`
    <tr>
      <td class="text-muted">${r+1}</td>
      <td>
        <strong>${s.itemName}</strong>
        ${s.type==="product"?' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>':""}
      </td>
      <td class="text-right font-mono">${s.quantity}</td>
      <td>${s.unit}</td>
      <td class="text-right font-mono">${s.unitCost?L(s.unitCost):"—"}</td>
      <td class="text-right amount font-mono">${L(s.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${r}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join(""),t&&(t.style.display="",document.getElementById("modal-pur-total").textContent=L(e)),n.querySelectorAll(".btn-remove-pur-item").forEach(s=>{s.addEventListener("click",()=>{const r=parseInt(s.dataset.index),i=zt.splice(r,1)[0];Hm(),$(`${i.itemName} removed`,"warning",1500)})})}let $r=[],Pa=[],ka=[],xa=[],Da=[];async function KE(n){var e,s;n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">analytics</span>
        <div>
          <h2 class="view-title">Reports</h2>
          <p class="view-subtitle">End of Day & Business Reports</p>
        </div>
      </div>
      <div class="date-filter">
        <label class="form-label" style="margin:0;white-space:nowrap">Report Date:</label>
        <input type="date" class="form-input" id="report-date" value="${us()}">
        <button class="btn btn-secondary" id="btn-generate-report">
          <span class="material-symbols-outlined">refresh</span> Generate
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab-btn active" data-tab="sales">
        <span class="material-symbols-outlined" style="font-size:18px">point_of_sale</span> Sales Report
      </button>
      <button class="tab-btn" data-tab="incentive">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Waiter Incentive
      </button>
      <button class="tab-btn" data-tab="consumption">
        <span class="material-symbols-outlined" style="font-size:18px">inventory_2</span> Ingredient Consumption
      </button>
      <button class="tab-btn" data-tab="purchase">
        <span class="material-symbols-outlined" style="font-size:18px">shopping_cart</span> Purchase Report
      </button>
      <button class="tab-btn" data-tab="product-stock">
        <span class="material-symbols-outlined" style="font-size:18px">local_drink</span> Product Stock
      </button>
      <button class="tab-btn" data-tab="expenses">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Expense Report
      </button>
      <button class="tab-btn" data-tab="custom-range">
        <span class="material-symbols-outlined" style="font-size:18px">calendar_month</span> Custom Range
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content active" id="tab-sales"></div>
    <div class="tab-content" id="tab-incentive"></div>
    <div class="tab-content" id="tab-consumption"></div>
    <div class="tab-content" id="tab-purchase"></div>
    <div class="tab-content" id="tab-product-stock"></div>
    <div class="tab-content" id="tab-expenses"></div>
    <div class="tab-content" id="tab-custom-range"></div>
  `,n.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{n.querySelectorAll(".tab-btn").forEach(i=>i.classList.remove("active")),n.querySelectorAll(".tab-content").forEach(i=>i.classList.remove("active")),r.classList.add("active"),document.getElementById(`tab-${r.dataset.tab}`).classList.add("active")})});const t=()=>QE(n);(e=document.getElementById("report-date"))==null||e.addEventListener("change",t),(s=document.getElementById("btn-generate-report"))==null||s.addEventListener("click",t),t()}async function QE(n){var p;const t=((p=document.getElementById("report-date"))==null?void 0:p.value)||us();$r.length===0&&($r=await x.getAll("items")),Pa.length===0&&(Pa=await x.getAll("suppliers")),ka.length===0&&(ka=await x.getAll("ingredients")),xa.length===0&&(xa=await x.getAll("itemIngredients")),Da.length===0&&(Da=await x.getAll("grocerySuppliers"));const e=await x.getByIndex("orders","status","billed"),s=await x.getAll("purchases"),r=await x.getAll("expenses"),i=await x.getAll("stockAdjustments"),o=e.filter(_=>{const C=_.billedAt||_.createdAt;return C&&C.startsWith(t)}),l=i.filter(_=>_.date===t),u=Object.fromEntries($r.map(_=>[_.id,_])),c=Object.fromEntries(Pa.map(_=>[_.id,_])),h=Object.fromEntries(ka.map(_=>[_.id,_])),f=Object.fromEntries(Da.map(_=>[_.id,_]));JE(n,o,u,t,l),YE(n,o,u,c,t),ZE(n,o,xa,h),tw(n,s,h,u,f,t),ew(o,s,$r,t,i),XE(n,r,t),nw(n,e,u,c)}function JE(n,t,e,s,r=[]){const i=document.getElementById("tab-sales"),o=t.length,l=t.reduce((b,v)=>b+v.totalAmount,0),u={};t.forEach(b=>{b.items.forEach(v=>{var w;const y=v.itemId;u[y]||(u[y]={name:v.itemName,category:v.category||((w=e[v.itemId])==null?void 0:w.category)||"",quantity:0,amount:0}),u[y].quantity+=v.quantity,u[y].amount+=v.amount})});const c=Object.values(u).sort((b,v)=>v.amount-b.amount),h=c.reduce((b,v)=>b+v.quantity,0),f=c.filter(b=>(b.category||"").toUpperCase().trim()==="LIQUOR"),p=c.filter(b=>(b.category||"").toUpperCase().trim()!=="LIQUOR"),_=f.reduce((b,v)=>b+v.quantity,0),C=f.reduce((b,v)=>b+v.amount,0),A=p.reduce((b,v)=>b+v.quantity,0),S=p.reduce((b,v)=>b+v.amount,0),N=r.filter(b=>b.adjustedQty>0).map(b=>({name:b.productName,category:b.category,quantity:b.adjustedQty,amount:b.adjustedAmount})),O=N.reduce((b,v)=>b+v.quantity,0),U=N.reduce((b,v)=>b+v.amount,0),tt=h+O,st=l+U,at=(b,v,y,w,E,T="")=>y.length===0?"":`
      <div class="card mb-2" ${T}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${v} ${b} — ${$t(s)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${w} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${L(E)}</span>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty Sold</th>
              <th class="text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${y.map((I,K)=>`
              <tr>
                <td class="text-muted">${K+1}</td>
                <td><strong>${I.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${I.category}</span></td>
                <td class="text-right font-mono">${I.quantity}</td>
                <td class="text-right amount font-mono">${L(I.amount)}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Subtotal</td>
              <td class="text-right font-mono">${w}</td>
              <td class="text-right amount total font-mono">${L(E)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;i.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div><div class="stat-value">${o}</div><div class="stat-label">Total Bills</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${L(st)}</div><div class="stat-label">Total Sales ${U>0?"(incl. Counter)":""}</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${tt}</div><div class="stat-label">Items Sold</div></div>
      </div>
      ${U>0?`
      <div class="stat-card">
        <div class="stat-icon" style="background:#f59e0b20;color:#d97706"><span class="material-symbols-outlined">storefront</span></div>
        <div><div class="stat-value">${L(U)}</div><div class="stat-label">Counter Sales (Unbilled)</div></div>
      </div>
      `:`
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">avg_pace</span></div>
        <div><div class="stat-value">${o>0?L(l/o):"₹0"}</div><div class="stat-label">Avg Bill Value</div></div>
      </div>
      `}
    </div>

    ${c.length===0&&N.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>':`
        ${at("Liquor Sales","🍺",f,_,C)}
        ${at("Other Sales","🍽️",p,A,S)}
        ${at("Counter Sales (Stock Adjusted)","🏪",N,O,U,'style="border-left:3px solid #d97706"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              ${U>0?`
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Billed Sales</td>
                <td class="text-right font-mono" style="padding:12px 16px">${h}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${L(l)}</td>
              </tr>
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${O}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${L(U)}</td>
              </tr>
              `:""}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${tt}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${L(st)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `}
  `}function YE(n,t,e,s,r){const i=document.getElementById("tab-incentive"),o={};t.forEach(h=>{if(!h.supplierId)return;const f=s[h.supplierId];!f||!f.incentiveEnabled||(o[h.supplierId]||(o[h.supplierId]={name:f.name,items:{},totalSales:0,totalIncentive:0}),h.items.forEach(p=>{var S,N;if((p.category||((S=e[p.itemId])==null?void 0:S.category)||"").toUpperCase().trim()==="LIQUOR")return;const C=p.incentivePercent||((N=e[p.itemId])==null?void 0:N.incentivePercent)||0,A=p.amount*C/100;o[h.supplierId].items[p.itemId]||(o[h.supplierId].items[p.itemId]={name:p.itemName,quantity:0,amount:0,incentivePercent:C,incentiveAmount:0}),o[h.supplierId].items[p.itemId].quantity+=p.quantity,o[h.supplierId].items[p.itemId].amount+=p.amount,o[h.supplierId].items[p.itemId].incentiveAmount+=A,o[h.supplierId].totalSales+=p.amount,o[h.supplierId].totalIncentive+=A}))});const u=Object.entries(o).filter(([h,f])=>Object.keys(f.items).length>0).map(([h,f])=>({...f,_id:h})),c=u.reduce((h,f)=>h+f.totalIncentive,0);i.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${L(c)}</div><div class="stat-label">Total Incentives</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div><div class="stat-value">${u.length}</div><div class="stat-label">Waiters</div></div>
      </div>
    </div>

    ${u.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>':u.map(h=>`
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${h.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${L(h.totalIncentive)}</span>
              ${h.totalIncentive>0?`
              <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${h._id}" title="Print Incentive Slip">
                <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
              </button>
              `:""}
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Sale Amount</th>
                <th class="text-right">Incentive %</th>
                <th class="text-right">Incentive Amount</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(h.items).map(f=>`
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td class="text-right font-mono">${f.quantity}</td>
                  <td class="text-right font-mono">${L(f.amount)}</td>
                  <td class="text-right font-mono">${f.incentivePercent}%</td>
                  <td class="text-right amount font-mono">${L(f.incentiveAmount)}</td>
                </tr>
              `).join("")}
            </tbody>
            <tfoot>
              <tr style="font-weight:700">
                <td colspan="2">Total</td>
                <td class="text-right font-mono">${L(h.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${L(h.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join("")}
  `,i.querySelectorAll(".btn-print-incentive").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.waiterId,p=o[f];if(p){const _=PE(p,r);Rt(_)}})})}function XE(n,t,e){const s=document.getElementById("tab-expenses"),r=t.filter(l=>l.date===e),i=r.reduce((l,u)=>l+(Number(u.amount)||0),0),o={};r.forEach(l=>{o[l.category]=(o[l.category]||0)+Number(l.amount)}),s.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${L(i)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(o).length}</div><div class="stat-label">Categories</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${r.length}</div><div class="stat-label">Entries</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Daily Expenses — ${$t(e)}</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${r.length===0?'<tr><td colspan="4"><div class="empty-state" style="padding:30px"><p>No expenses recorded for this date</p></div></td></tr>':r.map((l,u)=>`
              <tr>
                <td class="text-muted">${u+1}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${l.category}</span></td>
                <td><strong>${l.description}</strong></td>
                <td class="text-right amount font-mono">${L(l.amount)}</td>
              </tr>
            `).join("")}
        </tbody>
        ${r.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${L(i)}</td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>

    ${Object.keys(o).length>0?`
      <div class="card mt-2">
        <div class="card-header">
          <span class="card-title">Category Breakdown</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-right">Total Amount</th>
              <th class="text-right">% of Total</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(o).sort((l,u)=>u[1]-l[1]).map(([l,u])=>`
              <tr>
                <td><strong>${l}</strong></td>
                <td class="text-right font-mono">${L(u)}</td>
                <td class="text-right font-mono">${i>0?(u/i*100).toFixed(1):"0.0"}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `:""}
  `}function ZE(n,t,e,s,r){const i=document.getElementById("tab-consumption"),o={};t.forEach(u=>{u.items.forEach(c=>{e.filter(f=>f.itemId===c.itemId).forEach(f=>{const p=s[f.ingredientId];if(!p)return;o[f.ingredientId]||(o[f.ingredientId]={name:p.name,unit:p.unit,totalConsumed:0,currentStock:p.currentStock||0,itemBreakdown:{}});const _=f.quantity*c.quantity;o[f.ingredientId].totalConsumed+=_,o[f.ingredientId].itemBreakdown[c.itemId]||(o[f.ingredientId].itemBreakdown[c.itemId]={itemName:c.itemName,qtySold:0,perUnit:f.quantity,totalUsed:0}),o[f.ingredientId].itemBreakdown[c.itemId].qtySold+=c.quantity,o[f.ingredientId].itemBreakdown[c.itemId].totalUsed+=_})})});const l=Object.values(o).sort((u,c)=>c.totalConsumed-u.totalConsumed);i.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${l.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

    ${l.length===0?'<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">inventory_2</span><p>No consumption data for this date</p></div></div>':`<div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th class="text-right">Total Consumed</th>
              <th>Unit</th>
              <th class="text-right">Current Stock</th>
              <th>Breakdown</th>
            </tr>
          </thead>
          <tbody>
            ${l.map(u=>`
              <tr>
                <td><strong>${u.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--danger)">${u.totalConsumed.toFixed(1)}</td>
                <td>${u.unit}</td>
                <td class="text-right font-mono ${u.currentStock<u.totalConsumed?"text-danger":"text-success"}">${u.currentStock.toFixed(1)} ${u.unit}</td>
                <td class="text-muted" style="font-size:0.78rem">
                  ${Object.values(u.itemBreakdown).map(c=>`${c.itemName}: ${c.qtySold} × ${c.perUnit}${u.unit} = ${c.totalUsed.toFixed(1)}${u.unit}`).join(" | ")}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>`}
  `}function tw(n,t,e,s,r,i){const o=document.getElementById("tab-purchase"),l=t.filter(c=>c.date===i),u=l.reduce((c,h)=>c+(h.cost||0),0);l.reduce((c,h)=>c+(h.quantity||0),0),o.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${l.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${L(u)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Purchases — ${$t(i)}</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Quantity</th>
            <th>Unit</th>
            <th class="text-right">Cost</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          ${l.length===0?'<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>':l.map((c,h)=>{let f,p;if(c.productId){const C=s[c.productId];f=((C==null?void 0:C.name)||"Unknown")+' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>',p="pcs"}else{const C=e[c.ingredientId];f=(C==null?void 0:C.name)||"Unknown",p=(C==null?void 0:C.unit)||"—"}const _=r[c.supplierId];return`
                <tr>
                  <td class="text-muted">${h+1}</td>
                  <td><strong>${f}</strong></td>
                  <td class="text-right font-mono">${c.quantity}</td>
                  <td>${p}</td>
                  <td class="text-right amount font-mono">${L(c.cost)}</td>
                  <td>${(_==null?void 0:_.name)||"—"}</td>
                </tr>
              `}).join("")}
        </tbody>
        ${l.length>0?`
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${L(u)}</td>
              <td></td>
            </tr>
          </tfoot>
        `:""}
      </table>
    </div>
  `}function ew(n,t,e,s,r=[]){var b,v;const i=document.getElementById("tab-product-stock"),o=["COOL DRINKS","CIGARETTE","CIGARATE","CIGARETTES"],l=e.filter(y=>o.includes((y.category||"").toUpperCase().trim()));if(l.length===0){i.innerHTML='<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>';return}const u=new Date(s+"T00:00:00Z");u.setUTCDate(u.getUTCDate()-1);const c=u.toISOString().split("T")[0],h=r.filter(y=>y.date===c),f=Object.fromEntries(h.map(y=>[y.productId,y])),p=t.filter(y=>y.productId&&y.date<s),_=t.filter(y=>y.date===s&&y.productId),C=l.map(y=>{const w=_.filter(lt=>lt.productId===y.id).reduce((lt,ut)=>lt+(ut.quantity||0),0),E=_.filter(lt=>lt.productId===y.id).reduce((lt,ut)=>lt+(ut.cost||0),0);let T=0,I=0;n.forEach(lt=>{(lt.items||[]).forEach(ut=>{ut.itemId===y.id&&(T+=ut.quantity,I+=ut.amount||ut.quantity*ut.price)})});let K;f[y.id]?K=f[y.id].actualClosing:RE(s)?K=(y.currentStock||0)+T-w:K=p.filter(lt=>lt.productId===y.id).reduce((lt,ut)=>lt+(ut.quantity||0),0);const et=Math.max(0,K+w-T);return{id:y.id,name:y.name,category:y.category,currentStock:y.currentStock||0,openingStock:K,purchased:w,purchaseCost:E,sold:T,saleAmount:I,expectedClosing:et}}),A=C.reduce((y,w)=>y+w.openingStock,0),S=C.reduce((y,w)=>y+w.purchased,0),N=C.reduce((y,w)=>y+w.sold,0),O=C.reduce((y,w)=>y+w.purchaseCost,0),U=C.reduce((y,w)=>y+w.saleAmount,0),tt=C.reduce((y,w)=>y+w.expectedClosing,0),st={};C.forEach(y=>{st[y.category]||(st[y.category]=[]),st[y.category].push(y)}),i.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${A}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${N}</div><div class="stat-label">Sold (${$t(s)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${L(U)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${tt}</div><div class="stat-label">Expected Closing</div></div>
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;margin-bottom:12px;gap:8px">
      <button class="btn btn-secondary" id="btn-print-product-stock">
        <span class="material-symbols-outlined">print</span> Print Stock Report
      </button>
      <button class="btn btn-primary" id="btn-save-closing-stock">
        <span class="material-symbols-outlined">save</span> Save Closing Stock
      </button>
    </div>

    ${Object.entries(st).map(([y,w])=>`
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${y.toUpperCase().includes("COOL")?"🥤":"🚬"} ${y} — ${$t(s)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th class="text-right">Opening Stock</th>
              <th class="text-right">Purchased</th>
              <th class="text-right">Sold</th>
              <th class="text-right">Sale Amount</th>
              <th class="text-right">Expected Closing</th>
              <th class="text-right" style="background:var(--primary-light, #e0e7ff);color:var(--primary)">Actual Closing Stock</th>
            </tr>
          </thead>
          <tbody>
            ${w.map(E=>`
              <tr>
                <td><strong>${E.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${E.openingStock}</td>
                <td class="text-right font-mono">${E.purchased>0?`<span class="text-success">+${E.purchased}</span>`:"—"}</td>
                <td class="text-right font-mono">${E.sold>0?`<span class="text-danger">-${E.sold}</span>`:"—"}</td>
                <td class="text-right font-mono">${E.saleAmount>0?L(E.saleAmount):"—"}</td>
                <td class="text-right font-mono" style="font-weight:600">${E.expectedClosing}</td>
                <td class="text-right" style="background:var(--primary-light, #e0e7ff)">
                  <input type="number" class="form-input closing-stock-input" 
                    data-product-id="${E.id}" 
                    value="${E.expectedClosing}" 
                    min="0" 
                    style="width:80px;text-align:center;padding:4px 8px;font-weight:700;font-size:0.95rem;margin:0 0 0 auto;display:block"
                  >
                </td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td>Total</td>
              <td class="text-right font-mono">${w.reduce((E,T)=>E+T.openingStock,0)}</td>
              <td class="text-right font-mono text-success">+${w.reduce((E,T)=>E+T.purchased,0)}</td>
              <td class="text-right font-mono text-danger">-${w.reduce((E,T)=>E+T.sold,0)}</td>
              <td class="text-right font-mono">${L(w.reduce((E,T)=>E+T.saleAmount,0))}</td>
              <td class="text-right font-mono">${w.reduce((E,T)=>E+T.expectedClosing,0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${y.replace(/\s+/g,"-").toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join("")}
  `;function at(){Object.keys(st).forEach(y=>{const w=document.getElementById(`closing-stock-total-${y.replace(/\s+/g,"-").toLowerCase()}`);if(!w)return;let E=0;st[y].forEach(T=>{const I=i.querySelector(`.closing-stock-input[data-product-id="${T.id}"]`);E+=parseInt(I==null?void 0:I.value)||0}),w.textContent=E})}at(),i.querySelectorAll(".closing-stock-input").forEach(y=>{y.addEventListener("input",at)}),(b=document.getElementById("btn-save-closing-stock"))==null||b.addEventListener("click",async()=>{var et;const y=i.querySelectorAll(".closing-stock-input");let w=0,E=0;const T=await x.getAll("stockAdjustments");for(const lt of T.filter(ut=>ut.date===s))await x.remove("stockAdjustments",lt.id);for(const lt of y){const ut=parseInt(lt.dataset.productId),Ce=parseInt(lt.value)||0,me=C.find(vr=>vr.id===ut),pe=await x.getById("items",ut);if(!pe||!me)continue;pe.currentStock=Ce,await x.update("items",pe),w++;const Cn=me.expectedClosing-Ce,yr=Cn*(pe.sellingPrice||0);await x.add("stockAdjustments",{productId:ut,productName:pe.name,category:pe.category,date:s,openingStock:me.openingStock,expectedClosing:me.expectedClosing,actualClosing:Ce,adjustedQty:Cn,adjustedAmount:yr,sellingPrice:pe.sellingPrice||0,createdAt:new Date().toISOString()}),Cn!==0&&E++}const I=E>0?`Stock updated for ${w} product(s) with ${E} adjustment(s). Sales Report updated!`:`Stock updated for ${w} product(s). No adjustments needed.`;$(I,"success"),document.getElementById("report-date")&&((et=document.getElementById("btn-generate-report"))==null||et.click())}),(v=document.getElementById("btn-print-product-stock"))==null||v.addEventListener("click",()=>{const y={};i.querySelectorAll(".closing-stock-input").forEach(E=>{y[E.dataset.productId]=parseInt(E.value)||0});let w=`
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${$t(s)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString("en-IN")}</span></div>
      </div>
    `;Object.entries(st).forEach(([E,T])=>{const I=E.toUpperCase().includes("COOL")?"🥤":"🚬";w+=`
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${I} ${E}
        </div>
        <table class="print-items" style="width:100%;border-collapse:collapse;margin-top:4px">
          <thead>
            <tr>
              <th style="text-align:left;padding:4px 6px;border-bottom:1px solid #000">Product</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Opening</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Purchased</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Sold</th>
              <th style="text-align:right;padding:4px 6px;border-bottom:1px solid #000">Sale Amt</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Expected</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Actual</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Diff</th>
            </tr>
          </thead>
          <tbody>
      `;let K={opening:0,purchased:0,sold:0,saleAmount:0,expected:0,actual:0,diff:0};T.forEach(et=>{const lt=y[et.id]??et.expectedClosing,ut=et.expectedClosing-lt;K.opening+=et.openingStock,K.purchased+=et.purchased,K.sold+=et.sold,K.saleAmount+=et.saleAmount,K.expected+=et.expectedClosing,K.actual+=lt,K.diff+=ut,w+=`
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${et.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${et.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${et.purchased>0?"+"+et.purchased:"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${et.sold>0?"-"+et.sold:"-"}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${et.saleAmount>0?L(et.saleAmount):"-"}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${et.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${lt}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${ut!==0?"font-weight:700":""}">${ut!==0?ut:"-"}</td>
            </tr>
        `}),w+=`
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${K.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${K.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${K.sold}</td>
              <td style="text-align:right;padding:4px 6px">${L(K.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${K.expected}</td>
              <td style="text-align:center;padding:4px 6px">${K.actual}</td>
              <td style="text-align:center;padding:4px 6px">${K.diff!==0?K.diff:"-"}</td>
            </tr>
          </tfoot>
        </table>
      `}),w+=`
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${A}</span>
          <span>Purchased: +${S}</span>
          <span>Sold: -${N}</span>
          <span>Expected: ${tt}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${L(U)}</span>
          <span>Purchase Cost: ${L(O)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `,Rt(w,"a4")})}function nw(n,t,e,s){var p,_;const r=document.getElementById("tab-custom-range"),i=(p=document.getElementById("custom-start-date"))==null?void 0:p.value,o=(_=document.getElementById("custom-end-date"))==null?void 0:_.value,l=new Date,u=new Date(l.getFullYear(),l.getMonth(),1).toISOString().split("T")[0],c=l.toISOString().split("T")[0],h=i||u,f=o||c;r.querySelector(".custom-range-controls")||(r.innerHTML=`
      <div class="card mb-4 custom-range-controls" style="background:var(--bg-elevated); padding:16px;">
        <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap">
          <div>
            <label class="form-label" style="margin-bottom:4px;">From Date</label>
            <input type="date" class="form-input" id="custom-start-date" value="${h}">
          </div>
          <div>
            <label class="form-label" style="margin-bottom:4px;">To Date</label>
            <input type="date" class="form-input" id="custom-end-date" value="${f}">
          </div>
          <button class="btn btn-primary" id="btn-generate-custom-range">
            <span class="material-symbols-outlined">analytics</span> Generate Range Report
          </button>
        </div>
      </div>
      <div id="custom-range-results"></div>
    `,r.querySelector("#btn-generate-custom-range").addEventListener("click",()=>{Ku(t,e,s)})),Ku(t,e,s)}function Ku(n,t,e){const s=document.getElementById("custom-range-results");if(!s)return;const r=document.getElementById("custom-start-date").value,i=document.getElementById("custom-end-date").value;if(!r||!i){s.innerHTML='<p class="text-danger">Please select both start and end dates.</p>';return}const o=n.filter(p=>{if(p.status!=="billed")return!1;const _=(p.billedAt||p.createdAt||"").substring(0,10);return _?_>=r&&_<=i:!1});if(o.length===0){s.innerHTML=`
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${$t(r)} to ${$t(i)}).</p>
        </div>
      </div>
    `;return}const l=o.reduce((p,_)=>p+_.totalAmount,0),u={},c={};o.forEach(p=>{if(p.supplierId){const _=e[p.supplierId];_&&(c[p.supplierId]||(c[p.supplierId]={name:_.name,totalAmount:0,orderCount:0}),c[p.supplierId].totalAmount+=p.totalAmount,c[p.supplierId].orderCount+=1)}p.items.forEach(_=>{var A;const C=_.itemId;u[C]||(u[C]={name:_.itemName,category:_.category||((A=t[_.itemId])==null?void 0:A.category)||"",quantity:0,amount:0}),u[C].quantity+=_.quantity,u[C].amount+=_.amount})});const h=Object.values(u).sort((p,_)=>_.amount-p.amount),f=Object.values(c).sort((p,_)=>_.totalAmount-p.totalAmount);s.innerHTML=`
    <div class="stats-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div>
          <div class="stat-value">${L(l)}</div>
          <div class="stat-label">Total Sales (Range)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div>
          <div class="stat-value">${o.length}</div>
          <div class="stat-label">Total Bills (Range)</div>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:20px;">
      <!-- Item Sales -->
      <div class="card" style="margin-bottom:0px;">
        <div class="card-header">
          <span class="card-title">🍽️ Items Sold</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${h.map(p=>`
              <tr>
                <td><strong>${p.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${p.category}</span></td>
                <td class="text-right font-mono">${p.quantity}</td>
                <td class="text-right amount font-mono">${L(p.amount)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Waiter Sales -->
      <div class="card" style="margin-bottom:0px;align-self: flex-start;">
        <div class="card-header">
          <span class="card-title">👨‍🍳 Waiter Performance</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Waiter Name</th>
              <th class="text-right">Bills Handled</th>
              <th class="text-right">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            ${f.length>0?f.map(p=>`
              <tr>
                <td><strong>${p.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--text-secondary)">${p.orderCount}</td>
                <td class="text-right amount font-mono" style="color:var(--success); font-weight:700;">${L(p.totalAmount)}</td>
              </tr>
            `).join(""):'<tr><td colspan="3" class="text-muted" style="text-align:center;padding:20px;">No waiter data recorded in bills layer</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `}async function Wi(n){var u;const t=await x.getAll("grocerySuppliers"),e=await x.getAll("supplierBills"),s=await x.getAll("supplierPayments"),r={};t.forEach(c=>{const h=e.filter(C=>C.supplierId===c.id),f=s.filter(C=>C.supplierId===c.id),p=h.reduce((C,A)=>C+(A.totalAmount||0),0),_=f.reduce((C,A)=>C+(A.amount||0),0);r[c.id]={totalBilled:p,totalPaid:_,outstanding:p-_,billCount:h.length}});const i=Object.values(r).reduce((c,h)=>c+h.outstanding,0),o=Object.values(r).reduce((c,h)=>c+h.totalBilled,0),l=Object.values(r).reduce((c,h)=>c+h.totalPaid,0);n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${t.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${nt.isAdmin()?`
        <button class="btn btn-primary" id="btn-add-gsupplier">
          <span class="material-symbols-outlined">add</span> Add Supplier
        </button>
        `:""}
      </div>
    </div>

    <!-- Outstanding Summary Cards -->
    <div class="stats-grid" style="margin-bottom:16px">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${L(o)}</div><div class="stat-label">Total Billed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${L(l)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${i>0?"orange":"green"}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${L(i)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    <!-- Supplier List -->
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th class="text-right">Total Billed</th>
            <th class="text-right">Paid</th>
            <th class="text-right">Outstanding</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${t.length===0?`
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">local_shipping</span><p>No suppliers added yet</p></div></td></tr>
          `:t.map(c=>{const h=r[c.id]||{totalBilled:0,totalPaid:0,outstanding:0};return`
            <tr>
              <td class="text-muted">${c.id}</td>
              <td><strong>${c.name}</strong>${c.gstNumber?`<br><span class="text-muted" style="font-size:0.75rem">GST: ${c.gstNumber}</span>`:""}</td>
              <td>${c.contact||"—"}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.address||"—"}</td>
              <td class="text-right font-mono">${L(h.totalBilled)}</td>
              <td class="text-right font-mono text-success">${L(h.totalPaid)}</td>
              <td class="text-right font-mono ${h.outstanding>0?"text-danger":"text-success"}" style="font-weight:600">
                ${L(h.outstanding)}
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-success btn-add-payment" data-id="${c.id}" title="Add Payment">
                    <span class="material-symbols-outlined" style="font-size:14px">payments</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-view-ledger" data-id="${c.id}" title="View Ledger">
                    <span class="material-symbols-outlined" style="font-size:14px">account_balance</span>
                  </button>
                  ${nt.isAdmin()?`
                  <button class="btn btn-sm btn-ghost btn-edit-gsupplier" data-id="${c.id}" title="Edit">
                    <span class="material-symbols-outlined" style="font-size:14px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-gsupplier" data-id="${c.id}" title="Delete">
                    <span class="material-symbols-outlined" style="font-size:14px">delete</span>
                  </button>
                  `:""}
                </div>
              </td>
            </tr>
          `}).join("")}
        </tbody>
      </table>
    </div>
  `,(u=document.getElementById("btn-add-gsupplier"))==null||u.addEventListener("click",()=>Qu(null,n)),n.querySelectorAll(".btn-edit-gsupplier").forEach(c=>{c.addEventListener("click",async()=>{const h=await x.getById("grocerySuppliers",parseInt(c.dataset.id));h&&Qu(h,n)})}),n.querySelectorAll(".btn-delete-gsupplier").forEach(c=>{c.addEventListener("click",async()=>{const h=parseInt(c.dataset.id),f=await x.getById("grocerySuppliers",h);f&&confirm(`Delete supplier "${f.name}"?`)&&(await x.remove("grocerySuppliers",h),$(`"${f.name}" deleted`,"warning"),Wi(n))})}),n.querySelectorAll(".btn-add-payment").forEach(c=>{c.addEventListener("click",async()=>{const h=parseInt(c.dataset.id),f=await x.getById("grocerySuppliers",h),p=r[h]||{outstanding:0};f&&sw(f,p.outstanding,n)})}),n.querySelectorAll(".btn-view-ledger").forEach(c=>{c.addEventListener("click",async()=>{const h=parseInt(c.dataset.id),f=await x.getById("grocerySuppliers",h);f&&rw(f)})})}function Qu(n,t){var s;const e=!!n;qt(e?"Edit Supplier":"Add New Supplier",`
    <div class="form-group">
      <label class="form-label">Supplier Name *</label>
      <input type="text" class="form-input" id="modal-gs-name" value="${(n==null?void 0:n.name)||""}" placeholder="e.g. Metro Wholesale">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Contact Number</label>
        <input type="text" class="form-input" id="modal-gs-contact" value="${(n==null?void 0:n.contact)||""}" placeholder="Phone number">
      </div>
      <div class="form-group">
        <label class="form-label">GST Number</label>
        <input type="text" class="form-input" id="modal-gs-gst" value="${(n==null?void 0:n.gstNumber)||""}" placeholder="GST number (optional)">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Address</label>
      <input type="text" class="form-input" id="modal-gs-address" value="${(n==null?void 0:n.address)||""}" placeholder="Address">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-gs-active" ${(n==null?void 0:n.active)!==!1?"checked":""}>
      <label for="modal-gs-active">Active</label>
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-gs-save"><span class="material-symbols-outlined">save</span> ${e?"Update":"Save"}</button>
    `}),(s=document.getElementById("modal-gs-save"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("modal-gs-name").value.trim();if(!r){$("Supplier name is required","error");return}const i={name:r,contact:document.getElementById("modal-gs-contact").value.trim(),gstNumber:document.getElementById("modal-gs-gst").value.trim(),address:document.getElementById("modal-gs-address").value.trim(),active:document.getElementById("modal-gs-active").checked,createdAt:(n==null?void 0:n.createdAt)||new Date().toISOString()};e?(i.id=n.id,await x.update("grocerySuppliers",i),$(`"${r}" updated`,"success")):(await x.add("grocerySuppliers",i),$(`"${r}" added`,"success")),Kt(),Wi(t)})}function sw(n,t,e){var r;const s=new Date().toISOString().split("T")[0];qt(`Record Payment — ${n.name}`,`
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${t>0?"text-danger":"text-success"}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${L(t)}
      </span>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Payment Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-pay-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="modal-pay-date" value="${s}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Payment Mode</label>
      <select class="form-select" id="modal-pay-mode">
        <option value="cash">Cash</option>
        <option value="bank">Bank Transfer</option>
        <option value="upi">UPI</option>
        <option value="cheque">Cheque</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input type="text" class="form-input" id="modal-pay-notes" placeholder="Optional reference or notes">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-success" id="modal-pay-save"><span class="material-symbols-outlined">payments</span> Record Payment</button>
    `}),(r=document.getElementById("modal-pay-save"))==null||r.addEventListener("click",async()=>{const i=parseFloat(document.getElementById("modal-pay-amount").value)||0,o=document.getElementById("modal-pay-date").value;if(i<=0||!o){$("Please enter amount and date","error");return}const l={supplierId:n.id,billId:null,amount:i,paymentDate:o,paymentMode:document.getElementById("modal-pay-mode").value,notes:document.getElementById("modal-pay-notes").value.trim(),createdAt:new Date().toISOString()},u=await x.add("supplierPayments",l);await x.recordWalletTransaction("purchase",i,`Supplier Payment: ${n.name} (${l.paymentMode.toUpperCase()})`,u),$(`Payment of ${L(i)} recorded for ${n.name}`,"success"),Kt(),Wi(e)})}async function rw(n,t){const e=(await x.getAll("supplierBills")).filter(h=>h.supplierId===n.id),s=(await x.getAll("supplierPayments")).filter(h=>h.supplierId===n.id),r=[...e.map(h=>({type:"bill",date:h.billDate,ref:h.billNumber,description:h.description||"Bill",amount:h.totalAmount,id:h.id,createdAt:h.createdAt})),...s.map(h=>{var f;return{type:"payment",date:h.paymentDate,ref:(f=h.paymentMode)==null?void 0:f.toUpperCase(),description:h.notes||"Payment",amount:h.amount,id:h.id,createdAt:h.createdAt}})].sort((h,f)=>new Date(h.date)-new Date(f.date));let i=0;const o=r.map(h=>(h.type==="bill"?i+=h.amount:i-=h.amount,{...h,balance:i})),l=e.reduce((h,f)=>h+f.totalAmount,0),u=s.reduce((h,f)=>h+f.amount,0),c=l-u;qt(`Ledger — ${n.name}`,`
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(3,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${L(l)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${L(u)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${c>0?"text-danger":"text-success"}" style="font-size:1rem">${L(c)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    ${o.length===0?'<div class="empty-state" style="padding:30px"><p>No transactions recorded</p></div>':`
    <div style="max-height:400px;overflow-y:auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Reference</th>
            <th>Description</th>
            <th class="text-right">Debit</th>
            <th class="text-right">Credit</th>
            <th class="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          ${o.map(h=>`
            <tr>
              <td class="text-muted">${$t(h.date)}</td>
              <td>
                <span class="order-info-badge ${h.type==="bill"?"badge-kot":"badge-bill"}" style="font-size:0.7rem">
                  ${h.type==="bill"?"📄 BILL":"💰 PAID"}
                </span>
              </td>
              <td><strong>${h.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h.description}</td>
              <td class="text-right font-mono ${h.type==="bill"?"text-danger":""}">${h.type==="bill"?L(h.amount):"—"}</td>
              <td class="text-right font-mono ${h.type==="payment"?"text-success":""}">${h.type==="payment"?L(h.amount):"—"}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${h.balance>0?"var(--danger)":"var(--success)"}">${L(h.balance)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    `}
  `,{large:!0})}async function iw(n){var t;n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">payments</span>
        <div>
          <h2 class="view-title">Daily Expenses</h2>
          <p class="view-subtitle">Manage and track your restaurant's daily expenses</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="date-filter">
          <label class="form-label" style="margin:0;white-space:nowrap">Filter Date:</label>
          <input type="date" class="form-input" id="expense-filter-date" value="${us()}">
        </div>
        <button class="btn btn-primary" id="btn-add-expense">
          <span class="material-symbols-outlined">add</span> Add Expense
        </button>
      </div>
    </div>

    <div class="stats-grid" id="expense-summary">
      <!-- Summary cards will be rendered here -->
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Expense Log</span>
        <div class="card-actions">
          <button class="btn btn-sm btn-secondary" id="btn-print-expenses">
            <span class="material-symbols-outlined">print</span> Print Report
          </button>
        </div>
      </div>
      <table class="data-table" id="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
            ${nt.isAdmin()?'<th class="text-center">Actions</th>':""}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${nt.isAdmin()?5:4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `,(t=document.getElementById("btn-add-expense"))==null||t.addEventListener("click",()=>cw(n)),document.getElementById("expense-filter-date").onchange=()=>Ei(n),document.getElementById("btn-print-expenses").onclick=()=>lw(),Ei(n)}async function Ei(n){const t=document.getElementById("expense-filter-date").value,s=(await x.getAll("expenses")).filter(r=>r.date===t).sort((r,i)=>new Date(i.createdAt)-new Date(r.createdAt));aw(n,s),ow(n,s)}function aw(n,t){const e=document.getElementById("expenses-list");if(t.length===0){e.innerHTML=`
      <tr>
        <td colspan="${nt.isAdmin()?5:4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;return}e.innerHTML=t.map(s=>`
    <tr>
      <td class="font-mono">${$t(s.date)}</td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${s.category}</span></td>
      <td><strong>${s.description}</strong></td>
      <td class="text-right amount font-mono">${L(s.amount)}</td>
      ${nt.isAdmin()?`
      <td class="text-center">
        <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${s.id}" title="Delete">
          <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
        </button>
      </td>
      `:""}
    </tr>
  `).join(""),e.querySelectorAll(".btn-delete-expense").forEach(s=>{s.onclick=async()=>{confirm("Are you sure you want to delete this expense?")&&(await x.remove("expenses",s.dataset.id),$("Expense deleted","success"),Ei(n))}})}function ow(n,t){const e=t.reduce((i,o)=>i+Number(o.amount),0),s={};t.forEach(i=>{s[i.category]=(s[i.category]||0)+Number(i.amount)});const r=document.getElementById("expense-summary");r.innerHTML=`
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${L(e)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(s).length}</div>
        <div class="stat-label">Categories Used</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
      <div>
        <div class="stat-value">${t.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `}function cw(n){const e=`
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${["Salary","Rent","Electricity","Cleaning","Grocery","Maintenance","Marketing","Taxes","Others"].map(r=>`<option value="${r}">${r}</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input type="text" class="form-input" id="exp-desc" placeholder="e.g. Milk for tea, Staff breakfast">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (₹)</label>
      <input type="number" class="form-input" id="exp-amount" step="0.01" placeholder="0.00">
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input type="date" class="form-input" id="exp-date" value="${us()}">
    </div>
  `;qt("Add New Expense",e,{footer:`
    <button class="btn btn-secondary" id="btn-cancel-exp">Cancel</button>
    <button class="btn btn-primary" id="btn-save-exp">Save Expense</button>
  `}),document.getElementById("btn-cancel-exp").onclick=Kt,document.getElementById("btn-save-exp").onclick=async()=>{const r=document.getElementById("exp-category").value,i=document.getElementById("exp-desc").value.trim(),o=parseFloat(document.getElementById("exp-amount").value),l=document.getElementById("exp-date").value;if(!i||isNaN(o)||o<=0){$("Please fill all fields accurately","error");return}try{const u=await x.add("expenses",{category:r,description:i,amount:o,date:l,createdAt:new Date().toISOString()});await x.recordWalletTransaction("expense",o,`Expense: ${r} - ${i}`,u),$("Expense recorded!","success"),Kt(),Ei(n)}catch(u){console.error(u),$("Failed to record expense","error")}}}function lw(){const n=document.getElementById("expense-filter-date").value;document.getElementById("expenses-list");const t=document.getElementById("expense-summary").innerHTML,e=document.getElementById("expenses-table").cloneNode(!0);e.querySelectorAll("th:last-child, td:last-child").forEach(r=>r.remove());const s=`
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${$t(n)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${t}
    </div>
    <div class="card">
       ${e.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;Rt(s,"a4")}async function dc(n){var o,l;const t=await x.getAll("walletTransactions");t.sort((u,c)=>new Date(c.createdAt)-new Date(u.createdAt));const e=nt.getCurrentAccount(),s=Number((e==null?void 0:e.walletBalance)||0),r=t.reduce((u,c)=>(c.type==="income"?u.income+=c.amount:u.expense+=c.amount,u),{income:0,expense:0}),i=s+r.income-r.expense;n.innerHTML=`
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">account_balance_wallet</span>
        <div>
          <h2 class="view-title">Wallet Management</h2>
          <p class="view-subtitle">Cash flow tracking and withdrawals</p>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" id="btn-refresh-wallet">
          <span class="material-symbols-outlined">refresh</span>
        </button>
        ${nt.isAdmin()?`
        <button class="btn btn-primary" id="btn-withdraw">
          <span class="material-symbols-outlined">outbox</span> Withdraw Cash
        </button>
        `:""}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(34, 197, 94, 0.1); color: #22c55e">
          <span class="material-symbols-outlined">trending_up</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Income</p>
          <h3 class="stat-value" style="color: #22c55e">${L(r.income)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${L(r.expense)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${L(i)}</h3>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 15px;">
        <h3 class="card-title">Transaction History</h3>
        <div style="display:flex; gap:10px; align-items:center;">
          <div class="form-group" style="margin:0; width:150px">
            <input type="date" class="form-input" id="filter-wallet-date" title="Filter by Date">
          </div>
          <div class="form-group" style="margin:0; width:150px">
            <select class="form-select" id="filter-wallet-type">
              <option value="all">All Types</option>
              <option value="income">Credits (Bills)</option>
              <option value="debit">Debits (All Outflows)</option>
              <option value="expense">Expenses Only</option>
              <option value="purchase">Purchases Only</option>
              <option value="withdrawal">Withdrawals Only</option>
            </select>
          </div>
          <button class="btn btn-sm btn-ghost" id="btn-clear-wallet-filters">Clear</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${Wm(t,s)}
        </tbody>
      </table>
    </div>
  `,(o=document.getElementById("btn-refresh-wallet"))==null||o.addEventListener("click",()=>dc(n)),(l=document.getElementById("btn-withdraw"))==null||l.addEventListener("click",()=>dw(n,i)),uw(n,t,s)}function Wm(n,t){let e="";return t>0&&(e+=`
            <tr style="background: var(--bg-surface)">
              <td class="text-muted">—</td>
              <td><span class="status-badge" style="background:rgba(59, 130, 246, 0.1); color:#3b82f6">OPENING</span></td>
              <td><div style="font-weight:600">Initial Balance (From Database)</div></td>
              <td class="text-right font-mono" style="font-weight:700; color:#3b82f6">+${L(t)}</td>
            </tr>
        `),n.length===0&&t===0?'<tr><td colspan="4"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found</p></div></td></tr>':(e+=n.map(s=>{const r=s.type==="income";return`
            <tr>
              <td class="text-muted" style="white-space:nowrap">${bi(s.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${r?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"}; color:${r?"#22c55e":"#ef4444"}">
                  ${s.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${s.description}</div>
                ${s.sourceId?`<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${s.sourceId}</div>`:""}
              </td>
              <td class="text-right font-mono" style="font-weight:700; color:${r?"#22c55e":"#ef4444"}">
                ${r?"+":"-"}${L(s.amount)}
              </td>
            </tr>`}).join(""),e)}function uw(n,t,e){const s=document.getElementById("filter-wallet-date"),r=document.getElementById("filter-wallet-type"),i=document.getElementById("btn-clear-wallet-filters"),o=document.getElementById("wallet-transactions-body"),l=()=>{const u=s.value,c=r.value;let h=t;u&&(h=h.filter(p=>(p.date||p.createdAt||"").startsWith(u))),c!=="all"&&(c==="debit"?h=h.filter(p=>p.type!=="income"):h=h.filter(p=>p.type===c));const f=!u&&(c==="all"||c==="income");o.innerHTML=Wm(h,f?e:0)};s==null||s.addEventListener("change",l),r==null||r.addEventListener("change",l),i==null||i.addEventListener("click",()=>{s.value="",r.value="all",l()})}function dw(n,t){var e;qt("Withdraw Cash",`
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${L(t)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Amount *</label>
      <input type="number" class="form-input" id="modal-withdraw-amount" placeholder="0.00" min="0.01" max="${t}" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description / Purpose *</label>
      <input type="text" class="form-input" id="modal-withdraw-desc" placeholder="e.g. Bank deposit, Personal use">
    </div>
  `,{footer:`
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-withdrawal">Confirm Withdrawal</button>
    `}),(e=document.getElementById("btn-save-withdrawal"))==null||e.addEventListener("click",async()=>{const s=parseFloat(document.getElementById("modal-withdraw-amount").value),r=document.getElementById("modal-withdraw-desc").value.trim();if(isNaN(s)||s<=0){$("Enter a valid amount","error");return}if(s>t){$("Insufficient wallet balance","error");return}if(!r){$("Description is required","error");return}try{await x.recordWalletTransaction("withdrawal",s,`Withdrawal: ${r}`),$("Withdrawal recorded successfully","success"),Kt(),dc(n)}catch(i){$("Failed to record withdrawal: "+i.message,"error")}})}let Br=null;const Na={orders:{render:DE,destroy:BE},"active-orders":{render:Jr},items:{render:ic},suppliers:{render:ac},ingredients:{render:oc},recipes:{render:cc},tables:{render:lc},purchases:{render:uc},reports:{render:KE},"grocery-suppliers":{render:Wi},expenses:{render:iw},wallet:{render:dc}};async function Xs(n){Br&&(Br(),Br=null),Na[n]||(n="orders");const e=document.getElementById("view-container");e.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>',document.querySelectorAll(".nav-item").forEach(r=>{r.classList.toggle("active",r.dataset.view===n)});const s=Na[n]||Na.orders;await s.render(e),Br=s.destroy||null,location.hash!==`#/${n}`&&history.pushState(null,"",`#/${n}`)}function Ju(){return location.hash.replace("#/","")||"orders"}function hw(){[["alt+1","orders"],["alt+2","active-orders"],["alt+3","items"],["alt+4","suppliers"],["alt+5","ingredients"],["alt+6","recipes"],["alt+7","tables"],["alt+8","purchases"],["alt+9","reports"],["alt+0","grocery-suppliers"],["alt+e","expenses"],["alt+w","wallet"]].forEach(([t,e])=>{dn(t,()=>Xs(e),`Go to ${e}`)}),dn("alt+n",()=>Xs("orders"),"New Order")}function mw(){document.querySelectorAll(".nav-item").forEach(n=>{n.addEventListener("click",t=>{t.preventDefault();const e=n.dataset.view;e&&Xs(e)})})}function pw(n){document.querySelectorAll(".nav-item[data-role]").forEach(t=>{t.dataset.role==="admin"&&n!=="admin"?t.classList.add("role-hidden"):t.classList.remove("role-hidden")})}function fw(n,t){const e=document.getElementById("sidebar-user-name"),s=document.getElementById("sidebar-user-role"),r=document.getElementById("sidebar-restaurant-name"),i=document.getElementById("sidebar-restaurant-subtitle"),o=document.getElementById("join-code-section"),l=document.getElementById("join-code-value");e&&(e.textContent=(n==null?void 0:n.name)||"User"),s&&(s.textContent=(n==null?void 0:n.role)==="admin"?"Admin":"Salesman"),r&&(r.textContent=(t==null?void 0:t.name)||"KOT System"),i&&(i.textContent="Restaurant POS"),(n==null?void 0:n.role)==="admin"&&o&&l&&(t!=null&&t.id)?(o.classList.remove("hidden"),l.textContent=t.id,o.onclick=()=>{navigator.clipboard.writeText(t.id).then(()=>{$("Join code copied!","success")})}):o&&o.classList.add("hidden")}function gw(){var n,t;(n=document.getElementById("auth-page"))==null||n.classList.remove("hidden"),(t=document.getElementById("app"))==null||t.classList.add("hidden")}function yw(){var n,t;(n=document.getElementById("auth-page"))==null||n.classList.add("hidden"),(t=document.getElementById("app"))==null||t.classList.remove("hidden")}function vw(){var h,f,p,_,C;const n=document.getElementById("auth-tab-login"),t=document.getElementById("auth-tab-register"),e=document.getElementById("auth-form-login"),s=document.getElementById("auth-form-register"),r=document.getElementById("auth-error");function i(A){r&&(r.textContent=A,r.classList.remove("hidden"))}function o(){r&&r.classList.add("hidden")}n==null||n.addEventListener("click",()=>{n.classList.add("active"),t.classList.remove("active"),e.classList.remove("hidden"),s.classList.add("hidden"),o()}),t==null||t.addEventListener("click",()=>{t.classList.add("active"),n.classList.remove("active"),s.classList.remove("hidden"),e.classList.add("hidden"),o()});const l=document.getElementById("register-type"),u=document.getElementById("register-restaurant-group"),c=document.getElementById("register-code-group");l==null||l.addEventListener("change",()=>{l.value==="admin"?(u.classList.remove("hidden"),c.classList.add("hidden")):(u.classList.add("hidden"),c.classList.remove("hidden"))}),(h=document.getElementById("btn-login"))==null||h.addEventListener("click",async()=>{o();const A=document.getElementById("login-email").value.trim(),S=document.getElementById("login-password").value;if(!A||!S){i("Please enter email and password");return}try{document.getElementById("btn-login").disabled=!0,document.getElementById("btn-login").textContent="Logging in...",await nt.login(A,S)}catch(N){console.error("Login error:",N);let O=N.message;(O.includes("invalid-credential")||O.includes("wrong-password")||O.includes("user-not-found"))&&(O="Invalid email or password"),i(O),document.getElementById("btn-login").disabled=!1,document.getElementById("btn-login").innerHTML='<span class="material-symbols-outlined">login</span> Login'}}),(f=document.getElementById("btn-register"))==null||f.addEventListener("click",async()=>{o();const A=document.getElementById("register-type").value,S=document.getElementById("register-name").value.trim(),N=document.getElementById("register-email").value.trim(),O=document.getElementById("register-password").value;if(!S||!N||!O){i("Please fill all fields");return}if(O.length<6){i("Password must be at least 6 characters");return}try{if(document.getElementById("btn-register").disabled=!0,document.getElementById("btn-register").textContent="Creating account...",A==="admin"){const U=document.getElementById("register-restaurant").value.trim();if(!U){i("Please enter restaurant name"),document.getElementById("btn-register").disabled=!1;return}await nt.registerAdmin(S,N,O,U)}else{const U=document.getElementById("register-code").value.trim();if(!U){i("Please enter the join code"),document.getElementById("btn-register").disabled=!1;return}await nt.registerSalesman(S,N,O,U)}}catch(U){console.error("Register error:",U);let tt=U.message;tt.includes("email-already-in-use")&&(tt="This email is already registered. Try logging in."),tt.includes("weak-password")&&(tt="Password is too weak. Use at least 6 characters."),i(tt),document.getElementById("btn-register").disabled=!1,document.getElementById("btn-register").innerHTML='<span class="material-symbols-outlined">person_add</span> Register'}}),(p=document.getElementById("login-password"))==null||p.addEventListener("keydown",A=>{var S;A.key==="Enter"&&((S=document.getElementById("btn-login"))==null||S.click())}),(_=document.getElementById("login-email"))==null||_.addEventListener("keydown",A=>{var S;A.key==="Enter"&&((S=document.getElementById("login-password"))==null||S.focus())}),(C=document.getElementById("btn-logout"))==null||C.addEventListener("click",async()=>{confirm("Are you sure you want to logout?")&&await nt.logout()})}async function _w(){CE(),vw(),nt.onAuthChange(async n=>{if(n){const t=nt.getCurrentAccount();x.setAccountId(nt.getAccountId()),await x.seedDemoData(),fw(n,t),pw(n.role),yw(),mw(),hw(),window.addEventListener("hashchange",()=>Xs(Ju())),Xs(Ju())}else gw()})}_w().catch(n=>{console.error("Failed to initialize app:",n);const t=document.getElementById("view-container");t&&(t.innerHTML=`
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${n.message}</p>
        </div>
      `)});
