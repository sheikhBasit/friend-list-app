const { Axios } = require("axios");

Axios.get("http://localhost:3000/api/friends")
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
