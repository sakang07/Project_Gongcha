// navigation_drop.js

// Js 처리:
// 1. 네비게이션 버튼 동작 : .gnb_title 클릭하면 .on 삽입
// 2. 네비 안의 x버튼 동작 : .nav_close 클릭하면 .on 제거(tab index 신경쓰기)

// ----- 여기까지 했당
// 2. 네비 안의 드롭다운 동작 : .gnb_title 클릭하면 .on 삽입, 하나 열리면 다른거 닫기, 다시 누르면 닫기
// 3. .nav_search의 검색 form 동작

// 변수 --------------------------------------------------------
var elGnbMob = document.querySelector('.gnb_mob');
var elGnbOpenBtn = document.querySelector('.nav_btn');
var elGnbCloseBtn = elGnbMob.querySelector('.nav_close');
var elGnbTitle = elGnbMob.querySelector('.gnb_title');

// 기능 활성화 클래스 문자열
var ckActive = 'on';
// elGnbMob가 .on을 포함하고 있는지 확인하는 변수
var ckGnbDrop = elGnbMob.classList.contains(ckActive); // false

// 기능 --------------------------------------------------------

// 함수 --------------------------------------------------------


// 이벤트 --------------------------------------------------------
// elGnbOpenBtn을 클릭하면 gnb 열기
elGnbOpenBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!ckGnbDrop) { elGnbMob.classList.add(ckActive); }
});

// elGnbCloseBtn을 클릭하면 gnb 닫기
elGnbCloseBtn.addEventListener('click', function(e){
  e.preventDefault();
  elGnbMob.classList.remove(ckActive);
});

// elGnbTitle을 클릭하면 submenu 열기 // 이건 왜 또 안됨
elGnbTitle.addEventListener('click', function(e){
  e.preventDefault();
  elGnbTitle.classList.add(ckActive);

});