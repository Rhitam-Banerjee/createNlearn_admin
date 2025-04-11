const host = "https://server.brightr.club";
// const host = "http://127.0.0.1:5000";

const subDomain = `${host}/api_demo`;

const urls = {
  login: `${subDomain}/login`,
  getAllTeachers: `${subDomain}/get-teachers`,
  getClasses: `${subDomain}/get-classes`,
  getCourses: `${subDomain}/get-courses`,
  createTeacher: `${subDomain}/create-teacher`,
  createCourse: `${subDomain}/create-course`,
  createNewClass: `${subDomain}/create-new-classes`,
  createExistingClass: `${subDomain}/create-existing-classes`,

  getTeacherAvailable: `${subDomain}/check-teacher-availibility`,
  getTeacherSlots: `${subDomain}/teacher_slots`,
  getClassDetails: `${subDomain}/get-class-details`,
  postClassFile: `${subDomain}/post-class-file`,
  postTeacherFile: `${subDomain}/post-teacher-file`,
};
export default urls;
