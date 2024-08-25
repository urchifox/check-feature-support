function r(t){let e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}var l,o;var s;function i(){let t=l.value;if(!(t in p))throw new Error(`Selected option "${t}" is not in typeMap`);let e=o.value;e.length===0&&!o.disabled||(s.value=p[t].isSupported(e)?"Supported":"Value not supported or entered incorrectly")}function n(t){return r(`
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
  `),CSS.supports(t)}var p={property:{tooltip:'Enter the name of a CSS property, for example, "display". You can also optionally add the property value after a colon, like "display: flex".',isSupported:t=>{let e=t.indexOf(":")===-1?`${t}: initial`:t;return n(e)}},"custom properties":{tooltip:"",isSupported:()=>(r(`
        .form__result {
          --sucess: #008000;
          color: #ff6347;
          color: var(--sucess);
        }
      `),CSS.supports("color","var(--primary)")),onSelect:t=>{t.stopPropagation(),o.value="",o.disabled=!0,i()}},selector:{tooltip:"Enter a selector, for example ':has(a)'",isSupported:t=>{let e=`selector(${t})`;return n(e)}},"color-units":{tooltip:'Enter a color value, for example, "rgb(0 0 0 / .5)"',isSupported:t=>{let e=`color: ${t}`;return n(e)}},"length-units":{tooltip:'Enter a length value, for example, "rem"',isSupported:t=>{let e=`width: 1${t}`;return n(e)}},"angle-units":{tooltip:'Enter a length value, for example, "grad"',isSupported:t=>{let e=`transform: rotate(1${t})`;return n(e)}}};export{p as optionsInfo};
