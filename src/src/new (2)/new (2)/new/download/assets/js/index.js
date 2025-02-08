const searchBar = document.querySelector(".search-bar-container");  
const magnifier = document.querySelector(".magnifier"); 

magnifier.addEventListener("click", ()=>{ 
    searchBar.classList.toggle("active"); 
});


let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}


document.getElementById('download-button').addEventListener('click', function() {
    const myDiv = document.getElementById('parts');
    if (myDiv.style.display === 'none') {
        myDiv.style.display = 'block';
    } else {
        myDiv.style.display = 'none';
    }
});

document.getElementById("quality1").addEventListener("click",function(){
    const quality1=document.getElementById("open-quality1");
    if(quality1.style.display==="none"){
        quality1.style.display="block";
    }
    else{
        quality1.style.display="none"
    }
})

document.getElementById("quality2").addEventListener("click",function(){
    const quality2=document.getElementById("open-quality2");
    if(quality2.style.display==="none"){
        quality2.style.display="block";
    }
    else{
        quality2.style.display="none"
    }
})

document.getElementById("quality3").addEventListener("click",function(){
    const quality3=document.getElementById("open-quality3");
    if(quality3.style.display==="none"){
        quality3.style.display="block";
    }
    else{
        quality3.style.display="none"
    }
})

document.getElementById("quality4").addEventListener("click",function(){
    const quality4=document.getElementById("open-quality4");
    if(quality4.style.display==="none"){
        quality4.style.display="block";
    }
    else{
        quality4.style.display="none"
    }
})

document.getElementById("quality5").addEventListener("click",function(){
    const quality5=document.getElementById("open-quality5");
    if(quality5.style.display==="none"){
        quality5.style.display="block";
    }
    else{
        quality5.style.display="none"
    }
})

document.getElementById("quality6").addEventListener("click",function(){
    const quality6=document.getElementById("open-quality6");
    if(quality6.style.display==="none"){
        quality6.style.display="block";
    }
    else{
        quality6.style.display="none"
    }
})

document.getElementById("quality7").addEventListener("click",function(){
    const quality7=document.getElementById("open-quality7");
    if(quality7.style.display==="none"){
        quality7.style.display="block";
    }
    else{
        quality7.style.display="none"
    }
})

document.getElementById("quality8").addEventListener("click",function(){
    const quality8=document.getElementById("open-quality8");
    if(quality8.style.display==="none"){
        quality8.style.display="block";
    }
    else{
        quality8.style.display="none"
    }
})

document.getElementById("quality9").addEventListener("click",function(){
    const quality9=document.getElementById("open-quality9");
    if(quality9.style.display==="none"){
        quality9.style.display="block";
    }
    else{
        quality9.style.display="none"
    }
})

document.getElementById("quality10").addEventListener("click",function(){
    const quality10=document.getElementById("open-quality10");
    if(quality10.style.display==="none"){
        quality10.style.display="block";
    }
    else{
        quality10.style.display="none"
    }
})



let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})




//api
let movieVideo=document.getElementById("myVideo");
let movieDescription= document.getElementById("movie-description")

const fetchProducts=async ()=>{
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Network Error");
        Movies = await response.json();
        displayMovies();
    }
 catch (error){
    console.error("Error fetching movies" , error);
 }
};


const displayMovies=()=>{
    let movieId = new URLSearchParams(window.location.search).get("id");
    let movie = Movies.find(m=>m.id==movieId);
 if (movie){
    movieVideo.src= movie.image;
    movieDescription.textContent=movie.description;
 }


};

fetchProducts();



//search


document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".magnifier");
    const searchInput = document.querySelector(".input");

    async function fetchProducts() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    searchIcon.addEventListener("click", async function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const products = await fetchProducts();
        const foundProduct = products.find(product => product.title.toLowerCase().includes(query));

        if (foundProduct) {
            window.location.href = `imdex.html?id=${foundProduct.id}`;
            document.querySelector('.input').value = '';
        } else {
            const searchMessage1 = document.getElementById('search-message1');
            searchMessage1.textContent = 'فیلمی با این عنوان پیدا نشد!'; 
            // بعد از یک ثانیه متن را پاک کن
            setTimeout(() => {
                searchMessage1.textContent = "";
            }, 2000);
            document.querySelector('.input').value = '';
        }
    });
});
