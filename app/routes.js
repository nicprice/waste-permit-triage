const express = require('express')
const router = express.Router()

var activities = []
var assessments = []
//add another activity to the activities list
router.post('/types-of-waste', function (req, res) {
  let newActivities = req.session.data['new-waste-activities']
  Array.prototype.push.apply(activities, newActivities);
  if (newActivities == undefined) {
    res.redirect('types-of-waste');
  } else {
    res.redirect('activities');
  }
})

//pass activities data to the activities page
router.get('/activities', function(req, res) {
    res.render('activities', { 'allactivities' : activities });
});

//remove activity from activities list
router.post("/remove:activity", function (req, res) {
    let activity = req.params.activity
    var deleteName = activities.indexOf(activity);
    activities.splice(deleteName, 1);
    res.redirect('activities');
})

//pass activities data to the types of waste page
router.get('/types-of-waste', function(req, res) {
    res.render('types-of-waste', { 'allactivities' : activities });
});

//pass activities data to the assessments page
router.get('/add-assessments', function(req, res) {
    res.render('add-assessments', { 'allactivities' : activities });
});

//add default assessments to the assessments list
router.post('/confirm-activities-assessments', function (req, res) {

var assessments = req.session.data['waste-assessments'] || []
var firePrevention = req.session.data['combustible-waste'] || []

for (var i = 0; i < activities.length; i++){
  var activityItem = activities[i];
  switch (activityItem) {
     case 'Biological treatment of waste - not composting':
     case 'Composting facility':
     case 'Household waste amenity site taking hazardous waste':
     case 'Household waste amenity site taking non-hazardous waste only':
     case 'Household, commercial and industrial waste transfer station':
       assessments.unshift("Odour management plan");
     break;
     default:
     break;
   }
 }

if (firePrevention.indexOf("combustible-waste") || activities.indexOf("Household waste amenity site taking hazardous waste") || activities.indexOf("Household waste amenity site taking non-hazardous waste only") || activities.indexOf("Household, commercial and industrial waste transfer station") > -1)
{
    assessments.unshift("Fire prevention plan");
}
  res.redirect('confirm-activities-assessments');
})

//pass activities data to the check your answers page
router.get('/confirm-activities-assessments', function(req, res) {
    res.render('confirm-activities-assessments', { 'allactivities' : activities });
});


module.exports = router
