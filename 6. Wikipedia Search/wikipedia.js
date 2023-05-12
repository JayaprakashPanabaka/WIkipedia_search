let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    // 1. Div container -- result-item
    let resultsItemEl = document.createElement("div");
    resultsItemEl.classList.add("result-item");

    searchResultsEl.appendChild(resultsItemEl);

    // 2. Anchor Title -- result-title
    let resultsTitleEl = document.createElement("a");
    resultsTitleEl.classList.add("result-title");
    resultsTitleEl.textContent = title;
    resultsTitleEl.href = link;
    resultsTitleEl.target = "_blank";

    resultsItemEl.appendChild(resultsTitleEl);

    // 3. Title Break(line break)
    let titleBreakEl = document.createElement('br');

    resultsItemEl.appendChild(titleBreakEl);

    // 4. Anchor url -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";

    resultsItemEl.appendChild(urlEl);

    // 5. Line break
    let lineBreakEl = document.createElement("br");

    resultsItemEl.appendChild(lineBreakEl);

    // 6. Paragraph description -- line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;

    resultsItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    // let result = searchResults[0];
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        // console.log(searchInput);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                // console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);