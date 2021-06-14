main()

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
    let bool = new URLSearchParams(url).get("tname") == pageType;
    return bool;
}




class CoursePageModifier {
    /*
    The CoursePageModifier class specifically modifies the UBC course section web page.
    When initialised, it does the following:
    Grabs the table on the page representing the instructor table, then grabs the instructor names.
    Call addRMPScores() to modify the web page and add the RateMyProfessor scores next to the professor names.
     */
    constructor() {
        this.instructorTable = this.getInstructorTable();
        this.instructorCells = this.getInstructorCells();
    }

    // Returns a raw table from the section page containing the instructors' names.
    getInstructorTable() {
        return document.getElementsByClassName('table')[2];
    }

    // Returns an array containing the cells representing the list of professors from UBC's course website.
    getInstructorCells() {
        let noMoreProfs;
        let instructorCells = [];

        for (let i = 0; i < this.instructorTable.rows.length; i++) {
            if (noMoreProfs) break;

            let row = this.instructorTable.rows[i];

            for (let j = 0; j < row.cells.length; j++) {
                let cell = row.cells[j];

                if (cell.textContent.replace(/\s/g, '') == 'Instructor:' ||
                    cell.textContent.replace(/\s/g, '') == '') continue;

                if (cell.textContent.replace(/\s/g, '') == 'TA:') {
                    noMoreProfs = true;
                    break;
                }

                instructorCells.push(cell);
            }
        }

        return instructorCells;
    }


    // Adds RMP scores to every cell in the given instructor cell array.
    // THIS IS A STUB FOR NOW. SUBJECT TO CHANGE LATER.
    addRMPScores() {
        for (let i = 0; i < this.instructorCells.length; i++) {
            this.addRMPScore((this.instructorCells)[i]);
        }
    }

    // Adds the RMP score to the given instructor cell object.
    addRMPScore(instructorCell) {
        let name = instructorCell.textContent
        instructorCell.appendChild(document.createTextNode(' [' + profData[name].quality + ']'));
    }
}




