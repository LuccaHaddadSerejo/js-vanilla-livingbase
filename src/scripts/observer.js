import { getPosts } from "./requisitions.js"
import { renderPost} from "../pages/home/index.js"

let page = 0

const renderNewPosts = async () => {
    const dados = await getPosts(page)
    const news = dados.news
    if(dados.currentPage < 3){
        if(dados.nextPage){
            renderPost(news)
            page++
        }
    }
}

const observer = new IntersectionObserver((entries) => {
    if(entries.some((entry) => entry.isIntersecting)){
        renderNewPosts()    
    }
})

export {observer}