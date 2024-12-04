import webpack from 'webpack';

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
            base: '/3d-headphones/'
        }
    }
    : {};

export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: '3D Headphones Configurator',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
    },
    ...routerBase,
    /*
     ** Source directory
     */
    srcDir: 'src',
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#000000' },
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/styles.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{ src: '~/plugins/sayHello', ssr: false }],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/vuetify',
        [
            'nuxt-compress',
            {
                gzip: {
                    cache: true
                },
                brotli: {
                    threshold: 10240
                }
            }
        ]
    ],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.plugins.push(new webpack.ProvidePlugin({
                THREE: 'three'
            }));

            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                    // options: {
                    //     fix: true
                    // }
                });
            }
        }
    }
};
