console.log("is this even working?");
let movieCard = document.getElementById("movieCard");
let innerDiv = document.querySelector(".inner");
let ytLinkName;

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  let title = $("#movie_title").val().trim();
  apiCall(title);
});

function apiCall(title) {
  axios
    .get(`http://www.omdbapi.com/?t=${title}&apikey=b00e7121`)
    .then((response) => {
      console.log(response.data);
      let movieData = response.data;
      displayMovieData(movieData);
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
      <img src="${Poster}" id="poster" onclick="youTubeTrailer()"  alt=${Title} - Movie Poster />
        <div class="movieData">
          <h3 class="movieTitle data" onclick="youTubeTrailer()" style="text-align: center; margin-bottom: 20px;">${Title}</h3>
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

function youTubeTrailer() {
  console.log("watch trailer for: ", ytLinkName);
  let youTubeLink = `https://www.youtube.com/results?search_query=${ytLinkName}+trailer`;
  console.log(youTubeLink);
}
