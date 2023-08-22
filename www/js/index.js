var insideApp = 0;
const app = {
    init:()=>{
        document.addEventListener('deviceready', app.ready);
    },
    ready:()=>{
        document.querySelector('.ready').addEventListener('click', app.country);
        document.querySelector('.facematch').addEventListener('click',app.facematch);
    },
    country:() => {
        window.location.href = "country.html"
    },
    facematch:()=>{
        window.location.href = "facematch.html"
    }

}

app.init();