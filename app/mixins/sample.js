export default {
  mounted() {
    console.log('%cmixins mounted works', 'color: orange')
  },
  methods: {
    speak() {
      console.log('%cmixins speak', 'color: orange')
    }
  }
}