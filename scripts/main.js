import API from "./api.js";
import UI from "./ui.js";

const api = new API();
const ui = new UI();

document.addEventListener("DOMContentLoaded", async () => {
  ui.renderLoader();
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});
ui.form.addEventListener("submit", (e) => {
  // sayfayı yenlimeyi engelle
  e.preventDefault();

  // aratılan kelimeye eriş
  const query = e.target[0].value;

  // aratılan kelime boşsa fonksiyonu durdur
  if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın");

  // ekrana loader bas
  ui.renderLoader();

  // başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");

  // api'dan verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});
// liste alanındaki tıklama olaylarını izle ve
ui.list.addEventListener("click", (e) => {
  // eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    // oynatılacak şarkının kardına eriş
    const card = e.target.closest(".card");

    // oynatılacak şarkının bilgilerini al
    const data = card.dataset;

    // player alanını tekrar renderla
    ui.renderPlayer(data);
  }
});
