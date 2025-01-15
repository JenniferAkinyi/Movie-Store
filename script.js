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
 