const token = localStorage.getItem("authToken")

if (!token) {
    window.location.href = "/html/log-in.html"
}

document.getElementById("delete-group").addEventListener("submit", async (e) => {
    e.preventDefault();

    disableBtn();

    const name = document.getElementById("group-name").value;
    const description = document.getElementById("group-desc").value;
    const location = document.getElementById("location").value;
    const groupType = document.getElementById("group-type").value;

    try {
        const response = await fetch(editGroupUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                location,
                groupType
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Group Edited Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = `groups.html`
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
        button.style.color = "white"
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
})