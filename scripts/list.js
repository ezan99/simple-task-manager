// Simple function which returns tasks from server
async function fetchTasks() {
    const response = await fetch(`https://simple-crud-node-mongo.herokuapp.com/api/list`)
    return response.json()
}

// Sort of a render function which displays the fetched data
async function displayTasks() {

    let data = await fetchTasks()

    const myContent = document.querySelector('.mapContainer')

    // Map method is native to arrays which iterates through them one by one at the same time generating some HTML
    const showInHTML = data.map((task) => {
        let statusImg = 'unchecked.png'
        if (task.checked) {
            statusImg = 'checked.png'
        }
        return `
        <div class="w3-panel w3-card">
            <div class="cardContainer" id="card">
                <div class="leftPanel">
                    <div class="imgContent">
                        <img class="img" src="../../assets/${statusImg}" width="25" alt="checked">
                    </div>
                    <div>
                        <h3 id="title">${task.title}</h3>
                        <p id="desc">${task.description}</p>
                    </div>
                </div>
                <div class="arrowContent">
                    <img class="arrow" src="../../assets/arrow.png" alt="" onclick="viewTask('${task._id}')">
                </div>
            </div>
        </div>
        `
    })

    // Appending the array of Card elements to mapContainer
    myContent.innerHTML = showInHTML
}

// We simply accept the id from onClick function ln:50, col: 98
function viewTask(id) {
    // Set the id at local storage because we need it for fetching the data for that task with that id
    localStorage.setItem('ID', id)
    window.location.href = '../single/single.html'
}

displayTasks()

module.exports = { fetchTasks }