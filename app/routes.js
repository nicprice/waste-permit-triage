const express = require('express')
const router = express.Router()



//add another activity to the activities list
router.post('/types-of-waste', function (req, res) {
      let anotherActivity = req.session.data['another-activity']
      let activities = req.session.data['waste-activities']
      let newActivities = req.session.data['waste-activities-another']
      if ( anotherActivity == 'true') {
        activities.push(newActivities)
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




module.exports = router
