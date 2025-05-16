// Yeni Ghibli API uç noktası
const API_URL = 'https://ghibliapi.vercel.app/films'; //Bu URL, filmlerin verilerini JSON formatında döndürür.

async function fetchMovies() {  //fetchMovies: Asenkron (async) fonksiyon. API'den veri çekmek için kullanılır.


  try {
    
    const response = await fetch(API_URL); //fetch(API_URL): API'ye GET isteği gönderir. await: Cevabın gelmesini bekler.
    if (!response.ok) {  //response.ok: HTTP 200–299 aralığında mı kontrol eder.
      throw new Error(`Hata kodu: ${response.status}`); //hata varsa hata mesajı oluşturur.
    }

    const data = await response.json(); //response.json(): Gelen cevabı JSON objesine dönüştürür.
    displayMovies(data.slice(0, 9)); // İlk 9 filmi çeker
  } catch (error) {
    document.getElementById('film-listesi').innerHTML = `
      <div class="alert alert-danger">
        Veriler yüklenirken hata oluştu: ${error.message}
      </div>
    `;
  }
}

function displayMovies(movies) {  // displayMovies: Filmleri ekranda göstermek için kullanılır.
  const container = document.getElementById('film-listesi'); //htmlde filmlerin gösterileceği yer.
  container.innerHTML = ''; // Önceki içerikleri temizler.

  movies.forEach(movie => { // forEach: Her film için döngü başlatır.
    

    // Örnek: Filmler için placeholder resmi
    const placeholderImage = 'https://via.placeholder.com/300x450?text=Ghibli+Film';

    // Poster URL (yoksa placeholder kullan)
    const posterUrl = movie.image ? movie.image : placeholderImage;

    const card = document.createElement('div'); // bootstrap sınıfları kullanılarak bir kart oluşturulur.
    card.className = 'col-md-6 col-lg-4'; //col-md-6: Orta boyutlu ekranlarda 2 sütun, col-lg-4: Büyük ekranlarda 3 sütun yapar.
    card.innerHTML = ` 
      <div class="card h-100"> 
        <img src="${posterUrl}" class="card-img-top" alt="${movie.title}">
        <div class="card-body text-center">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text"><em>${movie.original_title}</em></p> 
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', fetchMovies);