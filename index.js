document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reg');
    const tableBody = document.querySelector('#dataTable tbody');

    
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.forEach(entry => appendRow(entry));

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dobInput = document.getElementById('dob');
        const acceptedTerms = document.getElementById('accept').checked;

       
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        if (age < 18 || age > 55) {
            alert('Please enter a valid date of birth between the ages of 18 and 55.');
            return;
        }

        
       const newEntry={ 
            name,
            email,
            password,
            dob: dobInput.value,
            acceptedTerms,
        };
        saveEntryToLocalStorage(newEntry);

        
        appendRow(newEntry);
        
        

        
        appendRow({
            name,
            email,
            password,
            dob: dobInput.value,
            acceptedTerms: acceptedTerms ? 'Yes' : 'No',
        });

        
        form.reset();
    });

    function appendRow(entry) {
        const newRow = tableBody.insertRow();
        for (const key in entry) {
            const cell = newRow.insertCell();
            cell.textContent = entry[key];
        }
    }

    function saveEntryToLocalStorage(entry) {
        const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        savedEntries.push(entry);
        localStorage.setItem('entries', JSON.stringify(savedEntries));
    }

    function isValidEmail(email) {
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
