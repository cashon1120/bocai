<template>
  <div class="loadEffect-box" ref="loading">
    <div class="loadEffect">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    const loadingDom = this.$refs.loading
    loadingDom.addEventListener('touchmove', function (e) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
      e.stopPropagation && e.stopPropagation()
    })
  }
}
</script>
<style lang="scss">
.loadEffect-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
}

.loadEffect {
  width: 100px;
  height: 100px;
  position: absolute;
  margin: 0 auto;
  top: 50%;
  margin-top: -50px;
  left: 50%;
  transform: scale(0.5);
  margin-left: -50px;
  z-index: 9999;

  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    position: absolute;
    animation: load 1.04s ease infinite;
  }

  span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -10px;
    animation-delay: 0.13s;
  }

  span:nth-child(2) {
    left: 14px;
    top: 14px;
    animation-delay: 0.26s;
  }

  span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -10px;
    animation-delay: 0.39s;
  }

  span:nth-child(4) {
    top: 14px;
    right: 14px;
    animation-delay: 0.52s;
  }

  span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -10px;
    animation-delay: 0.65s;
  }

  span:nth-child(6) {
    right: 14px;
    bottom: 14px;
    animation-delay: 0.78s;
  }

  span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    animation-delay: 0.91s;
  }

  span:nth-child(8) {
    bottom: 14px;
    left: 14px;
    animation-delay: 1.04s;
  }
}

@keyframes load {
  0% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(0.3);
    opacity: 0.5;
  }
}
</style>
