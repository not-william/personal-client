<template>
  <div class="mb-4">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="flex"
    >
      <img :src="generateImagePreview(image)" class="rounded-lg w-4/12 mr-4 mb-4">
      <div>
        <div class="mb-3">
          <label class="mr-3" :for="`location-${index}`">
            Location
          </label>
          <br>
          <input :id="`location-${index}`" type="text" class="p-2">
        </div>
        <div class="mb-3">
          <label class="mr-3" :for="`text-${index}`">
            Text
          </label>
          <br>
          <input :id="`text-${index}`" type="text" class="p-2">
        </div>
        <div class="mt-2">
          <a href="#" @click.prevent="$emit('remove', index)">Remove</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      required: false,
      type: Array
    }
  },

  data () {
    return {
      'location': '',
      'text': '',
    }
  },

  methods: {
    generateImagePreview (image) {
      return URL.createObjectURL(image)
    },
  }
}
</script>