let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    // div container - result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item")
    searchResultsEl.appendChild(resultItemEl)

    // anchor title - result-title
    let anchorTitle = document.createElement("a");
    anchorTitle.classList.add("result-title");
    anchorTitle.textContent = title;
    anchorTitle.href = link;
    anchorTitle.target = "_blank";
    resultItemEl.appendChild(anchorTitle)

    // title break 
    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);

    // anchor url -  result-url 
    let anchorUrl = document.createElement("a");
    anchorUrl.classList.add("result-url");
    anchorUrl.textContent = link;
    anchorUrl.href = link;
    anchorUrl.target = "_blank";
    resultItemEl.appendChild(anchorUrl)
    // url break 
    let breakEl2 = document.createElement("br");
    resultItemEl.appendChild(breakEl2);
    // paragraph description  -    line-description
    let paragraphEl = document.createElement("p");
    paragraphEl.textContent = description;
    paragraphEl.classList.add("line-description");
    resultItemEl.appendChild(paragraphEl);
}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResults(result)
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results)
            })
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia)