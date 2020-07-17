<template>
  <el-dialog
    :id="id"
    ref="elDialog"
    class="cus-dialog-container"
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    center
    :width="width"
  >
    <span v-if="show">
      <slot />
    </span>

    <span
      v-if="action"
      slot="footer"
      v-loading="loading"
      class="dialog-footer"
      :element-loading-text="loadingText"
    >
      <slot name="action">
        <el-button @click="close">{{ $t('fm.actions.cancel') }}</el-button>
        <el-button type="primary" @click="submit">{{ $t('fm.actions.confirm') }}</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    form: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false
    }
  },
  computed: {
    show() {
      if (this.form) {
        return this.showForm
      } else {
        return true
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.loading = false
        this.$emit('on-close')
        setTimeout(() => {
          this.showForm = false
        }, 300)
      } else {
        this.showForm = true
      }
    },
    visible(val) {
      this.dialogVisible = val
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.dialogVisible = false
    },
    submit() {
      this.loading = true

      this.$emit('on-submit')
    },
    end() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.cus-dialog-container{
  .el-dialog__footer{
    margin: 0 20px;
    // border-top: 1px dashed #ccc;
    padding: 15px 0 16px;
    text-align: center;
    position: relative;

    .dialog-footer{
      display: block;

      .circular{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        height: 24px;
      }

      .el-loading-text{
        display: inline-block;
        vertical-align: middle;
      }

      .el-loading-spinner{
        margin-top: -12px;
      }
    }
  }
}
</style>
