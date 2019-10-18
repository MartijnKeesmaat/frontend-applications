"use strict";function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return"function"==typeof e}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function subscribe(e,t){const n=e.subscribe(t);return n.unsubscribe?()=>n.unsubscribe():n}function get_store_value(e){let t;return subscribe(e,e=>t=e)(),t}let current_component;function set_current_component(e){current_component=e}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function onMount(e){get_current_component().$$.on_mount.push(e)}function onDestroy(e){get_current_component().$$.on_destroy.push(e)}function setContext(e,t){get_current_component().$$.context.set(e,t)}function getContext(e){return get_current_component().$$.context.get(e)}const invalid_attribute_name_character=/[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;function spread(e){const t=Object.assign({},...e);let n="";return Object.keys(t).forEach(e=>{if(invalid_attribute_name_character.test(e))return;const o=t[e];if(void 0===o)return;!0===o&&(n+=" "+e);const i=String(o).replace(/"/g,"&#34;").replace(/'/g,"&#39;");n+=" "+e+"="+JSON.stringify(i)}),n}const escaped={'"':"&quot;","'":"&#39;","&":"&amp;","<":"&lt;",">":"&gt;"};function escape(e){return String(e).replace(/["'&<>]/g,e=>escaped[e])}function each(e,t){let n="";for(let o=0;o<e.length;o+=1)n+=t(e[o],o);return n}const missing_component={$$render:()=>""};function validate_component(e,t){if(!e||!e.$$render)throw"svelte:component"===t&&(t+=" this={...}"),new Error(`<${t}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);return e}let on_destroy;function create_ssr_component(e){function t(t,n,o,i){const r=current_component;set_current_component({$$:{on_destroy:on_destroy,context:new Map(r?r.$$.context:[]),on_mount:[],before_update:[],after_update:[],callbacks:blank_object()}});const a=e(t,n,o,i);return set_current_component(r),a}return{render:(e={},n={})=>{on_destroy=[];const o={head:"",css:new Set},i=t(o,e,{},n);return run_all(on_destroy),{html:i,css:{code:Array.from(o.css).map(e=>e.code).join("\n"),map:null},head:o.head}},$$render:t}}const subscriber_queue=[];function readable(e,t){return{subscribe:writable(e,t).subscribe}}function writable(e,t=noop){let n;const o=[];function i(t){if(safe_not_equal(e,t)&&(e=t,n)){const t=!subscriber_queue.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),subscriber_queue.push(n,e)}if(t){for(let e=0;e<subscriber_queue.length;e+=2)subscriber_queue[e][0](subscriber_queue[e+1]);subscriber_queue.length=0}}}return{set:i,update:function(t){i(t(e))},subscribe:function(r,a=noop){const s=[r,a];return o.push(s),1===o.length&&(n=t(i)||noop),r(e),()=>{const e=o.indexOf(s);-1!==e&&o.splice(e,1),0===o.length&&(n(),n=null)}}}}function derived(e,t,n){const o=!Array.isArray(e),i=o?[e]:e,r=t.length<2;return readable(n,e=>{let n=!1;const a=[];let s=0,u=noop;const c=()=>{if(s)return;u();const n=t(o?a[0]:a,e);r?e(n):u=is_function(n)?n:noop},l=i.map((e,t)=>e.subscribe(e=>{a[t]=e,s&=~(1<<t),n&&c()},()=>{s|=1<<t}));return n=!0,c(),function(){run_all(l),u()}})}const LOCATION={},ROUTER={};function getLocation(e){return{...e.location,state:e.history.state,key:e.history.state&&e.history.state.key||"initial"}}function createHistory(e,t){const n=[];let o=getLocation(e);return{get location(){return o},listen(t){n.push(t);const i=()=>{o=getLocation(e),t({location:o,action:"POP"})};return e.addEventListener("popstate",i),()=>{e.removeEventListener("popstate",i);const o=n.indexOf(t);n.splice(o,1)}},navigate(t,{state:i,replace:r=!1}={}){i={...i,key:Date.now()+""};try{r?e.history.replaceState(i,null,t):e.history.pushState(i,null,t)}catch(n){e.location[r?"replace":"assign"](t)}o=getLocation(e),n.forEach(e=>e({location:o,action:"PUSH"}))}}}function createMemorySource(e="/"){let t=0;const n=[{pathname:e,search:""}],o=[];return{get location(){return n[t]},addEventListener(e,t){},removeEventListener(e,t){},history:{get entries(){return n},get index(){return t},get state(){return o[t]},pushState(e,i,r){const[a,s=""]=r.split("?");t++,n.push({pathname:a,search:s}),o.push(e)},replaceState(e,i,r){const[a,s=""]=r.split("?");n[t]={pathname:a,search:s},o[t]=e}}}}const canUseDOM=Boolean("undefined"!=typeof window&&window.document&&window.document.createElement),globalHistory=createHistory(canUseDOM?window:createMemorySource()),paramRe=/^:(.+)/,SEGMENT_POINTS=4,STATIC_POINTS=3,DYNAMIC_POINTS=2,SPLAT_PENALTY=1,ROOT_POINTS=1;function startsWith(e,t){return e.substr(0,t.length)===t}function isRootSegment(e){return""===e}function isDynamic(e){return paramRe.test(e)}function isSplat(e){return"*"===e[0]}function segmentize(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function stripSlashes(e){return e.replace(/(^\/+|\/+$)/g,"")}function rankRoute(e,t){return{route:e,score:e.default?0:segmentize(e.path).reduce((e,t)=>(e+=SEGMENT_POINTS,isRootSegment(t)?e+=ROOT_POINTS:isDynamic(t)?e+=DYNAMIC_POINTS:isSplat(t)?e-=SEGMENT_POINTS+SPLAT_PENALTY:e+=STATIC_POINTS,e),0),index:t}}function rankRoutes(e){return e.map(rankRoute).sort((e,t)=>e.score<t.score?1:e.score>t.score?-1:e.index-t.index)}function pick(e,t){let n,o;const[i]=t.split("?"),r=segmentize(i),a=""===r[0],s=rankRoutes(e);for(let e=0,i=s.length;e<i;e++){const i=s[e].route;let u=!1;if(i.default){o={route:i,params:{},uri:t};continue}const c=segmentize(i.path),l={},d=Math.max(r.length,c.length);let p=0;for(;p<d;p++){const e=c[p],t=r[p];if(void 0!==e&&isSplat(e)){l["*"===e?"*":e.slice(1)]=r.slice(p).map(decodeURIComponent).join("/");break}if(void 0===t){u=!0;break}let n=paramRe.exec(e);if(n&&!a){const e=decodeURIComponent(t);l[n[1]]=e}else if(e!==t){u=!0;break}}if(!u){n={route:i,params:l,uri:"/"+r.slice(0,p).join("/")};break}}return n||o||null}function match(e,t){return pick([e],t)}function addQuery(e,t){return e+(t?`?${t}`:"")}function resolve(e,t){if(startsWith(e,"/"))return e;const[n,o]=e.split("?"),[i]=t.split("?"),r=segmentize(n),a=segmentize(i);if(""===r[0])return addQuery(i,o);if(!startsWith(r[0],".")){return addQuery(("/"===i?"":"/")+a.concat(r).join("/"),o)}const s=a.concat(r),u=[];return s.forEach(e=>{".."===e?u.pop():"."!==e&&u.push(e)}),addQuery("/"+u.join("/"),o)}function combinePaths(e,t){return`${stripSlashes("/"===t?e:`${stripSlashes(e)}/${stripSlashes(t)}`)}/`}const Router=create_ssr_component((e,t,n,o)=>{let i,r,a,{basepath:s="/",url:u=null}=t;const c=getContext(LOCATION),l=getContext(ROUTER),d=writable([]);a=get_store_value(d);const p=writable(null);let m=!1;const h=c||writable(u?{pathname:u}:globalHistory.location);r=get_store_value(h);const v=l?l.routerBase:writable({path:s,uri:s});i=get_store_value(v);const f=derived([v,p],([e,t])=>{if(null===t)return e;const{path:n}=e,{route:o,uri:i}=t;return{path:o.default?n:o.path.replace(/\*.*$/,""),uri:i}});c||(onMount(()=>{return globalHistory.listen(e=>{h.set(e.location)})}),setContext(LOCATION,h)),setContext(ROUTER,{activeRoute:p,base:v,routerBase:f,registerRoute:function(e){const{path:t}=i;let{path:n}=e;if(e._path=n,e.path=combinePaths(t,n),"undefined"==typeof window){if(m)return;const t=match(e,r.pathname);t&&(p.set(t),m=!0)}else d.update(t=>(t.push(e),t))},unregisterRoute:function(e){d.update(t=>{const n=t.indexOf(e);return t.splice(n,1),t})}}),void 0===t.basepath&&n.basepath&&void 0!==s&&n.basepath(s),void 0===t.url&&n.url&&void 0!==u&&n.url(u),i=get_store_value(v),r=get_store_value(h),a=get_store_value(d);{const{path:e}=i;d.update(t=>(t.forEach(t=>t.path=combinePaths(e,t._path)),t))}{const e=pick(a,r.pathname);p.set(e)}return`${o.default?o.default({}):""}`}),Route=create_ssr_component((e,t,n,o)=>{let i,r,{path:a="",component:s=null}=t;const{registerRoute:u,unregisterRoute:c,activeRoute:l}=getContext(ROUTER);i=get_store_value(l);const d=getContext(LOCATION);r=get_store_value(d);const p={path:a,default:""===a};let m={},h={};u(p),"undefined"!=typeof window&&onDestroy(()=>{c(p)}),void 0===t.path&&n.path&&void 0!==a&&n.path(a),void 0===t.component&&n.component&&void 0!==s&&n.component(s),i=get_store_value(l),r=get_store_value(d),i&&i.route===p&&(m=i.params);{const{path:e,component:n,...o}=t;h=o}return`${null!==i&&i.route===p?`${null!==s?`${validate_component(s||missing_component,"svelte:component").$$render(e,Object.assign({location:r},m,h),{},{})}`:`${o.default?o.default({params:m,location:r}):""}`}`:""}`}),Link=create_ssr_component((e,t,n,o)=>{let i,r,{to:a="#",replace:s=!1,state:u={},getProps:c=(()=>({}))}=t;const{base:l}=getContext(ROUTER);i=get_store_value(l);const d=getContext(LOCATION);let p,m,h,v;r=get_store_value(d),void 0===t.to&&n.to&&void 0!==a&&n.to(a),void 0===t.replace&&n.replace&&void 0!==s&&n.replace(s),void 0===t.state&&n.state&&void 0!==u&&n.state(u),void 0===t.getProps&&n.getProps&&void 0!==c&&n.getProps(c),i=get_store_value(l),r=get_store_value(d),p="/"===a?i.uri:resolve(a,i.uri),m=startsWith(r.pathname,p);let f=(h=p===r.pathname)?"page":void 0;return v=c({location:r,href:p,isPartiallyCurrent:m,isCurrent:h}),`<a${spread([{href:`${escape(p)}`},{"aria-current":`${escape(f)}`},v])}>\n\t  ${o.default?o.default({}):""}\n\t</a>`});function getProps({location:e,href:t,isPartiallyCurrent:n,isCurrent:o}){return("/"===t?o:n||o)?{class:"active"}:{}}const NavLink=create_ssr_component((e,t,n,o)=>{let{to:i=""}=t;return void 0===t.to&&n.to&&void 0!==i&&n.to(i),`${validate_component(Link,"Link").$$render(e,{to:i,getProps:getProps},{},{default:()=>`\n\t  ${o.default?o.default({}):""}\n\t`})}`}),ListItem=create_ssr_component((e,t,n,o)=>{let{name:i}=t;return void 0===t.name&&n.name&&void 0!==i&&n.name(i),`<li>The name is ${escape(i)}</li>`});let name="world";const Home=create_ssr_component((e,t,n,o)=>{return`<h1>Hello ${escape(name)} ${escape(0)}!</h1>\n\n\t<ul>\n\t  ${each([{name:"This is a component"},{name:"This is a component"},{name:"This is a component"}],({id:t,name:n},o)=>`${validate_component(ListItem,"Item").$$render(e,{name:n},{},{})}`)}\n\t</ul>\n\n\t<button>\n\t  Clicked ${escape(0)} ${escape("times")}\n\t</button>`}),css={code:"canvas.svelte-1j6em85{position:fixed}",map:'{"version":3,"file":"Video.svelte","sources":["Video.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  let context, video, canvas, w, h, ratio;\\n\\n  onMount(() => {\\n    video = document.querySelector(\\"video\\");\\n    canvas = document.querySelector(\\"#canvas\\");\\n    console.log(video, canvas);\\n    context = canvas.getContext(\\"2d\\");\\n\\n    video.addEventListener(\\n      \\"loadedmetadata\\",\\n      function() {\\n        ratio = video.videoWidth / video.videoHeight;\\n        w = video.videoWidth - 100;\\n        h = parseInt(w / ratio, 10);\\n        canvas.width = w;\\n        canvas.height = h;\\n      },\\n      false\\n    );\\n  });\\n  function snap() {\\n    context.fillRect(0, 0, w, h);\\n    context.drawImage(video, 0, 0, w, h);\\n\\n    const image = canvas\\n      .toDataURL(\\"image/png\\")\\n      .replace(\\"image/png\\", \\"image/octet-stream\\"); // here is the most important part because if you dont replace you will get a DOM 18 exception.\\n    const base64 = new Image();\\n    base64.src = image;\\n    document.querySelector(\\".video-view\\").appendChild(base64);\\n\\n    context.clearRect(0, 0, canvas.width, canvas.height);\\n    console.log(base64);\\n  }\\n<\/script>\\n\\n<style>\\n  canvas {\\n    position: fixed;\\n  }\\n</style>\\n\\n<section class=\\"video-view\\">\\n  <h1>Snapshot proto</h1>\\n\\n  <video controls>\\n    <source src=\\"./snow-monks.mp4\\" type=\\"video/mp4\\" />\\n  </video>\\n  <button id=\\"snap\\" on:click={snap}>Snap Photo</button>\\n  <canvas id=\\"canvas\\" width=\\"640\\" height=\\"480\\" />\\n</section>\\n"],"names":[],"mappings":"AAuCE,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,KAAK,AACjB,CAAC"}'},Video=create_ssr_component((e,t,n,o)=>{let i,r,a,s,u,c;return onMount(()=>{r=document.querySelector("video"),a=document.querySelector("#canvas"),console.log(r,a),i=a.getContext("2d"),r.addEventListener("loadedmetadata",(function(){c=r.videoWidth/r.videoHeight,s=r.videoWidth-100,u=parseInt(s/c,10),a.width=s,a.height=u}),!1)}),e.css.add(css),'<section class="video-view">\n\t  <h1>Snapshot proto</h1>\n\n\t  <video controls>\n\t    <source src="./snow-monks.mp4" type="video/mp4">\n\t  </video>\n\t  <button id="snap">Snap Photo</button>\n\t  <canvas id="canvas" width="640" height="480" class="svelte-1j6em85"></canvas>\n\t</section>'}),Blog=create_ssr_component((e,t,n,o)=>`${validate_component(Router,"Router").$$render(e,{},{},{default:()=>`\n\t  <h1>Blog</h1>\n\n\t  <ul>\n\t    <li>${validate_component(Link,"Link").$$render(e,{to:"first"},{},{default:()=>"Today I did something cool"})}</li>\n\t    <li>${validate_component(Link,"Link").$$render(e,{to:"second"},{},{default:()=>"I did something awesome today"})}</li>\n\t    <li>${validate_component(Link,"Link").$$render(e,{to:"third"},{},{default:()=>"Did something sweet today"})}</li>\n\t  </ul>\n\n\t  ${validate_component(Route,"Route").$$render(e,{path:"first"},{},{default:()=>"\n\t    <p>\n\t      I did something cool today. Lorem ipsum dolor sit amet, consectetur \n\t      adipisicing elit. Quisquam rerum asperiores, ex animi sunt ipsum. Voluptas \n\t      sint id hic. Vel neque maxime exercitationem facere culpa nisi, nihil \n\t      incidunt quo nostrum, beatae dignissimos dolores natus quaerat! Quasi sint \n\t      praesentium inventore quidem, deserunt atque ipsum similique dolores maiores\n\t      expedita, qui totam. Totam et incidunt assumenda quas explicabo corporis \n\t      eligendi amet sint ducimus, culpa fugit esse. Tempore dolorum sit \n\t      perspiciatis corporis molestias nemo, veritatis, asperiores earum! \n\t      Ex repudiandae aperiam asperiores esse minus veniam sapiente corrupti \n\t      alias deleniti excepturi saepe explicabo eveniet harum fuga numquam \n\t      nostrum adipisci pariatur iusto sint, impedit provident repellat quis?\n\t    </p>\n\t  "})}\n\t  ${validate_component(Route,"Route").$$render(e,{path:"second"},{},{default:()=>"\n\t    <p>\n\t      I did something awesome today. Lorem ipsum dolor sit amet, consectetur \n\t      adipisicing elit. Repudiandae enim quasi animi, vero deleniti dignissimos \n\t      sapiente perspiciatis. Veniam, repellendus, maiores.\n\t    </p>\n\t  "})}\n\t  ${validate_component(Route,"Route").$$render(e,{path:"third"},{},{default:()=>"\n\t    <p>\n\t      I did something sweet today. Lorem ipsum dolor sit amet, consectetur \n\t      adipisicing elit. Modi ad voluptas rem consequatur commodi minima doloribus \n\t      veritatis nam, quas, culpa autem repellat saepe quam deleniti maxime delectus \n\t      fuga totam libero sit neque illo! Sapiente consequatur rem minima expedita \n\t      nemo blanditiis, aut veritatis alias nostrum vel? Esse molestias placeat, \n\t      doloribus commodi.\n\t    </p>\n\t  "})}\n\t`})}`),App=create_ssr_component((e,t,n,o)=>{let{url:i=""}=t;return void 0===t.url&&n.url&&void 0!==i&&n.url(i),`${validate_component(Router,"Router").$$render(e,{url:i},{},{default:()=>`\n\t  <nav>\n\t    ${validate_component(NavLink,"NavLink").$$render(e,{to:"/"},{},{default:()=>"Home"})}\n\t    ${validate_component(NavLink,"NavLink").$$render(e,{to:"video"},{},{default:()=>"Video"})}\n\t    ${validate_component(NavLink,"NavLink").$$render(e,{to:"blog"},{},{default:()=>"Blog"})}\n\t  </nav>\n\t  <div>\n\t    ${validate_component(Route,"Route").$$render(e,{path:"video",component:Video},{},{})}\n\t    ${validate_component(Route,"Route").$$render(e,{path:"blog/*",component:Blog},{},{})}\n\t    ${validate_component(Route,"Route").$$render(e,{path:"/",component:Home},{},{})}\n\t  </div>\n\t`})}`});module.exports=App;

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, callback) {
    const unsub = store.subscribe(callback);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args) {
    const attributes = Object.assign({}, ...args);
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === undefined)
            return;
        if (value === true)
            str += " " + name;
        const escaped = String(value)
            .replace(/"/g, '&#34;')
            .replace(/'/g, '&#39;');
        str += " " + name + "=" + JSON.stringify(escaped);
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe,
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 * @param {Stores} stores input stores
 * @param {function(Stores=, function(*)=):*}fn function callback that aggregates the values
 * @param {*=}initial_value when used asynchronously
 */
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => store.subscribe((value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

const LOCATION = {};
const ROUTER = {};

/**
 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
 *
 * https://github.com/reach/router/blob/master/LICENSE
 * */

function getLocation(source) {
  return {
    ...source.location,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || "initial"
  };
}

function createHistory(source, options) {
  const listeners = [];
  let location = getLocation(source);

  return {
    get location() {
      return location;
    },

    listen(listener) {
      listeners.push(listener);

      const popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return () => {
        source.removeEventListener("popstate", popstateListener);

        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },

    navigate(to, { state, replace = false } = {}) {
      state = { ...state, key: Date.now() + "" };
      // try...catch iOS Safari limits to 100 pushState calls
      try {
        if (replace) {
          source.history.replaceState(state, null, to);
        } else {
          source.history.pushState(state, null, to);
        }
      } catch (e) {
        source.location[replace ? "replace" : "assign"](to);
      }

      location = getLocation(source);
      listeners.forEach(listener => listener({ location, action: "PUSH" }));
    }
  };
}

// Stores history entries in memory for testing or other platforms like Native
function createMemorySource(initialPathname = "/") {
  let index = 0;
  const stack = [{ pathname: initialPathname, search: "" }];
  const states = [];

  return {
    get location() {
      return stack[index];
    },
    addEventListener(name, fn) {},
    removeEventListener(name, fn) {},
    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        index++;
        stack.push({ pathname, search });
        states.push(state);
      },
      replaceState(state, _, uri) {
        const [pathname, search = ""] = uri.split("?");
        stack[index] = { pathname, search };
        states[index] = state;
      }
    }
  };
}

// Global history uses window.history as the source if available,
// otherwise a memory history
const canUseDOM = Boolean(
  typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
);
const globalHistory = createHistory(canUseDOM ? window : createMemorySource());

/**
 * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
 *
 * https://github.com/reach/router/blob/master/LICENSE
 * */

const paramRe = /^:(.+)/;

const SEGMENT_POINTS = 4;
const STATIC_POINTS = 3;
const DYNAMIC_POINTS = 2;
const SPLAT_PENALTY = 1;
const ROOT_POINTS = 1;

/**
 * Check if `string` starts with `search`
 * @param {string} string
 * @param {string} search
 * @return {boolean}
 */
function startsWith(string, search) {
  return string.substr(0, search.length) === search;
}

/**
 * Check if `segment` is a root segment
 * @param {string} segment
 * @return {boolean}
 */
function isRootSegment(segment) {
  return segment === "";
}

/**
 * Check if `segment` is a dynamic segment
 * @param {string} segment
 * @return {boolean}
 */
function isDynamic(segment) {
  return paramRe.test(segment);
}

/**
 * Check if `segment` is a splat
 * @param {string} segment
 * @return {boolean}
 */
function isSplat(segment) {
  return segment[0] === "*";
}

/**
 * Split up the URI into segments delimited by `/`
 * @param {string} uri
 * @return {string[]}
 */
function segmentize(uri) {
  return (
    uri
      // Strip starting/ending `/`
      .replace(/(^\/+|\/+$)/g, "")
      .split("/")
  );
}

/**
 * Strip `str` of potential start and end `/`
 * @param {string} str
 * @return {string}
 */
function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
}

/**
 * Score a route depending on how its individual segments look
 * @param {object} route
 * @param {number} index
 * @return {object}
 */
function rankRoute(route, index) {
  const score = route.default
    ? 0
    : segmentize(route.path).reduce((score, segment) => {
        score += SEGMENT_POINTS;

        if (isRootSegment(segment)) {
          score += ROOT_POINTS;
        } else if (isDynamic(segment)) {
          score += DYNAMIC_POINTS;
        } else if (isSplat(segment)) {
          score -= SEGMENT_POINTS + SPLAT_PENALTY;
        } else {
          score += STATIC_POINTS;
        }

        return score;
      }, 0);

  return { route, score, index };
}

/**
 * Give a score to all routes and sort them on that
 * @param {object[]} routes
 * @return {object[]}
 */
function rankRoutes(routes) {
  return (
    routes
      .map(rankRoute)
      // If two routes have the exact same score, we go by index instead
      .sort((a, b) =>
        a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
      )
  );
}

/**
 * Ranks and picks the best route to match. Each segment gets the highest
 * amount of points, then the type of segment gets an additional amount of
 * points where
 *
 *  static > dynamic > splat > root
 *
 * This way we don't have to worry about the order of our routes, let the
 * computers do it.
 *
 * A route looks like this
 *
 *  { path, default, value }
 *
 * And a returned match looks like:
 *
 *  { route, params, uri }
 *
 * @param {object[]} routes
 * @param {string} uri
 * @return {?object}
 */
function pick(routes, uri) {
  let match;
  let default_;

  const [uriPathname] = uri.split("?");
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === "";
  const ranked = rankRoutes(routes);

  for (let i = 0, l = ranked.length; i < l; i++) {
    const route = ranked[i].route;
    let missed = false;

    if (route.default) {
      default_ = {
        route,
        params: {},
        uri
      };
      continue;
    }

    const routeSegments = segmentize(route.path);
    const params = {};
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;

    for (; index < max; index++) {
      const routeSegment = routeSegments[index];
      const uriSegment = uriSegments[index];

      if (routeSegment !== undefined && isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/* or /files/*splatname
        const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

        params[splatName] = uriSegments
          .slice(index)
          .map(decodeURIComponent)
          .join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      let dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        const value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route,
        params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
}

/**
 * Check if the `path` matches the `uri`.
 * @param {string} path
 * @param {string} uri
 * @return {?object}
 */
function match(route, uri) {
  return pick([route], uri);
}

/**
 * Add the query to the pathname if a query is given
 * @param {string} pathname
 * @param {string} [query]
 * @return {string}
 */
function addQuery(pathname, query) {
  return pathname + (query ? `?${query}` : "");
}

/**
 * Resolve URIs as though every path is a directory, no files. Relative URIs
 * in the browser can feel awkward because not only can you be "in a directory",
 * you can be "at a file", too. For example:
 *
 *  browserSpecResolve('foo', '/bar/') => /bar/foo
 *  browserSpecResolve('foo', '/bar') => /foo
 *
 * But on the command line of a file system, it's not as complicated. You can't
 * `cd` from a file, only directories. This way, links have to know less about
 * their current path. To go deeper you can do this:
 *
 *  <Link to="deeper"/>
 *  // instead of
 *  <Link to=`{${props.uri}/deeper}`/>
 *
 * Just like `cd`, if you want to go deeper from the command line, you do this:
 *
 *  cd deeper
 *  # not
 *  cd $(pwd)/deeper
 *
 * By treating every path as a directory, linking to relative paths should
 * require less contextual information and (fingers crossed) be more intuitive.
 * @param {string} to
 * @param {string} base
 * @return {string}
 */
function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  const [toPathname, toQuery] = to.split("?");
  const [basePathname] = base.split("?");
  const toSegments = segmentize(toPathname);
  const baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    const pathname = baseSegments.concat(toSegments).join("/");

    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./       , /users/123 => /users/123
  // ../      , /users/123 => /users
  // ../..    , /users/123 => /
  // ../../one, /a/b/c/d   => /a/b/one
  // .././one , /a/b/c/d   => /a/b/c/one
  const allSegments = baseSegments.concat(toSegments);
  const segments = [];

  allSegments.forEach(segment => {
    if (segment === "..") {
      segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });

  return addQuery("/" + segments.join("/"), toQuery);
}

/**
 * Combines the `basepath` and the `path` into one path.
 * @param {string} basepath
 * @param {string} path
 */
function combinePaths(basepath, path) {
  return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
}

/* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.12.1 */

const Router = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $base, $location, $routes;

	

  let { basepath = "/", url = null } = $$props;

  const locationContext = getContext(LOCATION);
  const routerContext = getContext(ROUTER);

  const routes = writable([]); $routes = get_store_value(routes);
  const activeRoute = writable(null);
  let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

  // If locationContext is not set, this is the topmost Router in the tree.
  // If the `url` prop is given we force the location to it.
  const location =
    locationContext ||
    writable(url ? { pathname: url } : globalHistory.location); $location = get_store_value(location);

  // If routerContext is set, the routerBase of the parent Router
  // will be the base for this Router's descendants.
  // If routerContext is not set, the path and resolved uri will both
  // have the value of the basepath prop.
  const base = routerContext
    ? routerContext.routerBase
    : writable({
        path: basepath,
        uri: basepath
      }); $base = get_store_value(base);

  const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    // If there is no activeRoute, the routerBase will be identical to the base.
    if (activeRoute === null) {
      return base;
    }

    const { path: basepath } = base;
    const { route, uri } = activeRoute;
    // Remove the potential /* or /*splatname from
    // the end of the child Routes relative paths.
    const path = route.default ? basepath : route.path.replace(/\*.*$/, "");

    return { path, uri };
  });

  function registerRoute(route) {
    const { path: basepath } = $base;
    let { path } = route;

    // We store the original path in the _path property so we can reuse
    // it when the basepath changes. The only thing that matters is that
    // the route reference is intact, so mutation is fine.
    route._path = path;
    route.path = combinePaths(basepath, path);

    if (typeof window === "undefined") {
      // In SSR we should set the activeRoute immediately if it is a match.
      // If there are more Routes being registered after a match is found,
      // we just skip them.
      if (hasActiveRoute) {
        return;
      }

      const matchingRoute = match(route, $location.pathname);
      if (matchingRoute) {
        activeRoute.set(matchingRoute);
        hasActiveRoute = true;
      }
    } else {
      routes.update(rs => {
        rs.push(route);
        return rs;
      });
    }
  }

  function unregisterRoute(route) {
    routes.update(rs => {
      const index = rs.indexOf(route);
      rs.splice(index, 1);
      return rs;
    });
  }

  if (!locationContext) {
    // The topmost Router in the tree is responsible for updating
    // the location store and supplying it through context.
    onMount(() => {
      const unlisten = globalHistory.listen(history => {
        location.set(history.location);
      });

      return unlisten;
    });

    setContext(LOCATION, location);
  }

  setContext(ROUTER, {
    activeRoute,
    base,
    routerBase,
    registerRoute,
    unregisterRoute
  });

	if ($$props.basepath === void 0 && $$bindings.basepath && basepath !== void 0) $$bindings.basepath(basepath);
	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);

	$base = get_store_value(base);
	$location = get_store_value(location);
	$routes = get_store_value(routes);

	{
        const { path: basepath } = $base;
        routes.update(rs => {
          rs.forEach(r => (r.path = combinePaths(basepath, r._path)));
          return rs;
        });
      }
	{
        const bestMatch = pick($routes, $location.pathname);
        activeRoute.set(bestMatch);
      }

	return `${$$slots.default ? $$slots.default({}) : ``}`;
});

/* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.12.1 */

const Route = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $activeRoute, $location;

	

  let { path = "", component = null } = $$props;

  const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER); $activeRoute = get_store_value(activeRoute);
  const location = getContext(LOCATION); $location = get_store_value(location);

  const route = {
    path,
    // If no path prop is given, this Route will act as the default Route
    // that is rendered if no other Route in the Router is a match.
    default: path === ""
  };
  let routeParams = {};
  let routeProps = {};

  registerRoute(route);

  // There is no need to unregister Routes in SSR since it will all be
  // thrown away anyway.
  if (typeof window !== "undefined") {
    onDestroy(() => {
      unregisterRoute(route);
    });
  }

	if ($$props.path === void 0 && $$bindings.path && path !== void 0) $$bindings.path(path);
	if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);

	$activeRoute = get_store_value(activeRoute);
	$location = get_store_value(location);

	if ($activeRoute && $activeRoute.route === route) {
        routeParams = $activeRoute.params;
      }
	{
        const { path, component, ...rest } = $$props;
        routeProps = rest;
      }

	return `${ $activeRoute !== null && $activeRoute.route === route ? `${ component !== null ? `${validate_component(((component) || missing_component), 'svelte:component').$$render($$result, Object.assign({ location: $location }, routeParams, routeProps), {}, {})}` : `${$$slots.default ? $$slots.default({ params: routeParams, location: $location }) : ``}` }` : `` }`;
});

/* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.12.1 */

const Link = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $base, $location;

	

  let { to = "#", replace = false, state = {}, getProps = () => ({}) } = $$props;

  const { base } = getContext(ROUTER); $base = get_store_value(base);
  const location = getContext(LOCATION); $location = get_store_value(location);

  let href, isPartiallyCurrent, isCurrent, props;

	if ($$props.to === void 0 && $$bindings.to && to !== void 0) $$bindings.to(to);
	if ($$props.replace === void 0 && $$bindings.replace && replace !== void 0) $$bindings.replace(replace);
	if ($$props.state === void 0 && $$bindings.state && state !== void 0) $$bindings.state(state);
	if ($$props.getProps === void 0 && $$bindings.getProps && getProps !== void 0) $$bindings.getProps(getProps);

	$base = get_store_value(base);
	$location = get_store_value(location);

	href = to === "/" ? $base.uri : resolve(to, $base.uri);
	isPartiallyCurrent = startsWith($location.pathname, href);
	isCurrent = href === $location.pathname;
	let ariaCurrent = isCurrent ? "page" : undefined;
	props = getProps({
        location: $location,
        href,
        isPartiallyCurrent,
        isCurrent
      });

	return `<a${spread([{ href: `${escape(href)}` }, { "aria-current": `${escape(ariaCurrent)}` }, props])}>
	  ${$$slots.default ? $$slots.default({}) : ``}
	</a>`;
});

