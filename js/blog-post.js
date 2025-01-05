const token = localStorage.getItem("authToken");
const path = window.location.pathname;
const slug = path.split("/").pop();

async function blog() {
    if (!token) {
        try {
            const response = await fetch(`https://happening.net/api/v1/blog/public-blog-post/${slug}`, {
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

                            const postDate = new Date(post.data.createdAt);
                            const formatter = new Intl.DateTimeFormat("en-us", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Europe/Paris"
                            });
                            
                            const formattedDate = formatter.format(postDate);

                            document.getElementById("my-feed").innerHTML = `
                         <div id="single-post-card">
                            <div class="center">${mediaHTML}</div>
                            <div>
                                <h2>${post.data.title}</h2>
                                <p class="bold-txt dis-flex"><span class="material-symbols-outlined">
                                    event_available
                                    </span> <span>${formattedDate}</span></p>
                                    <p class="bold-txt">Published By: ${post.data.author.firstName}</p>
                                <p id="margin-topper">${post.data.content}</p>
                            </div>
                         </div>
                        `
                     } else {
                        console.log(message)
                    }
                } catch (error) {
                    console.log(error);
                }
    } else {
        try {
            const response = await fetch(`https://happening.net/api/v1/blog/blog-post/${slug}`, {
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

                            const postDate = new Date(post.data.createdAt);
                            const formatter = new Intl.DateTimeFormat("en-us", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Europe/Paris"
                            });
                            
                            const formattedDate = formatter.format(postDate);

                            console.log(post.data.author.role)

                            const html = post.user.role === "admin" ? `
                             <div id="single-post-card">
                                <span class="material-symbols-outlined" id="edit-post-pen">
                                        edit
                                </span>
                                <div class="center">${mediaHTML}</div>
                                <div>
                                    <h2>${post.data.title}</h2>
                                    <p class="bold-txt dis-flex"><span class="material-symbols-outlined">
                                        event_available
                                        </span> <span>${formattedDate}</span></p>
                                        <p class="bold-txt">Published By: ${post.data.author.firstName}</p>
                                    <p id="margin-topper">${post.data.content}</p>
                                </div>
                             </div>
                            ` : `
                           <div id="single-post-card">
                                <div class="center">${mediaHTML}</div>
                                <div>
                                    <h2>${post.data.title}</h2>
                                    <p class="bold-txt dis-flex"><span class="material-symbols-outlined">
                                        event_available
                                        </span> <span>${formattedDate}</span></p>
                                        <p class="bold-txt">Published By: ${post.data.author.firstName}</p>
                                    <p id="margin-topper">${post.data.content}</p>
                                </div>
                             </div>
                            `

                        document.getElementById("my-feed").innerHTML = html;

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