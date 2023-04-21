var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

var movieURL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1&region=KR";

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
    for (let i = 0; i < results.length; i++) {
      let imgURL = "https://image.tmdb.org/t/p/w500" + results[i].poster_path;
      if (i == 0) {
        $(".test1").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
        $(".play1").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
        $(".play1").append(`<p>${results[i].title} | </P>`);
      }
      if (i == 1) {
        $(".test2").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
        $(".play2").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 2) {
        $(".test3").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
        $(".play3").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 3) {
        $(".play4").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 4) {
        $(".play5").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 5) {
        $(".play6").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 6) {
        $(".play7").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 7) {
        $(".play8").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 8) {
        $(".play9").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
      if (i == 9) {
        $(".play10").append(
          `<a href="./index2.html?id=${results[i].id}"><img src="${imgURL}"></a>`
        );
      }
    }

    // $(".test1").append(`${results[i].title}`);
    for (const result of results) {
      // console.log(result)
    }

    // console.log(result.title);
    // console.log(result.vote_average);
    // console.log(result.overview);
    // console.log(result.poster_path);
    // console.log(result.id);
    // }
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("error:" + error);
  },
});
