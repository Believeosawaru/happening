const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

const button = document.getElementById("leave-group");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
}

document.getElementById("leave-group").addEventListener("click", async () => {
    disableBtn();

    try {
        const response = await fetch(`https://happening-api.onrender.com/api/v1/user/leave-group/${groupId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    console.log(data)

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "You've Left This Group";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "groups.html"
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