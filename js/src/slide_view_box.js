"use strict";

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.array.concat.js");

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
// data
var BANNER_DATA = [{
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}, {
  titleText: 'We serve you <br />all about choco',
  contentText: '공차가 선물하는 달콤한 충전<br />초코 신메뉴 마시면 공차 스탬프 3배 적립!',
  url: '#',
  img: 'banner_01.png'
}]; // 이벤트 날짜 기준 순서 뒤집기

BANNER_DATA.reverse(); // ==============================================
// 변수-------------------------------------

var elViewBox = document.querySelector('#viewBox'); // pc_view_arrow

var elViewBtn = elViewBox.querySelector('.view_btn');
var elViewBtnNext = elViewBtn.querySelector('.next > a');
var elViewBtnPrev = elViewBtn.querySelector('.prev > a'); // pc_view_indicator

var elViewIndi = elViewBox.querySelector('.view_indicator');
var elIndiCircle = elViewIndi.querySelector('.indi_circle');
var elIndiCircleLi = elIndiCircle.querySelectorAll('li'); // mob_view_indicator

var elIndiNum = elViewIndi.querySelector('.indi_number');
var elIndiNumNow = elIndiNum.querySelector('.now');
var elIndiNumTotal = elIndiNum.querySelector('.total'); // view_content

var elViewCont = elViewBox.querySelector('.view_content'); // 기능-------------------------------------
// view_content > ul 생성해서 집어넣기

var mkViewContUl = document.createElement('ul');
elViewCont.append(mkViewContUl);
var elViewContUL = elViewCont.querySelector('ul');
console.log(elViewContUL); // BANNER_DATA의 길이만큼 li.view_content_inner 요소 생성

for (var i = 0; i < BANNER_DATA.length; i++) {
  var _mkViewContLi = document.createElement('li');

  var _dataSelect = BANNER_DATA[i];
  var DATA_CODE = "<dl class=\"view_text\"><dt>".concat(_dataSelect.titleText, "</dt><dd>").concat(c_dataSelect.ontentText, "</dd><dd class=\"btn_small full_wrap\"><a href=\"").concat(_dataSelect.moveUrl, "\">\uBC14\uB85C\uAC00\uAE30</a></dd></dl><div class=\"view_img\"></div>");
  _mkViewContLi.innerHTML = DATA_CODE;

  _mkViewContLi.setAttribute('class', 'view_content_inner');

  elViewContUL.append('_mkViewContLi');
} // 함수-------------------------------------
// 이벤트-------------------------------------