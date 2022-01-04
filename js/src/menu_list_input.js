// menu_list_input.js

// 1-1. pc : next 버튼을 누르면 슬라이드가 오른쪽으로 하나씩 이동, prev 버튼 노출
// 1-2.      오른쪽으로 더 이동할 수 없으면 next 버튼 삭제
// 1-3.      prev 버튼을 누르면 슬라이드가 왼쪽으로 하나씩 이동, next 버튼 노출
// 1-4.      왼쪽으로 더 이동할 수 없으면 prev 버튼 삭제
// 2-1. mob : 터치로 왼쪽으로 당기면 슬라이드가 오른쪽으로 부드럽게 이동
// 2-2.       터치로 오른쪽으로 당기면 슬라이드가 왼쪽으로 부드럽게 이동
{

  
  // 변수
  const elMenuBox = document.querySelector('#menuBox');
  // const elContainer = elMenuBox.querySelector('.container');
  const elSlideWrap = elMenuBox.querySelector('.slide_wrap');
  
  const elMenuBtn = elSlideWrap.querySelector('.menu_btn_pc');
  // const elNextBtn = elMenuBtn.querySelector('.next');
  // const elPrevBtn = elMenuBtn.querySelector('.prev');
  
  const elMenuArea = elSlideWrap.querySelector('.menu_area');
  const elMenuLi = elMenuArea.querySelectorAll('li');
  const elMenuLiArr = [...elMenuLi];

  const slideStyle = elMenuArea.style;
  const slideLen = elMenuLiArr.length; // li 갯수

  let slideWidth, slideTrs, limitTrs; // 슬라이드 너비, 슬라이드 translateX값, 최대 translateX값
  const pointer = {
    start: 0,
    end: 0,
    gap : 0,
    move:0
  }; // 터치 X값 파악

  const TIME = 300; // 슬라이드 이동 애니메이션 시간
  let SLIDE_COUNT = 0; // 슬라이드 순번
  const CK_ON = 'on'; // 활성화 클래스


  // 기능
  // 슬라이드 너비 체크
  const fnCkSlide = () => {
    const _liWidth = parseInt(window.getComputedStyle(elMenuLi[0]).width); // li width 추출
    const _liMaginRight = parseInt(window.getComputedStyle(elMenuLi[0]).marginRight); // li margin_right 추출
    slideWidth = _liWidth + _liMaginRight; // 슬라이드 1개 너비
    slideTrs = slideWidth * SLIDE_COUNT; // 슬라이드 이동값
    const _slideWrapWidth = slideWidth * slideLen; // 슬라이드 전체 너비
    limitTrs = _slideWrapWidth - window.innerWidth + slideWidth; // 슬라이드가 이동할 수 있는 최대 X값
  }
  
  // 슬라이드 이동
  const fnMoveSlide = (e, _btnArr) => {
    fnCkSlide(); // 슬라이드 너비 체크
    
    if (!slideStyle.transition) {slideStyle.transition = `all ${TIME}ms ease`} // 애니메이션 효과

    if (slideTrs < limitTrs - slideWidth && slideTrs > 0) {
      // X값이 최대값(에서 슬라이드 1개분 뺀 값)보다 작고 0이나 음수가 아닐 때
      slideStyle.transform = `translateX(-${slideTrs}px)`;
    } else {
      // X값이 최대값을 넘었거나 음수일 때
      slideStyle.transform = slideTrs > slideWidth ? `translateX(-${limitTrs}px)` : null; // 이전이면 X값 0, 다음이면 최대X값으로 설정

      // 누른 버튼 삭제
      _btnArr.forEach((d) => {
        if (e.target === d) d.classList.remove(CK_ON);
      });
    }
  };


  // 이벤트
  // 버튼 클릭
  elMenuBtn.addEventListener('click', e => {
    e.preventDefault();
    // 무슨 버튼을 눌렀는지 파악
    // next 버튼을 클릭 : 1. prev 버튼을 노출 2. 슬라이드가 끝났으면 next 버튼을 제거
    // prev 버튼을 클릭 : 1. next 버튼을 노출 2. 슬라이드가 끝났으면 prev 버튼을 제거

    const _btn = e.currentTarget.children;
    const _btnArr = [..._btn];

    // next일 때 SLIDE_COUNT++, prev일 때 SLIDE_COUNT--
    e.target === _btnArr[0] ?  SLIDE_COUNT++ : SLIDE_COUNT--;
    
    // 누른 버튼에 .on 주기
    _btnArr.forEach((d) => {
      if (e.target !== d) {
        // 누르지 않은 쪽의 버튼에 .on 삽입
        if (!d.classList.contains(CK_ON)) {d.classList.add(CK_ON)};
      }
    });
    
    // 슬라이드가 끝날 때까지 작동
    // translateX의 값이 window.innerWidth만큼 남아 있어야 한다
    // 전체 너비에서 window.innerWidth를 뺀 값까지만 이동
    fnMoveSlide(e, _btnArr);
  });

  // 리사이즈
  window.addEventListener('resize', () => {
    fnMoveSlide();
  });

  // 모바일 터치
  // 시작점 파악
  elMenuArea.addEventListener('touchstart', e => {
    fnCkSlide();
    pointer.start =pointer.move + e.changedTouches[0].pageX;
    console.log(pointer.start, 'start');
  });
  

  // 터치하는 동안 슬라이드가 따라오기
  elMenuArea.addEventListener('touchmove', e => {
    let _nowPointer = e.targetTouches[0].pageX ;
    let _pointerMove = (pointer.start - _nowPointer); // 움직인 수치 계산
    pointer.move = (_pointerMove < 0) ? 0: _pointerMove ;
    console.log(_pointerMove );

    // 움직이는 범위 제한
    if(Math.abs(_pointerMove) < limitTrs) {
      slideStyle.transform = `translateX(-${_pointerMove}px)`;
    }
    SLIDE_COUNT = parseInt((_pointerMove) / slideWidth);
    // console.log(SLIDE_COUNT);
  });
  
  // 터치가 끝나면 이동 방향 파악하여 슬라이드 이동
  elMenuArea.addEventListener('touchend', e => {
    pointer.end = e.changedTouches[0].pageX;
    pointer.gap = pointer.start + pointer.end;

  });

}