<template>
  <el-form-item
    v-if="showStatus"
    :label-width="isLabel===false||!widget.options.labelWidthStatus?'0px': widgetLabelWidth + 'px'"
    :label="isLabel===false||widget.type==='divider' || !widget.options.labelWidthStatus?'':widget.name"
    :prop="propValue"
    :style="subformIndex !== undefined?{'margin-bottom': '0'}: {}"
  >
    <template v-if="preview">
      <template v-if="widget.type === 'color'">
        <div style="width: 32px; height: 20px; margin-top: 6px; border-radius: 3px" :style="{'background-color': dataModel}" />
      </template>
      <template v-else-if="widget.type==='switch'">
        <el-switch
          v-model="dataModel"
          :disabled="true"
        />
      </template>
      <template v-else-if="widget.type === 'editor'">
        <div class="previewEditorDiv" v-html="dataModel" />
      </template>

      <template v-else-if="widget.type==='file'">
        <div v-for="(uploadUrlItem, uploadUrlIndex) of dataModel" :key="uploadUrlIndex">
          <i style="color: #909399;" class="el-icon-document" />
          <a :href="uploadUrlItem.url" target="_blank">{{ uploadUrlItem.name }}</a>
        </div>
      </template>

      <template v-else-if="widget.type==='imgupload'">
        <fm-upload
          v-model="dataModel"
          :style="{'width': widget.options.width}"
          :width="widget.options.size.width"
          :height="widget.options.size.height"
          :preview="preview"
        />
      </template>
      <template v-else-if="widget.type ==='rate'">
        <el-rate
          v-model="dataModel"
          :max="widget.options.max"
          :disabled="true"
          :allow-half="widget.options.allowHalf"
        />
      </template>
      <template v-else-if="widget.type === 'divider'">
        <el-divider
          :direction="widget.options.direction"
          :content-position="widget.options.content_position"
        >
          <span
            :style="{
              'font-size': widget.options.font_size,
              'font-family': widget.options.font_family,
              'font-weight': widget.options.font_weight,
              'color': widget.options.font_color
            }"
          >
            {{ widget.options.defaultValue }}
          </span>
        </el-divider>
      </template>
      <template v-else-if="widget.type === 'input' && widget.options.showPassword">
        <input :value="dataModel" type="password" style="border: none; background-color: #ffffff; color: #303133" disabled="disabled">
      </template>
      <template v-else-if="widget.type === 'cascader'">
        <el-cascader
          v-model="dataModel"
          class="preview-cascader-class"
          :disabled="true"
          :show-all-levels="widget.options.showAllLevels"
          :options="widget.options.remote?widget.options.remoteOptions:widget.options.options"
          :props="widget.options.props"
        />
      </template>
      <template v-else>
        <div>
          {{ dataModel }}
        </div>
      </template>
    </template>
    <template v-else>
      <template v-if="widget.type === 'input'">
        <el-input
          v-if="widget.options.dataType === 'number'
            || widget.options.dataType === 'integer'
            || widget.options.dataType === 'float'"
          v-model.number="dataModel"
          :type="widget.options.dataType"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :disabled="widget.options.disabled"
          :show-password="widget.options.showPassword"
        />
        <el-input
          v-else
          v-model="dataModel"
          :type="widget.options.dataType"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :show-password="widget.options.showPassword"
        />
      </template>

      <template v-if="widget.type === 'textarea'">
        <el-input
          v-model="dataModel"
          type="textarea"
          :rows="5"
          :disabled="widget.options.disabled"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
        />
      </template>

      <template v-if="widget.type === 'number'">
        <el-input-number
          v-model="dataModel"
          :style="{width: widget.options.width}"
          :step="widget.options.step"
          controls-position="right"
          :disabled="widget.options.disabled"
        />
      </template>

      <template v-if="widget.type === 'radio'">
        <el-radio-group
          v-model="dataModel"
          :style="{width: widget.options.width}"
          :disabled="widget.options.disabled"
        >
          <el-radio
            v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="index"
            :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
          >
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
          </el-radio>
        </el-radio-group>
      </template>

      <template v-if="widget.type === 'checkbox'">
        <el-checkbox-group
          v-model="dataModel"
          :style="{width: widget.options.width}"
          :disabled="widget.options.disabled"
        >
          <el-checkbox

            v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
            :key="index"
            :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
            :label="item.value"
          >
            <template v-if="widget.options.remote">{{ item.label }}</template>
            <template v-else>{{ widget.options.showLabel ? item.label : item.value }}</template>
          </el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-if="widget.type === 'time'">
        <el-time-picker
          v-model="dataModel"
          :is-range="widget.options.isRange"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :arrow-control="widget.options.arrowControl"
          :value-format="widget.options.format"
          :style="{width: widget.options.width}"
        />
      </template>

      <template v-if="widget.type==='date'">
        <el-date-picker
          v-model="dataModel"
          :type="widget.options.type"
          :placeholder="widget.options.placeholder"
          :start-placeholder="widget.options.startPlaceholder"
          :end-placeholder="widget.options.endPlaceholder"
          :readonly="widget.options.readonly"
          :disabled="widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
          :format="widget.options.format"
          :style="{width: widget.options.width}"
        />
      </template>

      <template v-if="widget.type ==='rate'">
        <el-rate
          v-model="dataModel"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :allow-half="widget.options.allowHalf"
        />
      </template>

      <template v-if="widget.type === 'color'">
        <el-color-picker
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :show-alpha="widget.options.showAlpha"
        />
      </template>

      <template v-if="widget.type === 'select'">
        <el-select
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :multiple="widget.options.multiple"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :filterable="widget.options.filterable"
        >
          <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value" />
        </el-select>
      </template>

      <template v-if="widget.type==='switch'">
        <el-switch
          v-model="dataModel"
          :disabled="widget.options.disabled"
        />
      </template>

      <template v-if="widget.type==='slider'">
        <el-slider
          v-model="dataModel"
          :min="widget.options.min"
          :max="widget.options.max"
          :disabled="widget.options.disabled"
          :step="widget.options.step"
          :show-input="widget.options.showInput"
          :range="widget.options.range"
          :style="{width: widget.options.width}"
        />
      </template>

      <template v-if="widget.type==='imgupload'">
        <fm-upload
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :style="{'width': widget.options.width}"
          :width="widget.options.size.width"
          :height="widget.options.size.height"
          :token="widget.options.token"
          :domain="widget.options.domain"
          :multiple="widget.options.multiple"
          :length="widget.options.length"
          :is-qiniu="widget.options.isQiniu"
          :is-delete="widget.options.isDelete"
          :min="widget.options.min"
          :is-edit="widget.options.isEdit"
          :action="widget.options.action"
        />
      </template>

      <template v-if="widget.type==='file'">
        <FileUpload :element="widget" :data-model="dataModel" @fileList="fileList" />
      </template>

      <template v-if="widget.type === 'editor'">
        <vue-editor
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :style="{width: widget.options.width}"
        />
      </template>

      <template v-if="widget.type === 'cascader'">
        <el-cascader
          v-model="dataModel"
          :disabled="widget.options.disabled"
          :show-all-levels="widget.options.showAllLevels"
          :clearable="widget.options.clearable"
          :placeholder="widget.options.placeholder"
          :style="{width: widget.options.width}"
          :options="widget.options.remote?widget.options.remoteOptions:widget.options.options"
          :props="widget.options.props"
        />
      </template>

      <template v-if="widget.type === 'text'">
        <span
          :style="{
            'font-size': widget.options.font_size,
            'font-family': widget.options.font_family,
            'font-weight': widget.options.font_weight,
            'color': widget.options.font_color
          }"
        >
          {{ widget.options.defaultValue }}
        </span>
      </template>

      <template v-if="widget.type === 'divider'">
        <el-divider
          :direction="widget.options.direction"
          :content-position="widget.options.content_position"
        >
          <span
            :style="{
              'font-size': widget.options.font_size,
              'font-family': widget.options.font_family,
              'font-weight': widget.options.font_weight,
              'color': widget.options.font_color
            }"
          >
            {{ widget.options.defaultValue }}
          </span>
        </el-divider>
      </template>
    </template>

  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FileUpload from './Upload/file'
