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

export const fetchHelpers = (cb, cbError) => {
  axios.get('/api/helpers').then(cb, cbError)
}

export const fetchItems = (queryOrUrl, cb, cbError, isUrl = false) => {
  let path = `/api/item/${queryOrUrl}`
  if (isUrl) {
    const parsedUrl = new URL(queryOrUrl)
    path = parsedUrl.pathname + parsedUrl.search
  }
  axios.get(path).then(cb, cbError)
}
