function p(t,e){let o=(e??document).querySelector(t);if(!o)throw Error(`Element "${t}" not found`);if(!(o instanceof HTMLElement))throw Error(`Element "${t}" is not an HTMLElement`);return o}function f(t,e){return[...(e??document).querySelectorAll(t)]}function l(t){let e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var i,s,n,a,u,m;function d(){i=p(".form"),s=p(".form__select"),n=p(".form__input"),a=p("#input-declaration"),u=p(".form__result"),m=f(".form__option")}var r={property:{tooltip:"Enter the CSS property and its value separated by a colon, for example 'display: flex'",isSupported:t=>(l(`
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
      `),CSS.supports(t))},"custom properties":{tooltip:"",isSupported:()=>(l(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `),CSS.supports("color","var(--primary)")),onSelect:t=>{t.stopPropagation(),n.value="",n.disabled=!0,c()}},selector:{tooltip:"Enter a selector, for example ':has(a)'",isSupported:t=>{let e=`selector(${t})`;return l(`
            @supports (${e}) {
                .form__result {
                    color: green;
                }
            }

            @supports not (${e}) {
                .form__result {
                    color: tomato;
                }
            }
        `),CSS.supports(e)}}};function L(t){t.preventDefault(),c()}function E(){u.value=""}function M(t){let e=t.target.value;if(!(e in r))throw new Error(`The option vaue "${e}" is not in typeMap`);S(e);let o=r[e].onSelect;o?o(t):n.disabled=!1}function S(t){let e=r[t].tooltip;a.textContent=e}function v(){let t=m.map(y=>y.value),e=Object.keys(r),o=new Set([...t,...e]);if(o.size!==t.length||o.size!==e.length)throw new Error("Types names on page and in Map are not identical")}function c(){let t=s.value;if(!(t in r))throw new Error(`Selected option "${t}" is not in typeMap`);let e=n.value;e.length===0&&!n.disabled||(u.value=r[t].isSupported(e)?"Supported":"Value not supported or entered incorrectly")}function T(){d(),v();let t=s.value;t in r&&S(t),i.addEventListener("submit",L),s.addEventListener("change",M),i.addEventListener("change",E),n.addEventListener("input",E)}T();
