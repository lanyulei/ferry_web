<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n['sequenceFlow'] }}</div>
    <div class="panelBody">
      <DefaultDetail :model="model" :on-change="onChange" :read-only="readOnly" />
      <div class="panelRow">
        <div><span style="color: red">*</span> 属性：</div>
        <el-select
          style="width:90%; font-size:12px"
          placeholder="选择流转属性"
          :disabled="readOnly"
          :value="model.flowProperties"
          @change="(e) => onChange('flowProperties', e)"
        >
          <el-option label="同意" value="1" />
          <el-option label="拒绝" value="0" />
          <el-option label="其他" value="2" />
        </el-select>
      </div>
      <div class="panelRow">
        <div>{{ i18n['sequenceFlow.expression'] }}：</div>
        <el-input
          style="width:90%; font-size:12px"
          type="textarea"
          :rows="4"
          :disabled="readOnly"
          :value="model.conditionExpression"
          @input="(value) => {onChange('conditionExpression', value)}"
        />
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
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
