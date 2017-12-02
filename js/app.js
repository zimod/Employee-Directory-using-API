
//$.getJSON for the random user API to retrieve 12 random users
let employeeAPI = "https://randomuser.me/api/?results=12";//will retrieve 12 results
let employeeData = {
  format: "json"
};
const getEmployees = (item)=>{//call back function
  console.log(item.results);
  //create the employeeHTML
  let employee_results = item.results;
  let employeesHTML = '<ul class="clearfix">';

  $.each(employee_results,function(index, employee){
    employeesHTML += '<li><a href = "' + employee.picture.large + '" rel="lightbox">';
    employeesHTML += '<img src = "' + employee.picture.large + '">';
    employeesHTML += '<ul class = "info">';
    employeesHTML += '<li class = "emp_name">' + employee.name.first + '</li>';
    employeesHTML += '<li class = "emp_email">' + employee.email + '</li>';
    employeesHTML += '<li class = "emp_city">' + employee.location.city + '</li>';
    employeesHTML += '</ul></a></li>';
  });//end $.each
    employeesHTML += '</ul>'//close ul tag
  //inject HTML
  $('.photos').html(employeesHTML);



};
$.getJSON(employeeAPI,employeeData,getEmployees);
