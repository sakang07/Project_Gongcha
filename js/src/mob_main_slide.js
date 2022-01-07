// mob_main_slide.js

// ==============================================
// 1. data 불러오기 완료(BANNER_DATA)
// 2. 불러온 data의 길이만큼 슬라이드와 인디케이터 생성
// 3-1. 터치로 조작하면 다음/이전 슬라이드로 이동
// 3-2. 터치 조작에 따라 인디케이터 숫자 변동
// 4-1. 일정 시간마다 다음 슬라이드로 이동
// 4-2. 영역 focus하면 슬라이드 이동 멈춤
// 5. 영역 클릭하면 이전/다음 슬라이드로 이동
// * 모바일 터치 슬라이드 1>2 / 5>1 자연스럽게 고치기(무한루프때문인듯)
// ==============================================

(()=>{
  // ==============================================
  
  // 변수-------------------------------------
  const elViewBox = document.querySelector('#viewBox');
  
  // mob_view_indicator
  const elViewIndi = elViewBox.querySelector('.view_indicator');
  const elIndiNum = elViewIndi.querySelector('.indi_number');
  const elIndiNumNow = elIndiNum.querySelector('.now');
  const elIndiNumTotal = elIndiNum.querySelector('.total');
  
  // view_content
  const elViewCont = elViewBox.querySelector('.view_content');
  
  const slideLen = BANNER_DATA.length; // 슬라이드 개수
  const slideW = 100 / (slideLen + 1); // 각 슬라이드 너비(%)
  const TIME_ANI = 500; // 슬라이드 애니메이션 시간
  const TIME_MOVE = 3000; // 슬라이드 자동으로 이동하는 시간
  let SLIDE_COUNT = 0;
  let slideGo;
  let PERMISSION = true;
  const pointer = {};
  
  
  // 기능-------------------------------------
  
  // slide 기본 기능 --------------------
  // view_content > ul 생성해서 집어넣기
  const mkViewContUl = document.createElement('ul');
  elViewCont.append(mkViewContUl);
  const elViewContUl = elViewCont.querySelector('ul');
  const slideStyle = elViewContUl.style;
  
  // data의 길이만큼 li.view_content_inner 요소 생성
  for (let i = 0; i < slideLen; i++) {
    const _mkViewContLi = document.createElement('li');
    let _dataSelect = BANNER_DATA[i];
  
    const _DATA_CODE = `<div class="view_text">
      <dl><dt>${_dataSelect.titleText}</dt><dd>${_dataSelect.contentText}</dd><dd class="btn_small full_wrap"><a href="${_dataSelect.url}">바로가기</a></dd></dl>
    </div><div class="view_img"></div>`;
  
    _mkViewContLi.innerHTML = _DATA_CODE;
    elViewContUl.append(_mkViewContLi);
    _mkViewContLi.setAttribute('class', 'view_content_inner');
  
    // 순번에 맞는 이미지 배경 삽입
    const _imgPath = '../multi/img/'
    const _elViewImg = elViewCont.querySelectorAll('.view_img');
    _elViewImg[i].style.backgroundImage = `url(${_imgPath}${_dataSelect.img})`;
  }
  
  // slide 무한 loop 기능 --------------------
  // data의 길이 + 1만큼 슬라이드 너비(ul width) 설정
  slideStyle.width = `calc(100% * ${slideLen + 1})`;
  
  // 맨 앞 슬라이드 복제해서 맨 뒤에 붙이기
  const elViewContLi = elViewContUl.querySelectorAll('li');
  const elViewContLiArr = [...elViewContLi];
  const elViewContLiFirst = elViewContLiArr[0]; // 첫 번째 슬라이드 요소 선택
  const cloneSlide = elViewContLiFirst.cloneNode(true); // 요소 내부까지 복제
  elViewContUl.append(cloneSlide); // 복제한 요소 맨 앞으로 삽입
  
  // indicator 기능 --------------------
  // data의 길이만큼 mobile .view_indicator 숫자 변경
  elIndiNumTotal.innerText = slideLen;  
  
  
  // 함수-------------------------------------
  
  // 해당 슬라이드로 이동하는 함수
  const fnMoveSlide = () => {
    slideStyle.transform = `translateX(-${SLIDE_COUNT * slideW}%)`;
    if(!slideStyle.transition) {slideStyle.transition = `all ${TIME_ANI}ms ease`};
  };
    
  // 비동기 동작을 기다리게 하는 함수
  const fnDelay = async (time = 0) => {
    return await new Promise ((resolve) => {
      setTimeout(() => {resolve()}, time)});
  };
  
  // 다음 슬라이드로 이동하는 함수
  const fnNextSlide = () => {
    if(PERMISSION) {
      PERMISSION = false;
      // 첫 번째 슬라이드부터 마지막 직전 슬라이드까지의 처리
      if (SLIDE_COUNT < slideLen - 1) { 
        SLIDE_COUNT++;
        fnMoveSlide();
        elIndiNumNow.innerText = SLIDE_COUNT + 1;
        PERMISSION = true;
      } else {
        // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때 무한루프 처리
        (async () => {
          SLIDE_COUNT++;
          fnMoveSlide();
          elIndiNumNow.innerText = '1';
          // 넘어간 후 복제 슬라이드에서 첫 번째 슬라이드로 이동
          await fnDelay(TIME_ANI);
          slideStyle.transform = null;
          slideStyle.transition = null;
          SLIDE_COUNT = 0;
          PERMISSION = true;
        })();
      }
    }
  };
  
  // 이전 슬라이드로 이동하는 함수
  const fnPrevSlide = () => {
    if(PERMISSION) {
      PERMISSION = false;
      // 두 번째 슬라이드부터 마지막 슬라이드까지의 처리
      if (0 < SLIDE_COUNT && SLIDE_COUNT <= slideLen - 1) { 
        SLIDE_COUNT--;
        fnMoveSlide();
        elIndiNumNow.innerText = SLIDE_COUNT + 1;
        PERMISSION = true;
      } else {
        // 첫 슬라이드에서 마지막 슬라이드로 넘어갈 때 무한루프 처리
        (async () => {
          // 첫 번째 슬라이드가 복제된 마지막 슬라이드로 이동
          slideStyle.transition = null;
          slideStyle.transform = `translateX(-${slideLen * slideW}%)`;
          SLIDE_COUNT = slideLen - 1;
          elIndiNumNow.innerText = slideLen;
          // 복제된 마지막 슬라이드에서 이전 슬라이드로 이동
          await fnDelay(1);
          fnMoveSlide();
          PERMISSION = true;
        })();
      }
    }
  };
  
  // 자동으로 슬라이드가 넘어가는 함수
  const fnIntervalSlide = () => {
    slideGo = setInterval(fnNextSlide, TIME_MOVE);
  };
  
  const fnPauseSlide = () => {
    clearInterval(slideGo);
  };

  
  // 기본 함수 수행-----------------------------
  fnIntervalSlide();
  
  
  // 이벤트-------------------------------------
    
  // 광고 영역에 마우스 올리면 슬라이드 일시정지
  elViewBox.addEventListener('mouseenter', fnPauseSlide);
  
  // 광고영역에서 마우스 벗어나면 광고 슬라이드 다시 재생
  elViewBox.addEventListener('mouseleave', fnIntervalSlide);

  // 윈도우 비활성화시 슬라이드 일시정지
  document.addEventListener('visibilitychange', e => {
    e.target.visibilityState === 'hidden' ? fnPauseSlide : fnIntervalSlide;
  });

  // 광고영역에서 클릭/터치하면 영역에 따라 이전/다음 슬라이드
  elViewBox.addEventListener('click', e => {
    pointer.click = e.pageX;
    // 클릭 영역 판별
    if(pointer.click < window.innerWidth / 2 ) {
      fnPrevSlide();
    } else { 
      fnNextSlide();
    }
  });

  // 광고영역에 터치를 시작하면 시작점 값 산출
  elViewBox.addEventListener('touchstart', e => {
    fnPauseSlide();
    pointer.start = e.changedTouches[0].pageX;
  });
  
  // 터치하는 동안 슬라이드가 따라오게 하기
  elViewBox.addEventListener('touchmove', e => {
    let _nowPointer = e.targetTouches[0].pageX;
    let _pointerMove = pointer.start - _nowPointer; // 움직인 수치 계산
    let _movePer = parseInt(_pointerMove / window.innerWidth * 100) // 움직인 값을 %로 변환
    // 움직이는 범위 제한
    if(Math.abs(_movePer) < slideW) {
      slideStyle.transform = `translateX(-${SLIDE_COUNT * slideW + _movePer}%)`;
    } 
  });

  // 광고영역에서 터치가 끝나면 이동 방향을 파악하여 슬라이드 이동
  elViewBox.addEventListener('touchend', e => {
    pointer.end = e.changedTouches[0].pageX;
    pointer.gap = pointer.start - pointer.end;
    if ( pointer.gap >= 100) {
      fnNextSlide();
    } else if ( pointer.gap <= -100) {
      fnPrevSlide();
    } else {
      fnMoveSlide();
    }
  });


})();