const boxButton = document.getElementById("box");
const leftBox = document.getElementById("leftBox");
const rightBox = document.getElementById("rightBox");
let isLeftBoxVisible = true;

boxButton.addEventListener("click", () => {
  if (isLeftBoxVisible) {
    leftBox.style.transform = "translateX(-50%)"; // leftBox를 왼쪽으로 이동하여 숨김
    rightBox.style.transform = "translateX(-5%)"; // rightBox를 왼쪽으로 이동
  } else {
    leftBox.style.transform = "translateX(0)"; // leftBox를 오른쪽으로 이동하여 보임
    rightBox.style.transform = "translateX(0)"; // rightBox를 원래 위치로 이동
  }

  isLeftBoxVisible = !isLeftBoxVisible; // leftBox의 표시 여부를 토글
});
