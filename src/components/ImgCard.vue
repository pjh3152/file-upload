<template>
  <div>
    <img :src="viewFile" alt="image">
    <!-- <img src="../../backend/Upload/수륜중11712898314410.jpg"> -->
    <!-- {{ viewFile }} -->
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const viewFile = ref(null);

const props = defineProps({
  previewFile: Object,
  file: String,
})

const getFile = () => {

  // 미리보기 파일
  if (props.previewFile) {

    const reader = new FileReader();

    reader.onload = (e) => {
      viewFile.value = e.target.result;
    }

    // readAsDataURL 로 데이터URL 로 변환됨. 읽기가 완료되면 onload 이벤트가 호출됨.
    reader.readAsDataURL(props.previewFile);
  }

  // 업로드된 파일
  if (props.file) {
    viewFile.value = require("../../backend/Upload/" + props.file);
  }
}

getFile();

</script>

<style lang="scss" scoped>
img {
  width: 200px;
  border-radius: 10px;
}
</style>