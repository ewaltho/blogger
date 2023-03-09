document.querySelector("#sign-up-form").addEventListener("submit",e => {
    e.preventDefault();
    const signupObj = {
        email:document.querySelector("#signUpEmail").value,
        username:document.querySelector("#signUpUsername").value,
        password:document.querySelector("#signUpPassword").value
    }
    console.log(signupObj)
    fetch("/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           document.location.replace("/allposts")
        } else {
            console.log(err)
        }
    })
});