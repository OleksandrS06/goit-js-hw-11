import { Notify } from "notiflix";
import PixabayApi from "./js/dataFetch";
import createCards from "./js/createCards";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

var lightbox = new SimpleLightbox('.photo-card a', { });

const inputEl = document.querySelector("#search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreEl = document.querySelector(".load-more");

loadMoreEl.classList.add("disabled");

const pixabayApi = new PixabayApi();

async function onSubmitBntSubmit(event){
    event.preventDefault();
    clearInput()
    pixabayApi.page = 1;
    pixabayApi.searchQuery = event.target.elements.searchQuery.value.trim();
    if (!pixabayApi.searchQuery) {
        Notify.info('Please enter required name.')
        return
    }
    try {
    const searchResult = await pixabayApi.fetchData();
    const dataArr = searchResult.data.hits;

    if (dataArr.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      throw new Error('Limit error');
    }

    galleryEl.innerHTML = createCards(dataArr);
    lightbox.refresh();
    Notify.info(
      `Hooray! We found ${searchResult.data.totalHits} images.`
    );
    if (searchResult.data.totalHits > pixabayApi.per_page) {
     loadMoreEl.classList.remove("disabled");
    }
  } catch (err) {
    console.log(err);
  }
   
}
async function onLoadMoreBntClick (event) {
    event.preventDefault();
     pixabayApi.page += 1;

  try {
    const searchResult = await pixabayApi.fetchData();
      const dataArr = searchResult.data.hits;
      
      galleryEl.insertAdjacentHTML('beforeend', createCards(dataArr));
      console.log(pixabayApi.page);
    lightbox.refresh();
    slowScroll();
    if (
      Math.ceil(searchResult.data.totalHits / pixabayApi.per_page) === pixabayApi.page
    ) {
      console.log(Math.ceil(searchResult.data.totalHits / pixabayApi.per_page));
        
      loadMoreEl.classList.add("disabled");
      Notify.info(
        "'We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

inputEl.addEventListener("submit", onSubmitBntSubmit);
loadMoreEl.addEventListener("click", onLoadMoreBntClick)

function clearInput() {
    galleryEl.innerHTML = '';
}
function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
