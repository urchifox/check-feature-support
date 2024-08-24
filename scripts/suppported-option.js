function n(t){let e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var p,o;var s;function l(){let t=p.value;if(!(t in r))throw new Error(`Selected option "${t}" is not in typeMap`);let e=o.value;e.length===0&&!o.disabled||(s.value=r[t].isSupported(e)?"Supported":"Value not supported or entered incorrectly")}var r={property:{tooltip:"Enter the CSS property and its value separated by a colon, for example 'display: flex'",isSupported:t=>(n(`
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
      `),CSS.supports(t))},"custom properties":{tooltip:"",isSupported:()=>(n(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `),CSS.supports("color","var(--primary)")),onSelect:t=>{t.stopPropagation(),o.value="",o.disabled=!0,l()}},selector:{tooltip:"Enter a selector, for example ':has(a)'",isSupported:t=>{let e=`selector(${t})`;return n(`
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
        `),CSS.supports(e)}}};export{r as optionsInfo};
