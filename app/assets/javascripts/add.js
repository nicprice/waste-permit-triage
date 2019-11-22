/* global $ */

function add_element (activity) { // This will be called on click and passes the activity
 $.post('/add' +activity) // This calls the server.
}
