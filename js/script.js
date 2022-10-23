"use strict";
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.

const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c.jpg',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const containerTop = document.getElementById("carosello-top");

let contImage = "";

// stampo le immagini
for(let i = 0; i < images.length; i++){
    const obj = images[i];
    contImage += `
        <div 
        class="slide-image hidden"
        style= "
        background-image: url(${obj["url"]});
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: relative;
        ">
            <div class="description">
                <h1>${obj["title"]}</h1>
                <p>${obj["description"]}</p>
            </div>
        </div>
        `
};
// inserisco le immagini  
containerTop.innerHTML = contImage;

const containerThumbnails = document.getElementById("carosello-thumbnails");
let contThumbnails = "";

// stampo i thumbnails
for(let i = 0; i < images.length; i++){
    const obj = images[i];
    contThumbnails += `
        <div style= "
        background-image: url(${obj["url"]});
        background-position: center;
        background-size: cover;
        width: calc(100% / 5);
        height: 100%;
        position: relative;">
        <div class="miniature dark"></div>
        </div>
        `;
};

// inserisco i thumbnails
containerThumbnails.innerHTML = contThumbnails;

// i pulsanti all'interno del thumbnails
containerThumbnails.innerHTML += `
    <span id="right-btn">
        <i class="fa-solid fa-chevron-right"></i>
    </span>
    <span id="left-btn">
        <i class="fa-solid fa-chevron-left"></i>
    </span>
`;

let select = 0;
// seleziono la classe all'interno dell'imagine 
const imageSlide = document.getElementsByClassName("slide-image");
imageSlide[select].classList.add("active");
imageSlide[select].classList.remove("hidden");

// contenitore per poter selezionare la miniatura 
const miniature = document.getElementsByClassName("miniature");

// a la prima miniatura va tolta l'effetto dark
miniature[select].classList.remove("dark");

// prendo i pulsanti
let btnRight = document.getElementById("right-btn");
let btnLeft = document.getElementById("left-btn");

// immagine seguente
function next(){
    imageSlide[select].classList.remove("active");
    imageSlide[select].classList.add("hidden");
    miniature[select].classList.add("dark");
    if(select < imageSlide.length - 1){
        select++;
    } 
    else{
        select = 0;
    }
    imageSlide[select].classList.add("active");
    imageSlide[select].classList.remove("hidden");
    miniature[select].classList.remove("dark");
};

btnRight.addEventListener("click", next);
// immagine precedente
function preview(){
    imageSlide[select].classList.remove("active");
    imageSlide[select].classList.add("hidden");
    miniature[select].classList.add("dark");

    if(select >  0){
        select--;
    } 
    else{
        select = imageSlide.length - 1;
    }
    imageSlide[select].classList.add("active");
    imageSlide[select].classList.remove("hidden");
    miniature[select].classList.remove("dark");
};

btnLeft.addEventListener("click", preview);

// funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi)
//  l’immagine attiva dovrà cambiare alla successiva.
setInterval(autoplay, 3000);

function autoplay(){
    next();
};