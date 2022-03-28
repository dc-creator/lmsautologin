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

const isregistered = "asawaqwerafdgsdhwe";
const universityid = "qwertxcbcvngfyuiop";
const studentnumid = "aasdfghggfhjytjk";
const passwordid = "zxcvbnfgsmasdf";

let timeValue = null;
if(GM_getValue(isregistered) === true){
    timeValue = setInterval(login, 1000);
}
else
    register();
function haltFunction() {clearInterval(timeValue);}
let setbutton = document.createElement("button");
setbutton.onclick = haltFunction;

function getuniv(){
    const univs = document.getElementById("user-login-prefix").children;
    let univdict = {};
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
    haltFunction();
    const univdict = getuniv();
    console.log(Object.keys(univdict).toString())
    let university = prompt("대학 이름을 입력해주세요\n" +
        "(정보 입력이 끝날때까진 새로고침을 하지 마세요)\n" +
        "취소 버튼을 누르시면 입력이 취소됩니다");
    if(university === "" || university === null)
        return;
    while(!(university in univdict)){
        university = prompt(
            "다시 입력해주세요.\n" +
            "대학 이름은 대학 선택창에 있는 이름과 같아야 합니다.\n" +
            "아래에 있는 대학 목록을 참고해주세요\n" +
            Object.keys(univdict).toString());
        if(university === "" || university === null)
            return;
        //console.log(university);
    }
    //console.log(univdict[university]);

    let studentnum = prompt("아이디를 입력해주세요", "");
    if(university === "" || university === null)
        return;
    while(studentnum == null || studentnum === ""){
        studentnum = prompt("다시 입력해주세요.\n빈 문자열은 유효하지 않습니다.", "");
        if(university === "" || university === null)
            return;
    }
    //console.log(studentnum);

    let password = prompt("비밀번호를 입력해주세요\n" +
        "(비밀번호가 가려지지 않으니 주의하세요.)");
    if(university === "" || university === null)
        return;
    while(password == null || password === ""){
        password = prompt("다시 입력해주세요.\n빈 문자열은 유효하지 않습니다", "");
        if(university === "" || university === null)
            return;
    }
    //console.log(password);

    GM_setValue(isregistered, true);
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
