$(".register").click(function () {
  // 1) 회원 가입 버튼을 눌렀을때 입력했는지 안했는지 확인하기
  const Id = $(".Id").val();
  const password = $(".password").val();
  const password_1 = $(".password_1").val();
  const name_1 = $(".name_1").val();
  const year = $(".year").val();
  const month = $(".month").val();
  const day = $(".day").val();
  const select = $(".gender").val();
  const email = $(".email").val();
  const call_1 = $(".call_1").val();
  let like = "";
  // 라디오 버튼의 value를 가져오는 방법 -> 여러개를 한꺼번에 가져오기 때문에 each를 사용
  // 2) 비밀번호, 이메일 양식이 맞지 않으면 알려주기
  // 중요. null, undefinded, ''(빈문자열), 0 => 무조건 false!
  if (!Id) {
    alert("아이디를 입력해주세요!");
    return;
  } else if (!IdCheck(Id)) {
    alert("아이디 형식에 맞지 않습니다.");
    return;
  }

  if (!password) {
    alert("비밀번호를 입력해주세요");
    return;
  } else {
    if (!pwdCheck(password)) {
      alert("비밀번호는 특수문자/문자/숫자/ 포함 형태의 8~15자리 이내입니다.");
      return;
    }
  }
  if (!name_1) {
    alert("이름을 입력해주세요!");
    return;
  }
  if (!year) {
    alert("년도를 입력해주세요!");
    return;
  }
  if (!month) {
    alert("월을 선택해주세요!");
    return;
  }
  if (!day) {
    alert("일을 입력해주세요");
    return;
  }
  if (!call_1) {
    alert("전화번호를 입력해주세요!");
    return;
  } else if (!telCheck(call_1)) {
    alert("전화번호 형식에 맞지 않습니다.");
    return;
  }

  alert("회원가입이 완료 되었습니다.");
  location.href = "../1. 메인(인기 순위)_장성우/index.html";
});

// 식
function IdCheck(Id) {
  const reg = /^[a-z]+[a-z0-9]{5,19}$/g;
  return reg.test(Id); //맞으면 true, 틀리면 false
}
function pwdCheck(pwd) {
  //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
  const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return reg.test(pwd); //맞으면 true, 틀리면 false
}

function telCheck(tel) {
  const reg = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return reg.test(tel);
}
