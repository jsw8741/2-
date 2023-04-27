$(function () {
  // 현재 상영중
  var movieURL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1&region=KR";
  let now = 0;

  $.ajax({
    type: "GET",
    url: movieURL,
    dataType: "json",
    async: false,
    success: function (data) {
      // console.log(data); //data:모든정보
      // console.log(results); //정보내에 상세정보
      // title = 제목
      // vote_average =평점
      // overview =영화설명
      // poster_path =포스터

      const results = data.results;
      for (const result of results) {
        let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        // `<a href = #><img src="${imgURL}" alt="포스터"></a>` <--- 여기에 상세보기 링크 입력
        $(".playnow" + now).append(
          `<a href = ../4.%20상세%20정보_이지희/index.html?id=${result.id}><img src="${imgURL}" alt="포스터"></a>`
        ); //상영중 박스포스터
        $(".play-title" + now).append(`${result.title}`); //상영중 박스제목
        $(".play-voteaverage" + now).append(
          `<i class="fa-solid fa-star" style="color: #e4e82c;"></i>&nbsp;${result.vote_average}`
        ); //상영중 박스 평점
        $(".play-releasedate" + now).append(`${result.release_date}`);
        now++;
      }
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });

  // 개봉 예정
  let up = 0;
  var movieURLsecond =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1&region=KR";
  $.ajax({
    type: "GET",
    url: movieURLsecond,
    dataType: "json",
    async: false,
    success: function (data) {
      const results = data.results;
      for (const result of results) {
        up++;
        let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        // (`<a href= #><img src="${imgURL}"  alt="포스터"></a>`) <-여기에 상세보기 링크입력
        $(".up-poster" + up).append(
          `<a href = ../4.%20상세%20정보_이지희/index.html?id=${result.id}><img src="${imgURL}" alt="포스터"></a>`
        );
        //상영중 박스포스터
        $(".up-title" + up).append(`${result.title}`); //개봉예정 박스제목
        $(".up-releasedate" + up).append(`${result.release_date}`); //개봉예정 날짜
        $(".up-voteaverage" + up).append(
          `<i class="fa-solid fa-star" style="color: #e4e82c;"></i>&nbsp;${result.vote_average}`
        ); //개봉예정 박스 평점
      }
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });

  //  더보기
  $(document).ready(function () {
    $(".blind").click(function () {
      if ($(".blind").hasClass("blind")) {
        $(".blind").css("display", "none");
        $(".hidesetup").css("display", "block");
      }
    });
  });
});
