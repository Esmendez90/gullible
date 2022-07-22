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
      response.data.Response === "False" ? alert("Error! Please, try again.") : 
      displayData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayData(data) {
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

function showTrailerMsg() {
  watchTrailerMsg.style.visibility = "visible";
  let youTubeLink = `http://www.youtube.com/results?search_query=${ytLinkName}+trailer`;
  watchTrailerMsg.setAttribute("href", youTubeLink);
  watchTrailerMsg.setAttribute("target", "_blank");

  setTimeout(() => {
    watchTrailerMsg.style.visibility = "hidden";
  }, 5000);
}
