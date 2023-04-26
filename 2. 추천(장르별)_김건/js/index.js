let action = 1;
let animation = 1;
let family = 1;
let popular = 0;
let Fantasy = 1;
let Horror = 1;
let Crime = 1;
for (o = 1; o < 15; o++) {
  const movieURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=" +
    o +
    "&region=KR";
  $.ajax({
    type: "GET",
    url: movieURL,
    dataType: "json",
    async: false,
    success: function (data) {
      const results = data.results;
      for (const result of results) {
        // 인기순위
        if (popular <= 20) {
          let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
          let title = result.title;
          popular++;
          $(".slide_popular" + popular).attr("src", imgURL);
          $(".title_popular" + popular).text(popular + "위:  " + title);
          // console.log(result);
          $(".information_popular" + popular).attr(
            "href",
            "../4. 상세 정보_이지희/index.html?id=" + result.id
          );
        }
        for (let i = 0; i <= result.genre_ids.length; i++) {
          // 액션장르
          if (result.genre_ids[i] == "28") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slidea" + action).attr("src", imgURL);
            $(".titlea" + action).text(action + "위:  " + title);
            $(".information_action" + action).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            action++;
          }
          //애니메이션장르
          if (result.genre_ids[i] == "16") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slider" + animation).attr("src", imgURL);
            $(".titler" + animation).text(animation + "위:  " + title);
            $(".information_animation" + animation).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            animation++;
          }
          //공포영화장르
          if (result.genre_ids[i] == "27") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slide_Horror" + Horror).attr("src", imgURL);
            $(".title_Horror" + Horror).text(Horror + "위:  " + title);
            $(".information_Horror" + Horror).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            Horror++;
          }
          //범죄영화장르
          if (result.genre_ids[i] == "80") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slide_Crime" + Crime).attr("src", imgURL);
            $(".title_Crime" + Crime).text(Crime + "위:  " + title);
            $(".information_Crime" + Crime).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            Crime++;
          }
          //판타지장르
          if (result.genre_ids[i] == "14") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slide_Fantasy" + Fantasy).attr("src", imgURL);
            $(".title_Fantasy" + Fantasy).text(Fantasy + "위:  " + title);
            $(".information_Fantasy" + Fantasy).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            Fantasy++;
          }
          //가족영화장르
          if (result.genre_ids[i] == "10751") {
            let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;
            let title = result.title;
            $(".slidef" + family).attr("src", imgURL);
            $(".titlef" + family).text(family + "위:  " + title);
            $(".information_family" + family).attr(
              "href",
              "../4. 상세 정보_이지희/index.html?id=" + result.id
            );
            family++;
          }
        }
      }
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });
}
