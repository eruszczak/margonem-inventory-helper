import axios from 'axios/index'

export const fetchItemAndSimilar = (slug, cb, cbError) => {
  axios.get(`/api/item/${slug}`).then(cb, cbError)
}
