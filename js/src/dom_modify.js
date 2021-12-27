// dom_modify.js

// 시나리오 : 
// 1. 모바일 DOM 변경
// 1-1. .container 삭제
// 1-2. .container 안의 .store_search_box와 .social_area를 .container 밖으로 빼기 

// 2. 타블렛 DOM 변경
// 2-1. .live_img_03, .live_img_04의 생성


(() => {

  // 변수
  const elLiveBox = document.querySelector('#liveBox');

  const elContainer = elLiveBox.querySelector('.container');
  const elStoreSearch = elLiveBox.querySelector('.store_search_box');
  const elSocialArea = elLiveBox.querySelector('.social_area');

  const elLiveCon = elLiveBox.querySelector('.live_content');

  const mkLi3 = document.createElement('li');
    mkLi3.setAttribute('class', 'live_img_03');
    mkLi3.innerHTML = '<span class="blind">세 번째 사진</span>';
  
  const mkLi4 = document.createElement('li');
    mkLi4.setAttribute('class', 'live_img_04');
    mkLi4.innerHTML = '<span class="blind">네 번째 사진</span>';




  // 함수
  // 브라우저가 1024px보다 작거나 작게 리사이징 되면 실행하는 함수
  const fnWidthHandhelds = () => {
    const browserW = this.matchMedia("all and (max-width: 1023px)").matches;
    const resizeW = this.innerWidth;
    if(browserW || resizeW < 1024) {

      elContainer.remove();
      elLiveBox.prepend(elStoreSearch)
      elLiveBox.append(elSocialArea);
    } else {
      // console.log('dfsf');
      elStoreSearch.remove();
      elSocialArea.remove();
      elLiveBox.append(elContainer);
      elContainer.append(elStoreSearch, elSocialArea);
    }
  }
    // 브라우저가 600px ~ 1023px 이거나 리사이징 되면 실행하는 함수
    const fnWidthTablet = () => {
      const browserW = this.matchMedia("all and (min-width: 600px) and (max-width: 1023px)").matches;
      const resizeW = this.innerWidth;

      if(browserW) {
        elLiveCon.append(mkLi3);
        elLiveCon.append(mkLi4);
      }  else {
        mkLi3.remove();
        mkLi4.remove();
      }
    }

    fnWidthHandhelds();
    fnWidthTablet();

  // 이벤트
  // resize 되면 실행
  window.addEventListener('resize', e => {
    fnWidthHandhelds();
    fnWidthTablet();

  })
})();