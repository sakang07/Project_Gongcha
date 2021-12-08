// open_unb_search.js

// ==============================================
// unb searchBtn 클릭하면 searchArea 출력
// 1. 클릭시 .unb에 클래스 .on 추가
// 2. 영역 바깥 클릭시 .on 제거 : 보충 필요!
// ==============================================

// 변수
var navPc = document.querySelector('.nav_pc');
var elUnb = navPc.querySelector('.unb');
var elUnbSearchA = elUnb.querySelector('.search > a');
var elSearchArea = elUnb.querySelector('.search_area');
var elViewBox = document.querySelector('#viewBox');

// 이벤트
// 서치버튼 클릭시 .unb에 .on 추가
elUnbSearchA.addEventListener('click',function(e){
  e.preventDefault();
  elUnb.classList.add(ckActive);
});

// 외부 영역(#viewBox) 클릭시 .unb에 .on 제거
elViewBox.addEventListener('click', function(e){
  e.preventDefault();
  elUnb.classList.remove(ckActive);
});

// 외부 영역(.gnb_wrap) 클릭시 .unb에 .on 제거 : 안됨...
elGnbWrap.addEventListener('click', function(e){
  elUnb.classList.remove(ckActive);
});