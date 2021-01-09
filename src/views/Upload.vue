<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <textarea
          class="w-full outline-none text-lg resize-none mb-5 p-2"
          placeholder="What's going on in your post?"
          autofocus
          v-model="post.text"
          >
        </textarea>
      </div>
      <div>
        <input
          type="file"
          class="hidden"
          id="file"
          multiple
          @change="handleMediaSelected($event.target.files)"
        >
        <label for="file" class="cursor-pointer">
          <div
            class="bg-gray-500 rounded-full text-gray-50 text-center px-4 py-3 font-bold leading-none mb-5"
          >
            Select/Add files
          </div>
        </label>
      </div>
      <div v-if="images.length" class="mb-4">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex"
        >
          <img :src="generateImagePreview(image.file)" class="rounded-lg w-4/12 mr-4 mb-4">
          <div>
            <div class="mb-3">
              <label class="mr-3" :for="`location-${index}`">
                Location
              </label>
              <br>
              <input :id="`location-${index}`" v-model="image.location" type="text" class="p-2">
            </div>
            <div class="mb-3">
              <label class="mr-3" :for="`text-${index}`">
                Text
              </label>
              <br>
              <input :id="`description-${index}`" type="text" v-model=image.description class="p-2">
            </div>
            <div class="mt-2">
              <a href="#" @click.prevent="removeImage(index)">Remove</a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="bg-blue-500 rounded-full text-gray-50 text-center px-4 py-3 font-bold leading-none"
          v-if="images.length"
        >
          Upload & Post
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'upload',

  data () {
    return {
      post: {
        text: '',
      },

      images: [],

      mediaTypes: {}
    }
  },

  methods: {
    handleMediaSelected (files) {
      let i = 0
      Array.from(files).slice(0, 4).forEach((file) => {
        if (this.images.length < 4 && this.mediaTypes.images.includes(file.type)) {
          this.images.push({'file': file, 'order': i + 1})
          i++
        }
      })
    },

    async getMediaTypes () {
      let response = await axios.get('media/types')

      this.mediaTypes = response.data.data
    },

    removeImage (index) {
      this.images.splice(index, 1)
    },

    generateImagePreview (image) {
      return URL.createObjectURL(image)
    },

    async uploadImage (image, postId) {
      let form = new FormData()
      form.append('file', image.file)
      form.append('location', image.location)
      form.append('description', image.description)
      form.append('order', image.order)
      form.append('post', postId)
      return await axios.post('/images/', form)
    },

    async submitPost () {
      return await axios.post('/posts/', this.post)
    },

    submit () {
      let postResult = this.submitPost()

      postResult.then((result) => {
        let requests = []
        this.images.forEach((image) => {
          requests.push(this.uploadImage(image, result.data.id))
        })

        axios.all(requests)
        .then(axios.spread(() => {
          // error checking
          this.$router.push({ name: 'timeline'})
        }));
      })
    }
  },

  mounted () {
    this.getMediaTypes()
  },
}
</script>
