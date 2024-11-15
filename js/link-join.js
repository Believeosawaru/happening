async function joinGroup() {
    const token = localStorage.getItem("authToken");
    const urlParams = new URLSearchParams(window.location.search);
    const groupToken = urlParams.get("groupToken");

    if (!token) {
        window.location.href = "https://happening.net/log-in"
    }

    try {
        const response = await fetch(`https://happening.net/api/v1/user/join-group/${groupToken}invite-link`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("success-sign-up").classList.add("success-sign-up")
            document.getElementById("success-sign-up").innerHTML = data.message;

            window.location.href = "https://happening.net/groups/groups"
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