<template>
  <div class="root">
    <ToolbarPanel v-if="!isView" ref="toolbar" />
    <div style="display: flex">
      <ItemPanel v-if="!isView" ref="addItemPanel" :height="height" />
      <div ref="canvas" class="canvasPanel" :style="{'height':height+'px','width':isView?'100%':'70%','border-bottom':isView?0:null}" />
      <DetailPanel
        v-if="!isView"
        ref="detailPanel"
        :height="height"
        :model="selectedModel"
        :read-only="mode !== 'edit'"
        :users="users"
        :roles="roles"
        :groups="groups"
        :departments="departments"
        :tasks="tasks"
        :templates="templates"
        :templates-base="templatesBase"
        :signal-defs="processModel.signalDefs"
        :message-defs="processModel.messageDefs"
        :on-change="(key,val)=>{onItemCfgChange(key,val)}"
      />
    </div>
  </div>
</template>
<script>
import G6 from '@antv/g6/src'
import { getShapeName } from '../util/clazz'
import Command from '../plugins/command'
import Toolbar from '../plugins/toolbar'
import AddItemPanel from '../plugins/addItemPanel'
import CanvasPanel from '../plugins/canvasPanel'
import ToolbarPanel from '../components/ToolbarPanel'
import ItemPanel from '../components/ItemPanel'
import DetailPanel from '../components/DetailPanel'
import i18n from '../locales'
import { exportXML } from '../util/bpmn'
import registerShape from '../shape'
import registerBehavior from '../behavior'
registerShape(G6)
registerBehavior(G6)
export default {
  name: 'WfdVue',
  components: {
    ToolbarPanel,
    ItemPanel,
    DetailPanel
  },
  provide() {
    return {
      i18n: i18n[this.lang]
    }
  },
  props: {
    isView: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'edit'
    },
    height: {
      type: Number,
      default: 800
    },
    lang: {
      type: String,
      default: 'zh'
    },
    data: {
      type: Object,
      default: () => ({ nodes: [], edges: [] })
    },
    // 人员
    users: {
      type: Array,
      default: () => ([])
    },
    // 角色
    roles: {
      type: Array,
      default: () => ([])
    },
    // 人员组
    groups: {
      type: Array,
      default: () => ([])
    },
    // 部门
    departments: {
      type: Array,
      default: () => ([])
    },
    // 任务
    tasks: {
      type: Array,
      default: () => ([])
    },
    templates: {
      type: Array,
      default: () => ([])
    },
    templatesBase: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      resizeFunc: () => {},
      selectedModel: {},
      previous: '',
      processModel: {
        id: '',
        name: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: []
      },
      graph: null,
      cmdPlugin: null
    }
  },
  watch: {
    data(oldData, newData) {
      if (oldData !== newData) {
        if (this.graph) {
          this.graph.changeData(this.initShape(newData))
          this.graph.setMode(this.mode)
          this.graph.emit('canvas:click')
          if (this.cmdPlugin) {
            this.cmdPlugin.initPlugin(this.graph)
          }
          if (this.isView) {
            this.graph.fitView(5)
          }
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeFunc)
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })
  },
  mounted() {
    let plugins = []
    if (!this.isView) {
      this.cmdPlugin = new Command()
      const toolbar = new Toolbar({ container: this.$refs['toolbar'].$el })
      const addItemPanel = new AddItemPanel({ container: this.$refs['addItemPanel'].$el })
      const canvasPanel = new CanvasPanel({ container: this.$refs['canvas'] })
      plugins = [this.cmdPlugin, toolbar, addItemPanel, canvasPanel]
    }
    const width = this.$refs['canvas'].offsetWidth
    this.graph = new G6.Graph({
      plugins: plugins,
      container: this.$refs['canvas'],
      height: this.height,
      width: width,
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [],
        edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
          'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign']
      },
      defaultEdge: {
        shape: 'flow-polyline-round'
      }
    })
    this.graph.saveXML = (createFile = true) => exportXML(this.graph.save(), this.processModel, createFile)
    if (this.isView) { this.graph.setMode('view') } else { this.graph.setMode(this.mode) }
    this.graph.data(this.initShape(this.data))
    this.graph.render()
    if (this.isView && this.data && this.data.nodes) {
      this.graph.fitView(5)
    }
    this.initEvents()
  },
  methods: {
    initShape(data) {
      if (data && data.nodes) {
        return {
          nodes: data.nodes.map(node => {
            return {
              shape: getShapeName(node.clazz),
              ...node
            }
          }),
          edges: data.edges
        }
      }
      return data
    },
    verifyProcess(pv) {
      if (pv.label === undefined || pv.label === null || pv.label === '') {
        return '标题不能为空'
      } else if (pv.sort === undefined || pv.sort === null || pv.sort === '') {
        return '顺序不能为空'
      }
      if (pv.clazz === 'userTask' || pv.clazz === 'receiveTask') {
        if (pv.assignType === undefined || pv.assignType === null || pv.assignType === '') {
          return '审批节点或处理节点的处理人类型不能为空'
        } else if (pv.assignValue === undefined || pv.assignValue === null || pv.assignValue === '' || pv.assignValue.length === 0) {
          return '审批节点或处理节点的处理人不能为空'
        }
      }
      if (pv.clazz === 'flow') {
        if (pv.flowProperties === undefined || pv.flowProperties === null || pv.flowProperties === '') {
          return '流转属性不能为空'
        }
      }
      return ''
    },
    initEvents() {
      this.graph.on('afteritemselected', (items) => {
        if (items && items.length > 0) {
          if (this.previous !== '') {
            var previousValue = ''
            const item = this.graph.findById(this.previous[0])
            if (item !== undefined) {
              previousValue = { ...item.getModel() }
              var err = this.verifyProcess(previousValue)
              if (err !== '') {
                this.selectedModel = previousValue
                this.$message.error(err)
                return
              }
            }
          }
          const item = this.graph.findById(items[0])
          this.selectedModel = { ...item.getModel() }
          this.previous = items
        } else {
          if (this.previous !== '') {
            this.selectedModel = this.processModel
          }
        }
      })
      const page = this.$refs['canvas']
      const graph = this.graph
      const height = this.height - 1
      this.resizeFunc = () => {
        graph.changeSize(page.offsetWidth, height)
      }
      window.addEventListener('resize', this.resizeFunc)
    },
    onItemCfgChange(key, value) {
      var items = ''
      if (this.previous.length !== 0) {
        items = [this.previous[0]]
      } else {
        items = this.graph.get('selectedItems')
      }
      if (items && items.length > 0) {
        const item = this.graph.findById(items[0])
        if (this.graph.executeCommand) {
          this.graph.executeCommand('update', {
            itemId: items[0],
            updateModel: { [key]: value }
          })
        } else {
          this.graph.updateItem(item, { [key]: value })
        }
        this.selectedModel = { ...item.getModel() }
      } else {
        const canvasModel = { ...this.processModel, [key]: value }
        this.selectedModel = canvasModel
        this.processModel = canvasModel
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .root{
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: block;
    }
    .canvasPanel {
        flex: 0 0 auto;
        float: left;
        width:70%;
        background-color: #fff;
        border-bottom: 1px solid #E9E9E9;
    }
</style>

<style>
  .panelRow > div:nth-child(1) {
    line-height:18px
  }
</style>
