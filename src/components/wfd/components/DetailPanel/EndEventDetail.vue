<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n['endEvent'] }}</div>
    <div class="panelBody">
      <DefaultDetail :model="model" :on-change="onChange" :read-only="readOnly" />
      <div class="panelRow">
        <div>之后任务：</div>
        <el-select
          style="width:90%; font-size:12px"
          placeholder="选择任务"
          :disabled="readOnly"
          :value="model.task"
          :multiple="true"
          :filterable="true"
          @change="(e) => onChange('task', e)"
        >
          <el-option v-for="(taskValue, taskIndex) in tasks" :key="taskIndex" :label="taskValue.name" :value="taskValue.full_name" />
        </el-select>
      </div>
      <NodeDetail
        :model="model"
        :on-change="onChange"
        :read-only="readOnly"
        :templates="templates"
        :templates-base="templatesBase"
        :write-preview="false"
        :readonly-preview="false"
      />
    </div>
  </div>
</template>
<script>
import DefaultDetail from './DefaultDetail'
import NodeDetail from './NodeDetail'
export default {
  inject: ['i18n'],
  components: {
    DefaultDetail,
    NodeDetail
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    tasks: {
      type: Array,
      default: () => ([])
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    templates: {
      type: Array,
      default: () => ([])
    },
    templatesBase: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
