<template>
  <div>
    <div v-if="writePreview" class="panelRow">
      <div>可写模版：</div>
      <el-select
        style="width:90%; font-size:12px"
        placeholder="选择模版"
        :disabled="readOnly"
        :value="model.writeTpls"
        :multiple="true"
        :filterable="true"
        @change="(e) => onChange('writeTpls', e)"
      >
        <template v-for="(templateValue, templateIndex) in templatesBase">
          <el-option v-if="templates.indexOf(templateValue.id) !== -1" :key="templateIndex" :label="templateValue.name" :value="templateValue.id" />
        </template>
      </el-select>
    </div>
    <div v-if="readonlyPreview" class="panelRow">
      <div>只读模版：</div>
      <el-select
        style="width:90%; font-size:12px"
        placeholder="选择模版"
        :disabled="readOnly"
        :value="model.readonlyTpls"
        :multiple="true"
        :filterable="true"
        @change="(e) => onChange('readonlyTpls', e)"
      >
        <template v-for="(templateValue, templateIndex) in templatesBase">
          <el-option v-if="templates.indexOf(templateValue.id) !== -1" :key="templateIndex" :label="templateValue.name" :value="templateValue.id" />
        </template>
      </el-select>
    </div>
    <div class="panelRow">
      <div>隐藏模版：</div>
      <el-select
        style="width:90%; font-size:12px"
        placeholder="选择模版"
        :disabled="readOnly"
        :value="model.hideTpls"
        :multiple="true"
        :filterable="true"
        @change="(e) => onChange('hideTpls', e)"
      >
        <template v-for="(templateValue, templateIndex) in templatesBase">
          <el-option v-if="templates.indexOf(templateValue.id) !== -1" :key="templateIndex" :label="templateValue.name" :value="templateValue.id" />
        </template>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['i18n'],
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
    },
    templates: {
      type: Array,
      default: () => ([])
    },
    templatesBase: {
      type: Array,
      default: () => ([])
    },
    writePreview: {
      type: Boolean,
      default: true
    },
    readonlyPreview: {
      type: Boolean,
      default: true
    }
  }
}
</script>
