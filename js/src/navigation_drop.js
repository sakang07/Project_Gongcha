// navigation_drop.js

// =============================================================
// 1. 네비게이션 버튼 동작 : .gnb_title 클릭하면 .on 삽입
// 2. 네비 안의 x버튼 동작 : .nav_close 클릭하면 .on 제거
// 3. 네비 안의 서브메뉴 동작 : 
  // 3-1. .gnb_title 클릭하면 .on 삽입, .gnb_title > a에 .on 삽입
  // 3-2. 클릭한 요소를 제외한 요소에서 .on 모두 제거
  // 3-3. 같은 요소를 두번 클릭하면 .on 모두 제거
// 4. .nav_search의 검색 form 동작
// =============================================================

// 변수 --------------------------------------------------------
var elNavMob = document.querySelector('.nav_mob > .nav_wrap');
var elNavMOpenBtn = document.querySelector('.nav_btn > button');
var elNavMCloseBtn = elNavMob.querySelector('.nav_close > button');

var elGnbWrap = elNavMob.querySelector('.gnb_wrap');
var elGnbWrapLi = elGnbWrap.children;
var elGnbWrapLiArr = Array.prototype.slice.call(elGnbWrapLi);

var elGnbTitle = elGnbWrap.querySelectorAll('.gnb_title');
var elGnbTitleA = elNavMob.querySelectorAll('.gnb_title > a');

// 기능 활성화 클래스 문자열
var ckActive = 'on';
// index 체크
var ckIdx;

// 기능 --------------------------------------------------------

// 함수 --------------------------------------------------------
// 클릭한 요소가 아닌 다른 요소 닫고 버튼 모양 반전 제거하는 함수
var fnCloseSubMenu = function (el) {
  // 배열 요소를 순환하며 외부 ckIdx 값과 일치하지 않는 것만 닫기
  el.forEach(function(d, idx) {
    if (ckIdx !== idx) { // 클릭한 요소가 아니면
      d.parentNode.classList.remove(ckActive); // 클릭하지 않은 요소의 부모요소(elGnbTitle)에 .on 제거
      d.classList.remove(ckActive); // 클릭하지 않은 요소(elGnbTitleA)에 .on 제거
    } 
  });
};


// 이벤트 --------------------------------------------------------

// elNavMOpenBtn을 클릭하면 gnb 열기----------------------
elNavMOpenBtn.addEventListener('click', function(e) {
  e.preventDefault();
  elNavMob.classList.add(ckActive);
  elNavMCloseBtn.focus();
});

// elNavMCloseBtn을 클릭하면 gnb 닫기----------------------
elNavMCloseBtn.addEventListener('click', function(e){
  e.preventDefault();
  elNavMob.classList.remove(ckActive);
});

// elGnbTitleA를 클릭하면 서브메뉴 열기--------------------
elGnbTitleA.forEach(function(data, index){ // 요소들을 순환하며 클릭한 요소를 특정
  data.addEventListener('click', function(e){

    if (ckIdx !== index) {
      e.preventDefault();
      ckIdx = index; // 클릭한 요소의 순번을 ckIdx에 부여

      // 1. 타이틀을 누르면 서브메뉴가 드랍
      data.parentNode.classList.add(ckActive); // 클릭한 요소의 부모요소(elGnbTitle)에 .on 삽입

      // 2. 누른 메뉴는 버튼 모양 위아래 반전
      data.classList.add(ckActive); // 클릭한 요소(elGnbTitleA)에 .on 삽입

      // 3. 누르지 않은 서브메뉴는 닫고 버튼 모양도 복구
      fnCloseSubMenu(elGnbTitleA);

      // 4. 누른 메뉴를 다시 눌렀을 때 닫기
    } else {
      data.parentNode.classList.remove(ckActive); // 클릭한 요소의 부모요소(elGnbTitle)에 .on 삽입
      data.classList.remove(ckActive); // 클릭한 요소(elGnbTitleA)에 .on 삽입
      ckIdx = null; // ckIdx 초기화
    }
  });
});
