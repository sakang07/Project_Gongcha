// slide_view_box.js

// ==============================================
// 슬라이드 이동
// 1. Mob : #viewBox 영역에서 손가락으로 슬라이딩하면 슬라이드 이동
//  1-1. 오른쪽으로 슬라이딩하면 오른쪽으로 이동
//  1-2. 가장 왼쪽에 있는 슬라이드 삭제
//  1-3. 가장 오른쪽에 있는 슬라이드 생성
//  1-4. 슬라이드 오른쪽으로 이동
//  1-5. 반대쪽 반복
//  1-6. 이동을 마치면 .indi_number 수정

// 2. Pc : .view_btn > a 누르면 슬라이드 이동
//  2-1. .view_btn > .next > a 누르면 오른쪽으로 이동
//  2-2. 가장 왼쪽에 있는 슬라이드 삭제
//  2-3. 가장 오른쪽에 있는 슬라이드 생성
//  2-4. 슬라이드 오른쪽으로 이동
//  2-5. 반대쪽 반복
//  2-6. 이동을 마치면 .indi_circle의 .on 수정

// ==============================================

// data : 꼭 3개 이상 작성!!
const BANNER_DATA = [{
  titleText : 'We serve you <br />all about choco1',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'banner_01.png'
},
{
  titleText : 'We serve you <br />all about choco2',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'drink.png'
},
{
  titleText : 'We serve you <br />all about choco3',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'recipe_img1.jpg'
},
{
  titleText : 'We serve you <br />all about choco4',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'banner_01.png'
}]

// 이벤트 날짜 기준 순서 뒤집기
BANNER_DATA.reverse(); 

// ==============================================

// 변수-------------------------------------
// const elViewBox = document.querySelector('#viewBox');

// pc_view_arrow
const elViewBtn = elViewBox.querySelector('.view_btn');
const elViewBtnNext = elViewBtn.querySelector('.next > a');
const elViewBtnPrev = elViewBtn.querySelector('.prev > a');

// pc_view_indicator
const elViewIndi = elViewBox.querySelector('.view_indicator');
const elIndiCircle = elViewIndi.querySelector('.indi_circle');

// mob_view_indicator
const elIndiNum = elViewIndi.querySelector('.indi_number');
const elIndiNumNow = elIndiNum.querySelector('.now');
const elIndiNumTotal = elIndiNum.querySelector('.total');

// view_content
const elViewCont = elViewBox.querySelector('.view_content');

const sildeLen = BANNER_DATA.length;

// 기능-------------------------------------

// view_content > ul 생성해서 집어넣기
const mkViewContUl = document.createElement('ul');
elViewCont.append(mkViewContUl);
const elViewContUl = elViewCont.querySelector('ul');

// BANNER_DATA의 길이만큼 li.view_content_inner 요소 생성
for (let i = 0; i < sildeLen; i++) {
  const _mkViewContLi = document.createElement('li');
  let _dataSelect = BANNER_DATA[i];

  const _DATA_CODE = `<div class="view_text">
    <dl><dt>${_dataSelect.titleText}</dt><dd>${_dataSelect.contentText}</dd><dd class="btn_small full_wrap"><a href="${_dataSelect.moveUrl}">바로가기</a></dd></dl>
  </div><div class="view_img"></div>`;

  _mkViewContLi.innerHTML = _DATA_CODE;
  elViewContUl.append(_mkViewContLi);
  _mkViewContLi.setAttribute('class', 'view_content_inner');

  // 순번에 맞는 이미지 배경 삽입
  const _imgPath = '../multi/img/'
  const _elViewImg = elViewCont.querySelectorAll('.view_img');
  _elViewImg[i].style.backgroundImage = `url(${_imgPath}${_dataSelect.img})`;
}
// BANNER_DATA의 길이만큼 ul width 설정
elViewContUl.style.width = `calc(100% * ${sildeLen})`;

// BANNER_DATA의 길이만큼 mobile .view_indicator 숫자 변경
elIndiNumTotal.innerText = sildeLen;

// BANNER_DATA의 길이만큼 pc .view_indicator 생성
for (let i = 0; i < sildeLen; i++) {
  let _dataSelect = BANNER_DATA[i];

  const _mkViewIndiLi = document.createElement('li');
  const _DATA_CODE = `<a href="#"><span>${_dataSelect.titleText}</span></a>`;
  _mkViewIndiLi.innerHTML = _DATA_CODE;
  elIndiCircle.append(_mkViewIndiLi);
  const _elIndiCircleLi = elIndiCircle.querySelectorAll('li');
  _elIndiCircleLi[0].classList.add(ckActive);
}

const elIndiCircleLi = elIndiCircle.querySelectorAll('li');
const elIndiCircleLiA = elIndiCircle.querySelectorAll('li > a');


// 함수-------------------------------------

const slideW = 100 / sildeLen;
let i = 0;
let permission = true;

// 다음 슬라이드로 이동하는 함수
fnNextSlide = el => {
  i++;
  el.style.transform = `translateX(-${i * slideW}%)`;
  el.style.transition = 'all 500ms ease';
  console.log(el.style.transform);
};
// 이전 슬라이드로 이동하는 함수
fnPrevSlide = el => {
  i--;
  el.style.transform = `translateX(-${i * slideW}%)`;
  el.style.transition = 'all 500ms ease';
  console.log(el.style.transform);
};

// 다음 인디케이터로 이동하는 함수
fnNextIndiCir = el => {
  el.forEach((_d, _i) => {
    _i === i ? el[_i].classList.add(ckActive) : el[_i].classList.remove(ckActive);
  })
};


// 이벤트-------------------------------------

// pc: 오른쪽 버튼 누르면 오른쪽으로 슬라이드 이동
elViewBtnNext.addEventListener('click', e => {
  e.preventDefault();

  if(permission) {
    permission = false;

    if (i < sildeLen - 1) { 
      fnNextSlide(elViewContUl);
      fnNextIndiCir(elIndiCircleLi);
    } else {
      elViewContUl.style.transform = null;
      i = 0;
      fnNextIndiCir(elIndiCircleLi);
    }
    permission = true;
  }
});

// pc: 왼쪽 버튼 누르면 왼쪽으로 슬라이드 이동
elViewBtnPrev.addEventListener('click', e => {
  e.preventDefault();

  if(permission) {
    permission = false;

    if (0 < i && i < sildeLen) { 
      fnPrevSlide(elViewContUl);
      fnNextIndiCir(elIndiCircleLi);
      console.log('첫번쨰', i);
    } else {
      console.log(i);
      i = sildeLen;
      fnPrevSlide(elViewContUl);
      fnNextIndiCir(elIndiCircleLi);
      console.log('두번쨰', i);
    }
    permission = true;
  }
});

// pc: 인디케이터 누르면 해당 슬라이드 이동
// elIndiCircleLiA.forEach((d, i) => {
//   console.log(d, i);
//   // .on 클래스 모두 제거
//   elIndiCircleLi[i].classList.remove(ckActive);
  
//   d.addEventListener('click', e => {
//     e.preventDefault();
//     e.forEach((_d, _i) => {
//       d.classList.add(ckActive);
//     });


//     });
// });