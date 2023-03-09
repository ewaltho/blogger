const deleteBtns = document.querySelectorAll(".delete-btn")

deleteBtns.forEach(deleteBtn =>{
    deleteBtn.addEventListener("click",e => {
        e.preventDefault();
        const postId = e.target.id
        console.log(postId)

        fetch(`/posts/${postId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               document.location.reload();
            } else {
                console.log(res)
            }
        })
})
});