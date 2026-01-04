const LANG = {
  en:{title:"Welcome to Hatim Space", placeholder:"Type here..."},
  ar:{title:"مرحبا بك في Hatim Space", placeholder:"اكتب هنا..."},
  fr:{title:"Bienvenue sur Hatim Space", placeholder:"Écrivez ici..."}
};

let lang = localStorage.lang || "en";

function setLang(l){
  localStorage.lang = l;
  location.reload();
}

document.documentElement.dir = lang==="ar"?"rtl":"ltr";
document.getElementById("title").innerText = LANG[lang].title;
document.getElementById("msg").placeholder = LANG[lang].placeholder;
