<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col md="5" xs="12">
        <form @submit.prevent="login" method="post">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" xs="12">
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
                <v-col cols="12" xs="12">
                  <v-btn color="success" rounded type="submit">{{$t('buttons.signIn')}}</v-btn>
                </v-col>
                <v-col cols="12" xs="12">
                  <span>{{$t('sentences.dontHaveAccount')}}</span>
                  <v-btn color="success" text to="register" x-small>{{$t('buttons.signUp')}}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

    export default {
        middleware: 'guest',
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
                        type: 'danger',
                        text: e,

                    });
                }
            }
        }
    }
</script>
