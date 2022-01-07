// aside_input.js

// 1. html template 삽입

{

  // 변수
  const elBody = document.querySelector('body');
  const elWrap = elBody.querySelector('#wrap');
  const elSideBox = elWrap.querySelector('#sideBox');

  const dataUrl = './temp/base/aside.html';

  // 기능 ------------------------------------------
  // data 불러오기
  fetch(dataUrl)
    .then(response => response.text())
    .then(data => {elSideBox.innerHTML = data});

}