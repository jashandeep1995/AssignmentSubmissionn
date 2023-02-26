let element=document.querySelector("button");

function createAlert(e)
{    
    e.preventDefault();
    
    let Passwordd= document.getElementById("Password").value;
    let RetypePassword=document.getElementById("RePassword").value;
    let Username=document.getElementById("UserName").value;
     
    let userCheck = /^[a-zA-Z0-9]+$/;
    let resultUserName = userCheck.test(Username);


if(resultUserName === true && Username.length >=5){
       
        if (Passwordd === RetypePassword && Passwordd.length >= 5)
    
        {

            alert('Account has been successfully created');
           
    
        }

        else if (Passwordd.length <= 5)

        {
            alert('Password length should be atleast 5');
        }

        else if (Passwordd !== RetypePassword && Passwordd.length !== 0)
        
        {
            alert('Password does not match');
    
        }

        else
        {
            alert('Please Enter the required Fields');

        }
  

    }

else 
    
    {
        alert('Please Enter the required fields. Username should only contain alphanumeric and length should be atleast 5');     
        
    }
    

}
element.onclick=createAlert;
