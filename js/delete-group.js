const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");

const delGroupUrl = `http://5.161.186.15/api/v1/user/delete-group/${groupId}`

if (!token) {
    window.location.href = "http://5.161.186.15/log-in"
}

const button = document.getElementById("delete-group-btn");

function disableBtn() {
    button.disabled = true;
    button.style.color = "#000";
    button.innerHTML = "Deleting Group...."
}

document.getElementById("delete-group").addEventListener("submit", async (e) => {
    e.preventDefault();

    disableBtn();

    try {
        const response = await fetch(delGroupUrl, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Group Deleted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        setTimeout(() => {
            window.location.href = `http://5.161.186.15/groups/groups.html`
        }, 1000)
    } else {
        const keys = Object.keys(data);

        keys.forEach(key => {
            const value = data[key]; 
            
            document.getElementById("failed").style.display = "block"
            document.getElementById("failed").innerHTML = value;
            document.getElementById("failed").classList.add("failed");

            setTimeout(() => {
                document.getElementById("failed").style.display = "none";

                button.disabled = false;
                button.style.color = "#FFECB3";
                button.innerHTML = "Delete Group"
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