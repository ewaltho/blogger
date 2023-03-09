document.querySelector("#signin-form").addEventListener("submit", e => {
    e.preventDefault();
    const loginObj = {
        email:document.querySelector("#email").value,
        password:document.querySelector("#password").value
    }
    console.log(loginObj)
    fetch("/users/signin",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           document.location.replace("/allposts")
        } else {
            console.log(res)
            alert("Incorrect username or password.")
        }
    })
});
