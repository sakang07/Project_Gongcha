// slide_input.js

// slide_data.json과 slide_function.js 불러오기
let BANNER_DATA;

(()=>{

  // 변수
  const data = '../data/slide_data.json';
  const scriptUrl = '../js/src/slide_function.js';
  const body = document.querySelector('body');

  // 함수
  const fnScript = () => {
    const mkScript = document.createElement('script');
    mkScript.src = scriptUrl;
    body.prepend(mkScript);
  }
  

  // 기능
  fetch(data)
  .then(response => response.json())
  .then(data => {
    BANNER_DATA = [...data];
    
    // 이벤트 날짜 기준 순서 뒤집기
    return BANNER_DATA.reverse(); 
  })
  .then((response) => {    
    fnScript();
  });



})();