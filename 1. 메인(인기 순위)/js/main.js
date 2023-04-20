$(function () {
  const movieURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR";
  let old = 1;
  let add = 1;

  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slideToClickedSlide: true,
  });

  $.ajax({
    type: "GET",
    url: movieURL,
    dataType: "json",
    async: false,
    success: function (data) {
      const results = data.results;
      console.log(results);

      for (let i = 0; i <= 9; i++) {
        // console.log("상세 설명 : ", result.overview);
        // console.log("평점 : ", result.vote_average);
        // console.log("포스터 : ", result.poster_path);

        let imgURL =
          "https://image.tmdb.org/t/p/w500/" + results[i].poster_path;

        $("#image" + [i]).append(`<img src="${imgURL}">`);

        $("#title" + [i]).append(`${[i + 1]}. ${results[i].title}`);
      }
      swiper.on("transitionEnd", function () {
        // console.log("현재 슬라이드 인덱스 번호", swiper.realIndex);
        const list = data.results;
        let requstKey = list[swiper.realIndex].id;
        let getVideoKey_URL =
          "https://api.themoviedb.org/3/movie/" +
          requstKey +
          "/videos?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR";

        $.ajax({
          type: "GET",
          url: getVideoKey_URL,
          dataType: "json",
          async: true,
          success: function (data) {
            if (!data.results[0]) {
            } else {
              let videoKey = data.results[0].key;

              if (!videoKey) {
                old += 1;
              } else {
                replay();
              }

              function replay() {
                let animationURL = "https://www.youtube.com/embed/" + videoKey;

                $("#video_play" + old).remove();
                old += 1;
                add += 1;
                $(".reload").append(`<div data-vbg-autoplay="true"
              data-vbg="${animationURL}"id="video_play${add}"></div>`);
                $(document).ready(function () {
                  $("[data-vbg]").youtube_background(); // 실행
                });
                $("#video_play").load(location.href + "#video_play");
                // console.log(#video_play.id);
              }
            }
          },
          error: function (request, status, error) {
            console.log("code:" + request.status);
            console.log("message:" + request.responseText);
            console.log("error:" + error);
            console.log("sddsdfdafdafdafdafdafadsfaf");
          },
        });
      });
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });
});
