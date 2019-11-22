const express = require('express')
const router = express.Router()



//add another activity to the activities list
router.post('/types-of-waste', function (req, res) {
      let anotherActivity = req.session.data['another-activity']
      let activities = req.session.data['waste-activities']
      let newActivities = req.session.data['waste-activities-another']
      if ( anotherActivity == 'true') {
        Array.prototype.push.apply(activities, newActivities);
        res.redirect('activities-summary')
      } else {
        res.redirect('types-of-waste')
      }
})


//remove activity from activities list
router.post("/remove:activity", function (req, res) {
    let activities = req.session.data['waste-activities']
    let activity = req.params.activity
    var deleteName = activities.indexOf(activity);
    activities.splice(deleteName, 1);
    res.redirect('activities-summary');
})

//add default assessments to the assessments list
router.post('/confirm-activities-assessments', function (req, res) {
var activities = req.session.data['waste-activities']
var assessments = req.session.data['waste-assessments']
console.log(activities);
if (activities.indexOf("Hazardous waste transfer station") > -1) {
    assessments.push("Dust and emissions management plan");
}
if (activities.indexOf("Clinical waste transfer station") > -1) {
    assessments.push("Habitats assessment");
}
  res.redirect('confirm-activities-assessments');
})


module.exports = router
