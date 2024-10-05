async function loadParticles() {
    var enableParticles = true;

    if(enableParticles) {
        await loadAll(tsParticles);

        await tsParticles.load({
            id: "tsparticles",
            url: "/assets/json/particles.json",
        })
        .then(container => {
            console.log("callback - tsparticles config loaded");
        })
        .catch(error => {
            console.error(error);
        });
    }
}

function getYearCopyright() {
    var yearcr = document.querySelector('#yearcr');

    if(yearcr) {
        yearcr.innerHTML = new Date().getFullYear();
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    console.log("myscripts loaded");
    getYearCopyright();
    await loadParticles();
});