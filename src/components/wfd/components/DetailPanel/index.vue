<template>
  <div class="detailPanel" :style="{'height':height+'px'}">
    <UserTaskDetail
      v-if="model.clazz === 'userTask'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
      :users="users"
      :roles="roles"
      :groups="groups"
      :departments="departments"
      :tasks="tasks"
      :templates="templates"
      :templates-base="templatesBase"
    />
    <ScriptTaskDetail
      v-else-if="model.clazz === 'scriptTask'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
      :tasks="tasks"
    />
    <HandleNodeDetail
      v-else-if="model.clazz === 'receiveTask'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
      :users="users"
      :roles="roles"
      :groups="groups"
      :departments="departments"
      :tasks="tasks"
      :templates="templates"
      :templates-base="templatesBase"
    />
    <GatewayDetail
      v-else-if="model.clazz === 'gateway' ||
        model.clazz === 'exclusiveGateway' ||
        model.clazz === 'parallelGateway' ||
        model.clazz === 'inclusiveGateway'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
    />
    <StartEventDetail
      v-else-if="model.clazz === 'start'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
      :tasks="tasks"
      :templates="templates"
      :templates-base="templatesBase"
    />
    <EndEventDetail
      v-else-if="model.clazz === 'end'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
      :tasks="tasks"
      :templates="templates"
      :templates-base="templatesBase"
    />
    <FlowDetail
      v-else-if="model.clazz === 'flow'"
      :model="model"
      :on-change="onChange"
      :read-only="readOnly"
    />
  </div>
</template>
<script>
import UserTaskDetail from './UserTaskDetail'
import ScriptTaskDetail from './ScriptTaskDetail'
import HandleNodeDetail from './HandleNodeDetail'
import GatewayDetail from './GatewayDetail'
import StartEventDetail from './StartEventDetail'
import EndEventDetail from './EndEventDetail'
import FlowDetail from './FlowDetail'
export default {
  inject: ['i18n'],
  components: {
    UserTaskDetail,
    ScriptTaskDetail,
    HandleNodeDetail,
    GatewayDetail,
    StartEventDetail,
    EndEventDetail,
    FlowDetail
  },
  props: {
    height: {
      type: Number,
      default: 800
    },
    model: {
      type: Object,
      default: () => ({})
    },
    signalDefs: {
      type: Array,
      default: () => ([])
    },
    messageDefs: {
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
    users: {
      type: Array,
      default: () => ([])
    },
    roles: {
      type: Array,
      default: () => ([])
    },
    groups: {
      type: Array,
      default: () => ([])
    },
    departments: {
      type: Array,
      default: () => ([])
    },
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
  }
}
</script>
<style lang="scss">
    .detailPanel {
        height: 100%;
        background: #f0f2f5;
        flex: 0 0 auto;
        float: left;
        width: 20%;
        border-right: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        .panelTitle {
            text-align: left;
            height: 32px;
            padding-left: 12px;
            color: #000;
            line-height: 28px;
            background: #EBEEF2;
            border-bottom: 1px solid #DCE3E8;
        }

        .panelBody {
            .panelRow {
                text-align: left;
                display: inline-block;
                font-size: 12px;
                width: 100%;
                padding: 5px 12px;
            }
        }
    }
</style>
