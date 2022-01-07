// slide_input.js

// 1. slide_data.json을 불러와서 변수에 할당.
// 2. 브라우저 너비에 따라 모바일일 때는 mob_main_slide.html과 slide_function_mob.js를 불러오기
// 3. pc일 때는 pc_main_slide.html과 slide_function_pc.js를 불러오기
// 4. 브라우저 너비가 바뀌면(change) 다시 해당하는 html과 script 불러오기

{

  // 변수 =========================================
  // data url
  const jsonData = '../data/slide_data.json';
  const setDevice = [
    {
      type: 'mobile',
      htmlUrl: './temp/main/mob_main_slide.html',
      scriptUrl: '../js/src/mob_main_slide.js',
      size: 1023,
    }, {
      type: 'pc',
      htmlUrl: './temp/main/pc_main_slide.html',
      scriptUrl: '../js/src/pc_main_slide.js',
    }
  ];
  const mediaSize = `screen and (max-width:${setDevice[0].size}px)`; // mobile 환경
  const mediaMatches = window.matchMedia(mediaSize); // mobile일 때 .matches 값 true

  // 선택자
  const elBody = document.querySelector('body');
  const elWrap = elBody.querySelector('#wrap');
  const elViewBox = document.querySelector('#viewBox');



  // 기능 =========================================
  // 기능 함수

  // script 생성 및 삽입하는 함수
  const fnMkScript = data => {
    // .headerScript 요소가 존재한다면 선택 후 삭제(기존 script 문서 삭제)
    const ckScript = document.querySelector('.slideScript');
    if (!!ckScript) {ckScript.remove();}

    // 새로운 기능을 가진 script를 생성 및 삽입
    const mkScript = document.createElement('script');
    mkScript.setAttribute('src', data);
    mkScript.setAttribute('class', 'slideScript');
    elBody.append(mkScript);
  };

  // json data를 불러오는 함수
  const fnFetchJson = data => {
    return new Promise((resolve) => {
      fetch(jsonData)
        .then(response => response.json())
        .then(data => {
          BANNER_DATA = [...data];
          // 이벤트 날짜 기준 순서 뒤집기
          BANNER_DATA.reverse();})
          .then( ()=>{
            resolve();
          })
    })
  }

  // template과 script를 불러오는 함수
  const fnFetchData = data => {
    return new Promise((resolve) => {
      let num = !!data ? 0 : 1; // mobile이면 0, pc면 1
      fetch(setDevice[num].htmlUrl)
        .then(response => response.text())
        .then(data => {elViewBox.innerHTML = data})
        .then(() => { fnMkScript(setDevice[num].scriptUrl)})
        .then( ()=>{
          resolve();
        });
    })
  }

  // 브라우저 너비를 파악 후 해당 data 삽입하는 함수
  const fnCkMedia = (type = mediaMatches.matches) => {
    (async () => {
      await fnFetchJson();
      fnFetchData(type);
    })();
  };

  // 기능 수행
  fnCkMedia(mediaMatches.matches);

  
  // 이벤트 =========================================

  mediaMatches.addEventListener('change', e => {
    fnCkMedia(e.matches);
  });

}