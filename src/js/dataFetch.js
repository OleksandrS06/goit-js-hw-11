import axios from "axios";
// const axios = require('axios');

export default class PixabayApi {
  #base_URL = "https://pixabay.com/api/";
  #my_key = "31570708-f49245bd3924d0f8b6ae286b4";

  constructor() {
    this.page = 1;
    this.searchQuery = null;
    this.per_page = '40';
  }

  async fetchData() {
    try {
      const searchParams = {
        params: {
          q: this.searchQuery,
          page: this.page,
          per_page: this.per_page,
          image_type: 'photo',
          orientation: 'horizontal',
          key: this.#my_key,
        },
      };

      // return await axios.get(`${this.#base_URL}`, searchParams);
      return await axios(`${this.#base_URL}`, searchParams);

    } catch (error) {
      console.log(error);
    }
  }
}











// const URL = "https://pixabay.com/api/";
// const myKey = "31570708-f49245bd3924d0f8b6ae286b4";
// const imageType = "photo";
// const orientation = "horizontal";
// const adult = "true";
// const objectsPerRequest = 5;


// const getData = async (request, page) => {
//   console.log(request, page);
//     try {
//       const response = await axios.get(`${URL}?key=${myKey}&q=${request}&page=${page}&image_type=${imageType}&orientation=${orientation}&safesearch=${adult}&per_page=${objectsPerRequest}`);
//       console.log(response);
//         return response.data;
//     } catch (error) {
//     console.error(error);
//    }
// }
//  export default getData




