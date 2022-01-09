// title_transparent.js
// 220110 수정

// mobile headBox, titleBox transparent 구현
// 1. headBox, titleBox에 마우스 올리면 .transparent 제거
// 2. headBox, titleBox에서 마우스 내리면 .transparent 삽입
// * pc transparent 기능은 pc_header.js에 포함

{

  // 변수

  const elHeadBox = document.querySelector('#headBox');
  const elTitleBox = document.querySelector('#titleBox');
  const elTransHeader = [elHeadBox, elTitleBox];

  const [CK_ON, CK_TRSP] = ['on', 'transparent']; // 활성화 클래스
  let ckTrsp; // header transparent 체크



  // 함수
  // #headBox가 .transparent를 포함하고 있으면 true 반환하는 함수
  const fnCkTrsp = () => {
    const ckTrsp = elHeadBox.classList.contains(CK_TRSP);
    return ckTrsp;
  }



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
    if (ckTrsp) {
        elHeadBox.classList.add(CK_TRSP);
        ckTrsp = false;
      }
    })
  })


}