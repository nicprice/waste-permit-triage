const express = require('express')
const router = express.Router()


var activities = []
var assessments = []

// //////////////////////////////
//INDEX PAGE - BLANKS VARIABLES USED IN THE PROTOTYPE
router.get('/', function(req, res) {
  var activities = []
  var assessments = []
    res.render('index');
});


// //////////////////////////////
//FACILITY TYPE
router.get('/facility-type', function(req, res) {
    res.render('facility-type');
});

router.post('/facility-type', function (req, res) {
    res.redirect('activities');
});


// //////////////////////////////
//ACTIVITIES
router.get('/activities', function(req, res) {
    res.render('activities', { 'allactivities' : activities });
});

//add another activity to the activities list
router.post('/activities', function (req, res) {
  let newActivities = req.session.data['new-waste-activities']
  Array.prototype.push.apply(activities, newActivities);
  if (newActivities == undefined) {
    res.redirect('types-of-waste');
  } else {
    res.redirect('activities');
  }
});

//remove activity from activities list
router.post("/remove:activity", function (req, res) {
    let activity = req.params.activity
    var deleteName = activities.indexOf(activity);
    activities.splice(deleteName, 1);
    res.redirect('activities');
});


// //////////////////////////////
//TYPES OF WASTE
router.get('/types-of-waste', function(req, res) {
    res.render('types-of-waste', { 'allactivities' : activities });
});

router.post("/types-of-waste", function (req, res) {
    res.redirect('add-assessments');
});


// //////////////////////////////
//ASSESSMENTS
router.get('/add-assessments', function(req, res) {
  let assessment = req.session.data['waste-assessments'] || []
  var deleteName = assessments.indexOf(assessment);
  assessments.splice(deleteName, 1);
    res.render('add-assessments', { 'allactivities' : activities, 'allassessments' : assessments });
});

//add default assessments to the assessments list
router.post('/add-assessments', function (req, res) {
let newAssessments = req.session.data['waste-assessments']
let wasteType = req.session.data['waste-type'] || []
Array.prototype.push.apply(assessments, newAssessments);

if ((activities.indexOf('Biological treatment of waste - not composting') > -1 || activities.indexOf('Composting facility') > -1 || activities.indexOf("Household waste amenity site taking hazardous waste") > -1 || activities.indexOf("Household waste amenity site taking non-hazardous waste only") > -1 || activities.indexOf("Household, commercial and industrial waste transfer station") > -1) && assessments.indexOf("Odour management plan") == -1)
 {
   assessments.unshift("Odour management plan");
 }

 if ((wasteType.indexOf("combustible-waste") > -1 || activities.indexOf("Household waste amenity site taking hazardous waste") > -1 || activities.indexOf("Household waste amenity site taking non-hazardous waste only") > -1 || activities.indexOf("Household, commercial and industrial waste transfer station") > -1) && assessments.indexOf("Fire prevention plan") == -1)
 {
     assessments.unshift("Fire prevention plan");
 }

  res.redirect('confirm-activities-assessments');
});


// //////////////////////////////
//CONFIRMATION AND START APPLICATION
router.get('/confirm-activities-assessments', function(req, res) {
    res.render('confirm-activities-assessments', { 'allactivities' : activities, 'allassessments' : assessments });
});



// //////////////////////////////
//SANDBOX ROUTING

// //////////////////////////////
//FACILITY TYPE
router.get('/sandbox/facility-type', function(req, res) {
    res.render('sandbox/facility-type');
});

router.post('/sandbox/facility-type', function (req, res) {
    res.redirect('/sandbox/activities');
});


//ACITIVITES
router.get('/sandbox/activities', function(req, res) {
    res.render('sandbox/activities', { 'allactivities' : activities });
});

//add activity from activities list
router.post("/add:activity", function (req, res) {
    let activity = req.params.activity
    activities.push(activity);
console.log(activities);
    res.redirect('activities');

})

router.post('/sandbox/activities', function (req, res) {
    res.redirect('/sandbox/types-of-waste');
});

// //////////////////////////////
//TYPES OF WASTE
router.get('/sandbox/types-of-waste', function(req, res) {
    res.render('sandbox/types-of-waste', { 'allactivities' : activities });
});

router.post('/sandbox/types-of-waste', function (req, res) {
    res.redirect('/sandbox/add-assessments');
});


// //////////////////////////////
//ASSESSMENTS
router.get('/sandbox/add-assessments', function(req, res) {
  let assessment = req.session.data['waste-assessments'] || []
  var deleteName = assessments.indexOf(assessment);
  assessments.splice(deleteName, 1);
    res.render('sandbox/add-assessments', { 'allactivities' : activities, 'allassessments' : assessments });
});

//add default assessments to the assessments list
router.post('/sandbox/add-assessments', function (req, res) {
let newAssessments = req.session.data['waste-assessments']
let wasteType = req.session.data['waste-type'] || []
Array.prototype.push.apply(assessments, newAssessments);

if ((activities.indexOf('Biological treatment of waste - not composting') > -1 || activities.indexOf('Composting facility') > -1 || activities.indexOf("Household waste amenity site taking hazardous waste") > -1 || activities.indexOf("Household waste amenity site taking non-hazardous waste only") > -1 || activities.indexOf("Household, commercial and industrial waste transfer station") > -1) && assessments.indexOf("Odour management plan") == -1)
 {
   assessments.unshift("Odour management plan");
 }

 if ((wasteType.indexOf("combustible-waste") > -1 || activities.indexOf("Household waste amenity site taking hazardous waste") > -1 || activities.indexOf("Household waste amenity site taking non-hazardous waste only") > -1 || activities.indexOf("Household, commercial and industrial waste transfer station") > -1) && assessments.indexOf("Fire prevention plan") == -1)
 {
     assessments.unshift("Fire prevention plan");
 }

  res.redirect('confirm-activities-assessments');
});

// //////////////////////////////
//CONFIRMATION AND START APPLICATION
router.get('/sandbox/confirm-activities-assessments', function(req, res) {
    res.render('sandbox/confirm-activities-assessments', { 'allactivities' : activities, 'allassessments' : assessments });
});



module.exports = router
