// Script file for the login functionality
// PooMan Scripts (TM) (Pantent Pending (not really))

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

// Function to get the current date in MM/DD/YY format
function getDate() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    var day = String(now.getDate()).padStart(2, '0');
    var year = String(now.getFullYear()).slice(-2); // Get last two digits of year
    var date = `${month}/${day}/${year}`
    return date;
};

// Function to generate a secure token using the getDate() function
function getSecureToken() {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    var time = `${hours}${minutes}`;
    var exactTime = `${hours}:${minutes}:${seconds}`
    var exactTimeMS = Date.now();
    var date = getDate();
    localStorage.setItem('lastTokenGenTime', `{
        "date": "${date}",
        "time": "${exactTime}",
        "unixtimestamp": "${exactTimeMS}"
        }`);
    var secureToken = BigInt(time) ** BigInt(64);
    return secureToken.toLocaleString('fullwide', { useGrouping: false });
};

// Function to check the hash of the users input against the hash for the correct login
function checkLogin() {
    // Define the correct login and a varible to check what the users input is
    var loginCorrectHash = "1456755793";
    var loginUserInput = document.getElementById("login").value;
    var userInputHash = stringToHash(loginUserInput);
    console.log("Users input is " + loginUserInput);
    console.log("Hash of users input is " + userInputHash);
    // Compare the correct value to the users input using an IF statement
    if (userInputHash == loginCorrectHash) {    // Normal user login
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
    } else if (userInputHash == -1733231699) {    // Admin login       
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

// Function to check that the page was accessed via the login portal
function checkRedirectSource() {
  // Get the referrer URL
  const referrer = document.referrer;
  console.log(referrer);  

  // Check if the referrer is "thepoopooman652.github.io/index.html"
  if (referrer !== "https://thepoopooman652.github.io/aboutblankpage/index.html") {
    // If not redirected from the specified URL, redirect to the error page
    window.location.href = "http://error-pages.aidanwatters.kesug.com/403.html";
    console.error("I dont fucking know why, but shit didnt work man");
  };
};
