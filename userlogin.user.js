/******************************************************************************************************************
 ******************************************************************************************************************
 * 이 프로그램은 암호화 수준이 매우 열악하므로 공용 컴퓨터에서 사용하는 등의 행위를 지양해 주시기 바랍니다.
 * 이 프로그램으로 인해 개인정보가 유출되는 등의 문제는 개발자가 책임지지 않습니다.
 ******************************************************************************************************************
 ******************************************************************************************************************
 * */
// ==UserScript==
// @name            lms auto login
// @description     수도권 대학 온라인강의 사이트 lms 에 자동으로 로그인 할 수 있게 해줌
// @match       https://lms.smau.or.kr/xn-sso/login.php
// @require     https://userscripts-mirror.org/scripts/source/107941.user.js
// @grant  GM_setValue
// @grant  GM_getValue
// @grant  GM_registerMenuCommand
// ==/UserScript==

const universityid = "qwertxcbcvngfyuiop";
const studentnumid = "asdfghggfhjytjk";
const passwordid = "zxcvbnfgsmasdf";

//console.log(GM_getValue(universityid));
//console.log(GM_getValue(studentnumid));
//console.log(GM_getValue(passwordid));

function getuniv(){
    const univs = document.getElementById("user-login-prefix").children;
    var univdict = {};
    for(let i=0; i<univs.length; i++){
        if(univs[i]['value'] === "")
            continue;
        univdict[univs[i].outerText] = univs[i]['value'];
    }
    //console.log(univdict);
    //console.log(Object.keys(univdict).length, univs.length);
    return univdict;
}

function register(){
    const univdict = getuniv();
    var university = prompt("대학 이름을 입력해주세요", "");
    while(!(university in univdict)){
        console.log(university);
        alert("대학 이름은 로그인창에 있는 대학 목록에 있는 이름과 같아야합니다\n" +
            "아래 목록 중 재학중인 대학 이름을 기억해가세요\n" + Object.keys(univdict).toString())
        university = prompt(
            "다시 입력해주세요.\n" +
            "대학 이름은 대학 선택창에 있는 이름과 같아야 합니다.", "");
    }
    console.log(univdict[university]);

    var studentnum = prompt("아이디를 입력해주세요", "");
    while(studentnum == null || studentnum === ""){
        studentnum = prompt("다시 입력해주세요.\n빈 문자열은 유효하지 않습니다.", "");
    }
    console.log(studentnum);

    var password = prompt("비밀번호를 입력해주세요", "");
    while(password == null || password === ""){
        password = prompt("다시 입력해주세요.\n빈 문자열은 유효하지 않습니다", "");
    }
    console.log(password);

    GM_setValue(universityid, univdict[university]);
    GM_setValue(studentnumid, studentnum);
    GM_setValue(passwordid, password);

}

GM_registerMenuCommand('아이디/비번/대학 등록or수정', register, 'D');

function login(){
    document.getElementById("user-login-prefix").value = GM_getValue(universityid);
    document.getElementById("login_user_id_user_input").value = GM_getValue(studentnumid);
    document.getElementById("login_user_password").value = GM_getValue(passwordid);
    OnLogon();
}

GM_registerMenuCommand('로그인', login, 'F');

