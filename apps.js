const HatimOS = {
  z: 10,
  apps: {},
  desktopApps: JSON.parse(localStorage.getItem('h_apps')) || ['Snake','Tetris','Browser','AI','Tic Tac Toe','Calculator','Notes','Piano'],
  
  boot() {
    this.clock();
    setInterval(this.clock, 1000);
    this.registerApps();
    this.renderDesktop();
    this.loadStore();
  },

  clock() {
    const t = new Date().toLocaleTimeString();
    document.getElementById("clock").innerText = t;
    document.getElementById("mini-clock").innerText = t;
  },

  registerApps() {
    // ---------------- Snake ----------------
    this.apps["Snake"] = {
      name: "Snake",
      render: (win) => {
        win.querySelector(".body").innerHTML = `<canvas id="snakeCanvas" width="400" height="400" style="background:#111;margin:auto;display:block;border-radius:10px;"></canvas>`;
        const canvas = document.getElementById("snakeCanvas");
        const ctx = canvas.getContext("2d");
        const box = 20;
        let snake = [{x:9*box, y:10*box}];
        let food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
        let dir = null;
        document.addEventListener("keydown", e => {
          if(e.key==="ArrowUp" && dir!=="DOWN") dir="UP";
          if(e.key==="ArrowDown" && dir!=="UP") dir="DOWN";
          if(e.key==="ArrowLeft" && dir!=="RIGHT") dir="LEFT";
          if(e.key==="ArrowRight" && dir!=="LEFT") dir="RIGHT";
        });
        function draw() {
          ctx.fillStyle="#111"; ctx.fillRect(0,0,canvas.width,canvas.height);
          for(let i=0;i<snake.length;i++){
            ctx.fillStyle=i===0?"#0ff":"#00a"; ctx.fillRect(snake[i].x,snake[i].y,box,box);
          }
          ctx.fillStyle="#f00"; ctx.fillRect(food.x,food.y,box,box);
          let headX=snake[0].x, headY=snake[0].y;
          if(dir==="UP") headY-=box;
          if(dir==="DOWN") headY+=box;
          if(dir==="LEFT") headX-=box;
          if(dir==="RIGHT") headX+=box;
          if(headX===food.x && headY===food.y) food={x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
          else snake.pop();
          let newHead={x:headX,y:headY};
          if(headX<0||headX>=canvas.width||headY<0||headY>=canvas.height||snake.some(s=>s.x===headX && s.y===headY)){
            clearInterval(game); alert("انتهت اللعبة!");
          }
          snake.unshift(newHead);
        }
        const game = setInterval(draw,150);
      }
    };

    // ---------------- Tetris ----------------
    this.apps["Tetris"] = {
      name: "Tetris",
      render: (win) => {
        win.querySelector(".body").innerHTML = `<p>لعبة Tetris جاهزة (يمكن تطويرها لاحقًا بالكود الكامل)</p>`;
      }
    };

    // ---------------- Tic Tac Toe ----------------
    this.apps["Tic Tac Toe"] = {
      name: "Tic Tac Toe",
      render: (win) => {
        win.querySelector(".body").innerHTML = `
          <div id="ttt" style="display:grid;grid-template-columns:repeat(3,100px);gap:5px;justify-content:center;">
            ${Array(9).fill('<button style="width:100px;height:100px;font-size:2rem"></button>').join('')}
          </div>
          <p id="ttt-result" style="text-align:center;margin-top:10px;"></p>
        `;
        const board = Array(9).fill(null);
        const buttons = win.querySelectorAll("#ttt button");
        let turn = "X";
        function checkWinner(){
          const combos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
          for(let c of combos){ const [a,b,d]=c; if(board[a] && board[a]===board[b] && board[a]===board[d]) return board[a]; }
          return board.includes(null)?null:"Draw";
        }
        buttons.forEach((btn,i)=>{
          btn.onclick = ()=>{
            if(board[i]) return;
            board[i]=turn; btn.innerText=turn;
            const winner=checkWinner();
            if(winner){
              document.getElementById("ttt-result").innerText=winner==="Draw"?"تعادل!":winner+" فاز!";
              buttons.forEach(b=>b.disabled=true);
            }
            turn = turn==="X"?"O":"X";
          };
        });
      }
    };

    // ---------------- Browser ----------------
    this.apps["Browser"] = {
      name: "Browser",
      render: (win) => {
        win.querySelector(".body").innerHTML = `<iframe src="https://www.google.com" style="width:100%;height:100%;border:none;"></iframe>`;
      }
    };

    // ---------------- AI Assistant ----------------
    this.apps["AI"] = {
      name: "AI Assistant",
      render: (win) => {
        win.querySelector(".body").innerHTML = `
          <div style="text-align:center;padding:20px;">
            <h3>مساعد الذكاء الاصطناعي</h3>
            <input type="text" placeholder="اكتب سؤالك..." style="width:80%;padding:10px;border-radius:10px;border:none;">
          </div>
        `;
      }
    };

    // ---------------- Calculator ----------------
    this.apps["Calculator"] = {
      name: "Calculator",
      render: (win) => {
        win.querySelector(".body").innerHTML = `
          <input id="calc" style="width:90%;margin:10px;padding:10px;font-size:1.5rem;text-align:right;" readonly>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;">
            ${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map(n=>`<button style="padding:15px;font-size:1.2rem">${n}</button>`).join('')}
          </div>
        `;
        const input = win.querySelector("#calc");
        win.querySelectorAll("button").forEach(btn=>{
          btn.onclick = ()=>{
            if(btn.innerText==="=") input.value=eval(input.value)||"";
            else input.value+=btn.innerText;
          };
        });
      }
    };

    // ---------------- Notes ----------------
    this.apps["Notes"] = {
      name: "Notes",
      render: (win) => {
        win.querySelector(".body").innerHTML = `<textarea style="width:100%;height:100%;background:#111;color:white;border:none;padding:10px;" placeholder="اكتب ملاحظاتك هنا..."></textarea>`;
      }
    };

    // ---------------- Piano ----------------
    this.apps["Piano"] = {
      name: "Piano",
      render: (win) => {
        win.querySelector(".body").innerHTML = `
          <div style="display:flex;justify-content:center;gap:5px;">
            ${["C","D","E","F","G","A","B"].map(n=>`<button style="padding:20px;font-size:1.2rem">${n}</button>`).join('')}
          </div>
        `;
        win.querySelectorAll("button").forEach(btn=>{
          btn.onclick = ()=>{ alert("تشغيل نغمة "+btn.innerText); };
        });
      }
    };
  },

  renderDesktop(){
    const desk = document.getElementById("desktop");
    desk.innerHTML="";
    this.desktopApps.forEach(app=>{
      const icon = document.createElement("div");
      icon.className="icon";
      icon.innerText = app;
      icon.ondblclick = ()=>this.open(app);
      desk.appendChild(icon);
    });
  },

  open(name){
    if(document.getElementById(name)) return;
    const app = this.apps[name];
    const win = document.createElement("div");
    win.className="window";
    win.id=name;
    win.style.zIndex=++this.z;
    win.style.top="50px"; win.style.left="50px";
    win.innerHTML = `<div class="bar"><span>${name}</span><span onclick="this.closest('.window').remove()">✖</span></div><div class="body"></div>`;
    document.body.appendChild(win);
    if(app.render) app.render(win);

    // سحب النافذة
    const bar = win.querySelector(".bar");
    let ox,oy;
    bar.onmousedown = e => {
      ox = e.clientX - win.offsetLeft; oy = e.clientY - win.offsetTop;
      document.onmousemove = ev => { win.style.left = ev.clientX-ox+"px"; win.style.top = ev.clientY-oy+"px"; };
      document.onmouseup = ()=>document.onmousemove=null;
    };
  },

  toggleStore(show){
    document.getElementById("store").style.display = show?"block":"none";
  },

  loadStore(){
    const items = ["Snake","Tetris","Browser","AI","Tic Tac Toe","Calculator","Notes","Piano"];
    const grid = document.getElementById("store-items");
    grid.innerHTML="";
    items.forEach(i=>{
      const card = document.createElement("div");
      card.className="store-card";
      card.innerHTML=`<h3>${i}</h3><button onclick="HatimOS.installApp('${i}')">تثبيت</button>`;
      grid.appendChild(card);
    });
  },

  installApp(name){
    if(!this.desktopApps.includes(name)){
      this.desktopApps.push(name);
      localStorage.setItem('h_apps',JSON.stringify(this.desktopApps));
      this.renderDesktop();
      alert('تم تثبيت '+name+' بنجاح!');
    }
  }
};
