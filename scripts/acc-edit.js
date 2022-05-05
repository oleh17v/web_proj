const currentUser = JSON.parse(window.localStorage.getItem('loggedUser'))
const edit_button = document.querySelector('.edit_button')
const error = document.querySelector('.error');

const logoutLink_button = document.querySelector('.logoutLink_button');
if (!currentUser) {
    window.location.href = '../templates/login.html';
}

const headers = new Headers();


let editUser = request_body => {
    return fetch('http://localhost:8089/api/v1/user/' + currentUser.username, {
        method: "PUT",
        body: JSON.stringify(request_body),
        headers,
    });
}


headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
headers.set('content-type', 'application/json');



edit_button.onclick = e => {
    e.preventDefault();

    const form = document.querySelector('.form');
    const repeat_password = document.getElementById('repeat_password');

    if (form.checkValidity()) {
        const username = document.getElementById('username');
        const firstName = document.getElementById('first_name');
        const lastName = document.getElementById('last_name');
        const password = document.getElementById('password');
        const repeat_password = document.getElementById('repeat_password');
        const location_idlocation = document.getElementById('location_idlocation');
        const email = document.getElementById('email');

        let request_body = {
            username: username.value,
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            password: password.value,
            location_idlocation: location_idlocation.value,
        };

        if (password.value !== repeat_password.value) {
            error.innerHTML = "Passwords aren't matching. Try again.";
            return
        }




        editUser(request_body).then(response => {
            if (response.status === 200) {
                currentUser.username = request_body.username;
                currentUser.password = request_body.password;
                window.localStorage.setItem('loggedUser', JSON.stringify(currentUser));
                window.location.href = '../templates/acc.html';
            }
            else {
                response.text()
                    .then((data) => {
                        error.innerHTML = data;
                });
            }
        }).catch(() => {
            error.innerHTML = e;
        })
    }
    else {
        error.innerHTML = "Some fields are filled with invalid data. Try again.";
    }
}







logoutLink_button.onclick = e => {
    e.preventDefault();
    window.localStorage.removeItem("loggedUser");
    window.location.href = '../templates/login.html';
}