/* src/components/ListItem.svelte generated by Svelte v3.12.1 */

const ListItem = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { name } = $$props;

	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);

	return `<li>The name is ${escape(name)}</li>`;
});

/* src/routes/Home.svelte generated by Svelte v3.12.1 */

let name = "world";

const Home = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	
  let count = 0;

  let dummyData = [
    { name: "This is a component" },
    { name: "This is a component" },
    { name: "This is a component" }
  ];

	return `<h1>Hello ${escape(name)} ${escape(count)}!</h1>

	<ul>
	  ${each(dummyData, ({ id, name }, i) => `${validate_component(ListItem, 'Item').$$render($$result, { name: name }, {}, {})}`)}
	</ul>

	<button>
	  Clicked ${escape(count)} ${escape(count === 1 ? 'time' : 'times')}
	</button>`;
});

/* src/routes/RetrieveData.svelte generated by Svelte v3.12.1 */

const RetrieveData = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { results } = $$props;

	if ($$props.results === void 0 && $$bindings.results && results !== void 0) $$bindings.results(results);

	return `${ results.length > 0 ? `${each(results, ({ id, title, description, imageLink }, i) => `<h2>${escape(title)}</h2>
	    <p>${escape(description)}</p>
	    <img${add_attribute("src", imageLink, 0)} alt="">`)}` : `<p>Loading</p>` }`;
});

