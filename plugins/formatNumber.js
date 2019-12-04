import Vue from 'vue'

Vue.filter('formatNumber', function (value) {
    if (!value) {
        return ''
    } else {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
})
