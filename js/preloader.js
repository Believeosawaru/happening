const dimmer = document.querySelector(".dimmer");

function preloader() {
    setInterval(()  => {
        dimmer.classList.add("dimmer-bold")
        dimmer.classList.remove("dimmer-dull")
    }, 1000)
    
    setInterval(()  => {
        dimmer.classList.remove("dimmer-bold")
        dimmer.classList.add("dimmer-dull")
    }, 2000)
}

preloader();