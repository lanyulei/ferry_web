<template>
  <div>
    <el-upload
      :action="element.options.action"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="element.options.length"
      :headers="element.options.headers"
      :on-exceed="handleExceed"
      :file-list="element.options.defaultValue"
      :disabled="element.options.disabled"
      :style="{'width': element.options.width}"
    >
      <div v-if="!preview">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">{{ element.options.tip }}</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  // eslint-disable-next-line vue/require-prop-types
  props: ['element', 'preview'],
  data() {
    return {
      currentRemoveUid: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.element.options.defaultValue = fileList
    },
    handlePreview(file) {
      window.open(file.url, '_blank')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多允许上传 ${this.element.options.length} 个文件。`)
    },
    beforeRemove(file, fileList) {
      this.currentRemoveUid = file.uid
      return this.$confirm(`确定要移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      this.element.options.defaultValue.push({
        name: file.name,
        url: response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
