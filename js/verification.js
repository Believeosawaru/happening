const signInUrl = "http://5.161.186.15/api/v1/auth/recover-password";

const button = document.getElementById("fg-pass-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
}

const email = localStorage.getItem("email");

console.log(email)

document.getElementById("recover-password").addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = document.getElementById("code").value;
    const password = document.getElementById("password").value;

    disableBtn();

    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, code, password})
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Password Successsfully Changed";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "http://5.161.186.15/log-in"
        }, 2000)
    } else {
        const keys = Object.keys(data);

        keys.forEach(key => {
            const value = data[key]; 
            
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = value;
            document.getElementById("failed").classList.add("failed");

            setTimeout(() => {
                document.getElementById("failed").style.display = "none"
            }, 3500)

            button.disabled = false;
          });

        button.style.backgroundColor = "#FF4500";
        button.style.color = "white";
    }

    } catch (error) {
        console.log(error);
    }
});