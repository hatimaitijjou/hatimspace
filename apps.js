OS.registerApp({
 name:"Hatim AI",
 icon:"fa-brain",
 render(){
  return `
   <h2>Hatim AI</h2>
   <input style="width:100%;padding:15px;border-radius:20px">
  `;
 }
});

OS.registerApp({
 name:"Browser",
 icon:"fa-globe",
 render(){
  return `<iframe src="https://google.com" style="width:100%;height:100%;border:0"></iframe>`;
 }
});

OS.registerApp({
 name:"Terminal",
 icon:"fa-terminal",
 render(){
  return `<pre>> Hatim OS Terminal</pre>`;
 }
});
