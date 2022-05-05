const signUpButton = document.querySelector('.signUpButton');
const error = document.querySelector('.error');

if (window.localStorage.getItem('loggedUser')) {
    window.location.href = '../templates/acc.html';
}

let createUser = request_body => {
    return fetch('http://localhost:8089/api/v1/authentication/register', {
        method: "POST",
        body: JSON.stringify(request_body),
        headers: {'Content-Type': 'application/json'}
    });
}

signUpButton.onclick = (e) => {
    e.preventDefault();
    const form = document.querySelector('.form');

    const repeat_password = document.getElementById('repeat_password');

    if (form.checkValidity()) {
        const username = document.getElementById('username');

        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const location_idlocation = document.getElementById('location_idlocation');

        let request_body = {
            username: username.value,
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            location_idlocation: location_idlocation.value,
        };

        if (password.value !== repeat_password.value) {
            error.innerHTML = "Passwords aren't matching. Try again.";
            return
        }

        createUser(request_body)
            .then((response) => {
            if (response.status === 200) {
                window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
                window.location.href = '../templates/acc.html';
            } else {response.text().then((data) =>
            {error.innerHTML = data;});
            }
        }).catch(() => {error.innerHTML = e;});

    } else {
        error.innerHTML = 'All field are filled with invalid data. Try again.';
    }
};
