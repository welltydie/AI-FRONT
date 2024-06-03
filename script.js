document.addEventListener('DOMContentLoaded', init);

function init() {
  const inputText = document.getElementById('inputText');
  const sendMessageButton = document.getElementById('sendMessage');
  sendMessageButton.addEventListener('click', () => {
    const userMessage = inputText.value.trim();
    if (userMessage === '') {
      return;
    }
    // 팝업 창 표시
    Swal.fire({
      title: "번역중..",
      html: "잠시 기다려 주세요...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'custom-popup-class'
      }
    });
    getCode(userMessage)
  });
};

async function getCode(questCode) {
  const Url = `https://port-0-ai-back-1272llwz197xc.sel5.cloudtype.app/generate`;
  const Data = JSON.stringify({ userInput: questCode });   
  let response; 
    try {
      response = await fetch(Url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: Data
      });
      if (!response.ok) throw new Error('Network response was not ok.'); 
    } catch (error) { 
        Swal.fire({
          title: '에러',
          text: '분석 중 에러가 발생했습니다!',
          icon: 'error',
          confirmButtonText: '닫기'
        });
        return;  
    } 

  try {
    Swal.close();
    const data = await response.json();
    let code = data.text;
    let content = code.replace(/\*\*/g, '✨');
    content = content.replace(/\n/g, '<br>');; 
    Swal.fire({
      title: '번역결과',
      html: '<div style="text-align: left;">' + content + '</div>',  
    });
  } catch (error) {
    console.error('Error:', error); 
    Swal.fire({
      title: '에러',
      text: '분석 중 에러가 발생했습니다!',
      icon: 'error',
      confirmButtonText: '닫기'
    });
  }
}
