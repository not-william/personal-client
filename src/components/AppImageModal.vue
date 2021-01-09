<template>
  <div class="fixed inset-0 bg-gray-600 flex">
    <div class="mx-auto flex flex-wrap" id="image-container">
      <img 
        :src="srcPath"
        id="image"
        style="margin-bottom: 10000px;"
        class="max-h-screen inline object-contain"
      />
      <div 
        style="height: max-content;"
        class="bg-white inline p-6 mt-3 ml-3 w-64"
        id="infoBox"
       >
        <div v-if="text" class="mb-4 text-lg">
          {{ text }}
        </div>
        <div v-if="image.location" class="flex mb-4 text-gray-800">
          <img src="@/assets/images/map-marker-alt-solid.svg" class="h-5 mr-2 opacity-80" style="margin-top: 2px;"/>
          {{ image.location }}
        </div>
        <div v-if="image.f_number" class="flex mb-2 text-gray-600 text-sm">
          <img src="@/assets/images/aperture.svg" class="h-4 mr-2 opacity-80" style="margin-top: 2px;"/>
          f/{{ image.f_number }}
        </div>
        <div v-if="image.shutter_speed" class="flex mb-2 text-gray-600 text-sm">
          <img src="@/assets/images/stopwatch.svg" class="h-4 mr-2 opacity-80" style="margin-top: 2px;"/>
          1/{{ image.shutter_speed }}s
        </div>
        <div v-if="image.focal_length" class="flex mb-2 text-gray-600 text-sm">
          <img src="@/assets/images/camera-lens.svg" class="h-4 mr-2 opacity-80" style="margin-top: 2px;"/>
          {{ image.focal_length }}mm
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },

  computed: {
    srcPath () {
      var p = this.image.file.split('/');
      p[p.length - 1] = 'lg-' + p[p.length - 1]
      return p.join('/')
    },
  },

  props: {
    image: {
      required: true,
      type: Object
    },
    text: {
      required: false,
    },
    search: {
      required: false,
      default: false,
    },
  },

  methods: {
    imCenter () {
      var h = this.imageObj.clientHeight
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      var margin = (vh - h) / 2
      this.imageObj.style.marginTop = String(margin) + 'px'

      var im_w = this.imageObj.clientWidth
      var box_w = this.infoBox.clientWidth
      var box_lm = window.getComputedStyle(this.infoBox, null).getPropertyValue('margin-left')
      box_lm = Number(box_lm.substr(0,2)) // TODO: remove hardcoded string length
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      if (im_w + box_w + box_lm > vw) {
        var left_margin = (vw - im_w) / 2
        this.imageObj.style.marginLeft = String(left_margin) + 'px'
      } else {
        this.imageObj.style.marginLeft = '0'
      }
    }

  },
  mounted () {
    this.imageObj = document.getElementById('image')
    this.infoBox = document.getElementById('infoBox')
    this.container = document.getElementById('image-container')

    setInterval(this.imCenter, 20);

    window.onresize = this.imCenter;
  }
}
</script>
