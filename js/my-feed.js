const token = localStorage.getItem("authToken");

async function myFeed() {
    try {
        const response = await fetch("https://happening.net/api/v1/blog/load-posts", {
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
            let accum = "";

            if (message.role === "admin") {
               document.getElementById("create").innerHTML = `<p id="create-icon"><a href="https://happening.net/blogs/create-blog-post">+</a></p>`;
            }

            message.data.forEach(post => {
                const postDate = new Date(post.createdAt);
                const formatter = new Intl.DateTimeFormat("en-us", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Europe/Paris"
                });

                const formattedDate = formatter.format(postDate);

                if (message.role === "admin") {
                    const html = `
                     <a href="https://happening.net/blogs/blog-options?id=${post._id}">
                        <div>
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.author.firstName} ${post.author.lastName}</h3>
                                    <span>${formattedDate}</span>
                                </section>
                            </div>
                            <p>${post.content}</p>
                        </div>
                    </a>
                `
                accum += html;
                 } else {
                    const html = `
                        <div>
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.author.firstName} ${post.author.lastName}</h3>
                                    <span>${formattedDate}</span>
                                </section>
                            </div>
                            <p>${post.content}</p>
                        </div>
                    `
                    accum += html;
                 }
            });
            document.getElementById("my-feed").innerHTML = accum; 
        } else {
            console.log(message)
        }
    } catch (error) {
        console.log(error);
    }
}

window.onload = myFeed;