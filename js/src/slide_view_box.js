"use strict";

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

// slide_view_box.js
// ==============================================
// 시나리오... 정리...
// ==============================================
// data : 꼭 3개 이상 작성!!
var BANNER_DATA = [{
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'drink.png'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'recipe_img1.jpg'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}]; // 이벤트 날짜 기준 순서 뒤집기

BANNER_DATA.reverse(); // ==============================================
// 변수-------------------------------------
// const elViewBox = document.querySelector('#viewBox');
// pc_view_arrow

var elViewBtn = elViewBox.querySelector('.view_btn');
var elViewBtnNext = elViewBtn.querySelector('.next > a');
var elViewBtnPrev = elViewBtn.querySelector('.prev > a'); // pc_view_indicator

var elViewIndi = elViewBox.querySelector('.view_indicator');
var elIndiCircle = elViewIndi.querySelector('.indi_circle'); // mob_view_indicator

var elIndiNum = elViewIndi.querySelector('.indi_number');
var elIndiNumNow = elIndiNum.querySelector('.now');
var elIndiNumTotal = elIndiNum.querySelector('.total'); // view_content

var elViewCont = elViewBox.querySelector('.view_content');
var sildeLen = BANNER_DATA.length; // 기능-------------------------------------
// view_content > ul 생성해서 집어넣기

var mkViewContUl = document.createElement('ul');
elViewCont.append(mkViewContUl);
var elViewContUl = elViewCont.querySelector('ul'); // BANNER_DATA의 길이만큼 li.view_content_inner 요소 생성

for (var _i2 = 0; _i2 < sildeLen; _i2++) {
  var _mkViewContLi = document.createElement('li');

  var _dataSelect = BANNER_DATA[_i2];

  var _DATA_CODE = "<div class=\"view_text\">\n    <dl><dt>".concat(_dataSelect.titleText, "</dt><dd>").concat(_dataSelect.contentText, "</dd><dd class=\"btn_small full_wrap\"><a href=\"").concat(_dataSelect.moveUrl, "\">\uBC14\uB85C\uAC00\uAE30</a></dd></dl>\n  </div><div class=\"view_img\"></div>");

  _mkViewContLi.innerHTML = _DATA_CODE;
  elViewContUl.append(_mkViewContLi);

  _mkViewContLi.setAttribute('class', 'view_content_inner'); // 순번에 맞는 이미지 배경 삽입


  var _imgPath = '../multi/img/';

  var _elViewImg = elViewCont.querySelectorAll('.view_img');

  _elViewImg[_i2].style.backgroundImage = "url(".concat(_imgPath).concat(_dataSelect.img, ")");
} // BANNER_DATA의 길이만큼 ul width 설정


elViewContUl.style.width = "calc(100% * ".concat(sildeLen, ")"); // BANNER_DATA의 길이만큼 mobile .view_indicator 숫자 변경

elIndiNumTotal.innerText = sildeLen; // BANNER_DATA의 길이만큼 pc .view_indicator 생성

for (var _i3 = 0; _i3 < sildeLen; _i3++) {
  var _dataSelect2 = BANNER_DATA[_i3];

  var _mkViewIndiLi = document.createElement('li');

  var _DATA_CODE2 = "<a href=\"#\"><span>".concat(_dataSelect2.titleText, "</span></a>");

  _mkViewIndiLi.innerHTML = _DATA_CODE2;
  elIndiCircle.append(_mkViewIndiLi);

  var _elIndiCircleLi = elIndiCircle.querySelectorAll('li');

  _elIndiCircleLi[0].classList.add(ckActive);
}

var elIndiCircleLi = elIndiCircle.querySelectorAll('li');
var elIndiCircleLiA = elIndiCircle.querySelectorAll('li > a'); // 함수-------------------------------------

var slideW = 100 / sildeLen;
var i = 0;
var permission = true; // 다음 슬라이드로 이동하는 함수

fnNextSlide = function fnNextSlide(el) {
  i++;
  el.style.transform = "translateX(-".concat(i * slideW, "%)");
  el.style.transition = 'all 500ms ease';
}; // 이전 슬라이드로 이동하는 함수


fnPrevSlide = function fnPrevSlide(el) {
  i--;
  el.style.transform = "translateX(-".concat(i * slideW, "%)");
  el.style.transition = 'all 500ms ease';
}; // 다음 인디케이터로 이동하는 함수


fnNextIndiCir = function fnNextIndiCir(el) {
  el.forEach(function (_d, _i) {
    _i === i ? el[_i].classList.add(ckActive) : el[_i].classList.remove(ckActive);
  });
}; // 이벤트-------------------------------------
// pc: 오른쪽 버튼 누르면 오른쪽으로 슬라이드 이동


elViewBtnNext.addEventListener('click', function (e) {
  e.preventDefault();

  if (permission) {
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
}); // pc: 왼쪽 버튼 누르면 왼쪽으로 슬라이드 이동

elViewBtnPrev.addEventListener('click', function (e) {
  e.preventDefault();

  if (permission) {
    permission = false;

    if (0 < i && i < sildeLen) {
      fnPrevSlide(elViewContUl);
      fnNextIndiCir(elIndiCircleLi);
    } else {
      console.log(i);
      i = sildeLen;
      fnPrevSlide(elViewContUl);
      fnNextIndiCir(elIndiCircleLi);
    }

    permission = true;
  }
}); // pc: 인디케이터 누르면 해당 슬라이드 이동
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