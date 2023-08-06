import axios from 'axios';

const URL = 'http://localhost:3001/persons'

let get = ()=>
    axios.get(URL)
        .then(res=>res.data)

function create(data){
    console.log('data',data)
    return (
        axios.post(URL,data)
        .then(res=>res.data)
    )
}

function remove(id){
    return (
        axios.delete(`${URL}/${id}`)
            .then(res=>res.data)
    )
}

function update(id,data){
    return (
        axios.put(`${URL}/${id}`,data)
            .then(res=>res.data)
    )
}



export default {
    get,
    create,
    remove,
    update
}