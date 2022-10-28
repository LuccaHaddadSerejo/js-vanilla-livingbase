const baseUrl = 'https://m2-api-living.herokuapp.com/news'

async function getPosts(num){
    try {
        const data = await fetch(`${baseUrl}?page=${num}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }
        })
        const dataJson = await data.json()
        return dataJson
    }catch(error){
        console.log(error)
    } 
}

async function getPostById(id){
    try{
        const data = await fetch(`${baseUrl}/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        const dataJson = await data.json()
        return dataJson
    }catch (error){
        console.log(error)
    }
}

export {getPosts, getPostById}