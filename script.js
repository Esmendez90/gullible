let title;
let type;
let year;

$("#search-Btn").on("click", function (event) {
  event.preventDefault();
  title = $("#title").val().trim().toLowerCase();
  type = $("#type").val().trim().toLowerCase();
  year = $("#year").val().trim().toLowerCase();
  // console.log(title, type, year);
  getData(title, type, year);
});

function getData(title, type, year) {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=b00e7121&t=${title}&type=${type}&y=${year}`
    )
    .then((response) => {
      console.log(response.data);
      document.getElementById("myForm").reset();
      displayData(response.data);
    })
    .catch((error) => console.error(error));
}

function displayData(data) {
  const { Title, Year, Genre, Actors, Rated, Plot, Director, Runtime, Poster } =
    data;

  $("#movieCard-container").append(
    `
    <div id="movieCard" >
      <img src="${Poster}" alt=${Title}/>
        <div class="movie-card-body">
          <h2>${Title}</h2>
          <p>Genre: ${Genre}</p>
          <p>Actors: ${Actors}</p>
          <p>Year: ${Year}</p>
          <p>Rated: ${Rated}</p>
          <p>Plot: ${Plot}</p>
          <p>Director: ${Director}</p>
          <p>Runtime: ${Runtime}</p>
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
