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
