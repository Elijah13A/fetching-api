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


// api
// تابع عمومی برای بارگذاری داده‌ها
const fetchMovies = async (apiUrl, sliderId) => {
    const keenSlider = document.getElementById(sliderId);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const movies = await response.json(); 
        console.log(movies);
        addDataToHTML(movies.movies, keenSlider); 
    } catch (error) {
        console.error("Error fetching Movies:", error);
    }
};

// تابع عمومی برای افزودن داده‌ها به HTML
const addDataToHTML = (movies, keenSlider) => {
    keenSlider.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن داده جدید

    if (movies.length > 0) {
        movies.forEach((movie) => {
            const slideItem = document.createElement("div");
            slideItem.classList.add("keen-slider__slide");

            slideItem.innerHTML = `
                <div class="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12 poster poster-back">
                    <div style="position: relative;" class="row">
                        <div class="col-md-4 col-6 img-container">
                            
                                <img src="${movie.image}" class="img-poster">
                           
                        </div>
                        <div class="col-6 col-md-8 info">
                            <h3 class="spanb-sm" style="margin-bottom: 18px;">${movie.title}</h3>
                            <span class="f-info success delete-green"> زیرنویس قسمت ${movie.lastSubtitle} اضافه شد </span>
                            <div class="f-info">
                                <span>تاریخ بروزرسانی :</span>
                                <span>${movie.updateDate}</span>
                            </div>
                            <div class="f-info">
                                <span>آخرین قسمت :</span>
                                <span>${movie.duration}</span>
                            </div>
                        </div>
                        <button class="watch-btn specialbutton">
                            <a href="download/imdex.html?id=${movie.id}" class="f-info btn-a">تماشا و دانلود</a>
                        </button>
                    </div>
                </div>
            `;

            keenSlider.appendChild(slideItem);
        });
    }
};


fetchMovies("https://www.dramoir.com/main/homepage/recent_highest_rated/?format=json", "keen-slider");
fetchMovies("https://www.dramoir.com/main/homepage/recent_highest_rated/?format=json", "keen-slider2");
fetchMovies("https://www.dramoir.com/main/homepage/recent_highest_rated/?format=json", "keen-slider3");
fetchMovies("https://www.dramoir.com/main/homepage/recent_highest_rated/?format=json", "keen-slider4");

    

//search
document.querySelector('.search-btn').addEventListener('click', async function () {
    const inputElement = document.querySelector('input[data-search]');
    const searchValue = inputElement.value.trim().toLowerCase();
    const searchMessage = document.getElementById('search-message');

    if (!searchValue) return;

    try {
        const response = await fetch('https://fakestoreapi.com/products'); 
        const data = await response.json();

        const foundMovie = data.find(item => item.title.toLowerCase().includes(searchValue));
        
        if (foundMovie) {
            window.location.href = `download/imdex.html?id=${foundMovie.id}`;
            document.querySelector('.sec-search').value = '';
        } else {
            searchMessage.textContent = 'فیلمی با این عنوان پیدا نشد!';
            searchMessage.style.color = 'red';
            document.querySelector('.sec-search').value = '';

        }
    } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
    }
});


document.querySelector('.delete-btn').addEventListener('click', function () {
    document.querySelector('input[data-search]').value = ''; // پاک کردن مقدار ورودی
});

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
            window.location.href = `download/imdex.html?id=${foundProduct.id}`;
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
