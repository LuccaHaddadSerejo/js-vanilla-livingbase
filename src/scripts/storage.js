function getLocalItem(){
    const getData = JSON.parse(localStorage.getItem('@noticeId')) || []
    return getData
}

export {getLocalItem}