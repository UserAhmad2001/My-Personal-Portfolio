// import "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

document.addEventListener("DOMContentLoaded", (e) => {
  var name = document.getElementById("name-field");
  var company = document.getElementById("company-field");
  var email = document.getElementById("email-field");
  var message = document.getElementById("message-field");
  var submit = document.getElementById("submit-btn");

  function callAPI(name, company, email, message) {
    const options = {
      method: "POST",
      headers: {
        "mode":"cors",
        "content-type": "application/json",
        "X-RapidAPI-Key": "9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9",
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      body:
        '{"personalizations":[{"to":[{"email":"Kingahmed19991@gmail.com"}],"subject":"Job Inquiry"}],"from":{"email":"' +
        email +
        '"},"content":[{"type":"text/plain","value":"' +
        name +
        " " +
        company +
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
    (name.value === "" || company.value === ""
    || email.value === "" || message.value === "")
    {
      alert('Please fill out all fields!')
    }
    else{
      callAPI(name.value,company.value,email.value,message.value)
      console.log(name.value,company.value,email.value,message.value);
    }

  });
});
