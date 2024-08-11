const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
const token = localStorage.getItem("authToken");

let name = document.getElementById("group-name").value;
let description = document.getElementById("group-desc").value;
let location = document.getElementById("location").value;
let groupType = document.getElementById("group-type").value;

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

    name = group.data.name;
    description = group.data.description;
    location = group.data.location;
    groupType = group.data.groupType;
} 

const editGroupUrl = `https://happening-api.onrender.com/api/v1/user/edit-group-info/${groupId}`;

const button = document.getElementById("edit-group-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black"
}

if (groupId) {
    document.getElementById("edit-group").addEventListener("submit", async (e) => {
        e.preventDefault();
    
        disableBtn();
    
        try {
            const response = await fetch(editGroupUrl, {
                method: "POST",
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
                window.location.href = `group-details.html/${groupId}`
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