<template>
  <el-form-item
    v-if="element && element.key"
    :label-width="isLabel || !element.options.labelWidthStatus?'0px': elementLabelWidth + 'px'"
    class="widget-view "
    :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
    :label="isLabel || element.type==='divider' || !element.options.labelWidthStatus?'':element.name"
    @click.native.stop="handleSelectWidget(index)"
  >

    <div v-if="isTable">
      <el-table
        :data="[element]"
        border
      >
        <el-table-column
          :label="element.name"
        >
          <WidgetFormFields :element="element" />
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <WidgetFormFields :element="element" />
    </div>

    <div v-if="selectWidget.key === element.key" class="widget-view-action">
      <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)" />
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" />
    </div>

    <div v-if="selectWidget.key === element.key" class="widget-view-drag">
      <i class="iconfont icon-drag drag-widget" />
    </div>

  </el-form-item>
</template>

<script>
import WidgetFormFields from './WidgetFormFields'
export default {
  components: {
    WidgetFormFields
  },
  /* eslint-disable */
  props: ['element', 'select', 'index', 'data', 'dataConfig', 'isLabel', 'isTable'],
  data() {
    return {
      elementLabelWidth: '',
      selectWidget: this.select
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    },
    'element.options.labelWidth': function (val) {
      this.elementLabelWidth = val
    },
    'element.options.labelWidthDisabled': function (val) {
      this.setLabelWidth(val)
    },
    'dataConfig.config.labelWidth': function (val) {
      if (!this.element.options.labelWidthDisabled && this.element.type!=='divider') {
        this.elementLabelWidth = val
      }
    }
  },
  mounted() {
    this.setLabelWidth()
  },
  methods: {
    setLabelWidth(status) {
      if (status === undefined) {
        status = this.element.options.labelWidthDisabled
      }
      if (status) {
        this.elementLabelWidth = this.element.options.labelWidth
      } else if (this.element.type==='divider') {
        this.elementLabelWidth = 0
      } else {
        // 全局
        this.elementLabelWidth = this.dataConfig.config.labelWidth
      }
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete(index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
      })
    },
    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        options: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox' || this.data.list[index].type === 'select') {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    }
  }
}
</script>
