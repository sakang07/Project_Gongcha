// mob_title.js
// 220110 수정

// * mobile headBox, titleBox transparent 구현
// 1. headBox, titleBox에 마우스 올리면 .transparent 제거
// 2. headBox, titleBox에서 마우스 내리면 .transparent 삽입
// * pc transparent 기능은 pc_header.js에 포함

// * #titleBox 클릭하면 서브메뉴 드롭다운

{

  // 변수

  const elHeadBox = document.querySelector('#headBox');
  const elTitleBox = document.querySelector('#titleBox');
  const elTransHeader = [elHeadBox, elTitleBox];

  const elTitleList = elTitleBox.querySelector('.title_list');
  const elTitleH2 = elTitleBox.querySelector('h2');

  const [CK_ON, CK_TRSP] = ['on', 'transparent']; // 활성화 클래스
  let ckTrsp; // header transparent 체크
  let ckSearch = true;



  // 함수
  // #headBox가 .transparent를 포함하고 있으면 true 반환하는 함수
  const fnCkTrsp = () => elHeadBox.classList.contains(CK_TRSP);

  // .title_list가 .on을 포함하면 true 반환 함수
  const fnCkOn = () => elTitleList.classList.contains(CK_ON);


  // 이벤트

  // 헤더가 투명할 때
  if(fnCkTrsp()) {
    // #headBox에 마우스 들어오면 .transparent 제거(불투명하게)
    elTransHeader.forEach(d => {
      d.addEventListener('mouseenter', () => {
        elHeadBox.classList.remove(CK_TRSP);
        ckTrsp = true;
      })
    })
  }
    
  // #headBox에서 마우스 나가면 다시 투명하게
  elTransHeader.forEach(d => {
    d.addEventListener('mouseleave', () => {
      if (ckTrsp && ckSearch) {
        elHeadBox.classList.add(CK_TRSP);
        ckTrsp = false;
        // 서브메뉴 켜져 있으면 끄기
        if (fnCkOn()) elTitleList.classList.remove(CK_ON);
      } 
    })
  })

  // #titleBox 클릭하면 서브메뉴 드롭다운
  elTitleH2.addEventListener('click', () => {
    !fnCkOn() ? elTitleList.classList.add(CK_ON) : elTitleList.classList.remove(CK_ON);
  })

}