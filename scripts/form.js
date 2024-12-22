function r(t,e){let o=(e??document).querySelector(t);if(!o)throw Error(`Element "${t}" not found`);if(!(o instanceof HTMLElement))throw Error(`Element "${t}" is not an HTMLElement`);return o}function S(t,e){return[...(e??document).querySelectorAll(t)]}function c(t){let e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var a,i,n,f,m,d,l;function v(){a=r(".form"),i=r(".form__select"),n=r(".form__input"),f=r("#input-declaration"),m=r(".form__result"),d=S(".form__option"),l=r(".form__submit")}function s(t){return c(`
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
  `),CSS.supports(t)}var p={property:{tooltip:'Enter the name of a CSS property, for example, "display". You can also optionally add the property value after a colon, like "display: flex".',isSupported:t=>{let e=t.indexOf(":")===-1?`${t}: initial`:t;return s(e)}},"custom properties":{tooltip:"",isSupported:()=>(c(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `),CSS.supports("color","var(--primary)")),onSelect:t=>{t.stopPropagation(),n.value="",n.disabled=!0,l.disabled=!0,E()}},selector:{tooltip:'Enter a selector, for example ":has(a)"',isSupported:t=>{let e=`selector(${t})`;return s(e)}},"color-units":{tooltip:'Enter a color value, for example, "rgb(0 0 0 / .5)"',isSupported:t=>{let e=`color: ${t}`;return s(e)}},"length-units":{tooltip:'Enter a length value, for example, "rem"',isSupported:t=>{let e=`width: 1${t}`;return s(e)}},"angle-units":{tooltip:'Enter a length value, for example, "grad"',isSupported:t=>{let e=`transform: rotate(1${t})`;return s(e)}}};function u(t){return t in p}function g(t){t.preventDefault(),E()}function T(){m.value=""}function x(t){let e=t.target.value;if(!u(e))throw new Error(`The option vaue "${e}" is not in typeMap`);h(e);let o=p[e].onSelect;o?o(t):(n.disabled=!1,l.disabled=!1)}function h(t){let e=p[t].tooltip;f.textContent=e}function y(){let t=[];for(let o of d){if(!u(o.value))throw new Error(`Option with name ${o.value} is not part of options Map.`);t.push(o.value)}let e=Object.keys(p);if(t.length!==e.length)throw new Error("Number of types names on page and in Map are not identical")}function E(){let t=i.value;if(!u(t))throw new Error(`Selected option "${t}" is not in typeMap`);let e=n.value;e.length===0&&!n.disabled||(m.value=p[t].isSupported(e)?"Supported":"Value not supported or entered incorrectly")}function B(){v(),y();let t=i.value;u(t)&&h(t),a.addEventListener("submit",g),i.addEventListener("change",x),a.addEventListener("change",T),n.addEventListener("input",T)}export{E as checkSupport,B as initFeatureSuport};