/* src/routes/Video.svelte generated by Svelte v3.12.1 */

const css = {
	code: "canvas.svelte-1xwrbkv{position:fixed}video.svelte-1xwrbkv{width:800px;height:400px}",
	map: "{\"version\":3,\"file\":\"Video.svelte\",\"sources\":[\"Video.svelte\"],\"sourcesContent\":[\"<script>\\n  import { onMount } from \\\"svelte\\\";\\n  let context, video, canvas, w, h, ratio;\\n\\n  onMount(() => {\\n    video = document.querySelector(\\\"video\\\");\\n    canvas = document.querySelector(\\\"#canvas\\\");\\n    console.log(video, canvas);\\n    context = canvas.getContext(\\\"2d\\\");\\n\\n    video.addEventListener(\\n      \\\"loadedmetadata\\\",\\n      function() {\\n        ratio = video.videoWidth / video.videoHeight;\\n        w = video.videoWidth - 100;\\n        h = parseInt(w / ratio, 10);\\n        canvas.width = w;\\n        canvas.height = h;\\n      },\\n      false\\n    );\\n  });\\n  function snap() {\\n    context.fillRect(0, 0, w, h);\\n    context.drawImage(video, 0, 0, w, h);\\n\\n    const image = canvas\\n      .toDataURL(\\\"image/png\\\")\\n      .replace(\\\"image/png\\\", \\\"image/octet-stream\\\"); // here is the most important part because if you dont replace you will get a DOM 18 exception.\\n    const base64 = new Image();\\n    base64.src = image;\\n    document.querySelector(\\\".video-view\\\").appendChild(base64);\\n\\n    context.clearRect(0, 0, canvas.width, canvas.height);\\n    console.log(base64);\\n  }\\n</script>\\n\\n<style>\\n  canvas {\\n    position: fixed;\\n  }\\n  video {\\n    width: 800px;\\n    height: 400px;\\n  }\\n</style>\\n\\n<section class=\\\"video-view\\\">\\n  <h1>Snapshot proto</h1>\\n\\n  <video controls>\\n    <source src=\\\"./snow-monks.mp4\\\" type=\\\"video/mp4\\\" />\\n  </video>\\n  <button id=\\\"snap\\\" on:click={snap}>Snap Photo</button>\\n  <canvas id=\\\"canvas\\\" width=\\\"640\\\" height=\\\"480\\\" />\\n</section>\\n\"],\"names\":[],\"mappings\":\"AAuCE,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,KAAK,AACjB,CAAC,AACD,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,AACf,CAAC\"}"
};

