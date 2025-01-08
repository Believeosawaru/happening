const menu = document.querySelector('.menu');

function openMenu() {
    if (menu.classList.contains('close-menu')) {
        menu.classList.add('open-menu');

        menu.classList.remove('close-menu');
    } else {
        menu.classList.add('close-menu');
        
        menu.classList.remove('open-menu');
    }
}

document.getElementById("bell").addEventListener("click", () => {
    window.location.href = "https://happening.net/notifications"
})

document.querySelector(".user-menu").innerHTML = `
            <p><a class="dis-flex" href="https://happening.net/home"><span class="material-symbols-outlined">
                home
                </span> <span>Home</span></a></p>

                <p id="my-feed-p"><a class="dis-flex" href="https://happening.net/blogs/my-feed"><span class="material-symbols-outlined">
                 captive_portal
                </span> <span>My Feed</span></a></p>

                <p id="create-blog-p"><a class="dis-flex" href="https://happening.net/blogs/create-blog-post"><span class="material-symbols-outlined">
                 captive_portal
                </span> <span>Create Blog Post</span></a></p>
                
            <p><a class="dis-flex" href="https://happening.net/my-events"><span class="material-symbols-outlined">
                event_available
                </span> <span>Events</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/my-groups"><span class="material-symbols-outlined">
                groups
                </span> <span>Groups</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/settings"><span class="material-symbols-outlined">
                settings
                </span> <span>Settings</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/my-profile"><span class="material-symbols-outlined">
                person
                </span> <span>My Profile</span></a></p>
            <button class="first-btn"><a href="https://happening.net/log-out">Log Out</a></button>
`;

document.querySelector("nav").innerHTML = `
        <span><a href="https://happening.net/home">Happening</a></span>

            <div class="pc-menu home-pc-menu" id="pc-menu">
                 <p><a class="dis-flex" href="https://happening.net/home"><span class="material-symbols-outlined">
                home
                </span> <span>Home</span></a></p>

                <p id="my-feed-p"><a class="dis-flex" href="https://happening.net/blogs/my-feed"><span class="material-symbols-outlined">
                 captive_portal
                </span> <span>My Feed</span></a></p>
                
                <p id="create-blog-p"><a class="dis-flex" href="https://happening.net/blogs/create-blog-post"><span class="material-symbols-outlined">
                 captive_portal
                </span> <span>Create Blog Post</span></a></p>
                
            <p><a class="dis-flex" href="https://happening.net/my-events"><span class="material-symbols-outlined">
                event_available
                </span> <span>Events</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/my-groups"><span class="material-symbols-outlined">
                groups
                </span> <span>Groups</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/settings"><span class="material-symbols-outlined">
                settings
                </span> <span>Settings</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/my-profile"><span class="material-symbols-outlined">
                person
                </span> <span>My Profile</span></a></p>
            <button class="first-btn"><a href="https://happening.net/log-out">Log Out</a></button>
            </div>

            <i class="fa fa-bell" id="bell"><i class="alert"></i></i>
            
            <i class="fa fa-bars" id="menu-bar" onclick="openMenu();"></i>
`

