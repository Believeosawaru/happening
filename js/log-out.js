const logOutUrl = "https://happening-api.onrender.com/api/v1/auth/log-out";

document.getElementById("sign-in").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

    const data = await response.json();

    if (response.ok) {
        localStorage.clear();

        document.getElementById("success-sign-up").innerHTML = "Log Out Successful";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        setTimeout(() => {
            window.location.href = "sign-up.html"
        }, 1000)
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