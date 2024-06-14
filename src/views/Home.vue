<template>
    <div>
        <h1>Home</h1>
        <FileUpload />
        <FileList />
    </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue';
import FileList from '../components/FileList.vue';

export default {
    components: {
        FileUpload,
        FileList
    }
};
</script>