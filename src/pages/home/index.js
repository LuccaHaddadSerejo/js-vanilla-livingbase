import {observer} from "../../scripts/observer.js";
import {getPostById, getPosts} from "../../scripts/requisitions.js";
import { getLocalItem } from "../../scripts/storage.js";


checkData(0)


function checkCategory(btn){
    if(getLocalItem('@category') == btn.innerText){
        btn.click()
    } 
}

async function getAllPages(){
    const requestOne = await getPosts(0)
    const pageOne = requestOne.news
    const requestTwo = await getPosts(1)
    const pageTwo = requestTwo.news
    const requestThree = await getPosts(2)
    const pageThree = requestThree.news
    const fullArr = [...pageOne,...pageTwo,...pageThree]
    localStorage.setItem('fullArr', JSON.stringify(fullArr))
}

getAllPages()

async function getApiData(num){
    const request = await getPosts(num)
    const news = request.news
    renderPost(news) 
}

async function renderButtons(arr){
    const news = getLocalItem("fullArr")
    const list = document.querySelector('.list_full')
    const filterSection = document.querySelector('.filter_section')
    arr.forEach(btn => {    
        const button = document.createElement('button')
        button.classList = 'filter_btn'
        button.innerText = btn
        if(button.innerText == "Todos"){
            button.id = 'allBtn'
        } 
        button.addEventListener('click', (event)=>{
            event.preventDefault()
            list.innerHTML = ''
            news.map(elt => {
                const filteredArr = []
                if(elt.category == button.innerText && button.innerText != "Todos"){
                    filteredArr.push(elt)
                    localStorage.setItem("filteredArr", JSON.stringify(filteredArr))
                    renderFilter(getLocalItem("filteredArr"))
                }
            })
        })
        
        if(getLocalItem('@category') != ""){
            checkCategory(button)
        }      

        filterSection.append(button)
    })
    return filterSection
}


renderButtons(["Todos", "Pintura", "Decoração", "Organização", "Limpeza", "Segurança", 'Reforma', 'Aromas'])


async function filterAll(){
    const btn = document.getElementById('allBtn')
    btn.addEventListener('click', ()=>{
        checkData(0)
    })
    if(getLocalItem('@category') != ""){
        checkCategory(btn)
    }      
    localStorage.setItem('@category', JSON.stringify(""))
}

filterAll()


async function renderPost(arr){
    const list = document.querySelector('.list_full')

    const divObserve = document.createElement('div')
    divObserve.classList = 'observe'
    observer.observe(divObserve)

    arr.forEach(notice => {
        const postFull = document.createElement('li')
        postFull.classList = 'post postAnimation'
    
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
        list.append(postFull, divObserve)
    });
    return list
}


async function renderFilter(arr){
    const list = document.querySelector('.list_full')

    arr.forEach(notice => {
        const postFull = document.createElement('li')
        postFull.classList = 'post postAnimation-2'
    
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

export{renderPost, getApiData}






