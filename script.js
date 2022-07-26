let title;
let type;
let year;
let storage = [];

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

      if (response.data.Response === "False") {
        alert("Error! Please, try again.");
      } else {
        storage.push(response.data);
        localStorage.setItem("saved-movies-series", JSON.stringify(storage));
        document.getElementById("myForm").reset();
        displayData(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayData(data) {
  $("#movieCard").remove()
  const { Title, Year, Genre, Actors, Rated, Plot, Director, Runtime, Poster } =
    data;

  $("#movieCard-container").append(
    `
    <div id="movieCard" >
      <img src="${Poster}" alt=${Title}/>
        <div class="movie-card-body">
          <h1>${Title}</h1>
          <p><b>Genre:</b> ${Genre}</p>
          <p><b>Actors:</b> ${Actors}</p>
          <p><b>Year:</b> ${Year}</p>
          <p><b>Rated:</b> ${Rated}</p>
          <p><b>Plot:</b> ${Plot}</p>
          <p><b>Director:</b> ${Director}</p>
          <p><b>Runtime:</b> ${Runtime}</p>
        </div>
    </div>
    `
  );
}

function renderStorage() {
  storage = JSON.parse(localStorage.getItem("saved-movies-series"));
  storage.forEach((movie) =>
    $("#storage-container").append(`
    <div id="movieCard" >
      <img src="${movie.Poster}" alt=${movie.Title}/>
      <div class="movie-card-body">
          <h1>${movie.Title}</h1>
          <p><b>Genre:</b> ${movie.Genre}</p>
          <p><b>Actors:</b> ${movie.Actors}</p>
          <p><b>Year:</b> ${movie.Year}</p>
          <p><b>Rated:</b> ${movie.Rated}</p>
          <p><b>Plot:</b> ${movie.Plot}</p>
          <p><b>Director:</b> ${movie.Director}</p>
          <p><b>Runtime:</b> ${movie.Runtime}</p>
      </div>
    </div>
`)
  );
}

if (localStorage.getItem("saved-movies-series") === null) {
  localStorage.setItem("saved-movies-series", JSON.stringify([]));
}
renderStorage();
