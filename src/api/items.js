import axios from 'axios/index'

export const fetchItem = (slug, cb, cbError) => {
  axios.get(`/api/item/${slug}`).then(cb, cbError)
}

export const fetchItemSimilar = (slug, cb, cbError) => {
  axios.get(`/api/item/${slug}/similar`).then(cb, cbError)
}

export const fetchMultipleItems = (slugs, cb, cbError) => {
  axios.get(`/api/item/?i=${slugs.join('&i=')}`).then(cb, cbError)
}

export const searchItems = (query, cb, cbError) => {
  axios.get(`/api/item/?per_page=30&n=${query}`).then(cb, cbError)
}

export const fetchItems = (query, cb, cbError) => {
  axios.get(`/api/item/${query}&per_page=250`).then(cb, cbError)
}
