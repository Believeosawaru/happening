const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

document.getElementById("blog-options").innerHTML =`
        <div class="center">
            <button type="button"><a href="https://happening.net/blogs/edit-blog-post?id=${postId}">Edit Post</a></button>
        </div>
        <button type="button" id="delete-event-btn"><a style="color: #FF4500" href="https://happening.net/blogs/delete-blog-post?id=${postId}">Delete Post</a></button>`;

