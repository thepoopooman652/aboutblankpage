// Script file for the login functionality

// Function to get a hash for a string, passed into the function with the string varible
function stringToHash(string) {
    let hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    };
    return hash;
};

// Function to check the hash of the users input against the hash for the correct login
function checkLogin() {
    // Define the correct login and a varible to check what the users input is
    var loginCorrectHash = "1087325586";
    var loginUserInput = document.getElementById("login").value;
    var userInputHash = stringToHash(loginUserInput);
    console.log("Users input is " + loginUserInput);
    console.log("Hash of users input is " + userInputHash);
    // Compare the correct value to the users input using an IF statement
    if (userInputHash == loginCorrectHash) {
        // Set a storage value to allow the user to access home.html
        var value = "visited"; // or the date of visit!
        localStorage.setItem('secureToken', getSecureToken());
        // Display a browser alert when the users input matches the correct login
        alert("Logged in, opening page...");
        // Replace the page with the about blank portal
        window.location.replace("https://thepoopooman652.github.io/aboutblankpage/home.html");
        // Log a message to console when the hash of the users input matches the hash of the correct login
        console.log(
            "Users input hash matches the hash of the correct login, opening page..."
        );
    } else if (userInputHash == 1516585992) {       
        // Replace the page with the about blank portal
        window.location.replace("https://thepoopooman652.github.io/aboutblankpage/home.html");
        // Log a message to console when the hash of the users input matches the hash of the correct login
        console.log(
            "Users input hash matches the hash of the correct login, opening page..."
        );
    } else {
        // Trigger a browser alert when the hash of the users input does not match the hash of the correct login
        alert("Incorrect login, try again.");
        // Log a warning to the console when the hash of the users input does not match the hash of the correct login
        console.warn(
            "Hash of users input did not match the hash of the correct login"
        );
    };
};
