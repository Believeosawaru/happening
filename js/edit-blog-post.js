const token = localStorage.getItem("authToken");
const path = window.location.pathname;
const slug = path.split("/").pop();
const button = document.getElementById("bio-btn");

function disableBtn() {
    button.disabled = true;
    button.style.backgroundColor = "#FFECB3";
    button.style.color = "black";
    button.innerHTML = "Submitting...."
}

const postUrl = `https://happening.net/api/v1/blog/edit-post/${slug}`;
const getPostUrl = `https://happening.net/api/v1/blog/load-current-post/${slug}`;

const retrievePost = async () => {
    try {
        const response = await fetch(getPostUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

    const data = await response.json();

    if (response.ok) {
         const title = data.data.title;
         const content = data.data.content;

         console.log(data.data.slug)

         document.getElementById("del-post").innerHTML = `<a href="https://happening.net/blogs/delete-blog-post/${data.data.slug}">Delete Post</a>`

           tinymce.init({
                selector: "#post",
                plugins: "advlist autolink lists link image charmap preview anchor",
                toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat"
           });
           
           document.getElementById("title").value = title;
           document.getElementById("post").value = content;

        //  tinymce.init({
        //     selector: "#post",
        //     plugins: "advlist autolink lists link image charmap preview anchor",
        //     toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat",
        //     setup: function (editor) {
        //         editor.on("init", function () {
        //             editor.setContent(savedContent)
        //         })
        //     }
        //  })
        //  document.getElementById("post").value = savedContent;
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
        button.innerHTML = "Submit";
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
}

document.getElementById("edit-post").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const post = tinymce.get("post").getContent();

    disableBtn();

    try {
        const response = await fetch(postUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               title,
               content: post
            })
        });

    const data = await response.json();

    if (response.ok) {
        document.getElementById("success-sign-up").innerHTML = "Update Posted Successfully";
        document.getElementById("success-sign-up").classList.add("success-sign-up");

        button.style.cursor = "wait";

        setTimeout(() => {
            window.location.href = "https://happening.net/home"
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
        button.innerHTML = "Submit";
    }

    } catch (error) {
        document.getElementById("failed").style.display = "block"
        document.getElementById("failed").innerHTML = "There Was An Error, Please Reload The Page";
        document.getElementById("failed").classList.add("failed");
        console.log(error);
    }
});

window.onload = retrievePost;