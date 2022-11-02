<template>
  <div class="widget-form-container">
    <div v-if="data.list.length === 0" class="form-empty">{{ $t('fm.description.containerEmpty') }}</div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">

      <draggable
        v-model="data.list"
        class=""
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >

        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <!-- 珊格 -->
            <template v-if="element.type === 'grid'">
              <el-row
                v-if="element && element.key"
                :key="element.key"
                class="widget-col widget-view"
                type="flex"
                :class="{active: selectWidget.key === element.key}"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click.native="handleSelectWidget(index)"
              >
                <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">

                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                  >
                    <transition-group name="fade" tag="div" class="widget-col-list">
                      <template v-for="(el, i) in col.list">
                        <widget-form-item
                          v-if="el.key"
                          :key="el.key"
                          :element="el"
                          :select.sync="selectWidget"
                          :index="i"
                          :data="col"
                          :data-config="data"
                        />
                      </template>

                    </transition-group>

                  </draggable>
                </el-col>
                <div v-if="selectWidget.key === element.key" class="widget-view-action widget-col-action">

                  <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" />
                </div>

                <div v-if="selectWidget.key === element.key" class="widget-view-drag widget-col-drag">
                  <i class="iconfont icon-drag drag-widget" />
                </div>
              </el-row>
            </template>
            <!-- 子表单 -->
            <template v-else-if="element.type === 'subform'">
              <el-row
                v-if="element && element.key"
                :key="element.key"
              >
                <el-form-item
                  class="widget-col widget-view"
                  :label-width="element.options.labelWidthStatus?data.config.labelWidth + 'px': '0px'"
                  :class="{active: selectWidget.key === element.key, 'is_req': element.options.required}"
                  :label="element.options.labelWidthStatus?element.name:''"
                  @click.native="handleSelectWidget(index)"
                >
                  <div
                    type="flex"
                    :class="{active: selectWidget.key === element.key}"
                    :gutter="element.options.gutter ? element.options.gutter : 0"
                    :justify="element.options.justify"
                    :align="element.options.align"
                  >
                    <el-col v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                      <draggable
                        v-model="col.list"
                        :no-transition-on-drag="true"
                        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                      >
                        <transition-group
                          name="fade"
                          tag="div"
                          class="widget-col-list"
                          style="min-height: 131px;overflow-x: auto; white-space: nowrap;"
                        >
                          <template v-for="(el, i) in col.list">
                            <div
                              v-if="el && el.key"
                              :key="el.key"
                              @click="handleSelectWidget(i)"
                            >
                              <widget-form-item
                                :element="el"
                                :select.sync="selectWidget"
                                :index="i"
                                :data="col"
                                :data-config="data"
                                :is-label="true"
                                :is-table="true"
                              />
                            </div>
                          </template>
                        </transition-group>
                      </draggable>
                    </el-col>

                    <div v-if="selectWidget.key === element.key" class="widget-view-action widget-col-action">
                      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" />
                    </div>

                    <div v-if="selectWidget.key === element.key" class="widget-view-drag widget-col-drag">
                      <i class="iconfont icon-drag drag-widget" />
                    </div>
                  </div>
                </el-form-item>
              </el-row>
            </template>
            <template v-else>
              <widget-form-item
                v-if="element && element.key"
                :key="element.key"
                :element="element"
                :select.sync="selectWidget"
                :index="index"
                :data-config="data"
                :data="data"
              />
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'

export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  /* eslint-disable */
  props: ['data', 'select'],
  data() {
    return {
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
    }
  },
  mounted() {
    document.body.ondrop = function(event) {
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    handleMoveEnd({ newIndex, oldIndex }) {
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex
      const to = evt.to

      // 为拖拽到容器的元素添加唯一 key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...this.data.list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox' || this.data.list[newIndex].type === 'select') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      if (this.data.list[newIndex].type === 'grid' || this.data.list[newIndex].type === 'subform') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
        })
      }

      if (this.data.list[newIndex].options.requestMethod) {
        this.data.list[newIndex].options.requestMethod = JSON.parse(JSON.stringify(this.data.list[newIndex].options.requestMethod))
      }

      if (this.data.list[newIndex].options.displayVerify) {
        this.data.list[newIndex].options.displayVerify = JSON.parse(JSON.stringify(this.data.list[newIndex].options.displayVerify))
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item

      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: 'func_' + key
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox' || row.columns[colIndex].list[newIndex].type === 'select') {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
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
    }
  }
}
</script>
