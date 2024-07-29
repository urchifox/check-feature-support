function o(e,t){let n=(t??document).querySelector(e);if(!n)throw Error(`Element "${e}" not found`);if(!(n instanceof HTMLElement))throw Error(`Element "${e}" is not an HTMLElement`);return n}var p,l,a,c,s,r={property:{tooltip:"Enter the CSS property and its value separated by a colon, for example 'display: flex'",formatValue:e=>e},selector:{tooltip:"Enter a selector, for example ':has(a)'",formatValue:e=>`selector(${e})`}};function y(e){e.preventDefault();let t=a.value;if(t.length===0)return;let n=l.value;if(!(n in r))return;let u=r[n].formatValue(t),d=`
        @supports (${u}) {
            .form__result {
                color: green;
            }
        }

        @supports not (${u}) {
            .form__result {
                color: tomato;
            }
        }
    `,i=document.createElement("style");i.textContent=d,document.head.appendChild(i),s.value=CSS.supports(u)?"Supported":"Value not supported or entered incorrectly"}function m(){s.value=""}function T(e){let t=e.target.value;t in r&&f(t)}function f(e){let t=r[e].tooltip;c.textContent=t}function E(){console.log("object"),p=o(".form"),l=o(".form__select"),a=o(".form__input"),c=o("#input-declaration"),s=o(".form__result");let e=l.value;e in r&&f(e),p.addEventListener("submit",y),l.addEventListener("change",T),p.addEventListener("change",m),a.addEventListener("input",m)}E();
