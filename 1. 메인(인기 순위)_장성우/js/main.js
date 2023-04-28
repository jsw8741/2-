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
      // console.log(results);

      for (let i = 0; i <= 9; i++) {
        let imgURL =
          "https://image.tmdb.org/t/p/w500/" + results[i].poster_path;

        $("#image" + [i]).append(`<img src="${imgURL}" alt="poster">`);

        $("#title" + [i]).append(`${[i + 1]}. ${results[i].title}`);
      }

      function windowonload() {
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
            let move_detailURL =
              "../4.%20상세%20정보_이지희/index.html?id=" + data.id;
            $(".move_detail").attr("href", move_detailURL);

            if (!data.results[0]) {
              $(".video_box").remove();
              $(".reload").append(
                `<div class="video_box"style="font-size: 50px;color: white;text-align: center;top: 515px;left: 390px;position: absolute;">예고편이 없습니다.</div>`
              );
            } else {
              let videoKey = data.results[0].key;
              let animationURL = "https://www.youtube.com/embed/" + videoKey;
              $(".reload")
                .append(`<div data-vbg-autoplay="true" data-vbg-play-button="true" data-vbg-mute-button="true"
              data-vbg="${animationURL}"id="video_play${add}"class="video_box"style="opacity: 0.5;"></div>`);

              $(document).ready(function () {
                $("[data-vbg]").youtube_background(); // 실행
              });
              $("#video_play").load(location.href + "#video_play");
            }
          },
          error: function (request, status, error) {
            console.log("code:" + request.status);
            console.log("message:" + request.responseText);
            console.log("error:" + error);
          },
        });
      }
      window.onload = windowonload;

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
            // console.log("현재 슬라이드 영화 ID", data.id);
            let move_detailURL =
              "../4.%20상세%20정보_이지희/index.html?id=" + data.id;
            $(".move_detail").attr("href", move_detailURL);

            if (!data.results[0]) {
              $(".video_box").remove();
              $(".reload").append(
                `<div class="video_box"style="font-size: 50px;color: white;text-align: center;top: 515px;left: 390px;position: absolute;">예고편이 없습니다.</div>`
              );
            } else {
              let videoKey = data.results[0].key;
              replay();

              function replay() {
                let animationURL = "https://www.youtube.com/embed/" + videoKey;

                $(".video_box").remove();
                $(".video-background-controls").remove();
                old += 1;
                add += 1;
                $(".reload")
                  .append(`<div data-vbg-autoplay="true" data-vbg-play-button="true" data-vbg-mute-button="true"
              data-vbg="${animationURL}"id="video_play${add}"class="video_box"style="opacity: 0.5;"></div>`);

                $(document).ready(function () {
                  $("[data-vbg]").youtube_background(); // 실행
                });
                $("#video_play").load(location.href + "#video_play");
              }
            }
          },
          error: function (request, status, error) {
            console.log("code:" + request.status);
            console.log("message:" + request.responseText);
            console.log("error:" + error);
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

  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.450252, 126.702831), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커가 표시될 위치입니다
  var markerPosition = new kakao.maps.LatLng(37.450252, 126.702831);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    window.open(
      "https://map.naver.com/v5/directions/-/14104502.65512145,4502058.492730632,%EC%9D%B4%EC%A0%A0%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8%EC%BB%B4%ED%93%A8%ED%84%B0%ED%95%99%EC%9B%90%20%EC%9D%B8%EC%B2%9C,38238173,PLACE_POI/-/car?c=15,0,0,0,dh"
    );
  });
});
