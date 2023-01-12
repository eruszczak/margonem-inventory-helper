'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_SUPABASE_URL: JSON.stringify(process.env.VUE_APP_SUPABASE_URL),
  VUE_APP_SUPABASE_KEY: JSON.stringify(process.env.VUE_APP_SUPABASE_KEY)
}
