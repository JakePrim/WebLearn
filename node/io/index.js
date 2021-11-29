function B(callback) {
    setTimeout(function () {
        callback({test: "test"});
    }, 2000);
}

B(function (result) {
    console.log(result);
})