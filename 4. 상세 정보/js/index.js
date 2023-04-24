//1. 전체 url가져오기
const currentURL = location.href;

//2. 쿼리스트링 파라메터 가져오기
const urlObj = new URL(currentURL);
const params = urlObj.searchParams;

const id = params.get("id");

console.log(id);

const MovieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1
`;
$.ajax({
  type: "GET",
  url: MovieURL,
  dataType: "json",
  async: false,
  success: function (data) {
    // console.log("전체 data:", data);
    // 포스터
    const image = data.poster_path;

    //태그
    const tagline = data.tagline;

    //영화제목
    const title = data.title;

    //러닝타임, 국가
    const time = data.runtime;

    //개봉일
    const day = data.release_date;

    //장르
    const genreses = data.genres;
    // console.log(genreses);

    const genresesLength = genreses.length;
    for (let i = 0; i < genresesLength; i++) {
      const genres = genreses[i];
      // console.log(genres);

      const genres_name = genres.name;
      // console.log(genres_name);

      $(".genres").append(` ${genres_name} &nbsp;`);
    }
    //포스터
    for (const data of image) {
      let imgURL = "https://image.tmdb.org/t/p/w500" + image;

      $(".images").append(`<img src="${imgURL}">`);
      break;
    }

    //평점
    const average = data.vote_average.toFixed(1);
    // console.log(average);

    //줄거리
    const overview = data.overview;

    $(".tagline").text(`${tagline}`); //태그
    $(".title").text(`${title}`); //제목
    $(".runtime").text(`러닝타임:  ${time} 분`); //러닝타임
    $(".day").text(`개봉일: ${day}`); // 개봉일
    $(".average p").text(`${average}`); //평점
    $(".overview").text(` ${overview}`); //줄거리
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("error:" + error);
  },
});

//출연진
const castingMovieURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR`;
$.ajax({
  type: "GET",
  url: castingMovieURL,
  dataType: "json",
  async: false,
  success: function (data) {
    const cast = data.cast;

    for (let i = 0; i < 5; i++) {
      // console.log(cast[i].name);
      const castList = cast[i].name;

      $(".casting").append(` ${castList} &nbsp; `);
    }
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("error:" + error);
  },
});

//예고편
const videoURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR`;

if (!videoURL.results) {
  console.log(video);
  $(".main-bottom").remove();
} else {
  $.ajax({
    type: "GET",
    url: videoURL,
    dataType: "json",
    async: false,
    success: function (data) {
      const video = data.results[0].key;

      let movieVideoURL = "https://www.youtube.com/embed/" + video;
      console.log(data.results[0].key);
      $("#video").attr("src", `${movieVideoURL}`);
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });
}
