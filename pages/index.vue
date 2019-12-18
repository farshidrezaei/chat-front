<template>
  <v-card height="100%" width="100%">
    <v-card-text class="fill-height">
      <v-carousel
        :cycle="false"
        :show-arrows="false"
        height="100%"
        hide-delimiter-background
      >
        <v-carousel-item class="fill-height">
          <v-container fluid>
            <!-- logo -->
            <v-row align="center" class="mx-0" justify="center">
              <v-col class="text-center" cols="12" xs="12">
                <v-avatar size="100">
                  <v-img
                    src="/logo white.png"
                  ></v-img>
                </v-avatar>
              </v-col>
            </v-row>

            <!-- text -->
            <v-row align="center" class="mx-0" justify="center">
              <v-col cols="12" xs="12">
                <p class="text-center">Farshid Net</p>
                <p>

                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
        <v-carousel-item>
          <form @submit.prevent="login" method="post">
            <v-row>
              <v-col class="text-center" cols="12" xs="12">
                <h2>{{$t('pages.signIn')}}</h2>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  :label="$t('form.email')"
                  solo
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  :label="$t('form.password')"
                  solo
                  v-model="password"
                ></v-text-field>
              </v-col>
              <v-col class="text-center" cols="12" xs="12">
                <v-btn color="success" rounded type="submit">{{$t('buttons.signIn')}}</v-btn>
              </v-col>
              <v-col class="text-center" cols="12" xs="12">
                <p>{{$t('sentences.dontHaveAccount')}}</p>
                <v-btn color="success" text to="register" x-small>{{$t('buttons.signUp')}}</v-btn>
              </v-col>
            </v-row>
          </form>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>

    export default {
        //before
        // async asyncData({$axios}) {
        //     const ip = await $axios.$get('http://icanhazip.com');
        //     return {ip}
        // },
        data() {
            return {
                name: '',
                email: '',
                password: '',
                error: null,

            }
        },

        methods: {
            async login() {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    });

                    this.$router.push('admin');
                    this.$notify({
                        group: 'all',
                        type: 'success',
                        text: "شما با موفقیت وارد سایت شدید",

                    });
                } catch (e) {
                    //this.error = e.response.data.message;
                    this.$notify({
                        group: 'all',
                        type: 'error',
                        text: e,

                    });
                }
            }
        }
    }
</script>
