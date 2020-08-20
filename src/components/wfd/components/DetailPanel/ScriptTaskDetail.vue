<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n['scriptTask'] }}</div>
    <div class="panelBody">
      <DefaultDetail :model="model" :on-change="onChange" :read-only="readOnly" />
      <div class="panelRow">
        <div>类型：</div>
        <el-select
          style="width:90%; font-size:12px"
          placeholder="选择任务类型"
          :disabled="readOnly"
          :value="model.taskType"
          @change="(e) => onChange('taskType', e)"
        >
          <el-option label="任务" value="task" />
          <el-option label="脚本" value="script" />
        </el-select>
      </div>
      <div v-if="model.taskType === 'script'" class="panelRow">
        <div>{{ i18n['scriptTask.script'] }}：</div>
        <el-input
          style="width:90%; font-size:12px"
          placeholder="输入脚本"
          type="textarea"
          :rows="4"
          :disabled="readOnly"
          :value="model.script"
          @input="(value) => {onChange('script', value)}"
        />
      </div>
      <div v-if="model.taskType === 'task'" class="panelRow">
        <div>任务：</div>
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
    </div>
  </div>
</template>
<script>
import DefaultDetail from './DefaultDetail'
export default {
  inject: ['i18n'],
  components: {
    DefaultDetail
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    tasks: {
      type: Array,
      default: () => ([])
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
