
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
    employeesHTML += '<li><a href = "#myModal " class = "open_modal">';
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

  // Get the modal
  let $modal = $('#myModal');
  // Get the item that opens the modal
  let $open_modal = $(".open_modal");
  // Get the <span> element that closes the modal
  let $span = $(".close");
  // When the user clicks related employee, open the modal
  $open_modal.click(function(){
    $modal.css("display","block");
  });
  // When the user clicks on <span> (x), close the modal
  $span.click(function(){
    $modal.css("display","none");
  });
  //When the user clicks anywhere outside of the modal, close it
  $('body').click(function(event){//use event.target for current click location
        if( $(event.target)[0] === $('.modal')[0]){//anywhere outside of the modal
            $modal.css("display","none");
        }
  });

};//end getEmployees
$.getJSON(employeeAPI,employeeData,getEmployees);
