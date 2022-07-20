let movieCard = document.getElementById("movieCard");
let innerDiv = document.querySelector(".inner");
let watchTrailerMsg = document.getElementById("watchTrailer");
let ytLinkName;

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  // let title = $("#movie_title").val().trim();
  apiCall();

});

function apiCall() {
  axios
    .get(`http://www.omdbapi.com/?apikey=b00e7121&t=thor&type=movie&page=10`)
    .then((response) => {
      console.log(response.data);
      // let movieData = response.data;
      // displayMovieData(movieData);
    })
    .catch((error) => console.error(error));
}

function displayMovieData(data) {
  const { Title, Actors, Genre, Year, Rated, Director, Runtime, Plot, Poster } =
    data;

  ytLinkName = Title.split(" ").join("+").toLowerCase();
  innerDiv.style.opacity = -1;
  movieCard.style.display = "block";

  $("#movieCard").append(
    `
    <div id="movieInfoCard" >
      <h3 class="movieTitle data" onmouseenter="showTrailerMsg()">${Title}</h3>
      <img src="${Poster}" id="poster" onmouseenter="showTrailerMsg()" alt=${Title} - Movie Poster />
        <div class="movieData">
          <p class="movieGenre data">Genre: ${Genre}</p>
          <p class="movieActors data">Actors: ${Actors}</p>
          <p class="movieYear data">Year: ${Year}</p>
          <p class="movieRated data">Rated: ${Rated}</p>
          <p class="movieDirector data">Director: ${Director}</p>
          <p class="moviePlot data">Plot: ${Plot}</p>
          <p class="movieRuntime data">Runtime: ${Runtime}</p>
        </div>
        <div class="backBtnContainer">
          <button id="backBtn" onclick="location.reload()">Back</button>
        </div>
    </div>
    `
  );
}

function showTrailerMsg() {
  watchTrailerMsg.style.visibility = "visible";
  let youTubeLink = `http://www.youtube.com/results?search_query=${ytLinkName}+trailer`;
  watchTrailerMsg.setAttribute("href", youTubeLink);
  watchTrailerMsg.setAttribute("target", "_blank");

  setTimeout(() => {
    watchTrailerMsg.style.visibility = "hidden";
  }, 5000);
}
