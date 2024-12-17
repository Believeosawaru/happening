const token = localStorage.getItem("authToken");
// const urlParams = new URLSearchParams(window.location.search);
// const groupId = urlParams.get("groupId");

async function myFeed() {
    try {
        const response = await fetch("https://happening.net/api/v1/user/load-posts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const message = await response.json();

        if (message.message === "jwt malformed" || message.message === "jwt expired") {
            setTimeout(() => {
                window.location.href = "https://happening.net/log-in"
            }, 350);
        }

        if (response.ok) {
            console.log(message)

            let accum = "";

            // message.data.forEach(post => {
            //     const html = `
            //          <a href="https://happening.net/blogs/blog-options?id=${post._id}">
            //             <div>
            //                 <div id="user-details">
            //                     <img src="../../images/event.jpg" alt="User Image">
            //                     <section>
            //                         <h3>${post.author}</h3>
            //                         <span>Jun 12, 19:08</span>
            //                     </section>
            //                 </div>
            //                 <p>I recently stumbled upon this website called happening.net and it's super fast, and i really like it.</p>
            //             </div>
            //         </a>
            //     `
            // });
            // document.getElementById("bio").value = `${message.data.bio}`; 
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = myFeed;