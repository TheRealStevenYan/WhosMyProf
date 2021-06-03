export default class SectionPage {
    instructorTable;
    instructorCells;

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
    addRMPScores(instructorCells) {
        for (let i = 0; i < instructorCells.length; i++) {
            this.addRMPScore(instructorCells[i], 0)
        }
    }

    // Adds the RMP score to the given instructor cell object.
    addRMPScore(instructorCell, score) {
        instructorCell.appendChild(document.createTextNode(' [' + score + ']'));
    }
}



/*
Formatted HTML table sample from UBC course website.
Use this as reference.
<table class="table">
    <tr>
        <td>Instructor:  </td>
        <td><a href="/cs/courseschedule?pname=inst&amp;ubcid=926073&amp;catano=188&amp;term=A&amp;sessyr=2021&amp;sesscd=S&amp;campuscd=UBC&amp;dept=EOSC&amp;course=114&amp;section=98A">VER, LEAH MAY</a></td>
    </tr>
    <tr>
        <td>TA:  </td>
        <td><a href="/cs/courseschedule?pname=inst&amp;ubcid=1692645&amp;catano=188&amp;term=A&amp;sessyr=2021&amp;sesscd=S&amp;campuscd=UBC&amp;dept=EOSC&amp;course=114&amp;section=98A">KUZMENKO, YULIYA</a></td>
    </tr>
    <tr>
        <td></td>
        <td><a href="/cs/courseschedule?pname=inst&amp;ubcid=1998675&amp;catano=188&amp;term=A&amp;sessyr=2021&amp;sesscd=S&amp;campuscd=UBC&amp;dept=EOSC&amp;course=114&amp;section=98A">MEHRABIFARD, ALI</a></td>
    </tr>
    <tr>
        <td></td>
        <td><a href="/cs/courseschedule?pname=inst&amp;ubcid=1853045&amp;catano=188&amp;term=A&amp;sessyr=2021&amp;sesscd=S&amp;campuscd=UBC&amp;dept=EOSC&amp;course=114&amp;section=98A">SUN, YUANJI</a></td>
    </tr>
</table>
*/