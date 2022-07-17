// import "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

document.addEventListener("DOMContentLoaded", (e) => {
  var name = document.getElementById("name-field");
  var subject = document.getElementById("subject-field");
  var email = document.getElementById("email-field");
  var message = document.getElementById("message-field");
  var submit = document.getElementById("submit-btn");




  function callEmailAPI(name, subject, email, message) {
    const options = {
      method: "POST",
      headers: {
        "mode":"cors",
        "content-type": "application/json",
        "X-RapidAPI-Key": "9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9",
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      body:
        '{"personalizations":[{"to":[{"email":"Kingahmed19991@gmail.com"}],"subject":"'+ subject +'"}],"from":{"email":"' +
        email +
        '"},"content":[{"type":"text/plain","value":"' +
        name +
        " " +
        message +
        '"}]}',
    };

    fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  submit.addEventListener("click", (e) => {
    if
    (name.value === "" || subject.value === ""
    || email.value === "" || message.value === "")
    {
      name.style.outline = "1px solid red"
      subject.style.outline = "1px solid red"
      email.style.outline = "1px solid red"
      message.style.outline = "1px solid red"
      alert('Please fill out all fields!')
    }
    else{
      callEmailAPI(name.value,subject.value,email.value,message.value)
      name.value = ''
      subject.value = ''
      email.value = ''
      message.innerHTML = ''
      alert('Message Sent!')
    }

  });
});
