const token = localStorage.getItem("authToken");

async function myBio() {
    try {
        const response = await fetch("http://5.161.186.15/api/v1/user/my-profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "log-in.html"
            }, 3500);
        }

        if (response.ok) {
            setTimeout(() => {
                document.querySelector(".pre-loader").style.display = "none";
            }, 3500);

            document.getElementById("bio").value = `${message.data.bio}`;
            console.log(`done: ${bio}`)
            
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = userProfile;