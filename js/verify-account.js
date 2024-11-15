const signInUrl = "https://happening.net/api/v1/auth/verify-user";

const button = document.getElementById("fg-pass-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
}


document.getElementById("verify-account").addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = document.getElementById("code").value;
    const token = localStorage.getItem("authToken");

    disableBtn();

    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({code})
        });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem("authToken", data.token);
    }

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "User Verified Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "https://happening.net/home"
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