/* global $ */

function delete_element (activity) { // This will be called on click and passes the activity
 $.post('/remove' +activity) // This calls the server.
}
