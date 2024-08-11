const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

if (!token) {
    window.location.href = "/html/log-in.html"
}


const retreiveInfo = async () => {
    const info = await fetch(`https://happening-api.onrender.com/api/v1/user/group-details/${groupId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const group = await info.json();

    if (info.ok) {
    let name = document.getElementById("group-name");
    let description = document.getElementById("group-desc");
    let location = document.getElementById("location");

    name.value = group.data.name;
    description.value = group.data.description;
    location.value = group.data.location;
    } else {
        console.log("Could'nt Fetch")
    }
} 

const editGroupUrl = `https://happening-api.onrender.com/api/v1/user/edit-group-info/${groupId}`;

const delBtn = document.getElementById("group-del-link");

delBtn.innerHTML = `<a href="delete-group.html?groupId=${groupId}" class="del-group-a">Delete Group</a>`;

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black"
}

if (groupId) {
    document.getElementById("edit-group").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        disableBtn();

        const name = document.getElementById("group-name").value;
        const description = document.getElementById("group-desc").value;
        const location = document.getElementById("location").value;
        const groupType = document.getElementById("group-type").value;
    
        try {
            const response = await fetch(editGroupUrl, {
                method: "PUT",
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
}

window.onload = retreiveInfo;