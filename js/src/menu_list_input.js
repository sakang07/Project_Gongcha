// menu_list_input.js

// 1-1. pc : next 버튼을 누르면 슬라이드가 오른쪽으로 하나씩 이동, prev 버튼 노출
// 1-2.      오른쪽으로 더 이동할 수 없으면 next 버튼 삭제
// 1-3.      prev 버튼을 누르면 슬라이드가 왼쪽으로 하나씩 이동, next 버튼 노출
// 1-4.      왼쪽으로 더 이동할 수 없으면 prev 버튼 삭제
// 2-1. mob : 터치로 왼쪽으로 당기면 슬라이드가 오른쪽으로 부드럽게 이동
// 2-2.       터치로 오른쪽으로 당기면 슬라이드가 왼쪽으로 부드럽게 이동
{

  
  // 변수 -----------------------------------------------------
  const elMenuBox = document.querySelector('#menuBox');
  const elContainer = elMenuBox.querySelector('.container');
  const elSlideWrap = elMenuBox.querySelector('.slide_wrap');
  
  const elMenuBtn = elSlideWrap.querySelector('.menu_btn_pc');
  
  const elMenuArea = elSlideWrap.querySelector('.menu_area');
  const elMenuLi = elMenuArea.querySelectorAll('li');
  const elMenuLiArr = [...elMenuLi];

  const slideStyle = elMenuArea.style;
  const slideLen = elMenuLiArr.length; // li 갯수

  let slideWidth, slideLeftSpace, slideTrs, limitTrs; // 슬라이드 너비, 슬라이드 translateX값, 최대 translateX값
  const pointer = { start: 0, move: 0 }; // 터치 X값 파악

  const TIME = 300; // 슬라이드 이동 애니메이션 시간
  let SLIDE_COUNT = 0; // 슬라이드 순번
  const CK_ON = 'on'; // 활성화 클래스
  let PERMISSION = true;


  // 기능 -----------------------------------------------------
  // 슬라이드 너비 체크
  const fnCkSlide = () => {
    const _liWidth = parseInt(window.getComputedStyle(elMenuLi[0]).width); // li width 추출
    const _liMaginRight = parseInt(window.getComputedStyle(elMenuLi[0]).marginRight); // li margin_right 추출
    const _containerWidth = parseInt(window.getComputedStyle(elContainer).width); // .container width
    slideLeftSpace = (window.innerWidth - _containerWidth) / 2;
    slideWidth = _liWidth + _liMaginRight; // 슬라이드 1개 너비
    slideTrs = slideWidth * SLIDE_COUNT; // 슬라이드 이동값
    const _slideWrapWidth = slideWidth * slideLen; // 슬라이드 전체 너비
    limitTrs = _slideWrapWidth - window.innerWidth + slideLeftSpace; // 슬라이드가 이동할 수 있는 최대 X값
  }

  // 슬라이드 애니메이션
  const fnAni = () => {
    if (!slideStyle.transition) {slideStyle.transition = `all ${TIME}ms ease`} // 애니메이션 효과
  }

  // 버튼 액션
  const fnBtnAction = () => {
    fnCkSlide(); // 슬라이드 너비 체크

    const _elNextBtn = elMenuBtn.querySelector('.next');
    const _elPrevBtn = elMenuBtn.querySelector('.prev');
    const _slideMax = slideLen - (parseInt((window.innerWidth - slideLeftSpace) / slideWidth));

    // SLIDE_COUNT 기준으로 좌우버튼 노출/제거
    if (SLIDE_COUNT > 0 && SLIDE_COUNT < _slideMax) {
      if (!_elNextBtn.classList.contains(CK_ON)) {_elNextBtn.classList.add(CK_ON)};
      if (!_elPrevBtn.classList.contains(CK_ON)) {_elPrevBtn.classList.add(CK_ON)};
    } else if (SLIDE_COUNT <= 0) {
      SLIDE_COUNT = 0;
      if (_elPrevBtn.classList.contains(CK_ON)) {_elPrevBtn.classList.remove(CK_ON)};
      if (!_elNextBtn.classList.contains(CK_ON)) {_elNextBtn.classList.add(CK_ON)};
    } else {
      SLIDE_COUNT = _slideMax;
      if (_elNextBtn.classList.contains(CK_ON)) {_elNextBtn.classList.remove(CK_ON)};
      if (!_elPrevBtn.classList.contains(CK_ON)) {_elPrevBtn.classList.add(CK_ON)};
    }
  };
  
  // 슬라이드 이동
  const fnMoveSlide = () => {
    fnCkSlide(); // 슬라이드 너비 체크
    fnAni(); // 슬라이드 애니메이션

    if (slideTrs < limitTrs && slideTrs > 0) {
      // X값이 최대값보다 작고 0이나 음수가 아닐 때
      slideStyle.transform = `translateX(-${slideTrs}px)`;
      pointer.move = slideTrs;
    } else {
      // X값이 최대값을 넘었거나 음수일 때
      slideStyle.transform = slideTrs > slideWidth ? `translateX(-${limitTrs + window.innerWidth * 0.1}px)` : null; // 이전이면 X값 0, 다음이면 최대X값(+ 슬라이드 1개너비)으로 설정
      pointer.move = slideTrs > slideWidth ? limitTrs : 0;
    }
  };

  // 터치/드래그 기능 조작
  const fnTouchStart = e => {
    fnCkSlide(); // 슬라이드 너비 체크
    fnAni(); // 슬라이드 애니메이션
    pointer.start = pointer.move + e.changedTouches[0].pageX;
  };
  const fnTouchMove = e => {
    let _pointerMove = (pointer.start - e.targetTouches[0].pageX); // 최초 X값 - 움직인 X값
    // 전역변수에 값을 할당하되 0 이상 최대너비 이하로 하기
    if (_pointerMove < 0) {
      pointer.move = 0
    } else if (_pointerMove > limitTrs) {
      pointer.move = limitTrs;
    } else {
      pointer.move = _pointerMove
    }

    slideStyle.transform = `translateX(-${pointer.move}px)`; // 이동값만큼 슬라이드 이동
    SLIDE_COUNT = parseInt(pointer.move / slideWidth); // 리사이즈 고려해서 SLIDE_COUNT에 값 주기
  };


  // 이벤트 -----------------------------------------------------
  // 버튼 클릭
  elMenuBtn.addEventListener('click', e => {
    e.preventDefault();
    if(PERMISSION) {
      PERMISSION = false;

      // 무슨 버튼을 눌렀는지 파악
      const _btn = e.currentTarget.children;
      const _btnArr = [..._btn];
      // next일 때 SLIDE_COUNT++, prev일 때 SLIDE_COUNT--
      e.target === _btnArr[0] ?  SLIDE_COUNT++ : SLIDE_COUNT--;
      fnBtnAction(); // 버튼 동작

      PERMISSION = true;
    }
    
    // 슬라이드가 끝날 때까지 작동
    // 전체 너비에서 window.innerWidth를 뺀 값까지만 이동
    fnMoveSlide();
  });

  // 리사이즈
  window.addEventListener('resize', fnMoveSlide);

  // 모바일 터치
  // 시작점 파악
  elMenuArea.addEventListener('touchstart', fnTouchStart);
  // 터치하는 동안 슬라이드가 따라오기
  elMenuArea.addEventListener('touchmove', fnTouchMove);

}