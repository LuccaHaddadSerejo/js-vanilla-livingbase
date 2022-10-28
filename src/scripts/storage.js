function getLocalItem(data){
    const getData = JSON.parse(localStorage.getItem(data)) || []
    return getData
}

export {getLocalItem}