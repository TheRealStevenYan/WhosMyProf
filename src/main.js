

document.getElementsByClassName("section-summary").onmousemove = function(event) {
    alert('a');
};






function isSectionsPage(url) {
    URLSearchParams(url).has("subj-section");
    alert(url)
    alert(bool)
    return bool;
}

function isCoursesPage(url) {
    let bool = new URLSearchParams(url).has("subj-course");
    return bool;
}


function findRMPProf(name) {
    let search_url = 'https://www.ratemyprofessors.com/search/teachers?query=' + name;

}



// Returns a raw table from the section page containing the instructors' names.
function getInstructorTable() {
    return document.getElementsByClassName('table')[2];
}

// Returns an array containing the cells representing the list of professors from UBC's course website.
function getInstructorCells(instructorTable) {
    let noMoreProfs;
    let instructorCells = [];

    for (let i = 0; i < instructorTable.rows.length; i++) {
        if (noMoreProfs) break;

        let row = instructorTable.rows[i];

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
function addRMPScores(instructorCells) {
    for (let i = 0; i < instructorCells.length; i++) {
        addRMPScore((instructorCells)[i], 0)
    }
}

// Adds the RMP score to the given instructor cell object.
function addRMPScore(instructorCell, score) {
    instructorCell.appendChild(document.createTextNode(' [' + score + ']'));
}




function main() {
    let url = window.location.href;
    if (isSectionsPage(url)) {
        let instructorTable = getInstructorTable();
        let instructorCells = getInstructorCells(instructorTable);
        addRMPScores(instructorCells);
    }
}


main()

