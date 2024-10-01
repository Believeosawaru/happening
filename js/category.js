const catButton = document.getElementById("right");

catButton.addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("cate-transition");
    document.querySelector(".choose-category").classList.remove("close-cate");
});

function close() {
    document.querySelector(".choose-category").classList.add("close-cate");
    document.querySelector(".choose-category").classList.remove("cate-transition");
    console.log("DOne")
}