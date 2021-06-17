main();

let profData;

function main() {
    const dataPath = chrome.runtime.getURL('src/data/data.json');

    fetch(dataPath)
        .then((response) => response.json())
        .then((json) => {
            profData = json;

            let url = window.location.href;

            if (isSectionsPage(url)) {
                let pageModifier = new CoursePageModifier();
                pageModifier.addRMPScores();
            }
            if (isCoursesPage(url)) {
                let pageModifier = new SectionsPageModifier();
            }
        })
}



// Returns true if the given URL is a course section page.
function isSectionsPage(url) {
    return isPage(url, 'subj-section');
}

// Returns true if the given URL is a course list page.
function isCoursesPage(url) {
    return isPage(url, 'subj-course');
}

// Helper function. Returns true if the given UBC page's tname == pageType.
function isPage(url, pageType) {
    return new URLSearchParams(url).get("tname") === pageType;
}


class SectionsPageModifier {


}


class CoursePageModifier {
    /*
    The CoursePageModifier class specifically modifies the UBC course section web page.
    When initialised, it does the following:
    Grabs the table on the page representing the instructor table, then grabs the instructor names.
    Call addRMPScores() to modify the web page and add the RateMyProfessor scores next to the professor names.
     */
    constructor() {
        this.instructorTable = document.getElementsByClassName('table')[2];
        this.instructorCells = this.#getInstructorCells();
    }

    // Adds RMP scores to every cell in the given instructor cell array.
    addRMPScores() {
        for (let i = 0; i < this.instructorCells.length; i++) {
            this.#addRMPScore((this.instructorCells)[i]);
        }
    }

    // Adds an RMP score element to the given instructor cell object.
    #addRMPScore(instructorCell) {
        let name = instructorCell.textContent;

        instructorCell.appendChild(this.#getRMPScoreElement(name));
        try {
            instructorCell.appendChild(this.#getPopUpWindow(name));
        } catch (e) {
            console.log(e);
        }
    }

    // Given a prof name, returns a pop up window containing information about the prof from src/data/data.json
    // How it works: It's an invisible HTML div element, with an ID equal to name. Show this element by changing its
    // style.display to 'block', and hide it by changing the style.display back to 'none'.
    #getPopUpWindow(name) {
        let popUpWindow = document.createElement('div');
        popUpWindow.id = name;
        popUpWindow.style.display = 'none';
        popUpWindow.innerHTML = 'Overall Quality:  ' + profData[name].quality     + '<br>' +
                                'Difficulty:       ' + profData[name].difficulty  + '<br>' +
                                'Would Take Again: ' + profData[name].takeAgain   + '<br>' +
                                'Based On:         ' + profData[name].numRatings  + '<br>';
        return popUpWindow;
    }

    // Given a prof name, returns a text element containing the prof's RMP quality score that, on mouse over, will
    // reveal a popup window with deeper information about the prof.
    // If src/data/data.json doesn't contain the prof's RMP quality score, return an element indicating no data.
    #getRMPScoreElement(name) {
        let rmpElement = document.createElement('strong');
        try {
            rmpElement.textContent = ' [' + profData[name].quality + ']';

            rmpElement.addEventListener('mouseenter', () => document.getElementById(name).style.display = 'block');
            rmpElement.addEventListener('mouseout', () => document.getElementById(name).style.display = 'none');
        } catch {
            rmpElement.textContent = ' [NO DATA]';
        }

        return rmpElement;
    }

    // Returns an array containing the table cell elements representing the list of professors from the UBC course page.
    #getInstructorCells() {
        let noMoreProfs;
        let instructorCells = [];

        for (let i = 0; i < this.instructorTable.rows.length; i++) {
            if (noMoreProfs) break;

            let row = this.instructorTable.rows[i];

            for (let j = 0; j < row.cells.length; j++) {
                let cell = row.cells[j];

                if (cell.textContent.replace(/\s/g, '') === 'Instructor:' ||
                    cell.textContent.replace(/\s/g, '') === '') continue;

                if (cell.textContent.replace(/\s/g, '') === 'TA:') {
                    noMoreProfs = true;
                    break;
                }

                instructorCells.push(cell);
            }
        }

        return instructorCells;
    }
}




