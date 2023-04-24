const movieURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1&region=KR";

$.ajax({
  type: "GET",
  url: movieURL,
  dataType: "json",
  async: false,
  success: function (data) {
    const results = data.results;

    //0값으로 초기화(2)
    let movienumber = 0;
    //순위를 1값으로 해두고(3)
    let movierank = 1;
    for (const result of results) {
      let imgURL = "https://image.tmdb.org/t/p/w200" + result.poster_path;
      //시작div(1)

      var text = "<div class='dima'; style=padding:20px 0px;  >";

      //이미지를 불러옴
      text +=
        "<p class='textp'> 순위 : " +
        movierank +
        "</p>" +
        "<a href='" +
        `../4. 상세 정보/index.html?id=${result.id}` +
        "'><img src='" +
        imgURL +
        "'alt='poster'></a>" +
        //제목을 불러옴
        "<p> 제목 : " +
        result.title +
        "</p>" +
        //평점 불러옴
        "<p> 평점 : " +
        result.vote_average +
        "점</p>" +
        "<p> 개봉일 : " +
        result.release_date +
        "</p>" +
        // 끝div(1)
        "</div>";

      $(".allimg").append(text);

      //text를 0값으로 해두고 돌아갈때마다 +1(2)
      movienumber++;
      //순위를 1값으로 해두고 돌아갈때마다 +1(3)
      movierank++;
    }
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("error:" + error);
  },
});
