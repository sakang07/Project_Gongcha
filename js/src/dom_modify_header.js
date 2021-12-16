// dom_modify.js

// 시나리오 : 
// html 레이아웃 변형
// 1. 모바일일 때 .nav_pc 삭제
// 2. pc일 때 .nav_mob 삭제

(() => {

  // 변수
  const elHeadBox = document.querySelector('#headBox');
  const elContainer = elHeadBox.querySelector('.container');

  const elNavPc = elHeadBox.querySelector('.nav_pc');
  const elNavMob = elHeadBox.querySelector('.nav_mob');  

  // 모바일 너비인지 확인하는 변수
  
  // 함수
  // 처음 실행된 브라우저 너비가 1024보다 작으면 .nav_pc 제거, 크면 .nav_mob 제거
  const fnCkWidth = () => {
    const browserW = window.matchMedia("all and (max-width: 1023px)").matches;

    if (browserW) {
      elNavPc.remove();
      elContainer.append(elNavMob);
    } else {
      elNavMob.remove();
      elContainer.append(elNavPc);
    }
  }
  fnCkWidth();
  
  // 이벤트
  // resize 되면 실행
  window.addEventListener('resize', () => {
    fnCkWidth();
  });



})();