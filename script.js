console.log("is this even working?");
let movieCard = document.getElementById("movieCard");

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
  movieCard.style.display = "block";
  $("#movieCard").append(
    `
    <div id="movieInfoCard" class="card">
      <img src="${Poster}" id="poster" class="card-img-top" alt=${Title} - Movie Poster />
        <div class="card-body">
          <p class="card-text">Title: ${Title}</p>
           <p class="card-text">Genre: ${Genre}</p>
           <p class="card-text">Actors: ${Actors}</p>
           <p class="card-text">Year: ${Year}</p>
          <p class="card-text">Rated: ${Rated}</p>
          <p class="card-text">Director: ${Director}</p>
          <p class="card-text">Plot: ${Plot}</p>
          <p class="card-text">Runtime: ${Runtime}</p>
        </div>
    </div>
    `
  );
}
