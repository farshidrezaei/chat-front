import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  loading: {color: '#fff'},

  css: [
    'assets/main.css'
  ],

  plugins: [
    {src: '~/plugins/country-flag.js'},
    {src: '~/plugins/axios.js'},
    {src: '~/plugins/notification.js', mode: 'client'},
  ],

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-i18n'
  ],

  axios: {
    baseURL: 'http://localhost:8000/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/auth/login', method: 'post', propertyName: 'access_token'},
          logout: {url: '/auth/logout', method: 'post'},
          user: {url: '/auth/user', method: 'post', propertyName: 'user'}
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
      Oauth2: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scope: ['openid', 'profile', 'email'],
        access_type: undefined,
        access_token_endpoint: undefined,
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: undefined,
        client_id: 'SET_ME',
        token_key: 'access_token',
        state: 'UNIQUE_AND_NON_GUESSABLE'
      },
      auth0: {
        domain: 'domain.auth0.com',
        client_id: '....',
        audience: 'https://my-api-domain.com/'
      },
      facebook: {
        client_id: '...',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      github: {
        client_id: '...',
        client_secret: '...'
      },
      google: {
        client_id: '...'
      },
      'laravel.passport': {
        url: '...',
        client_id: '...',
        client_secret: '...'
      },

    },
    plugins: [{src: '~/plugins/axios', ssr: true}, '~/plugins/auth.js']
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  i18n: {
    lazy: true,
    locales: [
      {
        name: 'English',
        code: 'en',
        country: 'us',
        iso: 'en-US',
        file: 'en-US.js'
      },
      {
        name: 'Persian',
        code: 'fa',
        country: 'ir',
        iso: 'fa-IR',
        file: 'fa-IR.js'
      },
    ],
    langDir: 'languages/',
    defaultLocale: 'fa',
    loadLanguagesAsync: true,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: false
    }
  },
  build: {

    extend(config, ctx) {
    }
  }
}