function removeAdminLinks(role) {
   if (role === "user" ) {
    document.querySelector(".user-menu").innerHTML = `
    <p><a class="dis-flex" href="https://happening.net/home"><span class="material-symbols-outlined">
        home
        </span> <span>Home</span></a></p>
        
    <p><a class="dis-flex" href="https://happening.net/my-events"><span class="material-symbols-outlined">
        event_available
        </span> <span>Events</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/my-groups"><span class="material-symbols-outlined">
        groups
        </span> <span>Groups</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/settings"><span class="material-symbols-outlined">
        settings
        </span> <span>Settings</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/my-profile"><span class="material-symbols-outlined">
        person
        </span> <span>My Profile</span></a></p>
    <button class="first-btn"><a href="https://happening.net/log-out">Log Out</a></button>
`;

document.querySelector("nav").innerHTML = `
<span><a href="https://happening.net/home">Happening</a></span>

    <div class="pc-menu home-pc-menu" id="pc-menu">
         <p><a class="dis-flex" href="https://happening.net/home"><span class="material-symbols-outlined">
        home
        </span> <span>Home</span></a></p>
        
    <p><a class="dis-flex" href="https://happening.net/my-events"><span class="material-symbols-outlined">
        event_available
        </span> <span>Events</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/my-groups"><span class="material-symbols-outlined">
        groups
        </span> <span>Groups</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/settings"><span class="material-symbols-outlined">
        settings
        </span> <span>Settings</span></a></p>

    <p><a class="dis-flex" href="https://happening.net/my-profile"><span class="material-symbols-outlined">
        person
        </span> <span>My Profile</span></a></p>
    <button class="first-btn"><a href="https://happening.net/log-out">Log Out</a></button>
    </div>

    <i class="fa fa-bell" id="bell"><i class="alert"></i></i>
    
    <i class="fa fa-bars" id="menu-bar" onclick="openMenu();"></i>
`;
   } else if (role === "guest") {
        document.querySelector(".user-menu").innerHTML = `
        <p><a class="dis-flex" href="https://happening.net"><span class="material-symbols-outlined">
            home
            </span> <span>Home</span></a></p>

        <p><a class="dis-flex" href="https://happening.net/blog"><span class="material-symbols-outlined">
            captive_portal
            </span> <span>Blog</span></a></p>
            
        <p><a class="dis-flex" href="https://happening.net/events"><span class="material-symbols-outlined">
            event_available
            </span> <span>Events</span></a></p>

        <p><a class="dis-flex" href="https://happening.net/groups"><span class="material-symbols-outlined">
            groups
            </span> <span>Groups</span></a></p>

            <button><a href="https://happening.net/sign-up">Sign Up</a></button>
            <button class="pc-btn"><a href="https://happening.net/log-in">Sign In</a></button>
        `;

        document.querySelector("nav").innerHTML = `
        <span><a href="https://happening.net">Happening</a></span>

            <div class="pc-menu home-pc-menu" id="pc-menu">
                <p><a class="dis-flex" href="https://happening.net"><span class="material-symbols-outlined">
                home
                </span> <span>Home</span></a></p>

                <p><a class="dis-flex" href="https://happening.net/blog"><span class="material-symbols-outlined">
                captive_portal
                </span> <span>Blog</span></a></p>
                
            <p><a class="dis-flex" href="https://happening.net/events"><span class="material-symbols-outlined">
                event_available
                </span> <span>Events</span></a></p>

            <p><a class="dis-flex" href="https://happening.net/groups"><span class="material-symbols-outlined">
                groups
                </span> <span>Groups</span></a></p>

            <button><a href="https://happening.net/sign-up">Sign Up</a></button>
            <button class="pc-btn"><a href="https://happening.net/log-in">Sign In</a></button>
            
            </div>
            <i class="fa fa-bars" id="menu-bar" onclick="openMenu();"></i>
        `;
   } else {
    return;
   }
}

const userToken = localStorage.getItem("authToken");

if (userToken) {
    async function loadNotifications() {
        try {
            const response = await fetch(`https://happening.net/api/v1/user/my-notifications`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            });
    
            const data = await response.json();
    
            const url = new URL(window.location.href);
    
            if (url.pathname === "/blogs/blog-post" && data.message === "jwt malformed" || url.pathname === "/blogs/blog-post" && data.message === "jwt expired") {
                return;
            }
    
            if (response.ok) {
                if (data.data.notifications.length > 0) {
                    document.querySelector(".alert").style.visibility = "visible";
                }
    
                if (data.data.role === "user") {
                    removeAdminLinks("user");
                }
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    loadNotifications();
} else {
   removeAdminLinks("guest");
}