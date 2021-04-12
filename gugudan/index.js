document.querySelector("#btn").addEventListener("click", () => {
  const input1 = document.querySelector("#input1");
  const input2 = document.querySelector("#input2");

  if(input1.value) {
    if(input2.value){
      document.querySelector("#result").innerText = input1.value * input2.value;
    } else {
      alert("두 번째 값이 유효하지 않습니다.");
      input2.focus();
    }
  } else {
    alert("첫 번째 값이 유효하지 않습니다.");
    input1.focus();
  }
});