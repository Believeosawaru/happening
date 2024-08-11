const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

const delGroupUrl = `https://happening-api.onrender.com/api/v1/user/delete-group/${groupId}`

if (!token) {
    window.location.href = "/html/log-in.html"
}

document.getElementById("delete-group").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(delGroupUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    console.log(data)

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Group Deleted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        setTimeout(() => {
            window.location.href = `groups.html`
        }, 1000000000)
    } else {
        const keys = Object.keys(data);

        keys.forEach(key => {
            const value = data[key]; 
            
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = value;
            document.getElementById("failed").classList.add("failed");

            setTimeout(() => {
                document.getElementById("failed").style.display = "none"
            }, 3500);
          });
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
})