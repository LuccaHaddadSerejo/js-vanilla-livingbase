import {getLocalItem} from "../../scripts/storage.js"

function goHome(){
    const btn = document.querySelector('.header_btn')
    btn.addEventListener('click', ()=>{
        window.location.replace('../../../index.html')
    })
}

goHome()

async function renderPage(){
    const data = await getLocalItem('@noticeId')

    const postTitle = document.querySelector('.header_h2')
    postTitle.innerText = data.title

    const postDesc = document.querySelector('.header_p')
    postDesc.innerText = data.description

    const postImg = document.querySelector('.post_img')
    postImg.src = data.image

    const postCont = document.querySelector('.post_description')
    postCont.innerText = data.content
}

renderPage()

async function renderButtons(arr){
    const filterSection = document.querySelector('.filter_section')
    arr.forEach(btn => {    
        const button = document.createElement('button')
        button.classList = 'filter_btn'
        button.innerText = btn
        button.addEventListener('click', (event)=>{
            event.preventDefault()
            localStorage.setItem('@category', JSON.stringify(button.innerText))
            window.location.replace('../../../index.html')
        })
        filterSection.append(button)
    })
    return filterSection
}

renderButtons(['Todos', 'Pintura', 'Decoração', 'Organização', 'Limpeza', 'Segurança', 'Reforma', 'Aromas'])



