// header_input.js
// header 불러오기

(() => {
// ------------------------------------------------------------
// 변수
const mobHeadCode = './temp/mob_header.html';
const mobAddCode = '../js/src/drop_navigation.js';
const pcHeadCode = './temp/pc_header.html';
const pcAddCode = '../js/src/open_unb_search.js';

const elBody = document.querySelector('body');
const elWrap = elBody.querySelector('#wrap');

// header 생성 및 삽입
const mkHeadBox = document.createElement('header');
mkHeadBox.id = 'headBox';
mkHeadBox.innerHTML = '<div class="container"><h1><a href="../index.html"><span>Gongcha</span></a></h1></div>';
elWrap.prepend(mkHeadBox);

const elHeadBox = document.querySelector('#headBox');
const elContainer = elHeadBox.querySelector('.container');

const MOB_CLASSNAME = 'nav_mob';
const PC_CLASSNAME = 'nav_pc';
const DEV = ['mob', 'pc'];
let firstDev;

// nav 요소 생성 및 삽입
const fnMkEl = value => {
  const mkEl = document.createElement('nav');
  mkEl.setAttribute('class', value);
  return mkEl;
};

// script 요소 생성 및 삽입
const fnMkScript = url => {
  const mkEl = document.createElement('script');
  mkEl.setAttribute('src', url);
  elBody.append(mkEl);
};

// 모바일 html 불러오는 함수
const fnMob = () => {
  // 감싸는 .nav_mob 생성하고 코드 삽입
  const mkNavMob = fnMkEl(MOB_CLASSNAME);
  // fetch로 외부 data 불러와서 삽입
  fetch(mobHeadCode)
    .then(response => response.text())
    .then(data => mkNavMob.innerHTML = data)
    .then(elContainer.append(mkNavMob))
    .then(fnMkScript(mobAddCode));
};

// pc html 불러오는 함수
const fnPc = () => {
  // 감싸는 .nav_pc 생성하고 코드 삽입
  const mkNavPc = fnMkEl(PC_CLASSNAME);
  // fetch로 외부 data 불러와서 삽입
  fetch(pcHeadCode)
    .then(response => response.text())
    .then(data => mkNavPc.innerHTML = data)
    .then(elContainer.append(mkNavPc))
    .then(fnMkScript(pcAddCode));
};

// 기본 수행
// 처음 실행된 브라우저 너비가 1024보다 작으면 .nav_mob 추가, 크면 .nav_pc 추가
const ckWidth = window.matchMedia("all and (max-width: 1023px)").matches;
firstDev = ckWidth ? DEV[0] : DEV[1]; // 최초 브라우저 너비
ckWidth ? fnMob() : fnPc();

// 이벤트
// resize 되면 수행
window.addEventListener('resize', () => {
  const _ckWidth = window.matchMedia("all and (max-width: 1023px)").matches;
  afterDev = _ckWidth ? DEV[0] : DEV[1]; // 현재 브라우저 너비
  // 최초 브라우저 너비와 현재 리사이즈 너비가 다르면
  if (firstDev !== afterDev) {
    if(firstDev === 'mob'){
      // 최초 브라우저 너비가 모바일일 때 .nav_mob 삭제 후 .nav_pc 추가
      const elNavMob = elHeadBox.getElementsByClassName(MOB_CLASSNAME)[0];
      elNavMob.remove();
      fnPc(); 
    } else {
      // 최초 브라우저 너비가 PC일 때 .nav_pc 삭제 후 .nav_mob 추가
      const elNavPc = elHeadBox.getElementsByClassName(PC_CLASSNAME)[0];
      elNavPc.remove();
      fnMob();
    }
    firstDev = afterDev;
  }
});

// ------------------------------------------------------------
})();