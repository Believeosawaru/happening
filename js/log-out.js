const logOutUrl = "http://5.161.186.15/api/v1/auth/log-out";

document.getElementById("log-out").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(logOutUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    if (!token || response.status === 401) {
        window.location.href = "log-in.html"
    }

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
          });
    }

    } catch (error) {
        console.log(error);
    }
});