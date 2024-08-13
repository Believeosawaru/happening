async function joinGroup() {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const groupToken = urlParams.get("groupToken");

    if (!token) {
        window.location.href = "log-in.html"
    }

    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/join-group/${groupToken}/invite-link`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.querySelector(".success-sign-up").innerHTML = data;
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
}

window.onload = joinGroup;