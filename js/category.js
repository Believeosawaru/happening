const catButton = document.getElementById("right");

catButton.addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("cate-transition");
    document.querySelector(".choose-category").classList.remove("close-cate");
});

document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".choose-category").classList.add("close-cate");
    document.querySelector(".choose-category").classList.remove("cate-transition");
});