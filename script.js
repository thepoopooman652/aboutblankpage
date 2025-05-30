// Script file for the login functionality
// PooMan Scripts (TM) (Pantent Pending (not really))

// Add an event listener for the login textbox so that the enter key calls checkLogin();
const textBox = document.getElementById("login");
textBox.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.key === "Enter") {
            checkLogin();
        }
});

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
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var year = String(now.getFullYear()).slice(-2);
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
    var loginCorrectHash = "1456755793";
    var loginUserInput = document.getElementById("login").value;
    var userInputHash = stringToHash(loginUserInput);
    console.log("Users input is " + loginUserInput);
    console.log("Hash of users input is " + userInputHash);
    if (userInputHash == loginCorrectHash) { // Normal user login
        localStorage.setItem('secureToken', getSecureToken());
        alert("Logged in, opening page...");
        // Replace the page with the about blank portal
        window.location.replace("https://thepoopooman652.github.io/aboutblankpage/home.html");
        console.log(
            "Users input hash matches the hash of the correct login, opening page..."
        );
    } else if (userInputHash == -1733231699) { // Admin login
        window.location.replace("https://thepoopooman652.github.io/aboutblankpage/home.html");
        console.log(
            "Users input hash matches the hash of the correct login, opening page..."
        );
    } else {
        alert("Incorrect login, try again.");
        console.warn(
            "Hash of users input did not match the hash of the correct login"
        );
    };
};

// Function to check that the page was accessed via the login portal
function checkRedirectSource() {
    const referrer = document.referrer;
    console.log(referrer);

    if (referrer !== "https://thepoopooman652.github.io/aboutblankpage/") {
        window.location.href = "http://error-pages.aidanwatters.kesug.com/403.html";
        console.error("I dont fucking know why, but shit didnt work man");
    };
};
