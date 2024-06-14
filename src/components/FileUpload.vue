<template>
  <div>
    <h2>File List</h2>
    <ul>
      <li v-for="file in files" :key="file">
        <input type="checkbox" v-model="selectedFiles" :value="file">
        {{ file }}
      </li>
    </ul>
    <button @click="downloadSelectedFiles">Download Selected Files</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: []
    };
  },
  computed: {
    files() {
      return this.$store.state.files;
    }
  },
  created() {
    this.$store.dispatch('fetchFiles');
  },
  methods: {
    async downloadSelectedFiles() {
      for (const file of this.selectedFiles) {
        await this.downloadFile(file);
      }
    },
    async downloadFile(filename) {
      const response = await fetch(`/files/download/${filename}`, {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>