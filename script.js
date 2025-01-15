const url = './data.json'
let movies = []

let viewPopup = document.querySelector('#view-popup')
let closeViewPopup = document.querySelector('#close-view-popup')
if (!closeViewPopup) {
    console.error('Close popup button not found!')
} else {
    closeViewPopup.addEventListener('click', () => {
        console.log('Close button clicked')
        viewPopup.style.display = 'none'
    })
}
const fetchMovie = async() => {
    try {
        const response = await fetch(url)
        movies = await response.json()
        renderMovies(movies)

    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
const renderMovies = (data) => {
    const contentDisplay = document.querySelector('#contentDisplay')
    let output = ''
        data.forEach(({ imageUrl, id, title, description})=> {
            output += `
                <div class="content">
                    <img src="${imageUrl}" alt="${id}" loading="lazy" />
                    <div class="content__description">
                        <h4>${title}</h4>
                        <div class="action=buttons">
                        <button class="view" data-id="${id}">View</button>
                            <button class="edit" 
                                data-id="${id}" 
                                data-title="${title}" 
                                data-imageurl="${imageUrl}"  
                                data-description="${description}">Edit
                            </button>
                            <button class="delete" 
                                data-id="${id}">Delete
                            </button>
                        </div>
                    </div>
                </div>
            `
        })
        contentDisplay.innerHTML = output

        document.querySelectorAll('.view').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id')
                const selectedItem = data.find(item => item.id == id)

                if (selectedItem) {
                    document.getElementById('popup-title').textContent = selectedItem.title
                    document.getElementById('popup-image').src = selectedItem.imageUrl
                    document.getElementById('popup-description').textContent = `Description: ${selectedItem.description}`
                    viewPopup.style.display = 'flex'
                }
            })
        })
    } 
fetchMovie()

const popupForm = document.getElementById('popup-form')
const addMovieButton = document.getElementById('add-movie-button')
const addMoviePopup = document.getElementById('popup-form')
const closeAddMoviePopup = document.getElementById('close-popup')
const movieForm = document.getElementById('dataForm')

addMovieButton.addEventListener('click', () => {
    popupForm.style.display = 'flex'
})

closeAddMoviePopup.addEventListener('click', () => {
    popupForm.style.display = 'none'
})
movieForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const imageUrl = document.getElementById('imageUrl').value
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value

    const newMovie = {
        id: movies.length + 1, 
        imageUrl,
        title,
        description,
    };
    movies.push(newMovie)
    renderMovies(movies)
    movieForm.reset()
    addMoviePopup.style.display = 'none'
})

const deletePopup = document.getElementById('delete-confirmation-popup');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
let movieToDeleteId = null;
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('delete')) {
      movieToDeleteId = e.target.getAttribute('data-id');
      deletePopup.style.display = 'flex';
    }
});
confirmDeleteButton.addEventListener('click', () => {
    if (movieToDeleteId) {
      const movieIndex = movies.findIndex((movie) => movie.id == movieToDeleteId);
      if (movieIndex > -1) {
        movies.splice(movieIndex, 1);
        renderMovies(movies);
        saveMoviesToLocalStorage(movies);
        console.log(`Movie with ID ${movieToDeleteId} has been deleted.`);
      } else {
        console.error('Movie not found!');
      }
      movieToDeleteId = null;
      deletePopup.style.display = 'none';
    }
  });
  cancelDeleteButton.addEventListener('click', () => {
    deletePopup.style.display = 'none';
    movieToDeleteId = null;
  });
 
 
const editPopup = document.getElementById('edit-popup-form')
const closeEditPopup = document.getElementById('close-edit-popup')
const editForm = document.getElementById('editDataForm')
 
closeEditPopup.addEventListener('click', () => {
    editPopup.style.display = 'none';
});
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('edit')) {
      const id = e.target.getAttribute('data-id');
      const title = e.target.getAttribute('data-title');
      const imageUrl = e.target.getAttribute('data-imageurl');
      const description = e.target.getAttribute('data-description');
      document.getElementById('edit-title').value = title;
      document.getElementById('edit-imageUrl').value = imageUrl;
      document.getElementById('edit-description').value = description;
      editForm.setAttribute('data-id', id);
      editPopup.style.display = 'flex';
    }
})
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = editForm.getAttribute('data-id');
    const updatedTitle = document.getElementById('edit-title').value;
    const updatedImageUrl = document.getElementById('edit-imageUrl').value;
    const updatedDescription = document.getElementById('edit-description').value;
    const movieIndex = movies.findIndex((movie) => movie.id == id);
    if (movieIndex > -1) {
      movies[movieIndex] = {
        ...movies[movieIndex],
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        description: updatedDescription,
    };
    renderMovies(movies);
    saveMoviesToLocalStorage(movies);
    editPopup.style.display = 'none';
  } else {
    console.error('Movie not found!');
  }
});
 