const signInUrl = "https://happening-api.onrender.com/api/v1/auth/sign-in";

const button = document.getElementById("sign-in-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
}


document.getElementById("sign-in").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    disableBtn();

    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("authToken", data.token);
    }

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Sign In Successful";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "html/home.html"
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
        button.style.color = "white"
    }

    } catch (error) {
        console.log(error.message);
    }
});