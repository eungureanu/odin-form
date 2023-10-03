const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password1 = document.getElementById("password");
const password2 = document.getElementById("confirm_password");
const consent = document.getElementById("accept_terms");
const btn = document.getElementById("button");

//Show error message
function showError(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

//Show success message
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

//Check Email is valid
function checkEmail(input){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(regex.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, "E-Mail address is not valid");
    }
}

//Check Phone is valid
function checkPhone(input){
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if(regex.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, "Phone number is not valid");
    }
}

//Check Password strength
function checkPasswordStrength(input){
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if(regex.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.");
    }
}

//Check that passwords match
function checkPasswordMatch(input1, input2) {
    if(input1.value!==input2.value){
        showError(input2, "Passwords do not match");
    }
}

//Check if user has given consent
function checkConsent(input){
    if(!input.checked){
        showError(input, "You must accept the terms before you can continue.")
    }
}

//Get field name
function getFieldName(input){
    const label = document.querySelector(`label[for="${input.id}"]`);
    return label.innerText;
}

//Event listeners
btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkRequired([firstName, lastName, email, phone, password1, password2]);
    checkEmail(email);
    checkPhone(phone);
    checkPasswordStrength(password1);
    checkPasswordMatch(password1, password2);
    // checkConsent(consent);
})