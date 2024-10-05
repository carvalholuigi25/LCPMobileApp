function getYearCopyright() {
    var yearcr = document.querySelector('#yearcr');

    if(yearcr) {
        yearcr.innerHTML = new Date().getFullYear();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("myscripts loaded");
    getYearCopyright();
});