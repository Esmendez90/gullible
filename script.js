console.log("is this even working?");
let searchBtn = document.getElementById("searchBtn");
let movieTitle = document.getElementById("movie_title");

searchBtn.addEventListener("click", function () {
    let title = movieTitle.value().trime();
    console.log(title);
});

