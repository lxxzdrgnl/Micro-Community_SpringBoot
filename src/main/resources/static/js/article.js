// 삭제 기능
const deleteButton = document.getElementById('delete-btn');

if (deleteButton) {
    deleteButton.addEventListener('click', event => {
        let id = document.getElementById('article-id').value;
        function success() {
            alert('삭제가 완료되었습니다.');
            location.replace('/articles');
        }

        function fail() {
            alert('삭제 실패했습니다.');
            location.replace('/articles');
        }

        httpRequest('DELETE',`/api/articles/${id}`, null, success, fail);
    });
}

// 수정 기능
const modifyButton = document.getElementById('modify-btn');

if (modifyButton) {
    modifyButton.addEventListener('click', event => {
        let params = new URLSearchParams(location.search);
        let id = params.get('id');

        // 사용자 입력값 가져오기
        const content = document.getElementById('content').value;

        // 줄바꿈(\n)을 <br> 태그로 변환하여 저장
        const formattedContent = content.replace(/\n/g, '<br>');

        body = JSON.stringify({
            title: document.getElementById('title').value,
            content: formattedContent
        })

        function success() {
            alert('수정 완료되었습니다.');
            location.replace(`/articles/${id}`);
        }

        function fail() {
            alert('수정 실패했습니다.');
            location.replace(`/articles/${id}`);
        }

        httpRequest('PUT',`/api/articles/${id}`, body, success, fail);
    });
}

// 생성 기능
const createButton = document.getElementById('create-btn');

if (createButton) {
    createButton.addEventListener('click', event => {
        // 사용자 입력값 가져오기
        const content = document.getElementById('content').value;

        // 줄바꿈(\n)을 <br> 태그로 변환하여 저장
        const formattedContent = content.replace(/\n/g, '<br>');

        body = JSON.stringify({
            title: document.getElementById('title').value,
            content: formattedContent
        });

        function success() {
            alert('등록 완료되었습니다.');
            location.replace('/articles');
        };
        function fail() {
            alert('등록 실패했습니다.');
            location.replace('/articles');
        };

        httpRequest('POST','/api/articles', body, success, fail)
    });
}

// 댓글 생성 기능
const commentCreateButton = document.getElementById('comment-create-btn');

if (commentCreateButton) {
    commentCreateButton.addEventListener('click', event => {
        articleId = document.getElementById('article-id').value;

        const body = JSON.stringify({
            articleId: articleId,
            content: document.getElementById('content').value
        });

        function success() {
            alert('등록 완료되었습니다.');
            location.replace('/articles/' + articleId);
        }

        function fail() {
            alert('등록 실패했습니다.');
            location.replace('/articles/' + articleId);
        }

        httpRequest('POST', '/api/comments', body, success, fail);
    });
}

// 로그아웃 기능
const logoutButton = document.getElementById('logout-btn');

if (logoutButton) {
    logoutButton.addEventListener('click', event => {
        function success() {
            // 로컬 스토리지에 저장된 액세스 토큰을 삭제
            localStorage.removeItem('access_token');

            // 쿠키에 저장된 리프레시 토큰을 삭제
            deleteCookie('refresh_token');
            location.replace('/articles');
        }
        function fail() {
            alert('로그아웃 실패했습니다.');
        }

        httpRequest('DELETE','/api/refresh-token', null, success, fail);
    });
}


// 쿠키를 가져오는 함수
function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        item = item.replace(' ', '');

        var dic = item.split('=');

        if (key === dic[0]) {
            result = dic[1];
            return true;
        }
    });

    return result;
}

// 쿠키를 삭제하는 함수
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// HTTP 요청을 보내는 함수
function httpRequest(method, url, body, success, fail) {
    fetch(url, {
        method: method,
        headers: { // 로컬 스토리지에서 액세스 토큰 값을 가져와 헤더에 추가
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
        },
        body: body,
    }).then(response => {
        if (response.status === 200 || response.status === 201) {
            return success();
        }
        const refresh_token = getCookie('refresh_token');
        if (response.status === 401 && refresh_token) {
            fetch('/api/token', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: getCookie('refresh_token'),
                }),
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(result => { // 재발급이 성공하면 로컬 스토리지값을 새로운 액세스 토큰으로 교체
                    localStorage.setItem('access_token', result.accessToken);
                    httpRequest(method, url, body, success, fail);
                })
                .catch(error => fail());
        } else {
            return fail();
        }
    });
}



window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('access_token');
    const loginButton = document.getElementById('login-btn');
    const logoutButton = document.getElementById('logout-btn');
    const createButton = document.getElementById('create-btn');
    const modifyButton = document.getElementById('modify-btn');
    const deleteButton = document.getElementById('delete-btn');
    const contentInput = document.getElementById('content');

    // JWT 토큰의 Payload(사용자 정보)를 디코딩하는 함수
    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    // 로그인/로그아웃 버튼 제어
    if (loginButton && logoutButton) {
        if (token) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
        } else {
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
        }
    }

    // 글 등록 버튼 제어
    if (createButton) {
        createButton.style.display = token ? 'inline-block' : 'none';
    }

    // 수정 페이지에서 내용 불러올 때 줄바꿈(<br>)을 \n으로 변환
    if (contentInput && contentInput.value.includes('<br>')) {
        let rawContent = contentInput.value;
        let formattedContentForEdit = rawContent.replace(/<br\s*\/?>/ig, '\n');
        contentInput.value = formattedContentForEdit;
    }

    // 수정/삭제 버튼 제어
    if (modifyButton && deleteButton && token) {
        const loggedInUser = parseJwt(token).sub;
        const articleAuthor = document.getElementById('article-author').value;

        if (loggedInUser === articleAuthor) {
            modifyButton.style.display = 'inline-block';
            deleteButton.style.display = 'inline-block';
        }
    }
});