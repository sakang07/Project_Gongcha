// slide_view_box.js

// ==============================================
// 1. data 불러오기
// 2. 불러온 data의 길이만큼 슬라이드와 인디케이터 생성
// 3-1. 슬라이드 좌우 버튼 동작
// 3-2. 슬라이드 좌우 버튼에 따른 인디케이터 동작
// 4. 인디케이터 클릭하면 해당 슬라이드로 이동
// ==============================================

{

// data : 꼭 3개 이상 작성!!
const BANNER_DATA = [{
  titleText : 'We serve you <br />all about choco',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'banner_01.png'
},
{
  titleText : 'We serve you <br />all about choco',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'drink.png'
},
{
  titleText : 'We serve you <br />all about choco',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'recipe_img1.jpg'
},
{
  titleText : 'We serve you <br />all about choco',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'banner_01.png'
},
{
  titleText : 'We serve you <br />all about choco',
  contentText : '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url : '#',
  img : 'banner_01.png'
}]

// 이벤트 날짜 기준 순서 뒤집기
BANNER_DATA.reverse(); 

// ==============================================

// 변수-------------------------------------
const elViewBox = document.querySelector('#viewBox');

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

// data의 길이만큼 li.view_content_inner 요소 생성
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
// data의 길이만큼 ul width 설정
elViewContUl.style.width = `calc(100% * ${sildeLen})`;

// data의 길이만큼 mobile .view_indicator 숫자 변경
elIndiNumTotal.innerText = sildeLen;

// data의 길이만큼 pc .view_indicator 생성
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
let ckIdx = 0;
let permission = true;

// 해당 슬라이드로 이동하는 함수
fnMoveSlide = (el, idx) => {
  el.style.transform = `translateX(-${idx * slideW}%)`;
  el.style.transition = 'all 500ms ease';
};

// 다음 인디케이터로 이동하는 함수
fnNextIndiCir = (el, idx) => {
  el.forEach((d, i) => {
    i === idx ? el[i].classList.add(ckActive) : el[i].classList.remove(ckActive);
  })
};

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


// 이벤트-------------------------------------

// pc: 오른쪽 버튼 누르면 오른쪽으로 슬라이드 이동
elViewBtnNext.addEventListener('click', e => {
  e.preventDefault();

  if(permission) {
    permission = false;

    if (ckIdx < sildeLen - 1) { 
      ckIdx++;
      fnMoveSlide(elViewContUl, ckIdx);
      fnNextIndiCir(elIndiCircleLi, ckIdx);
    } else {
      elViewContUl.style.transform = null;
      ckIdx = 0;
      fnNextIndiCir(elIndiCircleLi, ckIdx);
    }
    permission = true;
  }
});

// pc: 왼쪽 버튼 누르면 왼쪽으로 슬라이드 이동
elViewBtnPrev.addEventListener('click', e => {
  e.preventDefault();

  if(permission) {
    permission = false;

    if (0 < ckIdx && ckIdx <= sildeLen - 1) { 
      ckIdx--;
      fnMoveSlide(elViewContUl, ckIdx);
      fnNextIndiCir(elIndiCircleLi, ckIdx);
    } else {
      ckIdx = sildeLen - 1;
      fnMoveSlide(elViewContUl, ckIdx);
      fnNextIndiCir(elIndiCircleLi, ckIdx);
    }
    permission = true;
  }
});

// pc: 인디케이터 누르면 해당 슬라이드 이동
elIndiCircleLiA.forEach((d, i) => {
  d.addEventListener('click', e => {
    e.preventDefault();
    // 클릭한 요소의 순서 파악
    const ckIdx = i;
    
    // .on 포함한 클래스 파악
    const ckContains = d.parentNode.classList.contains(ckActive);

    // 전체 요소 중에 누른 요소를 제외한 요소에 .on 제거
    fnSiblings(elIndiCircleLi).forEach(d => {
      d.classList.remove(ckActive);
    })

    // 클릭한 요소에 .on이 없으면 추가
    if(!ckContains){
      d.parentNode.classList.add(ckActive);
    }

    // 클릭한 요소의 순번으로 슬라이드 이동
    fnMoveSlide(elViewContUl, ckIdx);
  });
});

}