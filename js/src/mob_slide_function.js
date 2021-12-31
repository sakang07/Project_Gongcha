// mob_slide_function.js

// ==============================================
// 1. data 불러오기 완료(BANNER_DATA)
// 2. 불러온 data의 길이만큼 슬라이드와 인디케이터 생성
// 3-1. 터치로 조작하면 다음/이전 슬라이드로 이동
// 3-2. 터치 조작에 따라 인디케이터 숫자 변동
// 4-1. 일정 시간마다 다음 슬라이드로 이동
// 4-2. 영역 focus하면 슬라이드 이동 멈춤
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
  
  const sildeLen = BANNER_DATA.length; // 슬라이드 개수
  const slideW = 100 / (sildeLen + 1); // 복제 슬라이드 포함 슬라이드 전체 너비
  const TIME_ANI = 500; // 슬라이드 애니메이션 시간
  const TIME_MOVE = 3000; // 슬라이드 자동으로 이동하는 시간
  let SLIDE_COUNT = 0;
  let slideGo;
  
  
  const CK_ACTIVE = 'on';
  let PERMISSION = true;
  
  
  // 기능-------------------------------------
  
  // slide 
  // view_content > ul 생성해서 집어넣기
  const mkViewContUl = document.createElement('ul');
  elViewCont.append(mkViewContUl);
  const elViewContUl = elViewCont.querySelector('ul');
  
  // data의 길이만큼 li.view_content_inner 요소 생성
  for (let i = 0; i < sildeLen; i++) {
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
  
  // data의 길이만큼 슬라이드 너비(ul width) 설정
  elViewContUl.style.width = `calc(100% * ${sildeLen + 1})`;
  
  // 맨 앞 슬라이드 복제해서 맨 뒤에 붙이기
  const elViewContLi = elViewContUl.querySelectorAll('li');
  const elViewContLiArr = [...elViewContLi];
  const elViewContLiFirst = elViewContLiArr.at(0); // 첫 번째 슬라이드 요소 선택
  const cloneSlide = elViewContLiFirst.cloneNode(true); // 요소 내부까지 복제
  elViewContUl.append(cloneSlide); // 복제한 요소 맨 앞으로 삽입
  
  // indicator 
  // data의 길이만큼 mobile .view_indicator 숫자 변경
  elIndiNumTotal.innerText = sildeLen;  
  
  
  // 함수-------------------------------------
  
  // 해당 슬라이드로 이동하는 함수
  fnMoveSlide = (el, idx) => {
    el.style.transform = `translateX(-${idx * slideW}%)`;
    el.style.transition = `all ${TIME_ANI}ms ease`;
  };
  
  // 다음 인디케이터로 이동하는 함수
  // fnNextIndiCir = (el, idx) => {
  //   el.forEach((d, i) => {
  //     i === idx ? el[i].classList.add(CK_ACTIVE) : el[i].classList.remove(CK_ACTIVE);
  //   })
  // };
  
  // 전체 배열 중 선택한 순번을 제외한 나머지 형제 선택하는 함수
  const fnSiblings = (select, idx) => {
    const otherArr = [];
    select.forEach((d,i) => {
      if(idx !== i) {
        otherArr.push(d);
      }
    });
    return otherArr;
  };
  
  // 비동기 동작을 기다리게 하는 함수
  const fnDelay = async (time = 0) => {
    return await new Promise ((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };
  
  // 다음 슬라이드로 이동하는 함수
  fnNextSlide = e => {
    e.preventDefault();
  
    if(PERMISSION) {
      PERMISSION = false;
  
      if (SLIDE_COUNT < sildeLen - 1) { 
        SLIDE_COUNT++;
        fnMoveSlide(elViewContUl, SLIDE_COUNT);
        // fnNextIndiCir(elIndiCircleLi, SLIDE_COUNT);
  
        PERMISSION = true;
      } else {
        // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때 무한루프 처리
        const fnAny = async e => {
        SLIDE_COUNT++;
        fnMoveSlide(elViewContUl, SLIDE_COUNT);
        // fnNextIndiCir(elIndiCircleLi, 0);
        // 넘어간 후 복제 슬라이드에서 첫 번째 슬라이드로 이동
          await fnDelay(TIME_ANI);
          elViewContUl.style.transform = null;
          elViewContUl.style.transition = null;
          SLIDE_COUNT = 0;
          await fnDelay();
          PERMISSION = true;
        }
        fnAny();
      }
    }
  };
  
  // 이전 슬라이드로 이동하는 함수
  fnPrevSlide = e => {
    e.preventDefault();
  
    if(PERMISSION) {
      PERMISSION = false;
  
      if (0 < SLIDE_COUNT && SLIDE_COUNT <= sildeLen - 1) { 
        SLIDE_COUNT--;
        fnMoveSlide(elViewContUl, SLIDE_COUNT);
        // fnNextIndiCir(elIndiCircleLi, SLIDE_COUNT);
        PERMISSION = true;
      } else {
        // 첫 슬라이드에서 마지막 슬라이드로 넘어갈 때 무한루프 처리
        // 첫 번째 슬라이드가 복제된 마지막 슬라이드로 이동
        elViewContUl.style.transition = null;
        elViewContUl.style.transform = `translateX(-${sildeLen * slideW}%)`;
        SLIDE_COUNT = sildeLen - 1;
        // fnNextIndiCir(elIndiCircleLi, sildeLen - 1);
        
        // 복제된 마지막 슬라이드에서 이전 슬라이드로 이동
        setTimeout(e => {
          fnMoveSlide(elViewContUl, SLIDE_COUNT);
          PERMISSION = true;
        }, 1);
      }
    }
  };
  
  // 자동으로 슬라이드가 넘어가는 함수
  const fnIntervalSlide = () => {
    slideGo = setInterval(() => {
      if (SLIDE_COUNT < sildeLen - 1) { 
        SLIDE_COUNT++;
        fnMoveSlide(elViewContUl, SLIDE_COUNT);
        // fnNextIndiCir(elIndiCircleLi, SLIDE_COUNT);
      } else {
        // 마지막 슬라이드에서 첫 슬라이드로 넘어갈 때 무한루프 처리
        SLIDE_COUNT++;
        fnMoveSlide(elViewContUl, SLIDE_COUNT);
        // fnNextIndiCir(elIndiCircleLi, 0);
        // 넘어간 후 복제 슬라이드에서 첫 번째 슬라이드로 이동
        setTimeout(e => {
          elViewContUl.style.transform = null;
          elViewContUl.style.transition = null;
          SLIDE_COUNT = 0;
        }, TIME_ANI);
      }
    }, TIME_MOVE);
  };
  
  const fnPauseSlide = () => {
    clearInterval(slideGo);
  };
  
  // 기본 함수 수행-----------------------------
  fnIntervalSlide();
  
  
  // 이벤트-------------------------------------
    
  // // 광고 영역에 마우스 올리면 슬라이드 일시정지
  // elViewBox.addEventListener('mouseenter', fnPauseSlide);
  
  // // 광고영역에서 마우스 벗어나면 광고 슬라이드 다시 재생
  // elViewBox.addEventListener('mouseleave', fnIntervalSlide);
  
  // 광고 영역에서 터치
  elViewBox.addEventListener('touchstart', e => {
    // fnPauseSlide();
    console.log('시작점: ', e.changedTouches[0].pageX);
    pointer.start = e.changedTouches[0].pageX;
    leftData = parseInt(el[0].style.left); // 기존 %수치
  });







  })();