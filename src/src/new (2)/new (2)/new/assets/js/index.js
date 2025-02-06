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
        addDataToHTML(movies, keenSlider); 
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
                            <a href="${movie.url}">
                                <img src="${movie.image}" class="img-poster">
                            </a>
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
                                <span>${movie.lastEpisode}</span>
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

// استفاده از تابع برای دو اسلایدر
fetchMovies("https://fakestoreapi.com/products", "keen-slider");
fetchMovies("https://fakestoreapi.com/products", "keen-slider2");
fetchMovies("https://fakestoreapi.com/products", "keen-slider3");
fetchMovies("https://fakestoreapi.com/products", "keen-slider4");

    