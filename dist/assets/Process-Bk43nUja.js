import{c as d,r as x,u as g,j as e,m as s,A as r,S as u}from"./index-BWMnQkdj.js";import{g as h,C as p}from"./grid-CLby_5AB.js";import{W as y}from"./wrench-mjWuRVBu.js";import{C as f}from"./check-circle-2-DpFNBQ3t.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=d("CircleDot",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]]),j=[{number:"01",title:"Site Assessment",description:"Expert evaluation of your property",details:["Comprehensive site analysis","Solar potential assessment","Shade analysis","Structural evaluation"],icon:e.jsx(u,{className:"h-6 w-6"}),duration:"1-2 Days",color:"from-yellow-400 to-yellow-600"},{number:"02",title:"Custom Design",description:"Tailored solar solution design",details:["3D system modeling","Performance simulation","ROI calculation","Design optimization"],icon:e.jsx(y,{className:"h-6 w-6"}),duration:"2-3 Days",color:"from-blue-400 to-blue-600"},{number:"03",title:"Installation",description:"Professional system setup",details:["Expert installation team","Quality components","Safety compliance","System testing"],icon:e.jsx(f,{className:"h-6 w-6"}),duration:"3-4 Days",color:"from-green-400 to-green-600"},{number:"04",title:"Monitoring",description:"24/7 system monitoring",details:["Real-time monitoring","Performance tracking","Mobile app access","Instant alerts"],icon:e.jsx(p,{className:"h-6 w-6"}),duration:"Ongoing",color:"from-purple-400 to-purple-600"}];function C(){const[i,l]=x.useState(0),{ref:o,inView:n}=g({threshold:.1,triggerOnce:!0});return e.jsxs("section",{id:"process",className:"py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 bg-[url('./assets/')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent"})]}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs(s.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"text-center",children:[e.jsx("span",{className:"text-yellow-500 font-semibold tracking-wider uppercase",children:"How It Works"}),e.jsx("h2",{className:"mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl",children:"Our Installation Process"}),e.jsx("p",{className:"mt-4 text-xl text-gray-600 max-w-2xl mx-auto",children:"Experience our streamlined solar installation process, from consultation to completion"})]}),e.jsx("div",{children:e.jsx("br",{})}),e.jsxs("div",{className:"mt-24 relative",children:[e.jsx("div",{className:"absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/20 via-yellow-500/40 to-yellow-500/20 transform -translate-y-1/2"}),e.jsx("div",{ref:o,className:"relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:j.map((t,a)=>e.jsx(s.div,{initial:{opacity:0,y:20},animate:n?{opacity:1,y:0}:{},transition:{delay:a*.2},className:`relative ${i===a?"active":""}`,onClick:()=>l(a),children:e.jsxs(s.div,{whileHover:{scale:1.05},className:"relative bg-white rounded-2xl shadow-xl p-8 cursor-pointer group",children:[e.jsx("div",{className:"absolute -top-4 left-1/2 transform -translate-x-1/2",children:e.jsx("div",{className:`w-8 h-8 rounded-full bg-gradient-to-r ${t.color} flex items-center justify-center text-white font-bold`,children:t.number})}),e.jsx("div",{className:`mt-4 w-16 h-16 rounded-xl bg-gradient-to-r ${t.color} flex items-center justify-center text-white mb-6 transform transition-transform group-hover:rotate-6`,children:t.icon}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-2",children:t.title}),e.jsx("p",{className:"text-gray-600 mb-4",children:t.description}),e.jsx("div",{className:"space-y-2",children:t.details.slice(0,2).map((c,m)=>e.jsxs("div",{className:"flex items-center text-sm text-gray-500",children:[e.jsx(w,{className:"h-4 w-4 text-yellow-500 mr-2"}),c]},m))}),e.jsxs("div",{className:"mt-6 flex items-center justify-between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:t.duration}),e.jsxs(s.button,{whileHover:{x:5},className:`flex items-center text-sm font-semibold bg-gradient-to-r ${t.color} bg-clip-text text-transparent`,children:["Learn More ",e.jsx(r,{className:"ml-1 h-4 w-4"})]})]})]})},a))})]}),e.jsx("div",{className:"grid-image",children:e.jsx("img",{src:h,alt:"Grid"})}),e.jsx(s.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:"mt-16 text-center",children:e.jsxs(s.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center group hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300",children:["Start Your Solar Journey",e.jsx(r,{className:"ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"})]})})]})]})}export{C as default};
