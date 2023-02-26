$(document).ready(() => {
$('.Student-info').on('keyup', (event) => {
        
    const post = $(event.currentTarget).val();
  
          const remaining = 140 - post.length;
       
       if(remaining <= 0) {
         $('.wordcount').addClass('red');
       }
  
       else {
         $('.wordcount').removeClass('red');
       }
       
       $('.characters').html(remaining);
    })
  
    $('.Student-info').focus();
  
  
  }); 
  