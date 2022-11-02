<template>
  <div v-if="show">
    <el-form label-position="top">
      <!-- 字段标识 -->
      <el-form-item v-if="data.type!=='grid'" :label="$t('fm.config.widget.model')">
        <el-input v-model="data.model" />
      </el-form-item>
      <!-- 标题 -->
      <el-form-item v-if="data.type!=='grid' && data.type!=='divider'" :label="$t('fm.config.widget.name')">
        <el-input v-model="data.name" />
      </el-form-item>
      <!-- 宽度 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('width')>=0" :label="$t('fm.config.widget.width')">
        <el-input v-model="data.options.width" />
      </el-form-item>

      <!-- 兰玉磊开始添加 -->
      <!-- 标签宽度 -->
      <el-form-item
        v-if="Object.keys(data.options).indexOf('labelWidth')>=0 &&
          data.type!=='grid' &&
          data.type!=='subform' &&
          data.type !== 'divider'"
        :label="$t('fm.config.widget.labelWidth')"
      >
        <el-checkbox v-model="data.options.labelWidthDisabled">自定义</el-checkbox>
        <el-input-number v-model="data.options.labelWidth" :min="0" :step="10" :disabled="!data.options.labelWidthDisabled" />
      </el-form-item>
      <el-form-item
        v-if="Object.keys(data.options).indexOf('labelWidthStatus')>=0 &&
          data.type!=='grid' &&
          data.type !== 'divider'"
        label="显示标签"
      >
        <el-switch
          v-model="data.options.labelWidthStatus"
        />
      </el-form-item>
      <el-form-item v-if="Object.keys(data.options).indexOf('tip')>=0" :label="$t('fm.config.widget.tip')">
        <el-input v-model="data.options.tip" />
      </el-form-item>
      <!-- 兰玉磊结束添加 -->

      <!-- 高度 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('height')>=0" :label="$t('fm.config.widget.height')">
        <el-input v-model="data.options.height" />
      </el-form-item>
      <!-- 大小 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('size')>=0" :label="$t('fm.config.widget.size')">
        {{ $t('fm.config.widget.width') }} <el-input v-model.number="data.options.size.width" style="width: 90px;" type="number" />
        {{ $t('fm.config.widget.height') }} <el-input v-model.number="data.options.size.height" style="width: 90px;" type="number" />
      </el-form-item>
      <!-- 占位内容 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')" :label="$t('fm.config.widget.placeholder')">
        <el-input v-model="data.options.placeholder" />
      </el-form-item>
      <!-- 布局方式，块，行 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('inline')>=0" :label="$t('fm.config.widget.layout')">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">{{ $t('fm.config.widget.block') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.inline') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 显示输入框 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('showInput')>=0" :label="$t('fm.config.widget.showInput')">
        <el-switch v-model="data.options.showInput" />
      </el-form-item>
      <!-- 最小值 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('min')>=0" :label="$t('fm.config.widget.min')">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1" />
      </el-form-item>
      <!-- 最大值 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('max')>=0" :label="$t('fm.config.widget.max')">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1" />
      </el-form-item>
      <!-- 步长 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('step')>=0" :label="$t('fm.config.widget.step')">
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1" />
      </el-form-item>
      <!-- 是否多选 -->
      <el-form-item v-if="data.type=='select'" :label="$t('fm.config.widget.multiple')">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple" />
      </el-form-item>
      <!-- 是否可搜索 -->
      <el-form-item v-if="data.type=='select'" :label="$t('fm.config.widget.filterable')">
        <el-switch v-model="data.options.filterable" />
      </el-form-item>
      <!-- 允许半选 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('allowHalf')>=0" :label="$t('fm.config.widget.allowHalf')">
        <el-switch
          v-model="data.options.allowHalf"
        />
      </el-form-item>
      <!-- 支持透明度选择 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('showAlpha')>=0" :label="$t('fm.config.widget.showAlpha')">
        <el-switch
          v-model="data.options.showAlpha"
        />
      </el-form-item>
      <!-- 是否显示标签 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('showLabel')>=0" :label="$t('fm.config.widget.showLabel')">
        <el-switch
          v-model="data.options.showLabel"
        />
      </el-form-item>
      <!-- 选项 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('options')>=0" :label="$t('fm.config.widget.option')">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">{{ $t('fm.config.widget.staticData') }}</el-radio-button>
          <el-radio-button :label="true">{{ $t('fm.config.widget.remoteData') }}</el-radio-button>
          <el-radio-button :label="99">{{ $t('fm.config.widget.requestMethod') }}</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote === 99">
          <div class="form-request-method">
            <div>
              <div class="form-request-method-title">URL</div>
              <div class="form-request-method-content">
                <el-input v-model="data.options.requestMethod.url" placeholder="请输入URL" size="mini" />
              </div>
            </div>
            <div>
              <div class="form-request-method-title">请求方式</div>
              <div class="form-request-method-content">
                <el-radio-group v-model="data.options.requestMethod.method" size="mini">
                  <el-radio label="get">Get</el-radio>
                  <el-radio label="post">Post</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div>
              <div class="form-request-method-title" style="margin-bottom: 6px">参数（JSON）</div>
              <div class="form-request-method-content">
                <el-input
                  v-model="data.options.requestMethod.params"
                  size="mini"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div>
              <div class="form-request-method-title" style="margin-bottom: 6px">请求头（JSON）</div>
              <div class="form-request-method-content">
                <el-input
                  v-model="data.options.requestMethod.headers"
                  size="mini"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div>
              <div class="form-request-method-title" style="margin-bottom: 6px">超时时间</div>
              <div class="form-request-method-content">
                <el-input
                  v-model="data.options.requestMethod.timeout"
                  size="mini"
                  type="number"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div>
              <div class="form-request-method-title" style="margin-bottom: 6px">返回字段</div>
              <div class="form-request-method-content">
                <el-input
                  v-model="data.options.requestMethod.result"
                  size="mini"
                  placeholder="请输入内容"
                />
              </div>
            </div>
            <div>
              <div class="form-request-method-title" style="margin-bottom: 6px">字段映射</div>
              <div class="form-request-method-content">
                <el-input v-model="data.options.props.value" size="mini" style="">
                  <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
                </el-input>
                <el-input v-model="data.options.props.label" size="mini" style="">
                  <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
                </el-input>
                <el-input v-if="data.type === 'cascader'" v-model="data.options.props.children" size="mini" style="">
                  <template slot="prepend">{{ $t('fm.config.widget.childrenOption') }}</template>
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="data.options.remote">
          <div>
            <el-input v-model="data.options.remoteFunc" size="mini" style="">
              <template slot="prepend">{{ $t('fm.config.widget.remoteFunc') }}</template>
            </el-input>
            <el-input v-model="data.options.props.value" size="mini" style="">
              <template slot="prepend">{{ $t('fm.config.widget.value') }}</template>
            </el-input>
            <el-input v-model="data.options.props.label" size="mini" style="">
              <template slot="prepend">{{ $t('fm.config.widget.label') }}</template>
            </el-input>
            <el-input v-if="data.type === 'cascader'" v-model="data.options.props.children" size="mini" style="">
              <template slot="prepend">{{ $t('fm.config.widget.childrenOption') }}</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type==='radio' || (data.type==='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input v-model="item.value" :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" />
                    <el-input v-if="data.options.showLabel" v-model="item.label" style="width:90px;" size="mini" />
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars" /></i>
                  <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)" />

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input v-model="item.value" :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" />
                    <el-input v-if="data.options.showLabel" v-model="item.label" style="width:90px;" size="mini" />
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars" /></i>
                  <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)" />

                </li>
              </draggable>
            </el-checkbox-group>
          </template>

          <template v-if="data.type === 'cascader'">
            <el-tree
              :data="data.options.options"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span style="font-size: 12px;">{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => appendCascaderDialog(data)"
                  >
                    <i class="el-icon-circle-plus" style="font-size: 15px;" />
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => editCascaderData(data)"
                  >
                    <i class="el-icon-edit-outline" style="font-size: 15px;" />
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => removeCascaderData(node, data)"
                  >
                    <i class="el-icon-remove" style="font-size: 15px; color: #f56c6c" />
                  </el-button>
                </span>
              </span>
            </el-tree>
          </template>

          <div :style="data.type === 'cascader'?{'margin-left': '5px'}: {'margin-left': '22px'}">
            <el-button type="text" :style="data.type === 'cascader'?{'font-size': '13px'}:{}" @click="data.type === 'cascader'?handleAddCascaderTopDialog():handleAddOption()">
              {{ $t('fm.actions.addOption') }}
            </el-button>
          </div>
        </template>
      </el-form-item>
      <!-- 默认值 -->
      <el-form-item v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type === 'textarea' || data.type === 'input' || data.type=='rate' || data.type=='color' || data.type=='switch')" :label="$t('fm.config.widget.defaultValue')">
        <el-input v-if="data.type=='textarea'" v-model="data.options.defaultValue" type="textarea" :rows="5" />
        <el-input v-if="data.type=='input'" v-model="data.options.defaultValue" />
        <el-rate v-if="data.type === 'rate'" v-model="data.options.defaultValue" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" />
        <el-button v-if="data.type === 'rate'" type="text" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">{{ $t('fm.actions.clear') }}</el-button>
        <el-color-picker
          v-if="data.type === 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        />
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue" />
      </el-form-item>
      <!-- 显示类型 -->
      <template v-if="data.type === 'time' || data.type === 'date'">
        <el-form-item v-if="data.type === 'date'" :label="$t('fm.config.widget.showType')">
          <el-select v-model="data.options.type">
            <el-option value="year" />
            <el-option value="month" />
            <el-option value="date" />
            <el-option value="dates" />
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime" />
            <el-option value="datetimerange" />
            <el-option value="daterange" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="data.type === 'time'" :label="$t('fm.config.widget.isRange')">
          <el-switch
            v-model="data.options.isRange"
          />
        </el-form-item>
        <el-form-item v-if="data.type === 'date'" :label="$t('fm.config.widget.isTimestamp')">
          <el-switch
            v-model="data.options.timestamp"
          />
        </el-form-item>
        <el-form-item v-if="(!data.options.isRange && data.type === 'time') || (data.type !== 'time' && data.options.type !== 'datetimerange' && data.options.type !== 'daterange')" :label="$t('fm.config.widget.placeholder')">
          <el-input v-model="data.options.placeholder" />
        </el-form-item>
        <el-form-item v-if="(data.options.isRange) || data.options.type==='datetimerange' || data.options.type==='daterange'" :label="$t('fm.config.widget.startPlaceholder')">
          <el-input v-model="data.options.startPlaceholder" />
        </el-form-item>
        <el-form-item v-if="data.options.isRange || data.options.type==='datetimerange' || data.options.type==='daterange'" :label="$t('fm.config.widget.endPlaceholder')">
          <el-input v-model="data.options.endPlaceholder" />
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.format')">
          <el-input v-model="data.options.format" />
        </el-form-item>
        <el-form-item v-if="data.type==='time' && Object.keys(data.options).indexOf('isRange')>=0" :label="$t('fm.config.widget.defaultValue')">
          <el-time-picker
            v-if="!data.options.isRange"
            key="1"
            v-model="data.options.defaultValue"
            style="width: 100%;"
            :arrow-control="data.options.arrowControl"
            :value-format="data.options.format"
          />
          <el-time-picker
            v-if="data.options.isRange"
            key="2"
            v-model="data.options.defaultValue"
            style="width: 100%;"
            is-range
            :arrow-control="data.options.arrowControl"
            :value-format="data.options.format"
          />
        </el-form-item>
      </template>
      <!-- 图片上传 -->
      <template v-if="data.type==='imgupload' || data.type==='file'">

        <el-form-item :label="$t('fm.config.widget.limit')">
          <el-input v-model.number="data.options.length" type="number" />
        </el-form-item>
        <el-form-item v-if="Object.keys(data.options).indexOf('isQiniu')>0" :label="$t('fm.config.widget.isQiniu')">
          <el-switch v-model="data.options.isQiniu" />
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input v-model="data.options.domain" />
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.tokenFunc')" :required="true">
            <el-input v-model="data.options.tokenFunc" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('fm.config.widget.imageAction')" :required="true">
            <el-input v-model="data.options.action" />
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.setHeaders')">
            <el-row v-for="(uploadItem, uploadIndex) in headers" :key="uploadIndex">
              <el-col :span="10">
                <el-input
                  v-model="uploadItem.key"
                  type="textarea"
                  :rows="1"
                  placeholder="KEY"
                />
              </el-col>
              <el-col :span="10" style="float: left; margin-left: 10px">
                <el-input
                  v-model="uploadItem.value"
                  type="textarea"
                  :rows="1"
                  placeholder="VALUE"
                />
              </el-col>
              <el-col :span="2">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  plain
                  circle
                  style="padding: 4px; margin-left: 5px;"
                  @click="handleDelHeader(uploadIndex)"
                />
              </el-col>
            </el-row>
            <el-button type="text" style="font-size: 12px; color: #1890ff" @click="handleAddHeader">添加</el-button>
          </el-form-item>
        </template>
      </template>
      <!-- 多行文本 -->
      <template v-if="data.type==='text'">
        <el-form-item label="文字内容">
          <el-input v-model="data.options.defaultValue" placeholder="请输入文字内容" />
        </el-form-item>
        <el-form-item label="文字大小">
          <el-input v-model="data.options.font_size" placeholder="请输入字体大小" />
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="data.options.font_color" placeholder="请输入文字颜色" />
        </el-form-item>
        <el-form-item label="设置粗体">
          <el-input v-model="data.options.font_weight" placeholder="请输入设置粗体" />
        </el-form-item>
        <el-form-item label="字体属性">
          <el-input v-model="data.options.font_family" placeholder="请输入字体属性" />
        </el-form-item>
      </template>
      <!-- 分割符 -->
      <template v-if="data.type==='divider'">
        <el-form-item label="文字内容">
          <el-input v-model="data.options.defaultValue" placeholder="请输入文字内容" />
        </el-form-item>
        <el-form-item label="文字位置">
          <el-radio-group v-model="data.options.content_position">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="center">中间</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分割线方向">
          <el-radio-group v-model="data.options.direction">
            <el-radio-button label="horizontal">横</el-radio-button>
            <el-radio-button label="vertical">竖</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文字大小">
          <el-input v-model="data.options.font_size" placeholder="请输入字体大小" />
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="data.options.font_color" placeholder="请输入文字颜色" />
        </el-form-item>
        <el-form-item label="设置粗体">
          <el-input v-model="data.options.font_weight" placeholder="请输入设置粗体" />
        </el-form-item>
        <el-form-item label="字体属性">
          <el-input v-model="data.options.font_family" placeholder="请输入字体属性" />
        </el-form-item>
      </template>

      <template v-if="data.type==='blank'">
        <el-form-item :label="$t('fm.config.widget.defaultType')">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" :label="$t('fm.config.widget.string')" />
            <el-option value="Object" :label="$t('fm.config.widget.object')" />
            <el-option value="Array" :label="$t('fm.config.widget.array')" />
          </el-select>
        </el-form-item>
      </template>
      <!-- 珊格 -->
      <template v-if="data.type === 'grid'">
        <el-form-item :label="$t('fm.config.widget.gutter')">
          <el-input v-model.number="data.options.gutter" type="number" />
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable
            tag="ul"
            :list="data.columns"
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars" /></i>
              <el-input v-model.number="item.span" :placeholder="$t('fm.config.widget.span')" size="mini" style="width: 100px;" type="number" />

              <el-button circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;" @click="handleOptionsRemove(index)" />

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">{{ $t('fm.actions.addColumn') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.justify')">
          <el-select v-model="data.options.justify">
            <el-option value="start" :label="$t('fm.config.widget.justifyStart')" />
            <el-option value="end" :label="$t('fm.config.widget.justifyEnd')" />
            <el-option value="center" :label="$t('fm.config.widget.justifyCenter')" />
            <el-option value="space-around" :label="$t('fm.config.widget.justifySpaceAround')" />
            <el-option value="space-between" :label="$t('fm.config.widget.justifySpaceBetween')" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.align')">
          <el-select v-model="data.options.align">
            <el-option value="top" :label="$t('fm.config.widget.alignTop')" />
            <el-option value="middle" :label="$t('fm.config.widget.alignMiddle')" />
            <el-option value="bottom" :label="$t('fm.config.widget.alignBottom')" />
          </el-select>
        </el-form-item>
      </template>
      <!-- 非珊格 -->
      <template v-if="data.type !== 'grid'">
        <el-form-item :label="$t('fm.config.widget.attribute')">
          <el-checkbox v-if="Object.keys(data.options).indexOf('readonly')>=0" v-model="data.options.readonly">{{ $t('fm.config.widget.readonly') }}</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('disabled')>=0" v-model="data.options.disabled">{{ $t('fm.config.widget.disabled') }}	</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('showPassword')>=0" v-model="data.options.showPassword">{{ $t('fm.config.widget.showPassword') }}	</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('editable')>=0" v-model="data.options.editable">{{ $t('fm.config.widget.editable') }}</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('clearable')>=0" v-model="data.options.clearable">{{ $t('fm.config.widget.clearable') }} </el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('arrowControl')>=0" v-model="data.options.arrowControl">{{ $t('fm.config.widget.arrowControl') }}</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('isDelete')>=0" v-model="data.options.isDelete">{{ $t('fm.config.widget.isDelete') }}</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('isEdit')>=0" v-model="data.options.isEdit">{{ $t('fm.config.widget.isEdit') }}</el-checkbox>
          <el-checkbox v-if="Object.keys(data.options).indexOf('showAllLevels')>=0" v-model="data.options.showAllLevels">{{ $t('fm.config.widget.showAllLevels') }}</el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.validate')">
          <div v-if="Object.keys(data.options).indexOf('required')>=0">
            <el-checkbox v-model="data.options.required">{{ $t('fm.config.widget.required') }}</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini">
            <el-option value="string" :label="$t('fm.config.widget.string')" />
            <el-option value="number" :label="$t('fm.config.widget.number')" />
            <el-option value="boolean" :label="$t('fm.config.widget.boolean')" />
            <el-option value="integer" :label="$t('fm.config.widget.integer')" />
            <el-option value="float" :label="$t('fm.config.widget.float')" />
            <el-option value="url" :label="$t('fm.config.widget.url')" />
            <el-option value="email" :label="$t('fm.config.widget.email')" />
            <el-option value="hex" :label="$t('fm.config.widget.hex')" />
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input v-model.lazy="data.options.pattern" size="mini" style=" width: 240px;" :placeholder="$t('fm.config.widget.patternPlaceholder')" />
          </div>
        </el-form-item>
      </template>
      <el-form-item v-if="Object.keys(data.options).indexOf('displayVerify')>=0" :label="$t('fm.config.widget.displayVerify')">
        <el-radio-group v-model="data.options.displayVerify.type">
          <el-radio label="hide">不校验</el-radio>
          <el-radio label="and">与</el-radio>
          <el-radio label="or">或</el-radio>
        </el-radio-group>
        <div v-if="data.options.displayVerify.type !== 'hide'">
          <template v-for="(item, index) in data.options.displayVerify.list">
            <div :key="item.model">
              <el-input v-model="item.model" size="mini" :placeholder="$t('fm.config.widget.displayVerifyPlaceholderModel')" />
              <el-input v-model="item.value" size="mini" :placeholder="$t('fm.config.widget.displayVerifyPlaceholderValue')" />
              <el-button v-if="index > 0" type="text" icon="el-icon-remove-outline" @click="delDisplayVerifiy(index)">删  除</el-button>
              <hr v-if="data.options.displayVerify.list.length > 1" style="background-color: #dcdfe6; border:none; height:1px;">
            </div>
          </template>
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="addDisplayVerifiy">新  增</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="cascaderDialog"
      width="30%"
      append-to-body
      :before-close="handleClose"
    >
      <div>
        <el-form ref="addTreeData" :model="addTreeData" label-width="80px">
          <el-form-item
            prop="label"
            label="Label"
            :rules="{ required: true, message: 'Label不能为空', trigger: 'blur' }"
          >
            <el-input v-model="addTreeData.label" style="width: 95%" />
          </el-form-item>
          <el-form-item
            prop="value"
            label="Value"
            :rules="{ required: true, message: 'Value不能为空', trigger: 'blur' }"
          >
            <el-input v-model="addTreeData.value" style="width: 95%" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cascaderDialog = false">取 消</el-button>
        <el-button type="primary" @click="operatingStatus==='add'?appendCascaderData():cascaderDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  /* eslint-disable */
  props: ['data'],
  data() {
    return {
      selectTreeData: {},
      addTreeData: {},
      cascaderDialog: false,
      operatingStatus: 'add',
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      },
      headers: []
    }
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  watch: {
    'data.options.isRange': function(val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else {
          if (Object.keys(this.data.options).indexOf('defaultValue') >= 0) { this.data.options.defaultValue = '' }
        }
      }
    },
    'data.options.required': function(val) {
      this.validateRequired(val)
    },
    'data.options.dataType': function(val) {
      this.validateDataType(val)
    },
    'data.options.pattern': function(val) {
      this.valiatePattern(val)
    },
    'data.name': function(val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.required)
        this.validateDataType(this.data.options.dataType)
        this.valiatePattern(this.data.options.pattern)
      }
    },
    headers: {
      handler: function (val) {
        if (this.data.options) {
          if (this.headers.length > 0) {
            this.data.options.headers = {}
            for (var headerValue of this.headers) {
              this.data.options.headers[headerValue.key] = headerValue.value
            }
          } else {
            this.data.options.headers = {}
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.handleInitHeaders()
  },
  methods: {
    addDisplayVerifiy() {
      this.data.options.displayVerify.list.push({
        model: (new Date()).valueOf(),
        value: '字段值'
      })
    },
    delDisplayVerifiy(index) {
      this.data.options.displayVerify.list.splice(index, 1)
    },
    // 级联选择器
    handleAddCascaderTopDialog() {
      this.selectTreeData = "top"
      this.addTreeData = {}
      this.cascaderDialog = true
    },
    handleClose() {},
    appendCascaderDialog(val) {
      this.operatingStatus = 'add'
      this.addTreeData = {}
      this.selectTreeData = val
      this.cascaderDialog = true
    },
    appendCascaderData() {
      this.$refs['addTreeData'].validate((valid) => {
        if (valid) {
          if (this.selectTreeData === 'top') {
            this.data.options.options.push(this.addTreeData)
          } else {
            if (this.selectTreeData.children) {
              this.selectTreeData.children.push(this.addTreeData);
            } else {
              this.$set(this.selectTreeData, 'children', [this.addTreeData]);
            }
          }
          this.cascaderDialog = false
        }
      })
    },
    editCascaderData(val) {
      this.operatingStatus = 'edit'
      this.addTreeData = val
      this.cascaderDialog = true
    },
    removeCascaderData(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    handleInitHeaders() {
      if (this.data.options) {
        for (var key in this.data.options.headers) {
          this.headers.push({
            key: key,
            value: this.data.options.headers[key]
          })
        }
      }
    },
    handleAddHeader() {
      this.headers.push({
        key: '',
        value: ''
      })
    },
    handleDelHeader(index) {
      this.headers.splice(index, 1)
    },
    handleOptionsRemove(index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption'),
          label: this.$t('fm.config.widget.newOption')
        })
      } else {
        this.data.options.options.push({
          value: this.$t('fm.config.widget.newOption')
        })
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    generateRule() {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }
      }
    },

    validateRequired(val) {
      if (val) {
        this.validator.required = { required: true, message: `${this.data.name}${this.$t('fm.config.widget.validatorRequired')}` }
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },

    validateDataType(val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = { type: val, message: this.data.name + this.$t('fm.config.widget.validatorType') }
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    valiatePattern(val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = { pattern: val, message: this.data.name + this.$t('fm.config.widget.validatorPattern') }
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .form-request-method {
    .form-request-method-title {
      font-size: 13px;
      height: 25px;
    }
    .form-request-method-content {

    }
  }
</style>
