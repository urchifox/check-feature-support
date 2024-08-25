function p(t,e){let o=(e??document).querySelector(t);if(!o)throw Error(`Element "${t}" not found`);if(!(o instanceof HTMLElement))throw Error(`Element "${t}" is not an HTMLElement`);return o}function d(t,e){return[...(e??document).querySelectorAll(t)]}function a(t){let e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var i,l,n,m,u,c;function E(){i=p(".form"),l=p(".form__select"),n=p(".form__input"),m=p("#input-declaration"),u=p(".form__result"),c=d(".form__option")}function s(t){return a(`
    @supports (${t}) {
      .form__result {
        color: green;
      }
    }

    @supports not (${t}) {
      .form__result {
        color: tomato;
      }
    }
  `),CSS.supports(t)}var r={property:{tooltip:'Enter the name of a CSS property, for example, "display". You can also optionally add the property value after a colon, like "display: flex".',isSupported:t=>{let e=t.indexOf(":")===-1?`${t}: initial`:t;return s(e)}},"custom properties":{tooltip:"",isSupported:()=>(a(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `),CSS.supports("color","var(--primary)")),onSelect:t=>{t.stopPropagation(),n.value="",n.disabled=!0,f()}},selector:{tooltip:"Enter a selector, for example ':has(a)'",isSupported:t=>{let e=`selector(${t})`;return s(e)}},"color-units":{tooltip:'Enter a color value, for example, "rgb(0 0 0 / .5)"',isSupported:t=>{let e=`color: ${t}`;return s(e)}},"length-units":{tooltip:'Enter a length value, for example, "rem"',isSupported:t=>{let e=`width: 1${t}`;return s(e)}},"angle-units":{tooltip:'Enter a length value, for example, "grad"',isSupported:t=>{let e=`transform: rotate(1${t})`;return s(e)}}};function v(t){t.preventDefault(),f()}function S(){u.value=""}function x(t){let e=t.target.value;if(!(e in r))throw new Error(`The option vaue "${e}" is not in typeMap`);T(e);let o=r[e].onSelect;o?o(t):n.disabled=!1}function T(t){let e=r[t].tooltip;m.textContent=e}function L(){let t=c.map(h=>h.value),e=Object.keys(r),o=new Set([...t,...e]);if(o.size!==t.length||o.size!==e.length)throw new Error("Types names on page and in Map are not identical")}function f(){let t=l.value;if(!(t in r))throw new Error(`Selected option "${t}" is not in typeMap`);let e=n.value;e.length===0&&!n.disabled||(u.value=r[t].isSupported(e)?"Supported":"Value not supported or entered incorrectly")}function y(){E(),L();let t=l.value;t in r&&T(t),i.addEventListener("submit",v),l.addEventListener("change",x),i.addEventListener("change",S),n.addEventListener("input",S)}y();
