// slide_input.js

// 1. slide_data.json을 불러와서 변수에 할당.
// 2. 브라우저 너비에 따라 모바일일 때는 mob_main_slide.html과 slide_function_mob.js를 불러오기
// 3. pc일 때는 pc_main_slide.html과 slide_function_pc.js를 불러오기
// 4. 브라우저 너비가 바뀌면(change) 다시 해당하는 html과 script 불러오기
// * 비동기식 작동 손보기

let BANNER_DATA;

{

  // 변수 =========================================
  // 식별자
  const elBody = document.querySelector('body');
  const elHeadBox = document.querySelector('#headBox');
  const mediaArray = [];

  // data url
  const data = '../data/slide_data.json';
  const dataDevice = [
    {
      type: 'handhelds',
      htmlUrl: './temp/mob_main_slide.html',
      scriptUrl: '../js/src/mob_slide_function.js',
      size: 1023,
    }, {
      type: 'desktop',
      htmlUrl: './temp/pc_main_slide.html',
      scriptUrl: '../js/src/pc_slide_function.js',
  }];



  // 기능 =========================================

  // mediaArray 배열에 device 사이즈별 matchMedia 값을 요소로 할당
  for (let i = 0; i < dataDevice.length; i++ ) {
    let _matchCode;
    if (i === 0) {
      _matchCode = window.matchMedia(`screen and (max-width:${dataDevice[i].size}px)`);
    } else if (i === dataDevice.length - 1) {
      _matchCode = window.matchMedia(`screen and (min-width:${dataDevice[i-1].size + 1}px)`);
    } else {
      _matchCode = window.matchMedia(`screen and (min-width:${dataDevice[i-1].size + 1}px) and (max-width:${dataDevice[i].size}px)`);
    }
    mediaArray.push(_matchCode);
  }


  // 함수 =========================================

  // section 요소 생성 및 삽입하는 함수
  const fnMkEl = value => {
    const mkEl = document.createElement('section');
    mkEl.setAttribute('id', value);
    return mkEl;
  };

  // fetch로 불러와서 viewBox에 삽입하는 함수
  const fnFetchTemp = deviceUrl => {
    const mkViewBox = fnMkEl('viewBox');

    // 이미 #viewBox가 있으면 삭제
    const _elViewBox = document.querySelector('#viewBox');
    if(!!_elViewBox) { _elViewBox.remove() }

    fetch(deviceUrl)
      .then(response => response.text())
      .then(data => mkViewBox.innerHTML = data)
      .then(elHeadBox.after(mkViewBox));
  };

  // script를 Body 내부의 끝에 넣어주는 함수
  const fnScript = data => {    
    // 이미 script가 있으면 삭제
    const _elScript = document.querySelector('.viewBoxScript');
    if(!!_elScript) { _elScript.remove() }

    const mkScript = document.createElement('script');
    mkScript.src = data;
    mkScript.setAttribute('class', 'viewBoxScript');
    elBody.append(mkScript);
  }

  // 어떤 디바이스인지에 따라 해당 코드를 수행하는 함수
  const fnCkDevice = (device, index) => {
    // 브라우저 너비가 해당 디바이스면
    if (device.matches) {
      let _type = dataDevice[index].type; // type에 해당 디바이스 이름 할당
      // console.log(_type);
      if (_type === 'handhelds') {
        // 모바일일 때 수행할 코드
        fnFetchTemp(dataDevice[0].htmlUrl);
        fnScript(dataDevice[0].scriptUrl);
      } else {
        // pc일 때 수행할 코드
        fnFetchTemp(dataDevice[1].htmlUrl);
        fnScript(dataDevice[1].scriptUrl);
      }
    }
  }

  // slide_data.json을 가져오기
  const fnFetchJson = () => {
    fetch(data)
    .then(response => response.json())
    .then(data => {
      BANNER_DATA = [...data];
      
      // 이벤트 날짜 기준 순서 뒤집기
      return BANNER_DATA.reverse(); 
    });
  };

  // mediaArray 배열의 요소들을 순환하며 수행
  mediaArray.forEach((type, index) => {
    fnFetchJson(console.log);
    fnCkDevice(type, index);
  });


  
  // 이벤트 =========================================

  mediaArray.forEach((type, index) => {
    // 브라우저가 다른 값으로 바뀌었을 때
    type.addEventListener('change', (e) => {
      fnCkDevice(type, index);
    });
  });


}