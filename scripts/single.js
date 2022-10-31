// Fetching the single task by id which we obtain through localstorage
async function fetchSingleTask() {
    let id = localStorage.getItem('ID')
    const response = await fetch(`https://simple-crud-node-mongo.herokuapp.com/api/find/${id}`)

    let data = await response.json()
    let statusImg = 'unchecked.png'
    if (data.checked) {
        statusImg = 'checked.png'
    }

    // Quite similar work as in list.html only we dont map here since we are accepting single object from API
    const myContent = document.querySelector('.mapContainer')

    const singleTask = `
        <div class="w3-panel w3-card">
            <div class="cardContainer" id="card">
                <div class="leftPanel">
                    <div class="imgContent">
                        <img class="img img2" src="../../assets/${statusImg}" width="25" alt="checked" onclick="editStatus('${data._id}', ${data.checked})">
                    </div>
                    <div>
                        <h3 id="title">${data.title}</h3>
                        <p id="desc">${data.description}</p>
                    </div>
                </div>
                <div class="arrowContent">
                </div>
            </div>
        </div>
    `

    myContent.innerHTML = singleTask
}

// Obtaining data from the img which has an onclick event passing id of the task and is it checked or not
async function editStatus(id, status) {
    const response = await fetch(`https://simple-crud-node-mongo.herokuapp.com/api/update/${id}`, {
        // Using PATCH to satisfy API
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ checked: !status })

    })
    let data = await response.json()

    window.location.reload()
}

fetchSingleTask()