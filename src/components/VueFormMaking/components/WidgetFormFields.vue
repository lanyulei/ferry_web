<template>
  <div>
    <template v-if="element.type === 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'textarea'">
      <el-input
        v-model="element.options.defaultValue"
        type="textarea"
        :rows="5"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
      />
    </template>

    <template v-if="element.type === 'number'">
      <el-input-number
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'radio'">
      <el-radio-group
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio
          v-for="(item, index2) in element.options.options"
          :key="item.value + index2"
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <el-checkbox-group
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          v-for="(item, index1) in element.options.options"
          :key="item.value + index1"
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <el-time-picker
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrow-control="element.options.arrowControl"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type === 'rate'">
      <el-rate
        v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
      />
    </template>

    <template v-if="element.type === 'color'">
      <el-color-picker
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      />
    </template>

    <template v-if="element.type === 'select'">
      <el-select
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
      >
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value" />
      </el-select>
    </template>

    <template v-if="element.type==='switch'">
      <el-switch
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type==='slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type==='imgupload'">
      <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{'width': element.options.width}"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      />
    </template>

    <template v-if="element.type==='file'">
      <FileUpload :element="element" />
    </template>

    <template v-if="element.type === 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-all-levels="element.options.showAllLevels"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
        :options="element.options.remote?element.options.remoteOptions:element.options.options"
        :props="element.options.props"
      />
    </template>

    <template v-if="element.type === 'editor'">
      <vue-editor
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
      />
    </template>

    <template v-if="element.type==='blank'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">{{ $t('fm.components.fields.blank') }}</div>
    </template>

    <template v-if="element.type === 'text'">
      <span
        :style="{
          'font-size': element.options.font_size,
          'font-family': element.options.font_family,
          'font-weight': element.options.font_weight,
          'color': element.options.font_color
        }"
      >
        {{ element.options.defaultValue }}
      </span>
    </template>

    <template v-if="element.type === 'divider'">
      <el-divider
        :direction="element.options.direction"
        :content-position="element.options.content_position"
      >
        <span
          :style="{
            'font-size': element.options.font_size,
            'font-family': element.options.font_family,
            'font-weight': element.options.font_weight,
            'color': element.options.font_color
          }"
        >
          {{ element.options.defaultValue }}
        </span>
      </el-divider>
    </template>
  </div>
</template>

<script>
import FmUpload from './Upload'
import FileUpload from './Upload/file'
export default {
  name: 'WidgetFormFields',
  /* eslint-disable */
  props: ['element'],
  components: {
    FmUpload,
    FileUpload
  }
}
</script>
