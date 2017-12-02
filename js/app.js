
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
    employeesHTML += '</a></li>';
  });//end $.each
    employeesHTML += '</ul>'//close ul tag
  //inject HTML
  $('.photos').html(employeesHTML);

  //this will apply the lightbox effect to our employee entry
  $(function(){
    $('a[rel=lightbox]').lightBox({
      containerResizeSpeed: 250,
      fixedNavigation: true
    });
    $('a[rel=2ndlightbox]').lightBox({
      overlayBgColor: '#fff',
      overlayOpacity: 0.7
    });
  });//end

};
$.getJSON(employeeAPI,employeeData,getEmployees);
