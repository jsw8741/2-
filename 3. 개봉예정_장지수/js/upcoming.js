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

    for (const result of results) {
      const imgURL = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
      const upcoming = $(".upcoming").eq(results.indexOf(result));

      upcoming
        .find("a")
        .attr("href", `../4.%20상세%20정보_이지희/index.html?id=${result.id}`);
      upcoming.find(".card-img-top").attr({ src: imgURL, alt: result.title });
      upcoming.find(".title").text(result.title);
      upcoming.find(".date").text(`개봉일 ${result.release_date}`);
      upcoming.find(".score").text(`회원 평점 ${result.vote_average}`);
    }
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("status:" + status);
    console.log("error:" + error);
  },
});

// 포스터 애니메이션
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
  $(".top").toggle($(this).scrollTop() > 100);
});

$(".top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 200);
  return false;
});
