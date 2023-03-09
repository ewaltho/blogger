document.querySelector("#new-post-form").addEventListener("submit",e => {
    e.preventDefault();
    const newpostObj = {
        title:document.querySelector("#title").value,
        entry:document.querySelector("#entry").value,
    }
    console.log(newpostObj)
    fetch("/posts",{
        method:"POST",
        body:JSON.stringify(newpostObj),
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