
//$.getJSON for the random user API to retrieve 12 random users
let employeeAPI = "https://randomuser.me/api/?results=12";//will retrieve 12 results
let employeeData = {
  format: "json"
};
const getEmployees = (item)=>{//call back function
  console.log(item.results);
  //create the employeeHTML and modalHTML
  let employee_results = item.results;
  let employeesHTML = '<ul class="clearfix">';


  $.each(employee_results,function(index, employee){
    //for employeeHTML
    employeesHTML += '<li><a href = "#myModal " class = "open_modal" id="' + "employee_"+ index + '">';
    employeesHTML += '<img src = "' + employee.picture.large + '">';
    employeesHTML += '<ul class = "info">';
    employeesHTML += '<li class = "emp_name" id = "' + "name_" + index + '">' + employee.name.first + " " + employee.name.last + '</li>';
    let emailStr = '';
    if(employee.email.length >= 33){//too long
      emailStr += employee.email.substring(0,4);
      emailStr += '...';
    }else{//not too long
      emailStr += employee.email;
    }
    employeesHTML += '<li class = "emp_email">' + emailStr + '</li>';
    employeesHTML += '<li class = "emp_city">' + employee.location.city + '</li>';
    //now is the hidden class , these info is for modal use later
    employeesHTML += '<li class = "emp_phone hidden">' + employee.cell + '</li>';
    employeesHTML +=  '<li class = "emp_addr hidden">' + employee.location.street +", " + employee.location.state + ", " + employee.location.postcode + '</li>';
    employeesHTML +=  '<li class = "emp_BDay hidden">'  + "Birthday: "+ employee.dob.substring(0,10) + '</li>';
    employeesHTML += '<li class = "emp_username ">' + "Username: "+ employee.login.username + '</li>';
    //end of hidden
    employeesHTML += '</ul></a></li>'; //finish construct employeesHTML for each li

  });//end $.each
    employeesHTML += '</ul>'//close ul tag
  //inject HTML
  $('.photos').html(employeesHTML);

  // Get the modal
  let $modal = $('#myModal');
  let $modal_content = $('.modal-content');
  // Get the item that opens the modal
  let $open_modal = $(".open_modal");
  // Get the <span> element that closes the modal


  // When the user clicks related employee, open the modal
  $open_modal.click(function(){

    //construct the modal for each employee entry
    let modal_img = $(this).find("img").attr("src"); //related employee image src
    let modal_name = $(this).find(".emp_name").html();//related employee name
    let modal_email = $(this).find(".emp_email").html();//related employee email
    let modal_city = $(this).find(".emp_city").html();//related employee city
    let modal_phone = $(this).find(".emp_phone").html();//related employee phone
    let modal_addr = $(this).find(".emp_addr").html();//related employee addr
    let modal_BDay = $(this).find(".emp_BDay").html();//related employee BDay
    let modal_username = $(this).find(".emp_username").html();//related employee username

    let modalHTML = '';
    modalHTML += '<span class="close">&times;</span>';//add close span
    modalHTML += '<br><br>';//add line breaks
    modalHTML += '<button type="button" class = "previous_btn btn"><</button>';
    modalHTML += '<button type="button" class = "next_btn btn">></button>';//add buttons

    modalHTML += '<img src = "' + modal_img + '" class = "modal-img">';

    modalHTML += '<ul class = "modal_list_1">';//ul for list1
    modalHTML += '<li class = emp_name id ="' + $(this).find(".emp_name").attr("id") + '" >' + modal_name +'</li>'; //add li name also record the id
    modalHTML += '<li class = emp_email>' + modal_email +'</li>';//add li email
    modalHTML += '<li class = emp_city>' + modal_city +'</li>';//add li city
    modalHTML +='</ul>';//close ul for list1

    modalHTML += '<ul class = "modal_list_2">';//ul for list2
    modalHTML += '<li class = emp_phone>' + modal_phone +'</li>'; //add li phone
    modalHTML += '<li class = emp_addr>' + modal_addr +'</li>'; //add li addr
    modalHTML += '<li class = emp_BDay>' + modal_BDay +'</li>'; //add li BDay
    modalHTML += '<li class = emp_username>' + modal_username +'</li>'; //add li username
    modalHTML +='</ul>';//close ul for list2

    $modal_content.html(modalHTML);//inject the modal HTML


    $modal.css("display","block");//open up the modal after construction
  });
  // When the user clicks on <span> (x), close the modal
  //VERY IMPORTANT SEE https://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
  //since we just dynamically created the .close inside modalHTML, using .click wont work since
  //The click() binding you're using is called a "direct" binding which will only attach the handler to elements that already exist.
  //It won't get bound to elements created in the future. To do that, you'll have to create a "delegated" binding by using on().
  $(document).on("click",".close",function(){
    $modal.css("display","none");
  });

 //logic for previous and next button
  $(document).on("click",".btn",function(){
    //$modal.css("display","none");//close the current modal
    let currentIndex = $(this).parent().find(".emp_name").attr("id");//the employee index for current opened modal ep. name_3
    let IndexInList = $('.clearfix').find("#"+currentIndex); // this will relate the modal name to the name in the clearfix class
    let currentInList = $(IndexInList).parentsUntil(".clearfix")[2];//this is the current employee entry in out clearfix ul
    let nextInList = $(currentInList).nextAll(':not(".hidden"):first')[0];//this is the FIRST next NON HIDDEN employee entry in our clearfix ul
    let prevInList = $(currentInList).prevAll(':not(".hidden"):first')[0];//this is the FIRST prev NON HIDDEN employee entry in our clearfix ul
    console.log(prevInList);
    if($(this).hasClass("previous_btn")){//means the previous button is clicked
        $(prevInList).find(".open_modal").trigger("click");//open the new modal for prev employee
    }else{//means the next button is clicked
        $(nextInList).find(".open_modal").trigger("click");//open the new modal for next employee
    }
 });//end on click

  //When the user clicks anywhere outside of the modal, close it
  $('body').click(function(event){//use event.target for current click location
        if( $(event.target)[0] === $('.modal')[0]){//anywhere outside of the modal
            $modal.css("display","none");
        }
  });

};//end getEmployees
$.getJSON(employeeAPI,employeeData,getEmployees);
