document.addEventListener('DOMContentLoaded',function(e){

    const btn = document.getElementById('submit-button');
    const fields = document.querySelectorAll("input");
    const loan_field = document.getElementById('loan');
    loan_field.focus()


    btn.addEventListener('click',(e)=>{
    var loan = document.getElementById('loan');
    var interest = document.getElementById('interest-rate');
    var months = document.getElementById('months');
    
    const results = document.querySelectorAll(".results");
    
    var loan_text = loan.value;
    var interest_text = interest.value;
    var months_text = months.value;
    
    
    if(loan_text === ""  || interest_text === ""  || months_text === ""  ){
        if(loan_text === ""){
            loan.classList.add('border-danger');
            loan.placeholder = "type somrthing"
        }
        if(interest_text === ""){
            interest.classList.add('border-danger');
            interest.placeholder = "type somrthing"
        }
        if(months_text === ""){
            months.classList.add('border-danger');
            months.placeholder = "type somrthing"
        }
        
    }
    
    else{
        
        var loan = parseInt(loan_text)
        var interest = parseInt(interest_text) / 100
        var months = parseInt(months_text)
        
        var interestInDollar = (loan * interest)
        var total = interestInDollar + loan
        var onemonth = total / months
        
        
        results.forEach((result , index) => {
            var classes = result.classList;
            classes.remove('d-none');
            
            switch(index){
                case 0:
                    result.innerHTML = "Loan With Interest <br>"
                    result.innerHTML += total + " $"
                    break;

                case 1:
                    result.innerHTML = "Monthly Deposit <br>"
                    result.innerHTML += onemonth + " $"
                    break;

                case 2:
                    result.innerHTML = "Interest In Dollar <br>"
                    result.innerHTML += interestInDollar + " $"
                    break;
            }
        });

    }



    
})


fields.forEach((field,index)=>{
    field.addEventListener("keypress",(e)=>{


        if(e.key === "Enter"){
            e.preventDefault()
            switch(index){
                case 0:
                    document.getElementById('interest-rate').focus()
                    break;
                case 1:
                    document.getElementById('months').focus()
                    break;
                case 2:
                    btn.click()
                    document.getElementById('loan').focus()
                    break;
            }
        }

    })
})



























})