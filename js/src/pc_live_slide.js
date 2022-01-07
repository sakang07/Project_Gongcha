// pc_live_slide.js

{
  // 변수 -------------------------------
  const elLiveBox = document.querySelector('#liveBox');
  const elSocialArea = elLiveBox.querySelector('.social_area');

  const elBtn = elSocialArea.querySelector('.live_btn');
  const elLiveCon = elLiveBox.querySelector('.live_content');
  const elLiveLi = elLiveCon.querySelectorAll('li');
  const elLiveLiArr = [...elLiveLi];

  const slideLen = elLiveLiArr.length;
  let COUNT_IDX = 0;
  let BEFORE_IDX = COUNT_IDX;
  const TIME = 700;
  const TIME_MOVE = 3000; 
  const CK_ON = 'on';
  let slideGo;


  // 함수 -------------------------------
  // fade slide
  const fnOpacity = () => {
    // 현재 슬라이드 바로 뒤에 나타나게 하기
    elLiveLiArr[COUNT_IDX].style.display = 'block';      
    elLiveLiArr[COUNT_IDX + 1].style.display = 'block';

    // 이전 요소에 transition과 opacity 부여하여 fade-out
    elLiveLiArr[BEFORE_IDX].style.transition = `all ${TIME}ms ease`;
    elLiveLiArr[BEFORE_IDX + 1].style.transition = `all ${TIME}ms ease`;
    elLiveLiArr[BEFORE_IDX].style.opacity = 0;
    elLiveLiArr[BEFORE_IDX + 1].style.opacity = 0;
    
    // fade out 끝난 후
    setTimeout(e => {
      // 이전 슬라이드 style 삭제
      elLiveLiArr[BEFORE_IDX].removeAttribute('style');
      elLiveLiArr[BEFORE_IDX + 1].removeAttribute('style');
      // 이전 슬라이드 .on 삭제
      elLiveLiArr[BEFORE_IDX].classList.remove(CK_ON);
      elLiveLiArr[BEFORE_IDX + 1].classList.remove(CK_ON);

      // 현재 슬라이드 .on 추가
      elLiveLiArr[COUNT_IDX].classList.add(CK_ON);
      elLiveLiArr[COUNT_IDX + 1].classList.add(CK_ON);

      BEFORE_IDX = COUNT_IDX; // 카운트 초기화
    }, TIME);
  };

  // 자동 슬라이드
  const fnIntervalSlide = () => {
    slideGo = setInterval(() => {
      if (COUNT_IDX < slideLen - 2) COUNT_IDX += 2;
      else COUNT_IDX = 0;
      fnOpacity();
    }, TIME_MOVE)
  }

  // 슬라이드 멈춤
  const fnPauseSlide = () => {
    clearInterval(slideGo);
  }



  // 기본 수행 -------------------------------
  elLiveLiArr[COUNT_IDX].classList.add(CK_ON);
  elLiveLiArr[COUNT_IDX + 1].classList.add(CK_ON);
  fnIntervalSlide();



  // 이벤트 -------------------------------
  // 버튼 액션
  elBtn.addEventListener('click', e => {
    // 누른 버튼 파악
    if (e.target.classList.contains('next')) {
      // next 버튼 클릭
      if (COUNT_IDX < slideLen - 2) COUNT_IDX += 2;
      else COUNT_IDX = 0;
    } else {
      // prev 버튼 클릭
      if (COUNT_IDX > 0) COUNT_IDX -= 2;
      else COUNT_IDX = slideLen - 2;
    }
    fnOpacity();
  });

  // 영역에 마우스 올리면 일시정지
  elSocialArea.addEventListener('mouseenter', fnPauseSlide);

  // 영역에서 벗어나면 다시 슬라이드 재생
  elSocialArea.addEventListener('mouseleave', fnIntervalSlide);

  // 윈도우 비활성화시 슬라이드 일시정지
  document.addEventListener('visibilitychange', e => {
    e.target.visibilityState === 'hidden' ? fnPauseSlide : fnIntervalSlide;
  });


}