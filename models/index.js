var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hiredot-dev');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User, Project, Cohort;
var Schema = mongoose.Schema;

//*********************** User model schema definition ********************************

var WorkExperienceSchema = new Schema({
  title: String,
  startDate: { year: Number, month: Number },
  endDate: { year: Number, month: Number },
  isCurrent: Boolean,
  id: Number,
  company: Schema.Types.Mixed
}, { _id: false });

var EducationSchema = new Schema({
  startDate: { year: Number, month: Number },
  endDate: { year: Number, month: Number },
  schoolName: String,
  notes: String,
  id: Number,
  fieldOfStudy: String,
  degree: String,
  activities: String
}, { _id: false });

var VisitorSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  timeOfVisit: { type: Date, default: Date.now }
}, { _id: false });

var VisitedSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  timeVisited: { type: Date, default: Date.now }
}, { _id: false });

var UserSchema = new Schema({
  role: { type: String, default: 'user' },
  name: String,
  email: { type: String, lowercase: true },
  title: String,
  provider: String,
  linkedin: {},
  linkedinUrl: String,
  twitterUrl: String,
  facebookUrl: String,
  githubUrl: String,
  videoUrl: String,
  summary: String,
  cohort: { type: Schema.Types.ObjectId, ref: 'Cohort' },
  skills: String,
  location: String,
  resumeUrl: String,
  relocate: { type: Boolean, default: true },
  profilePicture: {
    crops: Object,
    original: String
  },
  funnyProfilePicture: {
    crops: Object,
    original: String
  },
  hired: { type: Boolean, default: false },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  followDevelopers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  educations: [EducationSchema],
  workExperiences: [WorkExperienceSchema],
  visited: [VisitedSchema],
  visitors: [VisitorSchema],
  hashedPassword: String
});

//*********************** Project model schema definition ********************************

var MemberSchema = new Schema({
  role: String,
  developer: { type: Schema.Types.ObjectId, ref: 'User' }
}, { _id: false });

var ImageSchema = new Schema({
  crops: Object,
  original: String
}, { _id: false });

var ProjectSchema = new Schema({
  name: String,
  githubUrl: String,
  pitch: String,
  description: String,
  techTags: String,
  images: [ImageSchema],
  videoUrl: String,
  url: String,
  views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  team: [MemberSchema],
  lastUpdated: { type: Date, default: Date.now }
});

//*********************** Cohort model schema definition ********************************

var CohortSchema = new Schema({
  name: String,
  date: { type: Date },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


Project = mongoose.model('Project', ProjectSchema);
User = mongoose.model('User', UserSchema);
Cohort = mongoose.model('Cohort', CohortSchema);

module.exports = {"Project": Project, "User": User, "Cohort": Cohort};


