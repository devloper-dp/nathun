import{R as g,j as t,m as S,C as v,V as p,E as w,r as c,u as M,A as b,F as E,T as R,h as z,i as T}from"./index-B9Ol7p4O.js";import{T as B}from"./Text-BCU4_-_W.js";function F({position:n,color:s,number:i,isActive:e}){const r=c.useRef(null),d=c.useRef(null),j=c.useRef(null),f=c.useRef(null),y=c.useMemo(()=>{const o=[];for(let a=0;a<30;a++){const h=Math.random()*Math.PI*2,x=1+Math.random()*2,l=x*Math.cos(h),u=x*Math.sin(h),m=-Math.random()*2;o.push({x:l,y:u,z:m})}return o},[]);return M(({clock:o})=>{var h;const a=o.getElapsedTime();r.current&&(r.current.rotation.y=Math.sin(a*.5)*.2,r.current.position.y=Math.sin(a*.8)*.1),(h=d.current)!=null&&h.material&&d.current.material instanceof z&&(d.current.material.opacity=(.3+Math.sin(a*2)*.1)*(e?1:.5)),j.current&&j.current.children.forEach((x,l)=>{const u=x,m=y[l];u.position.x=m.x+Math.sin(a+l)*.1,u.position.y=m.y+Math.cos(a+l)*.1,u.position.z=m.z+Math.sin(a+l)*.1,u.scale.setScalar(Math.sin(a*2+l)*.2+.8)}),f.current&&f.current instanceof T&&(f.current.metalness=.3+Math.sin(a)*.2)}),t.jsx(E,{speed:2,rotationIntensity:.2,floatIntensity:.5,children:t.jsxs("group",{ref:r,position:new p(n.x,n.y,n.z),children:[t.jsx(R,{width:2,length:8,color:s,attenuation:o=>o*o,children:t.jsxs("mesh",{castShadow:!0,children:[t.jsx("cylinderGeometry",{args:[1,1,.5,32]}),t.jsx("meshStandardMaterial",{ref:f,color:s,metalness:.9,roughness:.1,transparent:!0,opacity:e?1:.7})]})}),t.jsx(B,{position:new p(0,0,.3),fontSize:.5,color:"white",anchorX:"center",anchorY:"middle",children:i}),t.jsxs("mesh",{ref:d,children:[t.jsx("sphereGeometry",{args:[1.2,32,32]}),t.jsx("meshBasicMaterial",{color:s,transparent:!0,opacity:.2,blending:b})]}),t.jsx("group",{ref:j,children:y.map((o,a)=>t.jsxs("mesh",{position:new p(o.x,o.y,o.z),children:[t.jsx("sphereGeometry",{args:[.02,16,16]}),t.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:2,transparent:!0,opacity:e?1:.5})]},a))})]})})}function I({activeStep:n=0}){const s=[{color:"#FDB813",number:"01"},{color:"#3B82F6",number:"02"},{color:"#10B981",number:"03"},{color:"#8B5CF6",number:"04"}];return t.jsxs(v,{camera:{position:[0,0,10],fov:50},shadows:!0,children:[t.jsx("color",{attach:"background",args:["#111827"]}),t.jsx("ambientLight",{intensity:.5}),t.jsx("spotLight",{position:[10,10,10],angle:.15,penumbra:1,intensity:2,castShadow:!0}),t.jsx("group",{position:new p(-6,0,0),children:s.map((i,e)=>t.jsx(F,{position:new p(e*4,0,0),color:i.color,number:i.number,isActive:e===n},e))}),t.jsx(w,{preset:"sunset"}),t.jsx(A,{}),t.jsx(D,{})]})}function A(){const n=c.useRef(null);return M(({clock:s})=>{if(n.current){const i=n.current;i.rotation.x=Math.sin(s.getElapsedTime()*.2)*.3,i.rotation.y=Math.sin(s.getElapsedTime()*.3)*.3}}),t.jsx("group",{ref:n,children:t.jsxs("mesh",{children:[t.jsx("planeGeometry",{args:[40,40]}),t.jsx("meshStandardMaterial",{color:"#1a1a1a",metalness:.8,roughness:.2})]})})}function D(){const n=c.useRef(null),s=1e3,i=c.useMemo(()=>{const e=new Float32Array(s*3);for(let r=0;r<s;r++)e[r*3]=(Math.random()-.5)*20,e[r*3+1]=(Math.random()-.5)*20,e[r*3+2]=(Math.random()-.5)*20;return e},[]);return M(({clock:e})=>{if(n.current){const r=n.current;r.rotation.x=Math.sin(e.getElapsedTime()*.1)*.2,r.rotation.y=Math.sin(e.getElapsedTime()*.2)*.2}}),t.jsxs("points",{ref:n,children:[t.jsx("bufferGeometry",{children:t.jsx("bufferAttribute",{attach:"attributes-position",count:s,array:i,itemSize:3})}),t.jsx("pointsMaterial",{size:.02,color:"#FDB813",sizeAttenuation:!0,transparent:!0,opacity:.5,blending:b})]})}function C(){const[n,s]=g.useState(0);return g.useEffect(()=>{const i=setInterval(()=>{s(e=>(e+1)%4)},3e3);return()=>clearInterval(i)},[]),t.jsx("div",{className:"h-96 relative",children:t.jsx(S.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1},className:"absolute inset-0",children:t.jsx(I,{activeStep:n})})})}export{C as default};
