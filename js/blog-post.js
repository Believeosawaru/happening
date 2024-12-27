const token = localStorage.getItem("authToken");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

async function blog() {
    if (!token) {
        try {
            const response = await fetch(`https://happening.net/api/v1/blog/public-blog-post/${postId}`, {
                        method: "GET"
                    });
            
                    const post = await response.json();
            
                    if (response.ok) {
                        const mediaHTML = post.data.mediaType && post.data.mediaPath ? 
                        (post.data.mediaType === "image" ? 
                            `<img src="https://happening.net/uploads/${post.data.mediaType}s/${post.data.mediaPath}" id="blog-img">` : 
                            `<video controls id="blog-video"> 
                                <source src="https://happening.net/uploads/${post.data.mediaType}s/${post.data.mediaPath}">
                                Your Browser Does Not Support The Video Tag
                            </video>`) : "";

                            const postDate = new Date(post.data.date);
                            const formatter = new Intl.DateTimeFormat("en-us", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Europe/Paris"
                            });
                            
                            const formattedDate = formatter.format(postDate);
            
                        document.getElementById("my-feed").innerHTML = `
                        <div id="post-card">
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.data.author.firstName} ${post.data.author.lastName}</h3>
                                    <span>${formattedDate}</span>
                                </section>
                            </div>
                                 <p>${post.data.content}</p>
                                ${
                                    post.data.mediaPath && post.data.mediaType ? `<div id="flexy">
                                    ${mediaHTML}
                                </div>` : ""
                                }
                        </div>
                        `

                        console.log(post)
                     } else {
                        console.log(message)
                    }
                } catch (error) {
                    console.log(error);
                }
    } else {
        try {
            const response = await fetch(`https://happening.net/api/v1/blog/blog-post/${postId}`, {
                        method: "GET", 
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    const post = await response.json();
            
                    if (post.message === "jwt malformed" || post.message === "jwt expired") {
                        setTimeout(() => {
                            window.location.href = "https://happening.net/log-in"
                        }, 350);
                    }
            
                    if (response.ok) {
                        const mediaHTML = post.data.mediaType && post.data.mediaPath ? 
                        (post.data.mediaType === "image" ? 
                            `<img src="https://happening.net/uploads/${post.data.mediaType}s/${post.data.mediaPath}" id="blog-img">` : 
                            `<video controls id="blog-video"> 
                                <source src="https://happening.net/uploads/${post.data.mediaType}s/${post.data.mediaPath}">
                                Your Browser Does Not Support The Video Tag
                            </video>`) : "";

                            const postDate = new Date(post.data.date);
                            const formatter = new Intl.DateTimeFormat("en-us", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Europe/Paris"
                            });
                            
                            const formattedDate = formatter.format(postDate);
            
                        document.getElementById("my-feed").innerHTML = `
                        <div id="post-card">
                            <div id="user-details">
                                <img src="../../images/event.jpg" alt="User Image">
                                <section>
                                    <h3>${post.data.author.firstName} ${post.data.author.lastName}</h3>
                                    <span>${formattedDate}</span>
                                </section>
                            </div>
                                 <p>${post.data.content}</p>
                                ${
                                    post.data.mediaPath && post.data.mediaType ? `<div id="flexy">
                                    ${mediaHTML}
                                </div>` : ""
                                }
                        </div>
                        `

                        console.log(post)
                     } else {
                        console.log(message)
                    }
                } catch (error) {
                    console.log(error);
                }
    }
}

window.onload = blog;