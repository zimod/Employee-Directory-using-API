//add the search bar and button in the html
const add_search = ()=>{
   const $search = $(
   `<div class="employee-search">
     <input placeholder="Search for names...">
     <button class = "search-button">Search</button>
   </div>`);
   $search.insertBefore('.photos');
};

//the function that will list all results that match the user imput when click the search button
const searchList = ()=> {
 $('.search-button').on('click',function(e){
          let $input_value = $('input').val();//the user input value
          console.log($input_value);
          $.each($('.open_modal'),function(index,item){
              let $name = $(item).find('.emp_name').html(); //the name for each employee
            //  console.log($name);
              $(item).parent().addClass("hidden"); //hide all entries first
              if($name.toUpperCase().includes($input_value.toUpperCase())){
                //show the matched employees
                $(item).parent().removeClass("hidden");
              }
          });//end $.each
          $('input').val('');//reset input
  });//end on click

  $('input').on('keypress',function(evt){
      if(evt.which === 13){//enter key pressed
         $('.search-button').trigger("click");
      }
  });//end keypress

};//end searchList

add_search();
searchList();
