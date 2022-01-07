// dom_modify.js

// 시나리오 : 
// 1. 모바일 DOM 변경
// 1-1. .container 삭제
// 1-2. .container 안의 .store_search_box와 .social_area를 .container 밖으로 빼기 

// 2. 타블렛 DOM 변경
// 2-1. .live_img_03, .live_img_04의 display:block

// 3. pc 사이즈시 script 삽입
// 3-1. fade-out 효과로 전환되는 슬라이드
// 3-2. 시간이 지나면 자동으로 전환

// * pc > handhelds로 갈 시 애니메이션이 멈추지 않는 문제

(() => {

  // 변수
  const elBody = document.querySelector('body');
  const elLiveBox = document.querySelector('#liveBox');

  const elContainer = elLiveBox.querySelector('.container');
  const elStoreSearch = elLiveBox.querySelector('.store_search_box');
  
  const elSocialArea = elLiveBox.querySelector('.social_area');
  const elLiveCon = elLiveBox.querySelector('.live_content');
  const elLiveLi = elLiveCon.querySelectorAll('li');
  const elLiveLiArr = [...elLiveLi];

  const elImg03 = elLiveCon.querySelector('.live_img_03');
  const elImg04 = elLiveCon.querySelector('.live_img_04');

  const pcScript = '../js/src/pc_live_slide.js'
  const CK_ON = 'on';


  // 함수
  // 브라우저가 1024px보다 작거나 작게 리사이징 되면 실행하는 함수
  const fnWidthHandhelds = () => {
    const browserW = this.matchMedia("all and (max-width: 1023px)").matches;

    if(browserW) {
      elContainer.remove();
      elLiveBox.prepend(elStoreSearch)
      elLiveBox.append(elSocialArea);
    } else {
      elStoreSearch.remove();
      elSocialArea.remove();
      elLiveBox.append(elContainer);
      elContainer.append(elStoreSearch, elSocialArea);
    }
  };


  // 브라우저가 600px ~ 1023px 이거나 리사이징 되면 실행하는 함수
  const fnWidthTablet = () => {
    const browserW = this.matchMedia("all and (min-width: 600px) and (max-width: 1023px)").matches;

    if(browserW) {
      elImg03.style.display = 'block';
      elImg04.style.display = 'block';
    }  else {
      elImg03.style.display = null;
      elImg04.style.display = null;
    }
  };


  // 브라우저가 1024px 보다 크거나 리사이징 되면 실행하는 함수
  const fnWidthPc = () => {
    const browserW = this.matchMedia("all and (min-width: 1024px)").matches;
    if(browserW) {
      const _script = document.createElement('script');
      _script.src = pcScript;
      _script.setAttribute('class', 'liveScript')
      elBody.append(_script);

    } else {
      // pc media query에서 벗어나면 수행
      const elLiveScript = document.querySelector('.liveScript');
      if (!!elLiveScript) elLiveScript.remove();

      elLiveLiArr.forEach(d => {
        d.removeAttribute('style');
        d.classList.remove(CK_ON);
      });
    }
    
  }; // fnWidthPc


  // 기본 수행
  fnWidthHandhelds();
  fnWidthTablet();
  fnWidthPc()

  // 이벤트
  // resize 되면 실행
  window.addEventListener('resize', e => {
    fnWidthHandhelds();
    fnWidthTablet();
    fnWidthPc()
  })


})();