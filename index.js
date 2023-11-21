let userForm=document.getElementById("myForm")
let retrieveEntries=()=>{
    let data = localStorage.getItem("user-entries"); 
    
    if (data) {
    
    data= JSON.parse(data);
    
    } else {
    
    data = [];}
    
    return data;}
    let userdata=retrieveEntries();
  

function validateForm() {
    // Reset error messages
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("dobError").innerHTML = "";
    document.getElementById("acceptTermsError").innerHTML = "";

    // Validate Name
    let name = document.getElementById("name").value;
    if (name.length < 3) {
        document.getElementById("nameError").innerHTML = "Name must be at least 3 characters";
        return false;
    }

    // Validate Email
    let email = document.getElementById("email").value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerHTML = "Invalid email address";
        return false;
    }

    // Validate Password
    let password = document.getElementById("password").value;
    if (password.length < 6) {
        document.getElementById("passwordError").innerHTML = "Password must be at least 6 characters";
        return false;
    }

    // Validate Date of Birth
    let dob = document.getElementById("dob").value;
    let currentDate = new Date().toISOString().split('T')[0];
    if (!dob) {
        document.getElementById("dobError").innerHTML = "Please enter your date of birth";
        return false;
    } else {
        let dobDate = new Date(dob);
        let age = calculateAge(dobDate);
        if (age < 18 || age > 55) {
            document.getElementById("dobError").innerHTML = "Please enter a valid date of birth between 18 and 55 years";
            return false;
        }
    }
    // Validate Acceptance of Terms
    let acceptTerms = document.getElementById("acceptTerms").checked;
    if (!acceptTerms) {
        document.getElementById("acceptTermsError").innerHTML = "You must accept the terms and conditions";
        return false;
    }

    // If all validations pass, the form will be submitted
    return true;
}
function calculateAge(birthDate) {
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const displayEntries=()=>{
    const data=retrieveEntries();
    const tableEntries = entries.map((entry) => {
    
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>` ; 
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td> `;
        
        const passwordCell= `<td class='border px-4 py-2'>${entry.password}</td>`;
        
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`
        
        const acceptTermsCell =`<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`
        
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
        
        return row;
        
        }).join("\n");
        
        const table = `<table class="table-auto w-full">
        <tr>
        
        <th class="px-4 py-2">Name</th>
        
        <th class="px-4 py-2">Email</th>
        
        <th class="px-4 py-2">Password</th>
        
        <th class="px-4 py-2">dob</th>
        
        <th class="px-4 py-2">accepted terms?</th>
        
        </tr>${tableEntries} </table>`;
        let details=document.getElementById('user-entries');
        details.innerHTML=table;
        }
      
const saveUserForm =(event)=>{

event.preventDefault();
const name= document.getElementById("name").value;
const email =document.getElementById("email").value;

const password= document.getElementById("password").value;

const dob= document.getElementById("dob").value;

const acceptedTermsAndconditions= document.getElementById("acceptTerms").checked;

let dobDate = new Date(dob);
let age = calculateAge(dobDate);
if (age >= 18 && age <= 55) {
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };

userdata.push(entry);

localStorage.setItem("user-entries", JSON.stringify(userEntries));
displayEntries();
}
}

userForm.addEventListener("submit", saveUserForm);

displayEntries();

