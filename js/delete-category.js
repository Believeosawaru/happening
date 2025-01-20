async function displayCategories() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "https://happening.net/log-in"
    }

    try {
        const response = await fetch("https://happening.net/api/v1/blog/load-categories", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            window.location.href = "https://happening.net/log-in"
        }

        const data = await response.json();

        if (response.ok) {
            const eventContainer = document.getElementById("hero");

            texts = "";

            // setTimeout(() => {
            //     document.querySelector(".pre-loader").style.display = "none";
            // }, 350);

            if (data.data.length < 1) {
                eventContainer.innerHTML = "<p>No Category Added</p>"
                return;
            } else {
            data.data.forEach((cat, index) => {
                texts += `
                <div id="category-edit-div">
                    <p>${cat.title}</p>
                    <button id="cat-${index}" onclick="deleteCategory('${cat._id}', '${index}')">Delete</button>
                </div>
                `
            });

            eventContainer.innerHTML = texts;
        }            

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

const deleteCategory = async (id, index) => {
    try {
        document.getElementById(`cat-${index}`).style.background = "black"

        const token = localStorage.getItem("authToken");

        const response = await fetch(`https://happening.net/api/v1/blog/delete-category/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Category Deleted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        displayCategories();
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
                button.innerHTML = "Delete Post"
            }, 3500);
          });
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
}

window.onload = displayCategories;