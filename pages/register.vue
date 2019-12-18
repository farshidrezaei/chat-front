<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col md="5" xs="12">
        <form @submit.prevent="register" method="post"></form>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" xs="12">
                <h2>{{$t('pages.signUp')}}</h2>
              </v-col>
              <v-col cols="12" xs="12">
                <v-text-field
                  :label="$t('form.username')"
                  solo
                  v-model="name"
                ></v-text-field>
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
                <v-btn color="success" rounded type="submit">{{$t('buttons.signUp')}}</v-btn>
              </v-col>
              <v-col cols="12" xs="12">
                <span> {{$t('sentences.dontHaveAccount')}}</span>
                <v-btn color="info" text to="login" x-small>{{$t('buttons.signIn')}}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
            async register() {
                try {
                    await this.$axios.post('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    });

                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password
                        },
                    });

                    this.$router.push('/');
                    this.$notify({
                        group: 'all',
                        type: 'success',
                        text: "شما با موفقیت وارد سایت شدید",
                    });
                } catch (e) {
                    console.log(e);
                    this.error = e.response.data.message;
                    this.$notify({
                        group: 'all',
                        text: this.error,
                    });
                }
            }
        }
    }
</script>
