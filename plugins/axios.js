import Vue from 'vue'

export default function ({$axios, redirect}) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    // if (code === 400) {
    //   redirect('/400')
    // }
    console.log(error);


    Vue.notify({
      group: 'notifications',
      title: 'Error',
      text: error
    })
  })
}
