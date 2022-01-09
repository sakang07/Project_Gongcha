// pc_header.js
// 220109 수정

// ==============================================
// unb searchBtn 클릭하면 searchArea 출력
// 1. 클릭시 .unb에 클래스 .on 추가
// 2. 영역 바깥(.modal_bg) 클릭시 .on 제거
// ==============================================
// 일부 페이지에서 headBox transparent 구현
// 1. #headBox에 마우스 올리면 .transparent 제거
// 2. #headBox에서 마우스 내리면 .transparent 삽입
// 3. .unb에 .on이 추가되어 있는 동안은 #headBox에서 .transparent 제거
// 4. .unb에 .on이 없으면 #headBox에 .transparent 삽입
// ==============================================


{

  // 변수
  const navPc = document.querySelector('.nav_pc');
  const elUnb = navPc.querySelector('.unb');
  const elUnbSearchA = elUnb.querySelector('.search > a');
  const elModalBg = elUnb.querySelector('.modal_bg');
  const elPcGnbWrap = navPc.querySelector('.gnb_wrap');

  const elHeadBox = document.querySelector('#headBox');

  const [CK_ON, CK_TRSP] = ['on', 'transparent']; // 활성화 클래스
  let ckTrsp;
  let ckSearch = true;
  
  // 함수
  // .unb가 .on을 포함하고 있으면 true 반환하는 함수
  const fnCkOn = () => {
    const ckOn = elUnb.classList.contains(CK_ON);
    return ckOn;
  }

  // #headBox가 .transparent를 포함하고 있으면 true 반환하는 함수
  const fnCkTrsp = () => {
    const ckTrsp = elHeadBox.classList.contains(CK_TRSP);
    return ckTrsp;
  }


  // 이벤트
  // 서치버튼 클릭시 .unb에 .on 추가
  elUnbSearchA.addEventListener('click', e => {
    e.preventDefault();
    // .on이 없으면 추가, 있으면 제거
    !fnCkOn() ? elUnb.classList.add(CK_ON) : elUnb.classList.remove(CK_ON);
    ckSearch = false;
    console.log('ckSearch', ckSearch);
  });

  // 외부 영역(.modal_bg) 클릭시 .unb에 .on 제거
  elModalBg.addEventListener('click', () => {
    if (fnCkOn()) elUnb.classList.remove(CK_ON);
    if (ckTrsp) {
      elHeadBox.classList.add(CK_TRSP);
      ckSearch = true;
    }
  });

  // 외부 영역(.gnb_wrap) 마우스 오버시 .unb에 .on 제거
  elPcGnbWrap.addEventListener('mouseenter', () => {
    if (fnCkOn()) elUnb.classList.remove(CK_ON);
    ckSearch = true;

  });


  // 헤더가 투명할 때
  if(fnCkTrsp()) {
    // #headBox에 마우스 들어오면 .transparent 제거(불투명하게)
    elHeadBox.addEventListener('mouseenter', () => {
      elHeadBox.classList.remove(CK_TRSP);
      ckTrsp = true;
    })
  }
    
  // #headBox에서 마우스 나가면 다시 투명하게
  elHeadBox.addEventListener('mouseleave', () => {
  if (ckTrsp && ckSearch) {
      elHeadBox.classList.add(CK_TRSP);
      ckTrsp = false;
      console.log(ckTrsp && ckSearch, ckSearch, 'ckTrsp && ckSearch');
    } 
  })


}