import axios from 'axios'

export default {
  name: 'GenetateFormItem',
  components: {
    FmUpload,
    FileUpload
  },
  /* eslint-disable */
  props: ['widget', 'models', 'propValue', 'remote', 'data', 'disabled', 'preview', 'isLabel', 'subformIndex', 'subformModel'],
  data() {
    return {
      showStatus: true,
      widgetLabelWidth: '',
      dataModel: this.subformIndex===undefined?
        this.models[this.widget.model]:
        this.models[this.subformModel][this.subformIndex][this.widget.model],
      tableData: []
    }
  },
  watch: {
    dataModel: {
      deep: true,
      handler(newValue) {
        if (newValue !== undefined && newValue !== null) {
          if (this.subformIndex !== undefined) {
            this.models[this.subformModel][this.subformIndex][this.widget.model] = newValue
            this.$emit('update:models', {
              ...this.models,
              [this.subformModel]: this.models[this.subformModel]
            })
            // this.$emit('input-change', val, this.widget.model, this.subformIndex)
          } else {
            this.models[this.widget.model] = newValue
            this.$emit('update:models', {
              ...this.models,
              [this.widget.model]: newValue
            })
            // this.$emit('input-change', val, this.widget.model)
          }
        }
      }
    },
    models: {
      deep: true,
      handler(val) {
        if (val.status === undefined && val.status === null) {
          if (this.subformIndex === undefined) {
            this.dataModel = val[this.widget.model]
          } else {
            this.dataModel = val[this.subformModel][this.subformIndex][this.widget.model]
          }
        }
        delete this.models.status
        this.handleDisplayVerifiy()
      }
    }
  },
  created() {
    if (this.widget.type !== 'cascader') {
      if (this.widget.options.remote === 99) {
        let headers = JSON.parse(this.widget.options.requestMethod.headers)
        headers["content-type"] = "application/json; charset=utf-8"

        let params = JSON.parse(this.widget.options.requestMethod.params)

        let axiosParams = {
          url: this.widget.options.requestMethod.url,
          method: this.widget.options.requestMethod.method,
          headers: headers
        }

        if (this.widget.options.requestMethod.method === 'get') {
          axiosParams["params"] = params
        } else if (this.widget.options.requestMethod.method === 'post') {
          axiosParams["data"] = params
        }

        axios(axiosParams).then(resp => {
          let fields = []
          if (this.widget.options.requestMethod.result) {
            fields = this.widget.options.requestMethod.result.split(".")
          } else {
            fields = ["data"]
          }

          let result = resp.data
          for (let f of fields) {
            result = result[f]
          }
          this.widget.options.remoteOptions = result.map(item => {
            return {
              value: item[this.widget.options.props.value],
              label: item[this.widget.options.props.label],
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }

      if (this.widget.options.remote !== 99 && this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
        this.remote[this.widget.options.remoteFunc]((data) => {
          if (this.widget.type !== 'cascader') {
            this.widget.options.remoteOptions = data.map(item => {
              return {
                value: item[this.widget.options.props.value],
                label: item[this.widget.options.props.label],
                children: item[this.widget.options.props.children]
              }
            })
          }
        })
      }
    } else {
      this.remote[this.widget.options.remoteFunc](res=>{
        this.widget.options.remoteOptions = res
        this.cascaderChild(this.widget.options.remoteOptions)
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

    if (this.disabled !== undefined && this.disabled !== null) {
      this.widget.options.disabled = this.disabled
    }

    // label width
    if (this.widget.options.labelWidthDisabled) {
      this.widgetLabelWidth = this.widget.options.labelWidth
    } else if (this.widget.type==='divider') {
      this.widgetLabelWidth = 0
    } else {
      this.widgetLabelWidth = this.data.config.labelWidth
    }

    this.handleDisplayVerifiy()
  },
  methods: {
    cascaderChild(options) {
      options.forEach(i => {
        if (i.children && i.children.length > 0) {
          this.cascaderChild(i.children)
        } else {
          i.children = null
        }
      })
    },
    fileList(files) {
      this.dataModel = files
    },
    handleDisplayVerifiy() {
      if (Object.keys(this.widget.options).indexOf('displayVerify')>=0) {
        if (this.widget.options.displayVerify.type !== 'hide') {
          var c = 0
          for (var v of this.widget.options.displayVerify.list) {
            if (this.models[v.model].toString() === v.value) {
              c++
            }
          }
          if (this.widget.options.displayVerify.type === 'and') {
            if (c !== this.widget.options.displayVerify.list.length) {
              this.showStatus = false
            } else {
              this.showStatus = true
            }
          } else if (this.widget.options.displayVerify.type === 'or')  {
            if (c === 0) {
              this.showStatus = false
            } else {
              this.showStatus = true
            }
          }
        }
      }
    }
  }
}
</script>

<style>
  .previewEditorDiv > p {
    margin: 0;
  }

  .preview-cascader-class .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border: none;
    color: #303133;
  }

  .preview-cascader-class .el-input.is-disabled .el-input__suffix .el-input__suffix-inner .el-input__icon.el-icon-arrow-down:before {
    content: ''
  }
</style>
