<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="clipped"
      :mini-variant="miniVariant"
      :right="isRtl"
      app
      fixed
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          :key="i"
          :to="item.to"
          exact
          router
          v-for="(item, i) in items"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      :clipped-right="clipped && isRtl"
      app
      fixed
    >

      <!--menu-icon-->
      <v-btn
        @click.stop="drawer=!drawer"

        icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!--mini-variant-icon-->
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? isRtl?'left':'right' : isRtl?'right':'left'}` }}</v-icon>
      </v-btn>

      <!--clipped-icon-->
      <v-btn
        @click.stop="clipped = !clipped"
        icon
      >
        <v-icon>{{!clipped?'mdi-window-maximize':'mdi-window-restore'}}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"/>

      <v-spacer/>

      <!--account-icon-->
      <v-menu
        bottom
        left
        v-if="isAuthenticated"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon
                 v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-btn @click="logout()" color="red">Logout
              <v-icon dark right>mdi-logout</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

      </v-menu>

      <v-btn
        :key="locale.code"
        @click="switchLocale(locale.code)"
        icon
        v-for="locale in availableLocales"
        v-if="locale.code !== currentLocale"
      >
        <country-flag
          :country="locale.code==='fa'?'ir':'us'"
        ></country-flag>
      </v-btn>

      <!--      <v-btn-->
      <!--        icon-->
      <!--        v-if="!isRtl"-->
      <!--        @click.stop="drawer=!drawer"-->
      <!--      >-->
      <!--        <v-icon>mdi-menu</v-icon>-->
      <!--      </v-btn>-->

    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt-child/>
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
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
                        title: this.$t('pages.dashboard'),
                        to: this.localePath('dashboard')
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: this.$t('pages.profile'),
                        to: this.localePath('dashboard-profile')
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
