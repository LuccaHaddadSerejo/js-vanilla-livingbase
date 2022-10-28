import {getPostById, getPosts} from "../../scripts/requisitions.js";
import { getLocalItem } from "../../scripts/storage.js";


function checkCategory(btn){
    if(getLocalItem('@category') == btn.innerText){
        btn.click()
        localStorage.setItem('@category', JSON.stringify(""))
    }else{ 
    }    
}

async function getApiData(num){
    const request = await getPosts(num)
    const news = request.news
    renderPost(news) 
}


async function renderButtons(arr, num){
    const request = await getPosts(num)
    const news = request.news
    const list = document.querySelector('.list_full')
    const filterSection = document.querySelector('.filter_section')
    arr.forEach(btn => {    
        const button = document.createElement('button')
        button.classList = 'filter_btn'
        button.innerText = btn
        button.addEventListener('click', (event)=>{
            event.preventDefault()
            list.innerHTML = ''
            news.map(elt => {
                const filteredArr = []
                if(elt.category == button.innerText){
                    filteredArr.push(elt)
                    localStorage.setItem("arrCategory", JSON.stringify(filteredArr))
                    renderPost(getLocalItem("arrCategory"))
                }else if(button.innerText == "Todos"){
                    filteredArr.push(elt)
                    localStorage.setItem("arrCategory", JSON.stringify(filteredArr))
                    renderPost(getLocalItem("arrCategory"))
                }
            })
        })
        if(getLocalItem('@category') != ""){
            checkCategory(button)
        }else{
        }
       
        filterSection.append(button)
    })
    return filterSection
}

renderButtons(["Todos", "Pintura", "Decoração", "Organização", "Limpeza", "Segurança", 'Reforma', 'Aromas'], 0)

async function renderPost(arr){
    const list = document.querySelector('.list_full')

    arr.forEach(notice => {
        const postFull = document.createElement('li')
        postFull.classList = 'post'
    
        const postDivOne = document.createElement('div')
        postDivOne.classList = 'post_img_div'

        const postImg = document.createElement('img')
        postImg.classList = 'post_img'
        postImg.src = notice.image

        const postDivTwo = document.createElement('div')
        postDivTwo.classList = 'post_description flex_col'

        const postH2 = document.createElement('h2')
        postH2.classList = 'post_h2'
        postH2.innerText = notice.title

        const postP = document.createElement('p')
        postP.classList = 'post_p'
        postP.innerText = notice.description

        const postLink = document.createElement('a')
        postLink.classList = 'post_link'
        postLink.innerText = 'Acessar conteúdo'
        postLink.addEventListener('click', async ()=>{
            localStorage.setItem('@noticeId', JSON.stringify(await getPostById(notice.id)))
            window.location.replace('./src/pages/post/index.html')
        })

        postDivOne.append(postImg)
        postDivTwo.append(postH2, postP, postLink)
        postFull.append(postDivOne, postDivTwo)
        list.append(postFull)
    });
    return list
}

function checkData(num){
    if(getLocalItem('@category') == ""){
        getApiData(num)
    }else{
    }
}

checkData(0)

