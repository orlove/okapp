(this.webpackJsonpokapp=this.webpackJsonpokapp||[]).push([[0],{141:function(e,t,a){e.exports=a(223)},223:function(e,t,a){"use strict";a.r(t);a(142),a(168),a(170),a(171),a(173),a(174),a(175),a(176),a(177),a(178),a(179),a(180),a(182),a(183),a(184),a(185),a(186),a(187),a(188),a(189),a(190),a(191),a(193),a(194),a(195),a(196),a(197),a(198),a(199),a(200),a(201),a(202),a(203),a(204),a(205),a(206),a(207),a(208),a(209),a(210);var n=a(0),r=a.n(n),i=a(15),o=a.n(i),c=a(53),s=a(20),l=a(76),u=a(130),m=a(8),d={begin:function(e,t){return d.request({method:"ok/app/begin",params:{gid:e},handler:t})},apply:function(e,t,a){var n=d.getParams();return delete t.uid,d.request({method:"ok/app/subscribe",params:{gid:n.group_id,userFields:JSON.stringify(t),fieldValues:JSON.stringify(e)},handler:a})},disable:function(e,t){return d.request({method:"ok/app/disable",params:{gid:e},handler:t})},enable:function(e,t){return d.request({method:"ok/app/enable",params:{gid:e},handler:t})},permissionSet:function(e,t){return d.request({method:"ok/app/permission",params:{gid:e,get:0,hashParams:t}})},permissionGet:function(e,t){return d.request({method:"ok/app/permission",params:{gid:e,get:1},handler:t})}},p={dash:{updateToken:function(e,t){var a=p.getParams();return p.request({method:"ok/dash/update-token",params:{gid:a.group_id,token:e},handler:t})}}},f="https://api.hozya.ru",g={sigParams:function(){var e=["logged_user_id","session_key","auth_sig"],t=g.getParams();return Object.keys(t).filter((function(t){return-1!==e.indexOf(t)})).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")},updateParams:function(){window.location.search.length>1&&sessionStorage.setItem("launch-parameters",window.location.search.substr(1))},getParams:function(){var e=sessionStorage.getItem("launch-parameters")||"";return e.length>0?JSON.parse('{"'+e.replace(/&/g,'","').replace(/=/g,'":"')+'"}',(function(e,t){return""===e?t:decodeURIComponent(t)})):""},getHashParams:function(){var e=window.location.hash.substring(1);return e&&e.length>0?JSON.parse('{"'+e.replace(/&/g,'","').replace(/=/g,'":"')+'"}',(function(e,t){return""===e?t:decodeURIComponent(t)})):""},request:function(e){var t=e.method,a=e.params,n=e.tag,r=e.handler,i=e.options;n&&fetch.abort(n);var o=g.sigParams();return a&&(o=(a=Object.keys(a).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(a[e])})).join("&"))+"&"+o),fetch(f+"/"+t+"?"+o,i,n).then((function(e){return e.ok?e.json():(e.text().then((function(t){console.error(e.url,t.substr(-64),e)})),!1)})).then(r).catch((function(e){console.error(e)}))},post:function(e){var t=e.method,a=e.body,n=e.params,r=e.tag,i=e.handler,o=e.options;r&&fetch.abort(r),o=Object.assign({method:"POST",body:JSON.stringify(a)},o||{});var c=g.sigParams();return n&&(c=(n=Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&"))+"&"+c),fetch(f+"/"+t+"?"+c,o,r).then((function(e){return e.ok?e.json():(e.text().then((function(t){console.error(e.url,t.substr(-64),e)})),!1)})).then(i).catch((function(e){console.error(e)}))},abort:function(e){fetch.abort(e)}};[d,p].forEach((function(e){g=Object.assign(e,g)}));var b=g,h=function(){function e(){Object(l.a)(this,e),this.inited=!1,this.city=null,this.fieldValues={},this.exists=null,this.disabled=null,this.userFields={}}return Object(u.a)(e,[{key:"begin",value:function(e,t){var a=this;b.begin(e,(function(e){a.city=e.city,e.fieldValues&&(a.fieldValues=e.fieldValues),a.exists=!0===e.exists,a.disabled=!0===e.disabled,a.inited=!0,t(a.exists)}))}},{key:"disable",value:function(e){var t=this,a=b.getParams();b.disable(a.group_id,(function(e){e&&(t.disabled=!0)}))}},{key:"enable",value:function(e){var t=this,a=b.getParams();b.enable(a.group_id,(function(e){e&&(t.disabled=!1)}))}},{key:"getCurrentUser",value:function(){var e=this;window.OKSDK.REST.call("users.getCurrentUser",{fields:"NAME,PIC190X190"},(function(t,a,n){"ok"===t&&(e.userFields=a),"error"===t&&console.log("Error: "+JSON.stringify(n))}))}},{key:"setFieldValue",value:function(e,t){this.fieldValues[e]=t}},{key:"getFieldValue",value:function(e,t){return void 0!==this.fieldValues[e]?this.fieldValues[e]:t}},{key:"getFieldValues",value:function(){return this.fieldValues}}]),e}();Object(m.i)(h,{disabled:m.n,inited:m.n,begin:m.f});var E=h,v=new function e(){Object(l.a)(this,e),this.AppStore=new E},O=a(18),j=a(17),y=function(e,t){return"/okapp"+e+window.location.search},k=function(e){var t="/okapp"+e+window.location.search,a=["logged_user_id","session_key","auth_sig"],n=b.getParams(),r=Object.keys(n).filter((function(e){return-1!==a.indexOf(e)})).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&");return window.location.protocol+"//"+window.location.hostname+t+"?"+r},w=function(e){return e+window.location.search},S=function(e){return"/okapp"+e},x=function(e,t){var a=e.replace("#",""),n=parseInt(a.substring(0,2),16),r=parseInt(a.substring(2,4),16),i=parseInt(a.substring(4,6),16);return"rgba(".concat(n,",").concat(r,",").concat(i,",").concat(t/100,")")},C=function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])},P=new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",minimumFractionDigits:0}),_=a(269),N=a(258),I=a(134),A=a(263),R=a(4),F=a(251),z=a(253),T=a(248),V=Object(T.a)((function(e){return{container:{display:"flex"},header:{flex:"auto",fontSize:"16px",fontWeight:"bold"},adminLink:{float:"right"}}})),U=function(e){var t=e.title,a=e.admin,n=V(),i=Object(j.f)(),o=Object(j.g)();return r.a.createElement("div",{className:n.container},r.a.createElement(F.a,{variant:"h1",gutterBottom:!0,className:n.header},t),a&&!Object(j.e)(o.pathname,{path:"/*/dashboard"})&&r.a.createElement(z.a,{onClick:function(){return i.push(y("/dashboard"))},className:n.adminLink},"\u0410\u0434\u043c\u0438\u043d"))},B=a(266),G=Object(T.a)((function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3),top:"50%",left:"50%",transform:"translate(-50%, -50%)"},footer:{textAlign:"right"}}})),M=function(e){var t=e.data,a=e.handleClose,n=G();return r.a.createElement(B.a,{open:t.open,onClose:a,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description"},r.a.createElement("div",{className:n.paper},t.title&&r.a.createElement("h2",{id:"simple-modal-title"},t.title),t.body&&r.a.createElement("p",{id:"simple-modal-description"},t.body),r.a.createElement("div",{className:n.footer},r.a.createElement(z.a,{onClick:a},"\u041e\u041a"))))},J=a(254),q=a(270),L=a(271),K=a(267),D=Object(L.a)(Object(s.b)("AppStore")((function(e){var t=e.theme,a=e.AppStore,n=Object(q.a)(z.a)({width:"100%",justifyContent:"left","& .MuiButton-label__text":{display:"block",width:"100%"},"&.Mui-selected":{backgroundColor:t.palette.grey[300]}}),i=r.a.useState(a.getFieldValue("types",0)),o=Object(O.a)(i,2),c=o[0],s=o[1];return r.a.createElement(J.a,{container:!0},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(F.a,{variant:"h2",gutterBottom:!0},"\u041a\u0430\u043a\u043e\u0435 \u0436\u0438\u043b\u044c\u0451 \u0438\u0449\u0438\u0442\u0435?")),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(J.a,{container:!0,spacing:2},Object.entries({2:"\u041a\u043e\u043c\u043d\u0430\u0442\u0443",64:"1 \u043a\u043e\u043c\u043d.",128:"2 \u043a\u043e\u043c\u043d.",256:"3 \u043a\u043e\u043c\u043d.",512:"4 \u043a\u043e\u043c\u043d.+",4:"\u0414\u043e\u043c"}).map((function(e){var t=Object(O.a)(e,2),i=t[0],o=t[1];return r.a.createElement(J.a,{item:!0,xs:6,key:i},r.a.createElement(n,{variant:"outlined",onClick:function(e){return function(e,t){if("INPUT"!==e.target.tagName){t=Number(t);var n=c+(c&t?-t:t);s(n),a.setFieldValue("types",n)}}(e,i)},className:c&i?"Mui-selected":""},r.a.createElement(K.a,{checked:Boolean(c&i),onChange:function(e,t){return function(e,t){t=Number(t);var n=c+(c&t?-t:t);s(n),a.setFieldValue("types",n)}(0,i)},color:"primary"}),r.a.createElement("span",{className:"MuiButton-label__text"},o)))})))))}))),H=a(84),W=a(37),$=a(256),X=a(264),Z=a(268),Q=Object(T.a)((function(e){return{formControl:{width:"100%"}}})),Y=Object(s.b)("AppStore")((function(e){var t=e.AppStore,a=Q(),n=r.a.useState(t.getFieldValue("price",{from:0,to:0})),i=Object(O.a)(n,2),o=i[0],c=i[1],s=[3e3,3500,4e3,4500,5e3,5500,6e3,6500,7e3,7500,8e3,8500,9e3,9500,1e4,10500,11e3,11500,12e3,12500,13e3,13500,14e3,14500,15e3,16e3,17e3,18e3,19e3,2e4,21e3,23e3,25e3,27e3];s=s.concat([3e4,33e3,35e3,37e3,43e3,45e3,47e3,5e4,53e3,55e3,57e3]);var l=new Intl.NumberFormat("ru-RU",{style:"currency",currency:"rub",maximumSignificantDigits:3}),u=function(e){var t=e.target.name;c(Object(W.a)(Object(W.a)({},o),{},Object(H.a)({},t,e.target.value)))};return r.a.useEffect((function(){t.setFieldValue("price",o)}),[o]),r.a.createElement(J.a,{container:!0},r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(F.a,{variant:"h2",gutterBottom:!0},"\u041a\u0430\u043a\u0443\u044e \u0446\u0435\u043d\u0443 \u0440\u0430\u0441\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435?")),r.a.createElement(J.a,{item:!0,xs:12},r.a.createElement(J.a,{container:!0,spacing:2},r.a.createElement(J.a,{item:!0,xs:6},r.a.createElement($.a,{variant:"outlined",className:a.formControl},r.a.createElement(X.a,{value:o.from,onChange:u,inputProps:{name:"from"}},r.a.createElement(Z.a,{value:"0"},"\u041e\u0442 \u043b\u044e\u0431\u043e\u0439"),s.filter((function(e){return o.to>e||0===o.to})).map((function(e,t){return r.a.createElement(Z.a,{value:e,key:t},"\u041e\u0442 "+l.format(e))}))))),r.a.createElement(J.a,{item:!0,xs:6},r.a.createElement($.a,{variant:"outlined",className:a.formControl},r.a.createElement(X.a,{value:o.to,onChange:u,inputProps:{name:"to"}},r.a.createElement(Z.a,{value:"0"},"\u0414\u043e \u043b\u044e\u0431\u043e\u0439"),s.filter((function(e){return o.from<e})).map((function(e,t){return r.a.createElement(Z.a,{value:e,key:t},"\u0414\u043e "+l.format(e))}))))))))})),ee=a(101),te=Object(T.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},mapContainer:{height:window.innerHeight-150+"px",width:"100%"},title:{fontSize:"21px"}}})),ae=Object(L.a)(Object(s.b)("AppStore")(Object(s.c)((function(e){var t=e.theme,a=e.AppStore,n=r.a.useState({mapIsLoaded:!1,map:null,ymaps:null,rectangle:null}),i=Object(O.a)(n,2),o=i[0],c=i[1],s=te();r.a.useEffect((function(){if(o.map&&o.ymaps&&!o.rectangle){var e=a.getFieldValue("map",{bounds:o.map.getBounds()}),n=new o.ymaps.Rectangle(e.bounds,{},{fill:!1,coordRendering:"boundsPath",strokeColor:x(t.palette.primary.main,70),strokeWidth:4});void 0===e.zoom&&e.bounds&&o.map.setBounds(e.bounds),o.map.geoObjects.add(n),c(Object(W.a)(Object(W.a)({},o),{},{rectangle:n})),o.map.events.add("boundschange",(function(e){var t=o.map.getBounds();n.geometry.setCoordinates(t),a.setFieldValue("map",{bounds:t,zoom:o.map.getZoom(),center:o.map.getCenter()})}))}}));return r.a.createElement(ee.b,{query:{load:["Rectangle"]}},r.a.createElement(_.a,{className:s.backdrop,open:!o.mapIsLoaded},r.a.createElement(N.a,{color:"inherit"})),r.a.createElement(F.a,{variant:"h2",gutterBottom:!0,className:s.title},"\u041f\u0440\u0438\u0431\u043b\u0438\u0437\u044c\u0442\u0435 \u043a \u043d\u0443\u0436\u043d\u043e\u043c\u0443 \u0440\u0430\u0439\u043e\u043d\u0443"),r.a.createElement(ee.a,{instanceRef:function(e){e&&!o.map&&c(Object(W.a)(Object(W.a)({},o),{},{map:e}))},onLoad:function(e){e&&!o.mapIsLoaded&&c(Object(W.a)(Object(W.a)({},o),{},{mapIsLoaded:!0,ymaps:e}))},options:{suppressMapOpenBlock:!0},defaultState:a.city.centroid_lat?{center:a.getFieldValue("map",{}).center||[a.city.centroid_lat,a.city.centroid_lon],zoom:a.getFieldValue("map",{}).zoom||9}:{},className:s.mapContainer}))})))),ne=Object(T.a)((function(e){return{footer:{marginTop:"20px"}}})),re=Object(L.a)(Object(s.b)("AppStore")((function(e){e.theme;var t=e.locationPath,a=e.setTitle,i=e.handleModalOpen,o=e.AppStore,c=ne(),s=[{component:D,key:"types",exact:!0,path:t},{component:Y,key:"price",path:t+"/price"},{component:ae,key:"map",path:t+"/map"}],l=Object(j.f)(),u=Object(j.g)(),m=s.find((function(e){return Object(j.e)(u.pathname,e)})),d=s.indexOf(m),p=s.length-1>d?s[d+1]:null;Object(n.useEffect)((function(){a(d+1+" \u0438\u0437 "+s.length)}),[d]);var f=Object(q.a)(z.a)({float:"right"}),g=function(e){return"MESSAGES_FROM_GROUP"===e.permissions_granted&&(b.apply(o.getFieldValues(),o.userFields,(function(e){e?(o.exists?l.push(y("/view")):l.push(y("/done")),o.exists=!0,o.disabled=!1):i(null,"\u0412\u044b \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043f\u043e\u043c\u0435\u043d\u044f\u043b\u0438.",(function(){return l.push(y("/view"))}))})),!0)},h=function(e){if("string"===typeof e.data&&"showGroupPermissions"===e.data.substring(0,20)){var t=e.data.split("$"),a=Object(O.a)(t,3),n=a[1],r=a[2];if("ok"===n&&g(JSON.parse(r)))return;i(null,"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0434\u0430\u0439\u0442\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439, \u0447\u0442\u043e\u0431\u044b \u043c\u044b \u043c\u043e\u0433\u043b\u0438 \u043f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u0432\u0430\u043c \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b.")}},E=r.a.useState(!1),v=Object(O.a)(E,2),S=v[0],x=v[1];C((function(){if(S){var e=b.getParams();b.permissionGet(e.group_id,(function(e){e.get&&g(JSON.parse(e.hashParams))}))}}),3e3),r.a.useEffect((function(){return window.addEventListener("message",h,!1),function(){window.removeEventListener("message",h)}}),[]);var P=function(){b.getParams();window.OKSDK.Widgets.askGroupAppPermissions("MESSAGES_FROM_GROUP",k("")),console.log("urlEx",k("")),x(!0)};return r.a.createElement("div",null,r.a.createElement(j.c,null,s.map((function(e){return r.a.createElement(j.a,e)}))),r.a.createElement(J.a,{container:!0,className:c.footer},r.a.createElement(J.a,{item:!0,xs:3},d>0&&r.a.createElement(z.a,{size:"large",color:"default",variant:"contained",onClick:function(){return l.push(w(s[d-1].path))}},"\u041d\u0430\u0437\u0430\u0434")),r.a.createElement(J.a,{item:!0,xs:9},p&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:function(){l.push(w(p.path))}},"\u0414\u0430\u043b\u0435\u0435"),!p&&!o.exists&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:P},"\u041f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432"),!p&&o.exists&&!o.disabled&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:P},"\u041e\u041a"),!p&&o.exists&&o.disabled&&r.a.createElement(f,{size:"large",color:"primary",variant:"contained",onClick:P},"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"))))}))),ie=Object(T.a)((function(e){return{container:{padding:e.spacing(2)}}})),oe=function(e){var t=e.setTitle;Object(n.useEffect)((function(){t("\u0413\u043e\u0442\u043e\u0432\u043e!")}),[]);var a=ie();return r.a.createElement("div",{className:a.container},r.a.createElement(F.a,{align:"justify",paragraph:!0},"\u0412 \u0442\u0435\u0447\u0435\u043d\u0438\u0438 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u043c\u0438\u043d\u0443\u0442 \u0432\u0430\u043c \u043f\u0440\u0438\u0434\u0443\u0442 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a\u043e\u0432. \u0421\u0432\u0435\u0436\u0438\u0435 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043f\u043e \u043c\u0435\u0440\u0435 \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f. \u0412\u044b \u043d\u0435 \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e!"),r.a.createElement(z.a,{variant:"contained",onClick:function(){return window.location.href="https://ok.ru/messages"}},"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f\u043c"))},ce=a(259),se=a(260),le=a(261),ue=a(262),me=Object(T.a)((function(e){return{container:{padding:e.spacing(2)},tableContainer:{paddingBottom:e.spacing(4)},rightBtnContainer:{textAlign:"right"}}})),de=Object(s.b)("AppStore")(Object(s.c)((function(e){var t=e.setTitle,a=e.AppStore;Object(n.useEffect)((function(){t("\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0449\u0435\u0433\u043e \u0436\u0438\u043b\u044c\u044f")}),[]);var i=me(),o=Object(j.f)(),c=a.getFieldValues();return r.a.createElement(J.a,{container:!0},r.a.createElement(J.a,{item:!0,xs:12,className:i.tableContainer},r.a.createElement(ce.a,null,r.a.createElement(se.a,null,r.a.createElement(le.a,null,r.a.createElement(ue.a,null,"\u0422\u0438\u043f \u0436\u0438\u043b\u044c\u044f"),r.a.createElement(ue.a,null,Object.entries({2:"\u043a\u043e\u043c\u043d\u0430\u0442\u0430",64:"\u043e\u0434\u043d\u043e\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",128:"\u0434\u0432\u0443\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",256:"\u0442\u0440\u0451\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f",512:"\u0447\u0435\u0442\u044b\u0440\u0435\u0445\u043a\u043e\u043c\u043d\u0430\u0442\u043d\u0430\u044f+",4:"\u0414\u043e\u043c"}).map((function(e){var t=Object(O.a)(e,2),a=t[0],n=t[1];return c.types&a?n:null})).filter((function(e){return null!==e})).join(", "))),r.a.createElement(le.a,null,r.a.createElement(ue.a,null,"\u0426\u0435\u043d\u0430"),r.a.createElement(ue.a,null,c.price.to>0&&c.price.from>0&&"\u043e\u0442 ".concat(P.format(c.price.from).substr(0,P.format(c.price.from).length-1)," \u0434\u043e ").concat(P.format(c.price.to)),0===c.price.to&&c.price.from>0&&"\u043e\u0442 ".concat(P.format(c.price.from)),c.price.to>0&&0===c.price.from&&"\u0434\u043e ".concat(P.format(c.price.to)))),r.a.createElement(le.a,null,r.a.createElement(ue.a,null,"\u041c\u0435\u0441\u0442\u043e\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435"),r.a.createElement(ue.a,null,c.map?"\u0432\u044b\u0431\u0440\u0430\u043d\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435":"\u0432\u0435\u0441\u044c \u0433\u043e\u0440\u043e\u0434"))))),r.a.createElement(J.a,{item:!0,xs:5},r.a.createElement(z.a,{size:"large",variant:"contained",onClick:function(){return o.push(y("/quiz"))}},"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b")),r.a.createElement(J.a,{item:!0,xs:7,className:i.rightBtnContainer},!a.disabled&&r.a.createElement(z.a,{size:"large",variant:"contained",onClick:function(){a.disable()}},"\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043e\u0432"),a.disabled&&r.a.createElement(z.a,{size:"large",variant:"contained",color:"primary",onClick:function(){a.enable()}},"\u041f\u0440\u0438\u0441\u043b\u0430\u0442\u044c \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u0442 \u0445\u043e\u0437\u044f\u0435\u0432")))}))),pe=Object(T.a)((function(e){return{container:{padding:e.spacing(2)}}})),fe=function(e){var t=e.setTitle,a=r.a.useState(null),i=Object(O.a)(a,2),o=i[0],c=i[1];Object(n.useEffect)((function(){t("\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f");var e=b.getParams(),a=b.getHashParams();if("undefined"!==typeof a.permissions_granted){var n="MESSAGES_FROM_GROUP"===a.permissions_granted;c(n),n&&setTimeout((function(){return window.close()}),2e3),b.permissionSet(e.group_id,JSON.stringify(a))}else"undefined"!==typeof a.error&&c(!1)}),[]);var s=pe();return null===o?r.a.createElement("div",null):r.a.createElement("div",{className:s.container},r.a.createElement(F.a,{align:"justify",paragraph:!0},o?"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u0435 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043e!":"\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u0435 \u043d\u0435 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043e. \u0411\u0435\u0437 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u0432\u044b \u043d\u0435 \u0441\u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u043b\u0443\u0447\u0430\u0442\u044c \u043f\u043e\u0434\u0445\u043e\u0434\u044f\u0449\u0438\u0435 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u044b \u0436\u0438\u043b\u044c\u044f. \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 \u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \xab\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c\xbb."),r.a.createElement(z.a,{variant:"contained",onClick:function(){return window.close()}},"\u041e\u041a"))},ge=a(265),be=function(e){var t=e.setTitle;r.a.useEffect((function(){t("\u041f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f")}),[]);var a=r.a.useState(!1),n=Object(O.a)(a,2),i=n[0],o=n[1];r.a.useEffect((function(){return window.addEventListener("message",c,!1),function(){return window.removeEventListener("message",c)}}),[]);var c=function(e){if(e.data&&"showGroupPermissions$ok$"===e.data.substring(0,24)){var t=JSON.parse(e.data.substring(24));"GROUP_BOT_API_TOKEN"===t.permissions_granted&&b.dash.updateToken(t.access_token,(function(e){e.error?o({severity:"error",text:e.error}):o({severity:"success",text:"\u0422\u043e\u043a\u0435\u043d \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0431\u043d\u043e\u0432\u043b\u0451\u043d"})}))}};return r.a.createElement("div",null,r.a.createElement(z.a,{variant:"contained",onClick:function(){window.OKSDK.Widgets.askGroupAppPermissions("GROUP_BOT_API_TOKEN")}},"\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c/\u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u043e\u043a\u0435\u043d"),i&&r.a.createElement(ge.a,{severity:i.severity},i.text))},he=function(e){var t=e.setTitle,a=e.admin,n=S("/quiz"),i=r.a.useState({open:!1}),o=Object(O.a)(i,2),c=o[0],s=o[1],l=function(e,t,a){return s({open:!0,title:e,body:t,onclose:a})};return r.a.createElement("div",null,r.a.createElement(j.c,null,r.a.createElement(j.a,{path:n,render:function(){return r.a.createElement(re,{setTitle:t,locationPath:n,handleModalOpen:l})}}),r.a.createElement(j.a,{path:S("/done"),render:function(){return r.a.createElement(oe,{setTitle:t})}}),r.a.createElement(j.a,{path:S("/view"),render:function(){return r.a.createElement(de,{setTitle:t})}}),r.a.createElement(j.a,{path:S("/permissions-receive"),render:function(){return r.a.createElement(fe,{setTitle:t})}}),a&&r.a.createElement(j.a,{exact:!0,path:S("/dashboard"),render:function(){return r.a.createElement(be,{setTitle:t})}})),r.a.createElement(M,{data:c,handleClose:function(){c&&c.onclose(),s({open:!1})}}))},Ee=Object(I.a)({palette:{primary:{main:"#ee8208",contrastText:"#fff"}},typography:{h1:{fontSize:"28px"},h2:{fontSize:"24px"}}}),ve=Object(R.a)((function(e){return{rootContainer:{padding:"8px"},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}))(Object(s.b)("AppStore")(Object(s.c)((function(e){var t=e.AppStore,a=e.classes,i=Object(j.f)(),o=Object(j.g)(),c=Object(n.useState)(null),s=Object(O.a)(c,2),l=s[0],u=s[1],m=r.a.useState(!1),d=Object(O.a)(m,2),p=d[0],f=d[1];return r.a.useEffect((function(){"ADMIN"===b.getParams().viewer_type&&f(!0)}),[]),r.a.useEffect((function(){b.updateParams();var e=b.getParams(),a=b.getHashParams();a.permissions_granted||a.error?Object(j.e)(o.pathname,{path:S("/permissions-receive")})?t.inited=!0:(t.inited=!0,i.push(y("/permissions-receive")+window.location.hash)):(t.begin(e.group_id,(function(e){e?i.push(y("/view")):i.push(y("/quiz"))})),window.OKSDK.init({app_id:512000691802,app_key:"CLFPIPJGDIHBABABA"},(function(){t.getCurrentUser()}),(function(e){return alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u0438\u043d\u0438\u0446\u0438\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u0438 SDK")})))}),[]),r.a.createElement(A.a,{theme:Ee},r.a.createElement(_.a,{className:a.backdrop,open:!t.inited},r.a.createElement(N.a,{color:"inherit"})),t.inited&&r.a.createElement("div",{className:a.rootContainer},r.a.createElement(U,{title:l,admin:p}),r.a.createElement(he,{setTitle:u,admin:p})))})))),Oe={mainStore:v,AppStore:v.AppStore};o.a.render(r.a.createElement(s.a,Oe,r.a.createElement(c.a,null,r.a.createElement(ve,null))),document.getElementById("root")),"52946589384915"===b.getParams().group_id&&Promise.all([a.e(3),a.e(4)]).then(a.bind(null,276)).then((function(e){e.default}))}},[[141,1,2]]]);
//# sourceMappingURL=main.5e2164d4.chunk.js.map