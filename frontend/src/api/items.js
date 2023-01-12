import axios from 'axios/index'

export const fetchItemSimilar = (slug, cb, cbError) => {
  axios.get(`/api/item/${slug}/similar`).then(cb, cbError)
}

export const fetchMultipleItems = (slugs, cb, cbError) => {
  axios.get(`/api/item/?i=${slugs.join('&i=')}`).then(cb, cbError)
}

export const searchItems = (query, cb, cbError) => {
  axios.get(`/api/item/?per_page=15&n=${query}&searchbox=1`).then(cb, cbError)
}
