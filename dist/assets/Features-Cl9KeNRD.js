import{c as y,j as e,T as f,S as j,r as l,u as v,F as w,a as b,m as o,L as N,R as u,A as g,b as M,d as S}from"./index-Dy_X6HDN.js";import{g as I,C as R}from"./grid-BlPEZUzE.js";import{B as k}from"./battery-C_hKzpMx.js";import{L as C}from"./line-chart-gNn2M62b.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=y("Wallet",[["path",{d:"M21 12V7H5a2 2 0 0 1 0-4h14v4",key:"195gfw"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h16v-5",key:"195n9w"}],["path",{d:"M18 12a2 2 0 0 0 0 4h4v-4Z",key:"vllfpd"}]]);function L({position:c,color:s,isActive:r}){const d=l.useRef(null),i=l.useRef(null),n=l.useRef(null),m=l.useRef(null),p=l.useRef(null);return v(({clock:h})=>{if(!d.current||!i.current||!n.current||!m.current||!p.current)return;const t=h.getElapsedTime();d.current.rotation.y=Math.sin(t*.2)*.15,r&&(i.current.scale.setScalar(1+Math.sin(t*2)*.1),i.current.material.emissiveIntensity=1.5+Math.sin(t*2)*.5),n.current.rotation.y=t*.5,n.current.rotation.x=Math.sin(t*.3)*.2,m.current.rotation.y=t*.2,p.current.children.forEach((a,x)=>{a.position.y=Math.sin(t*1.5+x*.5)*.2,a.rotation.z=Math.sin(t*.5+x*.3)*.1})}),e.jsx(w,{speed:1,rotationIntensity:.2,floatIntensity:.5,children:e.jsxs("group",{ref:d,position:c,children:[e.jsxs("mesh",{receiveShadow:!0,children:[e.jsx("cylinderGeometry",{args:[2,2.2,.3,8]}),e.jsx("meshStandardMaterial",{color:"#1A202C",metalness:.8,roughness:.2})]}),e.jsxs("mesh",{position:[0,1.5,0],castShadow:!0,children:[e.jsx("cylinderGeometry",{args:[.3,.4,3,16]}),e.jsx("meshStandardMaterial",{color:s,metalness:.7,roughness:.3})]}),e.jsxs("mesh",{ref:i,position:[0,3,0],castShadow:!0,children:[e.jsx("sphereGeometry",{args:[.8,32,32]}),e.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:r?1.5:.5,metalness:.9,roughness:.1,transparent:!0,opacity:.9})]}),e.jsx("group",{ref:n,position:[0,3,0],children:Array.from({length:3}).map((h,t)=>e.jsxs("mesh",{rotation:[Math.PI/4*t,Math.PI/3*t,0],castShadow:!0,children:[e.jsx("torusGeometry",{args:[1.2+t*.2,.05,16,32]}),e.jsx("meshStandardMaterial",{color:s,transparent:!0,opacity:.6,emissive:s,emissiveIntensity:.5})]},t))}),e.jsx("group",{ref:m,position:[0,3,0],children:Array.from({length:6}).map((h,t)=>{const a=t/6*Math.PI*2;return e.jsxs("group",{position:[Math.cos(a)*1.8,Math.sin(a)*.5,Math.sin(a)*1.8],children:[e.jsxs("mesh",{castShadow:!0,children:[e.jsx("boxGeometry",{args:[.4,.4,.4]}),e.jsx("meshStandardMaterial",{color:s,emissive:s,emissiveIntensity:.5,metalness:.8,roughness:.2})]}),r&&e.jsx("pointLight",{color:s,intensity:.5,distance:2,decay:2})]},t)})}),e.jsx("group",{ref:p,children:r&&Array.from({length:4}).map((h,t)=>{const a=t/4*Math.PI*2;return e.jsxs("mesh",{position:[Math.cos(a)*1.2,2,Math.sin(a)*1.2],rotation:[0,a,Math.PI/4],children:[e.jsx("cylinderGeometry",{args:[.05,.15,1.5,8]}),e.jsx("meshStandardMaterial",{color:s,transparent:!0,opacity:.3,emissive:s,emissiveIntensity:.5})]},t)})}),r&&e.jsx("pointLight",{position:[0,.5,0],color:s,intensity:1,distance:3,decay:2})]})})}function P(){const c=[{position:[-4,0,0],color:"#FDB813"},{position:[0,0,0],color:"#10B981",isActive:!0},{position:[4,0,0],color:"#3B82F6"}];return e.jsx(f,{minHeight:"600px",maxHeight:"800px",scale:1.1,className:"features-3d",children:e.jsx(j,{children:c.map((s,r)=>e.jsx(L,{position:s.position,color:s.color,isActive:s.isActive},r))})})}const E=[{icon:e.jsx(M,{}),title:"Premium Solar Panels",description:"Tier-1 solar panels with 25+ years lifespan and maximum efficiency",stats:{efficiency:"21.5%",warranty:"25 Years",power:"550W Peak"},color:"from-yellow-400 to-yellow-600"},{icon:e.jsx(k,{}),title:"Smart Storage",description:"Advanced battery systems for 24/7 uninterrupted power supply",stats:{capacity:"15 kWh",cycles:"10,000+",backup:"24 Hours"},color:"from-blue-400 to-blue-600"},{icon:e.jsx(F,{}),title:"90% Bill Savings",description:"Drastically reduce your electricity bills with solar power",stats:{savings:"₹12,000/mo",payback:"3-4 Years",roi:"25% p.a."},color:"from-green-400 to-green-600"},{icon:e.jsx(C,{}),title:"Smart Monitoring",description:"Real-time monitoring and analytics via mobile app",stats:{updates:"Real-time",alerts:"Instant",reports:"Daily"},color:"from-purple-400 to-purple-600"},{icon:e.jsx(S,{}),title:"25 Year Warranty",description:"Comprehensive warranty coverage for complete peace of mind",stats:{performance:"90%",service:"24/7",support:"Lifetime"},color:"from-red-400 to-red-600"},{icon:e.jsx(R,{}),title:"Quick Installation",description:"Professional installation completed within 3-5 days",stats:{duration:"3-5 Days",team:"Certified",support:"24/7"},color:"from-indigo-400 to-indigo-600"}],B=()=>{const{inView:c}=b({threshold:.1,triggerOnce:!0}),s={hidden:{y:20,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5}}};return e.jsxs("section",{id:"features",className:"py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 bg-[url('../assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent blur-3xl"})]}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center",children:[e.jsx("span",{className:"text-yellow-500 font-semibold tracking-wider uppercase",children:"Why Choose Us"}),e.jsx("h2",{className:"mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl",children:"Cutting-Edge Solar Solutions"}),e.jsx("p",{className:"mt-4 text-xl text-gray-300 max-w-2xl mx-auto",children:"Experience the future of energy with our innovative solar technology and smart solutions"})]}),e.jsx(o.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:1},className:"features-3d-container canvas-interactive canvas-shadow",children:e.jsx(l.Suspense,{fallback:e.jsx(N,{}),children:e.jsx(P,{})})}),e.jsx("div",{className:"mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3",children:E.map((r,d)=>e.jsxs(o.div,{variants:s,whileHover:{y:-10,scale:1.02},className:"relative group",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:rotate-1"}),e.jsxs("div",{className:"relative p-8 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 transform transition-transform group-hover:-rotate-1",children:[e.jsx("div",{className:`w-14 h-14 rounded-lg bg-gradient-to-r ${r.color} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-6`,children:u.isValidElement(r.icon)&&u.cloneElement(r.icon,{className:"h-8 w-8 text-white"})}),e.jsx("h3",{className:"text-xl font-bold text-white mb-3",children:r.title}),e.jsx("p",{className:"text-gray-300 mb-6",children:r.description}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:Object.entries(r.stats).map(([i,n],m)=>e.jsxs("div",{className:"bg-gray-700/50 rounded-lg p-3",children:[e.jsx("p",{className:"text-sm text-gray-400 capitalize",children:i}),e.jsx("p",{className:"text-lg font-semibold text-white",children:n})]},m))}),e.jsxs(o.button,{whileHover:{x:5},className:`mt-6 flex items-center text-sm font-semibold bg-gradient-to-r ${r.color} bg-clip-text text-transparent`,children:["Learn More ",e.jsx(g,{className:"ml-1 h-4 w-4"})]})]})]},d))}),c&&e.jsx(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"mt-16 text-center",children:e.jsxs(o.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300",children:["View All Features",e.jsx(g,{className:"ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"})]})}),e.jsx("div",{className:"grid-image",children:e.jsx("img",{src:I,alt:"Grid"})})]})]})};export{B as default};
