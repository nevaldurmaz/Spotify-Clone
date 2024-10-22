// gönderilmesi gereken header'lar

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0affdc3067msh48a41702c1a693dp1befdbjsn111d611b5d95",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

export default class API {
  async getPopular() {
    const data1 = await this.searchMusic("Carla Morrison");
    const data2 = await this.searchMusic("Mark Eliyahu");
    const data3 = await this.searchMusic("Adele");
    return [...data1, ...data2,...data3];
  }

  async searchMusic(query) {
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;
    const res = await fetch(url, options);
    const data = await res.json();
    const formatted = data.tracks.hits.map((item) => item.track);
    return formatted;
  }
}
