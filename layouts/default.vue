<template>
  <v-app dark>
    <v-content class="fill-height">
      <v-container class="fill-height" fluid>
        <nuxt/>
        <notifications group="all" position="bottom center"></notifications>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>


    import {mapGetters} from 'vuex';

    export default {

        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: this.$t('pages.home'),
                        to: this.localePath('index')
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: this.$t('pages.profile'),
                        to: this.localePath('profile')
                    }
                ],

                locales: [
                    {
                        icon: 'mdi-apps',
                        title: 'Persian',
                        to: this.switchLocalePath('fa')
                    },
                    {
                        icon: 'mdi-apps',
                        title: 'English',
                        to: this.switchLocalePath('en')
                    },
                ],

                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: this.$t('appName')

            }
        },
        methods: {
            switchLocale: function (locale) {
                this.$router.push({path: this.switchLocalePath(locale)})
            },
            async logout() {
                await this.$auth.logout();
            },

        },
        computed: {
            availableLocales() {
                return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
            },
            currentLocale() {
                return this.$i18n.locale
            },
            isRtl() {
                return this.$vuetify.rtl
            },
            ...mapGetters(['isAuthenticated']),
        },
        watch: {
            currentLocale: function (value) {
                switch (value) {
                    case 'fa':
                        this.$vuetify.rtl = true;

                        break;
                    case 'en':
                        this.$vuetify.rtl = false;

                        break;
                    default:
                        this.$vuetify.rtl = false;
                        break;
                }
            },
        },
        mounted() {


        }


    }
</script>
