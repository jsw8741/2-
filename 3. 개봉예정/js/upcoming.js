const movieURL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=d0f57e4e20e63bfcf331ff49a646c74c&language=ko-KR&page=1&region=US";

$.ajax({
  type: "GET",
  url: movieURL,
  dataType: "json",
  async: false,
  success: function (data) {
    const results = data.results;
    console.log(results);

    $.each(results, function (index, result) {
      let imgURL = "https://image.tmdb.org/t/p/w500" + result.poster_path;

      $(".upcoming")
        .eq(index)
        .find("a")
        .attr("href", `../4. 상세 정보/index.html?id=${result.id}`);
      $(".upcoming").eq(index).find(".card-img-top").attr("src", imgURL);
      $(".upcoming").eq(index).find(".card-img-top").attr("alt", result.title);
      $(".upcoming").eq(index).find(".title").text(result.title);
      $(".upcoming")
        .eq(index)
        .find(".date")
        .text(`개봉일 ${result.release_date}`);
      $(".upcoming")
        .eq(index)
        .find(".score")
        .text(`회원 평점 ${result.vote_average}`);
    });
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("status:" + status);
    console.log("error:" + error);
  },
});

// 포스터

function zoomIn(event) {
  event.target.style.transform = "scale(1.1)";
  event.target.style.zIndex = 1;
  event.target.style.transition = "all 0.5s";
}

function zoomOut(event) {
  event.target.style.transform = "scale(1)";
  event.target.style.zIndex = 0;
  event.target.style.transition = "all 0.5s";
}

// 더보기
const wrapper = document.querySelector("#more-wrapper");
const btn = document.querySelector("#toggle-btn");

wrapper.style.display = "none";

function toggleDisplay() {
  wrapper.style.display = wrapper.style.display === "none" ? "block" : "none";
  btn.textContent = wrapper.style.display === "none" ? "더보기" : "접기";
}

btn.addEventListener("click", toggleDisplay);

// 스크롤

$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".top").fadeIn();
  } else {
    $(".top").fadeOut();
  }
});

$(".top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 200);
  return false;
});
