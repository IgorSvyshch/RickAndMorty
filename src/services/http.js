import * as axios from 'axios'

export const instance = axios.create ({
    baseURL: 'https://rickandmortyapi.com/api/',
})

export const allCharacters = () => {
    return instance.get('character')
}

export const getCharacterPage = (page, gender="", status="", species="") => {
    return instance.get(`character?page=${page}&gender=${gender}&status=${status}&species=${species}`)
}

export const characterFilter = (gender = '', status = '', species='') => {
    return instance.get(`character?gender=${gender}&status=${status}&species=${species}`)
}

export const characterChoosenProfile = (id) => {
    return instance.get(`character/${id}/`)
}