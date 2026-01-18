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
OS.registerApp({
 name:"Snake Game",
 icon:"fa-gamepad",
 render(){
  return `
   <canvas id="snake" width="400" height="400" style="background:#000;border-radius:15px"></canvas>
   <p>⬅️ ➡️ ⬆️ ⬇️ للتحكم</p>
   <script>
    const c=document.getElementById("snake");
    const ctx=c.getContext("2d");
    let box=20;
    let snake=[{x:200,y:200}];
    let food={x:80,y:80};
    let dir="RIGHT";

    document.onkeydown=e=>{
     if(e.key==="ArrowUp")dir="UP";
     if(e.key==="ArrowDown")dir="DOWN";
     if(e.key==="ArrowLeft")dir="LEFT";
     if(e.key==="ArrowRight")dir="RIGHT";
    }

    function draw(){
     ctx.clearRect(0,0,400,400);
     ctx.fillStyle="lime";
     snake.forEach(s=>ctx.fillRect(s.x,s.y,box,box));
     ctx.fillStyle="red";
     ctx.fillRect(food.x,food.y,box,box);

     let head={...snake[0]};
     if(dir==="UP")head.y-=box;
     if(dir==="DOWN")head.y+=box;
     if(dir==="LEFT")head.x-=box;
     if(dir==="RIGHT")head.x+=box;

     if(head.x===food.x && head.y===food.y){
      food={
       x:Math.floor(Math.random()*20)*box,
       y:Math.floor(Math.random()*20)*box
      };
     }else snake.pop();

     snake.unshift(head);
    }
    setInterval(draw,150);
   </script>
  `;
 }
});
