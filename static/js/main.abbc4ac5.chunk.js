(this.webpackJsonpokapp=this.webpackJsonpokapp||[]).push([[0],{141:function(e,t,a){e.exports=a(223)},223:function(e,t,a){"use strict";a.r(t);a(142),a(168),a(170),a(171),a(173),a(174),a(175),a(176),a(177),a(178),a(179),a(180),a(182),a(183),a(184),a(185),a(186),a(187),a(188),a(189),a(190),a(191),a(193),a(194),a(195),a(196),a(197),a(198),a(199),a(200),a(201),a(202),a(203),a(204),a(205),a(206),a(207),a(208),a(209),a(210);var n=a(0),r=a.n(n),i=a(15),o=a.n(i),c=a(53),l=a(20),s=a(76),u=a(130),m=a(8),d={begin:function(e,t){return d.request({method:"ok/app/begin",params:{gid:e},handler:t})},apply:function(e,t,a){var n=d.getParams();return delete t.uid,d.request({method:"ok/app/subscribe",params:{gid:n.group_id,userFields:JSON.stringify(t),fieldValues:JSON.stringify(e)},handler:a})},disable:function(e,t){return d.request({method:"ok/app/disable",params:{gid:e},handler:t})},enable:function(e,t){return d.request({method:"ok/app/enable",params:{gid:e},handler:t})}},p=d,f={dash:{updateToken:function(e,t){var a=f.getParams();return f.request({method:"ok/dash/update-token",params:{gid:a.group_id,token:e},handler:t})}}},b=f,g="orlove.github.io"!==window.location.host?"https://local.api.hozya.ru":"https://api.hozya.ru",h={sigParams:function(){var e=["logged_user_id","session_key","auth_sig"],t=h.getParams();return Object.keys(t).filter((function(t){return-1!==e.indexOf(t)})).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")},updateParams:function(){window.location.search.length>1&&sessionStorage.setItem("launch-parameters",window.location.search.substr(1))},getParams:function(){var e=sessionStorage.getItem("launch-parameters")||"";return e.length>0?JSON.parse('{"'+e.replace(/&/g,'","').replace(/=/g,'":"')+'"}',(function(e,t){return""===e?t:decodeURIComponent(t)})):""},request:function(e){var t=e.method,a=e.params,n=e.tag,r=e.handler,i=e.options;n&&fetch.abort(n);var o=h.sigParams();return a&&(o=(a=Object.keys(a).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(a[e])})).join("&"))+"&"+o),fetch(g+"/"+t+"?"+o,i,n).then((function(e){return e.ok?e.json():(e.text().then((function(t){console.error(e.url,t.substr(-64),e)})),!1)})).then(r).catch((function(e){console.error(e)}))},post:function(e){var t=e.method,a=e.body,n=e.params,r=e.tag,i=e.handler,o=e.options;r&&fetch.abort(r),o=Object.assign({method:"POST",body:JSON.stringify(a)},o||{});var c=h.sigParams();return n&&(c=(n=Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&"))+"&"+c),fetch(g+"/"+t+"?"+c,o,r).then((function(e){return e.ok?e.json():(e.text().then((function(t){console.error(e.url,t.substr(-64),e)})),!1)})).then(i).catch((function(e){console.error(e)}))},abort:function(e){fetch.abort(e)}};[p,b].forEach((function(e){h=Object.assign(e,h)}));var E=h,v=function(){function e(){Object(s.a)(this,e),this.inited=!1,this.city=null,this.fieldValues={},this.exists=null,this.disabled=null,this.userFields={}}return Object(u.a)(e,[{key:"begin",value:function(e,t){var a=this;E.begin(e,(function(e){a.city=e.city,e.fieldValues&&(a.fieldValues=e.fieldValues),a.exists=!0===e.exists,a.disabled=!0===e.disabled,a.inited=!0,t(a.exists)}))}},{key:"disable",value:function(e){var t=this,a=E.getParams();E.disable(a.group_id,(function(e){e&&(t.disabled=!0)}))}},{key:"enable",value:function(e){var t=this,a=E.getParams();E.enable(a.group_id,(function(e){e&&(t.disabled=!1)}))}},{key:"getCurrentUser",value:function(){var e=this;window.OKSDK.REST.call("users.getCurrentUser",{fields:"NAME,PIC190X190"},(function(t,a,n){"ok"===t&&(e.userFields=a),"error"===t&&console.log("Error: "+JSON.stringify(n))}))}},{key:"setFieldValue",value:function(e,t){this.fieldValues[e]=t}},{key:"getFieldValue",value:function(e,t){return void 0!==this.fieldValues[e]?this.fieldValues[e]:t}},{key:"getFieldValues",value:function(){return this.fieldValues}}]),e}();Object(m.i)(v,{disabled:m.n,inited:m.n,begin:m.f});var O=v,y=new function e(){Object(s.a)(this,e),this.AppStore=new O},j=a(19),k=a(17),w=function(e){return"/okapp"+e+window.location.search},x=function(e){return e+window.location.search},S=function(e){return"/okapp"+e},C=function(e,t){var a=e.replace("#",""),n=parseInt(a.substring(0,2),16),r=parseInt(a.substring(2,4),16),i=parseInt(a.substring(4,6),16);return"rgba(".concat(n,",").concat(r,",").concat(i,",").concat(t/100,")")},N=new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",minimumFractionDigits:0}),P=a(269),_=a(258),I=a(134),A=a(263),F=a(4),z=a(251),V=a(253),R=a(248),T=Object(R.a)((function(e){return{container:{display:"flex"},header:{flex:"auto"},adminLink:{float:"right"}}})),B=function(e){var t=e.title,a=e.admin,n=T(),i=Object(k.f)(),o=Object(k.g)();return r.a.createElement("div",{className:n.container},r.a.createElement(z.a,{variant:"h1",gutterBottom:!0,className:n.header},t),a&&!Object(k.e)(o.pathname,{path:"/*/dashboard"})&&r.a.createElement(V.a,{onClick:function(){return i.push(w("/dashboard"))},className:n.adminLink},"\u0410\u0434\u043c\u0438\u043d"))},U=a(266),M=Object(R.a)((function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3),top:"50%",left:"50%",transform:"translate(-50%, -50%)"},footer:{textAlign:"right"}}})),L=function(e){var t=e.data,a=e.handleClose,n=M();return r.a.createElement(U.a,{open:t.open,onClose:a,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description"},r.a.createElement("div",{className:n.paper},t.title&&r.a.createElement("h2",{id:"simple-modal-title"},t.title),t.body&&r.a.createElement("p",{id:"simple-modal-description"},t.body),r.a.createElement("div",{className:n.footer},r.a.createElement(V.a,{onClick:a},"\u041e\u041a"))))},G=a(254),K=a(271),q=a(270),J=a(267),D=Object(q.a)(Object(l.b)("AppStore")((function(e){var t=e.theme,a=e.AppStore,n=Object(K.a)(V.a)({width:"100%",justifyContent:"left","& .MuiButton-label__text":{display:"block",width:"100%"},"&.Mui-selected":{backgroundColor:t.palette.grey[300]}}),i=r.a.useState(a.getFieldValue("types",0)),o=Object(j.a)(i,2),c=o[0],l=o[1];return r.a.createElement(G.a,{container:!0},r.a.createElement(G.a,{item:!0,xs:12},r.a.createElement(z.a,{variant:"h2",gutterBottom:!0},"\u041a\u0430\u043a\u043e\u0435 \u0436\u0438\u043b\u044c\u0451 \u0438\u0449\u0438\u0442\u0435?")),r.a.createElement(G.a,{item:!0,xs:12},r.a.createElement(G.a,{container:!0,spacing:2},Object.entries({2:"\u041a\u043e\u043c\u043d\u0430\u0442\u0443",64:"1 \u043a\u043e\u043c\u043d.",128:"2 \u043a\u043e\u043c\u043d.",256:"3 \u043a\u043e\u043c\u043d.",512:"4 \u043a\u043e\u043c\u043d.+",4:"\u0414\u043e\u043c"}).map((function(e){var t=Object(j.a)(e,2),i=t[0],o=t[1];return r.a.createElement(G.a,{item:!0,xs:6,key:i},r.a.createElement(n,{variant:"outlined",onClick:function(e){return function(e,t){if("INPUT"!==e.target.tagName){t=Number(t);var n=c+(c&t?-t:t);l(n),a.setFieldValue("types",n)}}(e,i)},className:c&i?"Mui-selected":""},r.a.createElement(J.a,{checked:c&i,onChange:function(e,t){return function(e,t){t=Number(t);var n=c+(c&t?-t:t);l(n),a.setFieldValue("types",n)}(0,i)},color:"primary"}),r.a.createElement("span",{className:"MuiButton-label__text"},o)))})))))}))),W=a(84),$=a(35),H=a(256),X=a(264),Z=a(268),Q=Object(R.a)((function(e){return{formControl:{width:"100%"}}})),Y=Object(l.b)("AppStore")((function(e){var t=e.AppStore,a=Q(),n=r.a.useState(t.getFieldValue("price",{from:0,to:0})),i=Object(j.a)(n,2),o=i[0],c=i[1],l=[3e3,3500,4e3,4500,5e3,5500,6e3,6500,7e3,7500,8e3,8500,9e3,9500,1e4,10500,11e3,11500,12e3,12500,13e3,13500,14e3,14500,15e3,16e3,17e3,18e3,19e3,2e4,21e3,23e3,25e3,27e3];l=l.concat([3e4,33e3,35e3,37e3,43e3,45e3,47e3,5e4,53e3,55e3,57e3]);var s=new Intl.NumberFormat("ru-RU",{style:"currency",currency:"rub",maximumSignificantDigits:3}),u=function(e){var t=e.target.name;c(Object($.a)(Object($.a)({},o),{},Object(W.a)({},t,e.target.value)))};return r.a.useEffect((function(){t.setFieldValue("price",o)}),[o]),r.a.createElement(G.a,{container:!0},r.a.createElement(G.a,{item:!0,xs:12},r.a.createElement(z.a,{variant:"h2",gutterBottom:!0},"\u041a\u0430\u043a\u0443\u044e \u0446\u0435\u043d\u0443 \u0440\u0430\u0441\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435?")),r.a.createElement(G.a,{item:!0,xs:12},r.a.createElement(G.a,{container:!0,spacing:2},r.a.createElement(G.a,{item:!0,xs:6},r.a.createElement(H.a,{variant:"outlined",className:a.formControl},r.a.createElement(X.a,{value:o.from,onChange:u,inputProps:{name:"from"}},r.a.createElement(Z.a,{value:"0"},"\u041e\u0442 \u043b\u044e\u0431\u043e\u0439"),l.filter((function(e){return o.to>e||0===o.to})).map((function(e,t){return r.a.createElement(Z.a,{value:e,key:t},"\u041e\u0442 "+s.format(e))}))))),r.a.createElement(G.a,{item:!0,xs:6},r.a.createElement(H.a,{variant:"outlined",className:a.formControl},r.a.createElement(X.a,{value:o.to,onChange:u,inputProps:{name:"to"}},r.a.createElement(Z.a,{value:"0"},"\u0414\u043e \u043b\u044e\u0431\u043e\u0439"),l.filter((function(e){return o.from<e})).map((function(e,t){return r.a.createElement(Z.a,{value:e,key:t},"\u0414\u043e "+s.format(e))}))))))))})),ee=a(101),te=Object(R.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},mapContainer:{height:window.innerHeight-150+"px",width:"100%"}}})),ae=Object(q.a)(Object(l.b)("AppStore")(Object(l.c)((function(e){var t=e.theme,a=e.AppStore,n=r.a.useState({mapIsLoaded:!1,map:null,ymaps:null,rectangle:null}),i=Object(j.a)(n,2),o=i[0],c=i[1],l=te();r.a.useEffect((function(){if(o.map&&o.ymaps&&!o.rectangle){var e=a.getFieldValue("map",{bounds:o.map.getBounds()}),n=new o.ymaps.Rectangle(e.bounds,{},{fill:!1,coordRendering:"boundsPath",strokeColor:C(t.palette.primary.main,70),strokeWidth:4});void 0===e.zoom&&e.bounds&&o.map.setBounds(e.bounds),o.map.geoObjects.add(n),c(Object($.a)(Object($.a)({},o),{},{rectangle:n})),o.map.events.add("boundschange",(function(e){var t=o.map.getBounds();n.geometry.setCoordinates(t),a.setFieldValue("map",{bounds:t,zoom:o.map.getZoom(),center:o.map.getCenter()})}))}}));return r.a.createElement(ee.b,{query:{load:["Rectangle"]}},r.a.createElement(P.a,{className:l.backdrop,open:!o.mapIsLoaded},r.a.createElement(_.a,{color:"inherit"})),r.a.createElement(z.a,{variant:"h5",gutterBottom:!0},"\u041f\u0440\u0438\u0431\u043b\u0438\u0437\u044c\u0442\u0435 \u043a \u043d\u0443\u0436\u043d\u043e\u043c\u0443 \u0440\u0430\u0439\u043e\u043d\u0443"),r.a.createElement(ee.a,{instanceRef:function(e){e&&!o.map&&c(Object($.a)(Object($.a)({},o),{},{map:e}))},onLoad:function(e){e&&!o.mapIsLoaded&&c(Object($.a)(Object($.a)({},o),{},{mapIsLoaded:!0,ymaps:e}))},options:{suppressMapOpenBlock:!0},defaultState:a.city.centroid_lat?{center:a.getFieldValue("map",{}).center||[a.city.centroid_lat,a.city.centroid_lon],zoom:a.getFieldValue("map",{}).zoom||9}:{},className:l.mapContainer}))})))),ne=Object(R.a)((function(e){return{footer:{marginTop:"20px"}}})),re=Object(q.a)(Object(l.b)("AppStore")((function(e){e.theme;var t=e.locationPath,a=e.setTitle,i=e.handleModalOpen,o=e.AppStore,c=ne(),l=[{component:D,key:"types",exact:!0,path:t},{component:Y,key:"price",path:t+"/price"},{component:ae,key:"map",path:t+"/map"}],s=Object(k.f)(),u=Object(k.g)(),m=l.find((function(e){return Object(k.e)(u.pathname,e)})),d=l.indexOf(m),p=l.length-1>d?l[d+1]:null;Object(n.useEffect)((function(){a(d+1+" \u0438\u0437 "+l.length)}),[d]);var f=Object(K.a)(V.a)({float:"right"}),b=function(e){if(e.data&&"showGroupPermissions"===e.data.substring(0,20)){var t=e.data.split("$"),a=Object(j.a)(t,3),n=a[1],r=a[2];if(console.log("widgetMessage.data",e.data),"ok"===n)if("MESSAGES_FROM_GROUP"===JSON.parse(r).permissions_granted)return void E.apply(o.getFieldValues(),o.userFields,(function(e){e?(o.exists?s.push(w("/view")):s.push(w("/done")),o.exists=!0,o.disabled=!1):i(null,"\u0412\u044b \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043f\u043e\u043c\u0435\u043d\u044f\u043b\u0438.",(function(){return s.push(w("/view"))}))}));i(null,"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0434\u0430\u0439\u0442\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u043c\u043e\u0433\u043b\u0438 \u043f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u0432\u0430\u043c \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b.")}};r.a.useEffect((function(){return window.addEventListener("message",b,!1),function(){return window.removeEventListener("message",b)}}),[]);var g=function(){window.OKSDK.Widgets.askGroupAppPermissions("MESSAGES_FROM_GROUP")};return r.a.createElement("div",null,r.a.createElement(k.c,null,l.map((function(e){return r.a.createElement(k.a,e)}))),r.a.createElement(G.a,{container:!0,className:c.footer},r.a.createElement(G.a,{item:!0,xs:3},d>0&&r.a.createElement(V.a,{size:"large",color:"default",variant:"contained",onClick:function(){return s.push(x(l[d-1].path))}},"\u041d\u0430\u0437\u0430\u0434")),r.a.createElement(G.a,{item:!0,xs:9},p&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:function(){s.push(x(p.path))}},"\u0414\u0430\u043b\u0435\u0435"),!p&&!o.exists&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:g},"\u041f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432"),!p&&o.exists&&!o.disabled&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:g},"\u041e\u041a"),!p&&o.exists&&o.disabled&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:g},"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"))))}))),ie=Object(R.a)((function(e){return{container:{padding:e.spacing(2)}}})),oe=function(e){var t=e.setTitle;Object(n.useEffect)((function(){t("\u0413\u043e\u0442\u043e\u0432\u043e!")}),[]);var a=ie();return r.a.createElement("div",{className:a.container},r.a.createElement(z.a,{align:"justify",paragraph:!0},"\u0412 \u0442\u0435\u0447\u0435\u043d\u0438\u0438 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u043c\u0438\u043d\u0443\u0442 \u0432\u0430\u043c \u043f\u0440\u0438\u0434\u0443\u0442 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432. \u0421\u0432\u0435\u0436\u0438\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043f\u043e \u043c\u0435\u0440\u0435 \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f. \u0412\u044b \u043d\u0435 \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e!"),r.a.createElement(V.a,{variant:"contained",onClick:function(){return window.location.href="https://ok.ru/messages"}},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f\u043c"))},ce=a(259),le=a(260),se=a(261),ue=a(262),me=Object(R.a)((function(e){return{container:{padding:e.spacing(2)},tableContainer:{paddingBottom:e.spacing(4)},rightBtnContainer:{textAlign:"right"}}})),de=Object(l.b)("AppStore")(Object(l.c)((function(e){var t=e.setTitle,a=e.AppStore;Object(n.useEffect)((function(){t("\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0449\u0435\u0433\u043e \u0436\u0438\u043b\u044c\u044f")}),[]);var i=me(),o=Object(k.f)(),c=a.getFieldValues();return r.a.createElement(G.a,{container:!0},r.a.createElement(G.a,{item:!0,xs:12,className:i.tableContainer},r.a.createElement(ce.a,null,r.a.createElement(le.a,null,r.a.createElement(se.a,null,r.a.createElement(ue.a,null,"\u0422\u0438\u043f \u0436\u0438\u043b\u044c\u044f"),r.a.createElement(ue.a,null,Object.entries({2:"\u043a\u043e\u043c\u043d\u0430\u0442\u0430",64:"\u043e\u0434\u043d\u043e\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",128:"\u0434\u0432\u0443\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",256:"\u0442\u0440\u0451\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",512:"\u0447\u0435\u0442\u044b\u0440\u0435\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f+",4:"\u0414\u043e\u043c"}).map((function(e){var t=Object(j.a)(e,2),a=t[0],n=t[1];return c.types&a?n:null})).filter((function(e){return null!==e})).join(", "))),r.a.createElement(se.a,null,r.a.createElement(ue.a,null,"\u0426\u0435\u043d\u0430"),r.a.createElement(ue.a,null,c.price.to>0&&c.price.from>0&&"\u043e\u0442 ".concat(N.format(c.price.from).substr(0,N.format(c.price.from).length-1)," \u0434\u043e ").concat(N.format(c.price.to)),0===c.price.to&&c.price.from>0&&"\u043e\u0442 ".concat(N.format(c.price.from)),c.price.to>0&&0===c.price.from&&"\u0434\u043e ".concat(N.format(c.price.to)))),r.a.createElement(se.a,null,r.a.createElement(ue.a,null,"\u041c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"),r.a.createElement(ue.a,null,c.map?"\u0432\u044b\u0431\u0440\u0430\u043d\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435":"\u0432\u0435\u0441\u044c \u0433\u043e\u0440\u043e\u0434"))))),r.a.createElement(G.a,{item:!0,xs:5},r.a.createElement(V.a,{size:"large",variant:"contained",onClick:function(){return o.push(w("/quiz"))}},"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b")),r.a.createElement(G.a,{item:!0,xs:7,className:i.rightBtnContainer},!a.disabled&&r.a.createElement(V.a,{size:"large",variant:"contained",onClick:function(){a.disable()}},"\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043e\u0432"),a.disabled&&r.a.createElement(V.a,{size:"large",variant:"contained",color:"primary",onClick:function(){a.enable()}},"\u041f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0445\u043e\u0437\u044f\u0435\u0432")))}))),pe=a(265),fe=function(e){var t=e.setTitle;r.a.useEffect((function(){t("\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f")}),[]);var a=r.a.useState(!1),n=Object(j.a)(a,2),i=n[0],o=n[1];r.a.useEffect((function(){return window.addEventListener("message",c,!1),function(){return window.removeEventListener("message",c)}}),[]);var c=function(e){if(console.log("widgetMessage",e),e.data&&"showGroupPermissions$ok$"===e.data.substring(0,24)){var t=JSON.parse(e.data.substring(24));"GROUP_BOT_API_TOKEN"===t.permissions_granted&&E.dash.updateToken(t.access_token,(function(e){e.error?o({severity:"error",text:e.error}):o({severity:"success",text:"\u0422\u043e\u043a\u0435\u043d \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0431\u043d\u043e\u0432\u043b\u0451\u043d"})}))}};return r.a.createElement("div",null,r.a.createElement(V.a,{variant:"contained",onClick:function(){window.OKSDK.Widgets.askGroupAppPermissions("GROUP_BOT_API_TOKEN")}},"\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c/\u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u043e\u043a\u0435\u043d"),i&&r.a.createElement(pe.a,{severity:i.severity},i.text))},be=function(e){var t=e.setTitle,a=e.admin,n=S("/quiz"),i=r.a.useState({open:!1}),o=Object(j.a)(i,2),c=o[0],l=o[1],s=function(e,t,a){return l({open:!0,title:e,body:t,onclose:a})};return r.a.createElement("div",null,r.a.createElement(k.c,null,r.a.createElement(k.a,{path:n,render:function(){return r.a.createElement(re,{setTitle:t,locationPath:n,handleModalOpen:s})}}),r.a.createElement(k.a,{path:S("/done"),render:function(){return r.a.createElement(oe,{setTitle:t})}}),r.a.createElement(k.a,{path:S("/view"),render:function(){return r.a.createElement(de,{setTitle:t})}}),a&&r.a.createElement(k.a,{exact:!0,path:S("/dashboard"),render:function(){return r.a.createElement(fe,{setTitle:t})}})),r.a.createElement(L,{data:c,handleClose:function(){c&&c.onclose(),l({open:!1})}}))},ge=Object(I.a)({palette:{primary:{main:"#ee8208",contrastText:"#fff"}},typography:{h1:{fontSize:"28px"},h2:{fontSize:"24px"}}}),he=Object(F.a)((function(e){return{rootContainer:{padding:"8px"},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}))(Object(l.b)("AppStore")(Object(l.c)((function(e){var t=e.AppStore,a=e.classes,i=Object(k.f)(),o=Object(n.useState)(null),c=Object(j.a)(o,2),l=c[0],s=c[1],u=r.a.useState(!1),m=Object(j.a)(u,2),d=m[0],p=m[1];return r.a.useEffect((function(){"ADMIN"===E.getParams().viewer_type&&p(!0)}),[]),r.a.useEffect((function(){E.updateParams();var e=E.getParams();t.begin(e.group_id,(function(e){e?i.push(w("/view")):i.push(w("/quiz"))})),window.OKSDK.init({app_id:512000691802,app_key:"CLFPIPJGDIHBABABA"},(function(){t.getCurrentUser()}),(function(e){return alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 SDK")}))}),[]),r.a.createElement(A.a,{theme:ge},r.a.createElement(P.a,{className:a.backdrop,open:!t.inited},r.a.createElement(_.a,{color:"inherit"})),t.inited&&r.a.createElement("div",{className:a.rootContainer},r.a.createElement(B,{title:l,admin:d}),r.a.createElement(be,{setTitle:s,admin:d})))})))),Ee={mainStore:y,AppStore:y.AppStore};o.a.render(r.a.createElement(l.a,Ee,r.a.createElement(c.a,null,r.a.createElement(he,null))),document.getElementById("root"))}},[[141,1,2]]]);
//# sourceMappingURL=main.abbc4ac5.chunk.js.map