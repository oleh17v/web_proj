const currentUser = JSON.parse(window.localStorage.getItem("loggedUser"));

const logoutLink_button = document.querySelector('.logoutLink_button');


const headers = new Headers();

headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
headers.set('content-type', 'application/json');

fetch('http://localhost:8089/api/v1/user/' + currentUser.username, {
    method: 'GET',
    headers: headers
}).then((response) => {
    if (response.status === 200) {
        return response.json();
    }
}).then(data => {
    const user = data.user;
    const first_name_p = document.getElementById("firstname");
    first_name_p.appendChild(
        document.createTextNode(user.firstname)
    );
    const last_name_p = document.getElementById("lastname");
    last_name_p.appendChild(
        document.createTextNode(user.lastname)
    );
    const username_p = document.getElementById("username");
    username_p.appendChild(
        document.createTextNode(user.username)
    );
    const email_p = document.getElementById("email");
    email_p.appendChild(
        document.createTextNode(user.email)
    );
})

logoutLink_button.onclick = e => {
    e.preventDefault();
    window.localStorage.removeItem("loggedUser");
    window.location.href = '../templates/login.html';
}



