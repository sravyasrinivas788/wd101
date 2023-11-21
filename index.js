document.addEventListener("DOMContentLoaded", function () {
    // Load entries from localStorage
    loadTableEntries();

    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var dob = document.getElementById("dob").value;
        var acceptTerms = document.getElementById("acceptTerms").checked;

        // Validate email and age
        if (!isValidEmail(email) || !isValidAge(dob)) {
            alert("Invalid email address or age!");
            return;
        }

        // Add a new row to the table
        var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cells = [name, email, password, dob, acceptTerms];

        for (var i = 0; i < cells.length; i++) {
            var cell = newRow.insertCell(i);
            cell.innerHTML = cells[i];
        }

        // Save entry to localStorage
        saveTableEntry(name, email, password, dob, acceptTerms);

        // Clear the form
        document.getElementById("registrationForm").reset();
    });

    function isValidEmail(email) {
        // Basic email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidAge(dob) {
        // Validate age between 18 and 55
        var birthDate = new Date(dob);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 55;
    }

    function saveTableEntry(name, email, password, dob, acceptTerms) {
        // Save entry to localStorage
        var entry = { name, email, password, dob, acceptTerms };
        var entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }

    function loadTableEntries() {
        // Load entries from localStorage
        var entries = JSON.parse(localStorage.getItem("entries")) || [];
        var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];

        entries.forEach(function(entry) {
            var newRow = table.insertRow(table.rows.length);
            var cells = [entry.name, entry.email, entry.password, entry.dob, entry.acceptTerms];

            for (var i = 0; i < cells.length; i++) {
                var cell = newRow.insertCell(i);
                cell.innerHTML = cells[i];
            }
        });
    }
});


