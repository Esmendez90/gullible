console.log("is this even working?");

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
    })
    .catch((error) => console.error(error));
}
