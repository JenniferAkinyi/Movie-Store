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