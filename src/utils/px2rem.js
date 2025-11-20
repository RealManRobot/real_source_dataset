import { isMobile, range } from "@/common.js"
/**
 * rem端适配
 * designWidth: 设计尺寸。如果是PC端传入1920   如果是移动端传入375
 */
(function px2Rem(designWidth) {
  let [doc, win, docEl, remStyle, tid] = [document, window, document.documentElement, document.createElement("style"), null]
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    var rem = range(width / designWidth * 100, 80, 120)
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'  // 可以让rem为1
  }
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement("div")
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem()
  win.addEventListener("resize", () => {
    clearTimeout(tid) //防止执行两次
    tid = setTimeout(refreshRem, 300)
  }, false);
  win.addEventListener("pageshow", e => {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)
  doc.readyState === "complete" ? (doc.body.style.fontSize = "14px") : doc.addEventListener("DOMContentLoaded", e => doc.body.style.fontSize = "14px", false)
})(isMobile() ? 375 : 1920)

// flexible.js
// (function flexible(window, document) {
//     var docEl = document.documentElement;
//     var dpr = window.devicePixelRatio || 1;

//     // adjust body font size
//     function setBodyFontSize() {
//         if (document.body) {
//             document.body.style.fontSize = 12 * dpr + "px";
//         } else {
//             document.addEventListener("DOMContentLoaded", setBodyFontSize);
//         }
//     }
//     setBodyFontSize();

//     // set 1rem = viewWidth / 10
//     function setRemUnit() {
//         var rem = docEl.clientWidth / 24;
//         docEl.style.fontSize = rem + "px";
//     }

//     setRemUnit();

//     // reset rem unit on page resize
//     window.addEventListener("resize", setRemUnit);
//     window.addEventListener("pageshow", function(e) {
//         if (e.persisted) {
//             setRemUnit();
//         }
//     });

//     // detect 0.5px supports
//     if (dpr >= 2) {
//         var fakeBody = document.createElement("body");
//         var testElement = document.createElement("div");
//         testElement.style.border = ".5px solid transparent";
//         fakeBody.appendChild(testElement);
//         docEl.appendChild(fakeBody);
//         if (testElement.offsetHeight === 1) {
//             docEl.classList.add("hairlines");
//         }
//         docEl.removeChild(fakeBody);
//     }
// })(window, document);