/* global $ */

function delete_element (activity) { // This will be called on click and passes the activity
 $.post('/remove' +activity) // This calls the server.
}


//add more activities button show and hide
function togglecheckboxes() {
    document.getElementsByTagName('div')[7].classList.toggle("govuk-visually-hidden");
}
