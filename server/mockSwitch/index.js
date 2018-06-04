new Vue({
  el: '#app',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    axios.post('/mock-switch/list')
      .then(res => {
        this.tableData = res.data
      })
  },
  methods: {
    changeHandle(row) {
      axios.post('/mock-switch', {
        key: row.url,
        value: row.status
      })
    }
  }
})