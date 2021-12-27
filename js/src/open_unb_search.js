// open_unb_search.js

// ==============================================
// unb searchBtn 클릭하면 searchArea 출력
// 1. 클릭시 .unb에 클래스 .on 추가
// 2. 영역 바깥 클릭시 .on 제거 : 보충 필요!
// ==============================================

(()=>{

// 변수
const navPc = document.querySelector('.nav_pc');
const elUnb = navPc.querySelector('.unb');
const elUnbSearchA = elUnb.querySelector('.search > a');
const elSearchArea = elUnb.querySelector('.search_area');
const elViewBox = document.querySelector('#viewBox');
const elPcGnbWrap = navPc.querySelector('.gnb_wrap');

const CK_ACTIVE = 'on';
let ckContains;

// 함수
const fnCkActive = () => {
  return elUnb.classList.contains(CK_ACTIVE);
};

// 이벤트
// 서치버튼 클릭시 .unb에 .on 추가
elUnbSearchA.addEventListener('click',function(e){
  e.preventDefault();
  elUnb.classList.add(CK_ACTIVE);
});

// 외부 영역(#viewBox) 클릭시 .unb에 .on 제거
elViewBox.addEventListener('click', function(e){
  if(fnCkActive()) {
    elUnb.classList.remove(CK_ACTIVE);
  }
});

// 외부 영역(.gnb_wrap) 마우스 오버시 .unb에 .on 제거
elPcGnbWrap.addEventListener('mouseover', function(e){
  if(fnCkActive()) {
    elUnb.classList.remove(CK_ACTIVE);
  }
});


})();