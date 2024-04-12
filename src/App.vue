<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-2" v-for="file in previewFiles" :key="file">
        <ImgCard :previewFile="file" v-if="previewFiles"/>
      </div>
      <div class="col-12 d-flex justify-content-center align-items-center mt-5 p-5 border"
        @drop.prevent="dropFiles($event)" @dragover.prevent>
        <input type="file" id="upload-file" ref="upFiles" @change="selectedFiles" multiple hidden>
        <label for="upload-file">
          <i class="bi bi-cloud-arrow-up fs-3"></i>
        </label>
      </div>
      <div class="col-12 d-flex justify-content-end mt-4">
        <button class="btn btn-primary px-5" @click="uploadFiles">Upload</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ImgCard from "@/components/ImgCard";

const previewFiles = ref(null);
const upFiles = ref(null);

// 드래그&드랍
const dropFiles = (e) => {
  previewFiles.value = e.dataTransfer.files;
  upFiles.value.files = e.dataTransfer.files;
}

// 파일선택
const selectedFiles = (e) => {
  previewFiles.value = e.target.files;
}

// 파일업로드
const uploadFiles = async () => {

  if (!upFiles.value.files.length) return;

  const form = new FormData();

  // 선택한 모든 파일을 FormData 에 append 한다 (이때 upFiles.value.files 는 유사배열이라 Array.from 을 붙여줘야 한다. 아니면 그냥 for 문을 쓰던지)
  Array.from(upFiles.value.files).forEach((file) => form.append("files", file));

  form.append("title", "파일전송");
  form.append("content", "다중파일");

  const headers = {
    header: {
      "Content-Type": "multipart/form-data",
    },
  }
  
  await axios.post("/api/upload", form, headers).catch(err => { console.log(err); })
  
  previewFiles.value = null;
  upFiles.value = null;
}
</script>

<style lang="scss" scoped></style>