// menu_list_input.js

// 1-1. pc : next 버튼을 누르면 슬라이드가 오른쪽으로 하나씩 이동, prev 버튼 노출
// 1-2.      오른쪽으로 더 이동할 수 없으면 next 버튼 삭제
// 1-3.      prev 버튼을 누르면 슬라이드가 왼쪽으로 하나씩 이동, next 버튼 노출
// 1-4.      왼쪽으로 더 이동할 수 없으면 prev 버튼 삭제
// 1-5.      시작점이 container에 맞춰 정렬
// 2-1. mob : 터치로 왼쪽으로 당기면 슬라이드가 오른쪽으로 부드럽게 이동
// 2-2.       터치로 오른쪽으로 당기면 슬라이드가 왼쪽으로 부드럽게 이동
{

  
  // 변수
  const elMenuBox = document.querySelector('#menuBox');
  const elContainer = elMenuBox.querySelector('.container');
  const elSlideWrap = elMenuBox.querySelector('.slide_wrap');
  
  const elMenuBtn = elSlideWrap.querySelector('.menu_btn_pc');
  const elNextBtn = elMenuBtn.querySelector('.next');
  const elPrevBtn = elMenuBtn.querySelector('.prev');
  
  const elMenuArea = elSlideWrap.querySelector('.menu_area');
  const elMenuLi = elMenuArea.querySelectorAll('li');
  const elMenuLiArr = [...elMenuLi];

  const slideStyle = elMenuArea.style;
  const slideLen = elMenuLiArr.length; // li 갯수
  console.log(slideLen);
  
  const slideWidth = parseInt(window.getComputedStyle(elMenuLi[0]).width); // li width 추출
  const slideMaginRight = parseInt(window.getComputedStyle(elMenuLi[0]).marginRight); // li margin_right 추출
  const slidePx = slideWidth + slideMaginRight;
  // slideStyle.width = `${slidePx * slideLen - slideMaginRight}px`;

  let slideDefault; // 초기 슬라이드 translateX 값

  const TIME = 300;
  let SLIDE_COUNT = 0;


  // 기능
  // 전체 박스 시작점이 container 박스와 정렬
  const fnArrange = () => {
    const containerWidth = parseInt(window.getComputedStyle(elContainer).width); // .container width
    const menuBoxPadding = parseInt(window.getComputedStyle(elMenuBox).paddingLeft); // #menuBox padding-left
  
    slideDefault = (window.innerWidth - containerWidth) / 2 - menuBoxPadding;
    slideStyle.transform = `translateX(${slideDefault}px)`;
  };



  // 기본 수행
  fnArrange();

  // 이벤트
  // next 버튼 클릭
  elNextBtn.addEventListener('click', e => {
    e.preventDefault();
    // 슬라이드가 끝날 때까지 작동
    // - translateX의 값이 window.innerWidth만큼 남아 있어야...?
    // 전체 너비에서 window.innerWidth를 뺀 값까지만 이동
    SLIDE_COUNT++;
    let slideTrs = slideDefault - slidePx * SLIDE_COUNT; // 슬라이드 이동값
    let slideWrapWidth = slidePx * slideLen + 1; // 슬라이드 전체 너비
    let limitTrs = slideWrapWidth - window.innerWidth - slideDefault;
    console.log(slideTrs, limitTrs)
      slideStyle.transform = `translateX(${slideTrs}px)`;
        if (!slideStyle.transition) {slideStyle.transition = `all ${TIME}ms ease`}
    // if (-(slideTrs) < limitTrs) {
    //   slideStyle.transform = `translateX(${slideTrs}px)`;
    //   console.log(slideStyle.transform);
    //   if (!slideStyle.transition) {slideStyle.transition = `all ${TIME}ms ease`}
    // } else {
    //   slideStyle.transform = `translateX(${-(limitTrs)}px)`;
    //   console.log(slideStyle.transform);
    //   if (!slideStyle.transition) {slideStyle.transition = `all ${TIME}ms ease`}
    // }

  });

  // prev 버튼 클릭
  elPrevBtn.addEventListener('click', e => {

  });
  
  // 리사이즈
  window.addEventListener('resize', fnArrange);


}