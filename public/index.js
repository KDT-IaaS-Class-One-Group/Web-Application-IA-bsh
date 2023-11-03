function submitButtont() {
  const submit = document.getElementById('text').value;

const url = "http://localhost:3000/api";

  fetch(url,{
    method : "GET",
    headers : {
      'Content=Type':'application/json'
    }
  })
  .then((response)=> response.json())
  .then((data) => 
    console.log(data))
    .catch((error) => {
    console.error("API 호출 중 오류 발생", error);
  });
}