const Video = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let context, video, canvas, w, h, ratio;

  onMount(() => {
    video = document.querySelector("video");
    canvas = document.querySelector("#canvas");
    console.log(video, canvas);
    context = canvas.getContext("2d");

    video.addEventListener(
      "loadedmetadata",
      function() {
        ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = parseInt(w / ratio, 10);
        canvas.width = w;
        canvas.height = h;
      },
      false
    );
  });

	$$result.css.add(css);

	return `<section class="video-view">
	  <h1>Snapshot proto</h1>

	  <video controls class="svelte-1xwrbkv">
	    <source src="./snow-monks.mp4" type="video/mp4">
	  </video>
	  <button id="snap">Snap Photo</button>
	  <canvas id="canvas" width="640" height="480" class="svelte-1xwrbkv"></canvas>
	</section>`;
});

/* src/routes/Blog.svelte generated by Svelte v3.12.1 */

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `${validate_component(Router, 'Router').$$render($$result, {}, {}, {
		default: () => `
	  <h1>Blog</h1>

	  <ul>
	    <li>${validate_component(Link, 'Link').$$render($$result, { to: "first" }, {}, {
		default: () => `Today I did something cool`
	})}</li>
	    <li>${validate_component(Link, 'Link').$$render($$result, { to: "second" }, {}, {
		default: () => `I did something awesome today`
	})}</li>
	    <li>${validate_component(Link, 'Link').$$render($$result, { to: "third" }, {}, {
		default: () => `Did something sweet today`
	})}</li>
	  </ul>

	  ${validate_component(Route, 'Route').$$render($$result, { path: "first" }, {}, {
		default: () => `
	    <p>
	      I did something cool today. Lorem ipsum dolor sit amet, consectetur 
	      adipisicing elit. Quisquam rerum asperiores, ex animi sunt ipsum. Voluptas 
	      sint id hic. Vel neque maxime exercitationem facere culpa nisi, nihil 
	      incidunt quo nostrum, beatae dignissimos dolores natus quaerat! Quasi sint 
	      praesentium inventore quidem, deserunt atque ipsum similique dolores maiores
	      expedita, qui totam. Totam et incidunt assumenda quas explicabo corporis 
	      eligendi amet sint ducimus, culpa fugit esse. Tempore dolorum sit 
	      perspiciatis corporis molestias nemo, veritatis, asperiores earum! 
	      Ex repudiandae aperiam asperiores esse minus veniam sapiente corrupti 
	      alias deleniti excepturi saepe explicabo eveniet harum fuga numquam 
	      nostrum adipisci pariatur iusto sint, impedit provident repellat quis?
	    </p>
	  `
	})}
	  ${validate_component(Route, 'Route').$$render($$result, { path: "second" }, {}, {
		default: () => `
	    <p>
	      I did something awesome today. Lorem ipsum dolor sit amet, consectetur 
	      adipisicing elit. Repudiandae enim quasi animi, vero deleniti dignissimos 
	      sapiente perspiciatis. Veniam, repellendus, maiores.
	    </p>
	  `
	})}
	  ${validate_component(Route, 'Route').$$render($$result, { path: "third" }, {}, {
		default: () => `
	    <p>
	      I did something sweet today. Lorem ipsum dolor sit amet, consectetur 
	      adipisicing elit. Modi ad voluptas rem consequatur commodi minima doloribus 
	      veritatis nam, quas, culpa autem repellat saepe quam deleniti maxime delectus 
	      fuga totam libero sit neque illo! Sapiente consequatur rem minima expedita 
	      nemo blanditiis, aut veritatis alias nostrum vel? Esse molestias placeat, 
	      doloribus commodi.
	    </p>
	  `
	})}
	`
	})}`;
});

