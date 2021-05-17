var firebaseConfig = {
    apiKey: "AIzaSyDAURzkKmtpLsBGNYYt1Sj6-pTmk7lh6Wg",
    authDomain: "ibm-frontend.firebaseapp.com",
    databaseURL: "https://ibm-frontend-default-rtdb.firebaseio.com",
    projectId: "ibm-frontend",
    storageBucket: "ibm-frontend.appspot.com",
    messagingSenderId: "185203005676",
    appId: "1:185203005676:web:b77b0a61affd56af9c6dc9",
    measurementId: "G-0LV3RBN6J8"
};
window.onload = () => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    console.log("Init");
    const user = {
        id: localStorage.getItem("userId"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
    }
    let userCart = {};
    if (user.password === "user" && user.username === "user" && user.id !== null) {
        console.log(user);
        const dbRef = firebase.database().ref(`${user.id}`);
        dbRef.on('value', async (snapshot) => {
            userCart = await snapshot.val();
            document.querySelector(".cart-link").childNodes[1].nodeValue = `Cart ($${userCart.cartPrice.toFixed(2)})`
        })
    } else {
        console.log("Auth failed, no user in local storage")
    }

    let apiDataRef = firebase.database().ref('api');
    let data = [];
    let bannerPic = document.getElementById('banner-pic');
    let recipeContent = document.querySelector('.recipe-content');
    let title = document.querySelector('.title');
    let description = document.querySelector('.description');
    apiDataRef.on('value', async (snapshot) => {
        data = await snapshot.val();
        bannerPic.src = data.results[0].imageUrl;

        recipeContent.insertAdjacentHTML('afterbegin', `<p id="tag-1" class="tags"><span>
                        <svg class="tag-svg" enable-background="new 0 0 15 15" height="15px" id="Layer_1" version="1.1"
                            viewBox="0 0 48 48" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path clip-rule="evenodd"
                                d="M44.602,23.775L21.806,46.571c-0.032,0.048-0.053,0.102-0.095,0.144  c-0.197,0.196-0.457,0.287-0.715,0.281c-0.258,0.006-0.518-0.085-0.715-0.281c-0.042-0.042-0.062-0.096-0.095-0.144L3.425,29.81  c-0.048-0.032-0.101-0.053-0.144-0.095C3.084,29.518,2.995,29.258,3,29c-0.006-0.258,0.084-0.518,0.281-0.715  c0.043-0.042,0.096-0.062,0.144-0.095L26.221,5.395C26.404,5.16,26.676,5,26.996,5h0.021c0.002,0,0.004,0,0.006,0h4.029  c0.133-1.502,0.746-2.82,1.67-3.683l0.016,0.018C32.934,1.128,33.201,1,33.496,1c0.592,0,1.072,0.512,1.072,1.143  c0,0.375-0.18,0.691-0.441,0.899C33.648,3.484,33.307,4.181,33.193,5h4.775c0.002,0,0.004,0,0.008,0h0.02  c0.32,0,0.594,0.16,0.775,0.395l5.83,5.83c0.234,0.183,0.395,0.456,0.395,0.776v0.021c0,0.002,0,0.004,0,0.006v10.945  c0,0.002,0,0.004,0,0.007V23C44.996,23.32,44.836,23.593,44.602,23.775z M34.254,16.666C34.061,16.872,33.793,17,33.496,17  c-0.592,0-1.07-0.512-1.07-1.143c0-0.375,0.18-0.691,0.441-0.9c0.248-0.229,0.451-0.537,0.617-0.883  c-0.855,0.228-1.488,1-1.488,1.925c0,1.104,0.896,2,2,2c1.105,0,2-0.896,2-2c0-0.473-0.17-0.901-0.445-1.244  C34.936,16.302,34.254,16.666,34.254,16.666z M42.996,12.381L37.615,7h-4.213c0.174,0.444,0.424,0.822,0.725,1.1l0,0  c0.041,0.033,0.092,0.053,0.127,0.092l0.018-0.018c1.041,0.973,1.725,2.508,1.725,4.254c0,0.042-0.01,0.079-0.012,0.12  c1.197,0.691,2.012,1.97,2.012,3.452c0,2.209-1.791,4-4,4s-4-1.791-4-4c0-2.147,1.695-3.885,3.82-3.982  c-0.09-0.888-0.441-1.648-0.949-2.118c-0.041-0.033-0.092-0.053-0.129-0.092l-0.016,0.018C31.979,9.131,31.43,8.141,31.17,7h-3.793  l-22,22l15.619,15.619l22-22V12.381z M14.282,27.285c0.382-0.381,1-0.381,1.381,0l7.049,7.049c0.381,0.381,0.381,0.999,0,1.381  c-0.381,0.381-1,0.381-1.381,0l-7.049-7.049C13.901,28.285,13.901,27.667,14.282,27.285z M18.282,23.285  c0.382-0.381,1-0.381,1.381,0l7.048,7.049c0.381,0.381,0.381,0.999,0,1.381c-0.381,0.381-1,0.381-1.381,0l-7.048-7.049  C17.901,24.285,17.901,23.667,18.282,23.285z"
                                fill-rule="evenodd" />
                        </svg>
                    </span>${data.results[0].tags[0]}</p>`);

        for (let i = 1; i < data.results[0].tags.length; i++) {
            let newTag = document.createElement('p');
            newTag.className = "tags";
            newTag.innerText = data.results[0].tags[i];
            recipeContent.insertBefore(newTag, title);
        }

        title.textContent = data.results[0].name;
        description.textContent = data.results[0].description;
    })
}