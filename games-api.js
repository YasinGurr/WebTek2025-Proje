// Yeni Ghibli API uç noktası
const API_URL = 'https://ghibliapi.vercel.app/films';

async function fetchMovies() {
  try {
    // Kullanıcıya yükleniyor göstergesi
    document.getElementById('oyunlar-listesi').innerHTML = `
      <div class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Hata kodu: ${response.status}`);
    }

    const data = await response.json();
    displayMovies(data.slice(0, 9)); // İlk 9 filmi göster
  } catch (error) {
    document.getElementById('oyunlar-listesi').innerHTML = `
      <div class="alert alert-danger">
        Veriler yüklenirken hata oluştu: ${error.message}
      </div>
    `;
  }
}

function displayMovies(movies) {
  const container = document.getElementById('oyunlar-listesi');
  container.innerHTML = '';

  movies.forEach(movie => {
    // Ghibli API'si genelde resmi direkt sağlamaz. Bu nedenle ya:
    // 1. API verilerindeki bir alanı kullanarak
    // 2. Kendi bir poster listenizle eşleştirerek
    // 3. Ancak yoksa placeholder görüntü kullanarak
    // uygulama yapabilirsiniz.

    // Örnek: Filmler için placeholder resmi
    const placeholderImage = 'https://via.placeholder.com/300x450?text=Ghibli+Film';

    // Poster URL (yoksa placeholder kullan)
    const posterUrl = movie.image ? movie.image : placeholderImage;

    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
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