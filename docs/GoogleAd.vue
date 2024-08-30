<template>
    <div class="google-ad">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-format="fluid"
           data-ad-layout-key="-fm-1t-w-do+12r"
           data-ad-client="ca-pub-3455593813294115"
           data-ad-slot="6265102665"></ins>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GoogleAd',
    mounted() {
      this.loadAd();
    },
    methods: {
      loadAd() {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .google-ad {
    /* Add any styling you want for the ad container */
  }
  </style>