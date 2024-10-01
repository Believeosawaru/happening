const catButton = document.getElementById("right");

catButton.addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("cate-transition")
});

document.querySelector("body").addEventListener("click", () => {
    document.querySelector(".choose-category").classList.remove("cate-transition")
})