<template>
  <div>
    <img :src="viewFile">
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const viewFile = ref(null);

const props = defineProps({
  previewFile: Object,
})

const getFile = () => {

  const reader = new FileReader();

  reader.onload = (e) => {
    viewFile.value = e.target.result;
  }

  // readAsDataURL 로 데이터URL 로 변환됨. 읽기가 완료되면 onload 이벤트가 호출됨.
  reader.readAsDataURL(props.previewFile);
}

getFile();

</script>

<style lang="scss" scoped>
img {
  width: 200px;
  border-radius: 10px;
}
</style>