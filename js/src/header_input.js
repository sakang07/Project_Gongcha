// header_input.js

// 1. 브라우저 너비 파악
// 2. 너비에 따라 모바일/PC template 삽입(innerText) 후 모바일/PC 스크립트 삽입. 이미 삽입했으면 기존 것 삭제
// 3. 브라우저 너비가 바뀌면(change) 다시 해당하는 template과 script 불러오기

{

  // 변수 ------------------------------------------
  // data url
  const setDevice = [
    {
      type: 'mobile',
      htmlUrl: './temp/mob_header.html',
      scriptUrl: '../js/src/drop_navigation.js',
      size: 1023,
    }, {
      type: 'pc',
      htmlUrl: './temp/pc_header.html',
      scriptUrl: '../js/src/open_unb_search.js'
    }
  ];
  const mediaSize = `screen and (max-width:${setDevice[0].size}px)`; // mobile 환경
  const mediaMatches = window.matchMedia(mediaSize); // mobile일 때 .matches 값 true

  // 선택자
  const elBody = document.querySelector('body');
  const elWrap = elBody.querySelector('#wrap');
  const elHeadBox = elWrap.querySelector('#headBox');


  // 기능 ------------------------------------------
  // 기능 함수

  // script 생성 및 삽입하는 함수
  const fnMkScript = data => {
    // .headerScript 요소가 존재한다면 선택 후 삭제(기존 script 문서 삭제)
    const ckScript = document.querySelector('.headerScript');
    if (!!ckScript) {ckScript.remove();}
    // 새로운 기능을 가진 script를 생성 및 삽입
    const mkScript = document.createElement('script');
    mkScript.setAttribute('src', data);
    mkScript.setAttribute('class', 'headerScript');
    elBody.append(mkScript);
  };

  // 브라우저 너비를 파악 후 해당 data 삽입하는 함수
  const fnCkMedia = (type = mediaMatches.matches) => {
    let num = type ? 0 : 1; // mobile이면 0, pc면 1
    // data 불러오기
    fetch(setDevice[num].htmlUrl)
      .then(response => response.text())
      .then(data => {elHeadBox.innerHTML = data})
      .then(() => { fnMkScript(setDevice[num].scriptUrl)});
  };

  // 기능 수행
  fnCkMedia(mediaMatches.matches);


  // 이벤트 ------------------------------------------
  mediaMatches.addEventListener('change', e => {
    fnCkMedia(e.matches);
  });

}