/* src/components/NavLink.svelte generated by Svelte v3.12.1 */

function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
  const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

  // The object returned here is spread on the anchor element's attributes
  if (isActive) {
    return { class: "active" };
  }
  return {};
}

const NavLink = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { to = "" } = $$props;

	if ($$props.to === void 0 && $$bindings.to && to !== void 0) $$bindings.to(to);

	return `${validate_component(Link, 'Link').$$render($$result, { to: to, getProps: getProps }, {}, {
		default: () => `
	  ${$$slots.default ? $$slots.default({}) : ``}
	`
	})}`;
});

/* src/App.svelte generated by Svelte v3.12.1 */

const queryUrl =
    "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-20/sparql";

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	

  // Used for routing
  let { url = "" } = $$props;

  const query = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX dc: <http://purl.org/dc/elements/1.1/>
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX edm: <http://www.europeana.eu/schemas/edm/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  SELECT ?cho ?title ?placeName ?description ?imageLink WHERE {
    <https://hdl.handle.net/20.500.11840/termmaster7745> skos:narrower* ?place . #Ind0
    ?place skos:prefLabel ?placeName .
      
    <https://hdl.handle.net/20.500.11840/termmaster16239> skos:narrower* ?cat . # Strijd en oorlog
    # ?cat skos:prefLabel ?catLabel .
    ?cho dct:spatial ?place ;
    dc:type ?type ;
    edm:isShownBy ?imageLink ;
    dc:description ?description ;
    dc:title ?title .
    # FILTER langMatches(lang(?title), "ned")
  }
  LIMIT 50
  `;
  let results = [];

  // Fetch data & clean it
  function runQuery(queryUrl, query) {
    fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
      .then(res => res.json())
      .then(json => {
        results = JSON.parse(JSON.stringify(json.results));
        results = results.bindings;
        results = results.map((result, index) => {
          return {
            id: index,
            description: result.description.value,
            imageLink: result.imageLink.value,
            title: result.title.value,
            placeName: result.placeName.value
          };
        });
      });
  }

  onMount(() => {
    runQuery(queryUrl, query);
  });

	if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);

	return `${validate_component(Router, 'Router').$$render($$result, { url: url }, {}, {
		default: () => `
	  
	  <nav>
	    ${validate_component(NavLink, 'NavLink').$$render($$result, { to: "/" }, {}, { default: () => `Home` })}
	    ${validate_component(NavLink, 'NavLink').$$render($$result, { to: "video" }, {}, { default: () => `Video` })}
	    ${validate_component(NavLink, 'NavLink').$$render($$result, { to: "blog" }, {}, { default: () => `Blog` })}
	    ${validate_component(NavLink, 'NavLink').$$render($$result, { to: "retrieve-data" }, {}, { default: () => `Retrieve Data` })}
	  </nav>

	  
	  <div>
	    ${validate_component(Route, 'Route').$$render($$result, { path: "video", component: Video }, {}, {})}
	    ${validate_component(Route, 'Route').$$render($$result, {
		path: "retrieve-data",
		results: results,
		component: RetrieveData
	}, {}, {})}
	    ${validate_component(Route, 'Route').$$render($$result, { path: "blog/*", component: Blog }, {}, {})}
	    ${validate_component(Route, 'Route').$$render($$result, { path: "/", component: Home }, {}, {})}
	  </div>
	`
	})}`;
});

module.exports = App;
