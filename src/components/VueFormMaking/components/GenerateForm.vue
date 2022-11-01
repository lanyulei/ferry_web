<template>
  <div>
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type === 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list">
                <el-form-item v-if="citem.type==='blank'" :key="citem.key" :label="citem.name" :prop="citem.model">
                  <slot :name="citem.model" :model="models" />
                </el-form-item>
                <genetate-form-item
                  v-else
                  :key="citem.key"
                  :preview="preview"
                  :models.sync="models"
                  :remote="remote"
                  :widget="citem"
                  :data="data"
                  :prop-value="citem.model"
                  @input-change="onInputChange"
                />
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type === 'blank'">
          <el-form-item :key="item.key" :label="item.name" :prop="item.model">
            <slot :name="item.model" :model="models" />
          </el-form-item>
        </template>
        <!-- 子表单 -->
        <template v-else-if="item.type === 'subform'">
          <el-form-item
            :key="item.key"
            :label-width="!item.options.labelWidthStatus?'0px': item.options.labelWidth + 'px'"
            :label="!item.options.labelWidthStatus?'':item.name"
          >
            <el-table
              :data="models[item.model]"
              border
              style="width: 100%"
              :header-cell-style="{padding: '5px 0'}"
              size="mini"
            >
              <el-table-column
                v-if="!preview"
                fixed
                width="50"
              >
                <template slot="header">
                  <i style="font-size: 25px; color: #409EFF;cursor:pointer;" class="el-icon-circle-plus" @click="addSubformCol(item)" />
                </template>
                <template slot-scope="scope">
                  <i style="font-size: 25px; color: red" class="el-icon-remove" @click="delSubformCol(item, scope.$index)" />
                </template>
              </el-table-column>
              <template v-for="(c, i) in item.columns">
                <div :key="i">
                  <el-table-column
                    v-for="v in c.list"
                    :key="v.key"
                    :prop="v.model"
                    :label="v.name"
                    min-width="250"
                  >
                    <template slot-scope="scope">
                      <genetate-form-item
                        :prop-value="item.model + '.' + scope.$index + '.' + v.model"
                        :preview="preview"
                        :models.sync="models"
                        :widget="v"
                        :remote="remote"
                        :data="data"
                        :disabled="disabled"
                        :is-label="false"
                        :subform-index="scope.$index"
                        :subform-model="item.model"
                      />
                    </template>
                  </el-table-column>
                </div>
              </template>
            </el-table>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item
            :key="item.key"
            :prop-value="item.model"
            :preview="preview"
            :models.sync="models"
            :widget="item"
            :remote="remote"
            :data="data"
            :disabled="disabled"
            @input-change="onInputChange"
          />
        </template>

      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'

export default {
  name: 'FmGenerateForm',
  components: {
    GenetateFormItem
  },
  /* eslint-disable */
  props: ['data', 'remote', 'value', 'insite', 'disabled', 'preview'],
  data() {
    return {
      tableData: [],
      models: {},
      rules: {},
      subformFields: {}
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.generateModle(val.list)
      }
    },
    value: {
      deep: true,
      handler(val) {
        this.models = { ...this.models, ...val }
      }
    }
  },
  created() {
    this.generateModle(this.data.list)
  },
  mounted() {
  },
  methods: {
    addSubformCol(item) {
      var subformFields = {}
      for (var c of item.columns) {
        for (var l of c.list) {
          if (l.options !== null && l.options !== undefined) {
            subformFields[l.model] = l.options.defaultValue !== undefined && l.options.defaultValue !== null ? l.options.defaultValue: ""
          } else {
            subformFields[l.model] = ""
          }

          if (this.rules[item.model] === undefined) {
            this.rules[item.model] = []
          }
          if (this.rules[item.model][this.models[item.model].length] === undefined) {
            this.rules[item.model][this.models[item.model].length] = {}
          }
          this.rules[item.model][this.models[item.model].length][l.model] = [...l.rules.map(item => {
            if (item.pattern) {
              return { ...item, pattern: eval(item.pattern) }
            } else {
              return { ...item }
            }
          })]
        }
      }
      this.models[item.model].push(subformFields)
      this.models.status = 1
    },
    delSubformCol(item, index) {
      this.models[item.model].splice(index, 1)
      this.models.status = -1
    },
    generateModle(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
            } if (genList[i].type === 'subform') {
              this.$set(this.models, genList[i].model, [])
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }

          if (!this.preview) {
            if (this.rules[genList[i].model]) {
              this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) }
                } else {
                  return { ...item }
                }
              })]
            } else {
              this.rules[genList[i].model] = [...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) }
                } else {
                  return { ...item }
                }
              })]
            }
          }
        }
      }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error(this.$t('fm.message.validError')).message)
          }
        })
      })
    },
    reset() {
      this.$refs.generateForm.resetFields()
    },
    onInputChange(value, field) {
      // this.$emit('on-change', field, value, this.models)
    },
    refresh() {

    }
  }
}
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
