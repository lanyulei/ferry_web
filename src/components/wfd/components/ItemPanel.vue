<template>
  <div class="itemPanel" :style="{'height': height+'px'}">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="i18n['conventional']" name="1">
        <img
          data-item="{clazz:'start',size:'30*30',label:''}"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjggNjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY4IDY4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZDRjFFODt9Cgkuc3Qxe2ZpbGw6I0Y5QUE2ODt9Cgkuc3Qye2ZpbGw6I0ZBOEMxNjt9Cjwvc3R5bGU+Cjx0aXRsZT5zdGFydF8xPC90aXRsZT4KPGcgaWQ9IuWbvuWxgl8yIj4KCTxnIGlkPSLlm77lsYJfMS0yIj4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzQsNjcuNWMtMTguNSwwLTMzLjUtMTUtMzMuNS0zMy41UzE1LjUsMC41LDM0LDAuNXMzMy41LDE1LDMzLjUsMzMuNUM2Ny41LDUyLjUsNTIuNSw2Ny41LDM0LDY3LjV6Ii8+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM0LDFjMTguMiwwLDMzLDE0LjgsMzMsMzNTNTIuMiw2NywzNCw2N1MxLDUyLjIsMSwzNFMxNS44LDEsMzQsMSBNMzQsMEMxNS4yLDAsMCwxNS4yLDAsMzRzMTUuMiwzNCwzNCwzNAoJCQlzMzQtMTUuMiwzNC0zNFM1Mi44LDAsMzQsMHoiLz4KCTwvZz4KCTxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iNDguMiwzMi42IDI4LjIsMTcuNSAyOC4yLDQ3LjggCSIvPgo8L2c+Cjwvc3ZnPgo="
          style="width:42px;height:42px;margin-top:10px"
        >
        <div>{{ i18n['startEvent'] }}</div>
        <img
          :data-item="userTaskData"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTA3IDYxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDcgNjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTZGMkZDO3N0cm9rZTojNUNBRkZCO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojMTg5MEZGO30KPC9zdHlsZT4KPHRpdGxlPnRhc2tfMTwvdGl0bGU+CjxnIGlkPSLlm77lsYJfMiI+Cgk8ZyBpZD0i5Zu+5bGCXzEtMiI+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTguOSwwLjVoODkuMmM0LjYsMCw4LjQsMy44LDguNCw4LjR2NDMuMmMwLDQuNi0zLjgsOC40LTguNCw4LjRIOC45Yy00LjYsMC04LjQtMy44LTguNC04LjRWOC45CgkJCUMwLjUsNC4zLDQuMywwLjUsOC45LDAuNXoiLz4KCTwvZz4KPC9nPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDcuMywyMS41YzAtMy4zLDAuMy01LjgsMy41LTcuNGMwLjctMC4zLDIuMi0wLjUsMi44LTAuNWMwLjgsMCwwLTAuNywxLjgtMC43czQuMSwwLjgsNS4zLDMuMXMxLjMsNSwxLjMsNS42CgljMCwwLjcsMC43LDAuMywwLjcsMS4zYzAsMS0wLjMsMi44LTEuMyw0Yy0xLDEuMy0xLjMsMS41LTIsMi41Yy0wLjcsMS0xLDItMSwyLjhjMCwzLjEsNS4zLDMuMyw4LjQsNS4zYzEuMiwwLjgsMiwxLjgsMi41LDMKCWMwLjUsMS4yLTAuMiwyLjMtMS4yLDIuNmMtMC4yLDAuMi0wLjUsMC4yLTAuOCwwLjJINDEuOWMtMS4yLDAtMi4yLTEtMi4yLTIuMmMwLTAuMywwLTAuNSwwLjItMC44YzAuNS0xLjIsMS4zLTIuMiwyLjUtMwoJYzMuMS0yLDguNC0yLjIsOC40LTUuM2MwLTAuOC0wLjMtMS44LTEtMi44cy0xLTEuMy0yLTIuNWMtMS0xLjMtMS4zLTMuMS0xLjMtNEM0Ni41LDIyLDQ3LjMsMjIuMiw0Ny4zLDIxLjV6Ii8+Cjwvc3ZnPgo="
          style="width:80px;height:44px;margin-top:10px"
        >
        <div>{{ i18n['userTask'] }}</div>
        <img
          :data-item="handleNodeData"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTA3IDYxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDcgNjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGMEY2O3N0cm9rZTojRkY4NUMwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojRkY4NUMwO30KPC9zdHlsZT4KPHRpdGxlPnRhc2tfMTwvdGl0bGU+CjxnIGlkPSLlm77lsYJfMS0yIj4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjksMC41aDg5LjJjNC42LDAsOC40LDMuOCw4LjQsOC40djQzLjJjMCw0LjYtMy44LDguNC04LjQsOC40SDguOWMtNC42LDAtOC40LTMuOC04LjQtOC40VjguOQoJCUMwLjUsNC4zLDQuMywwLjUsOC45LDAuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00Ny4yLDIzaDguNmMwLjcsMCwxLjIsMC41LDEuMiwxLjJjMCwwLjctMC41LDEuMi0xLjIsMS4yaC04LjZjLTAuNywwLTEuMi0wLjUtMS4yLTEuMgoJCUM0Ni4yLDIzLjUsNDYuNywyMyw0Ny4yLDIzeiBNNDcuMiwxOC43aDQuM2MwLjcsMCwxLjIsMC41LDEuMiwxLjJjMCwwLjctMC41LDEuMi0xLjIsMS4yaC00LjNjLTAuNywwLTEuMi0wLjUtMS4yLTEuMgoJCUM0Ni4xLDE5LjIsNDYuNywxOC43LDQ3LjIsMTguN3ogTTQ0LjEsMjkuNGMzLjMsMS4zLDcuNCwyLjIsOS44LDIuMnM2LjUtMC44LDkuOC0yLjJWMTcuNWMtMC4yLTAuNS0wLjctMS0xLjItMUg0NS4xCgkJYy0wLjUsMC0xLDAuNS0xLDFWMjkuNEw0NC4xLDI5LjR6IE02Ni4zLDI4LjNjMC4zLTAuMywwLjUtMC43LDAuNS0xcy0wLjMtMS0xLjItMS41djIuNkM2NS45LDI4LjQsNjYuMSwyOC4zLDY2LjMsMjguM3oKCQkgTTM4LjYsMjcuM2MwLTEuNSwxLjItMywzLjMtNHYtNS44YzAtMS44LDEuNS0zLjMsMy4zLTMuM2gxNy4yYzEuOCwwLDMuMywxLjUsMy4zLDMuM3Y1LjhjMiwxLjIsMy4zLDIuNSwzLjMsNHYxNC4xCgkJYzAsMS44LTEuNSwzLjMtMy4zLDMuM0g0MS45Yy0xLjgsMC0zLjMtMS41LTMuMy0zLjNWMjcuM3ogTTQxLjMsMjguM2MwLjIsMC4yLDAuMywwLjIsMC43LDAuM1YyNmMtMC43LDAuNS0xLjIsMS0xLjIsMS41CgkJQzQwLjgsMjcuNiw0MSwyNy45LDQxLjMsMjguM3oiLz4KPC9nPgo8L3N2Zz4K"
          style="width:80px;height:44px;margin-top:10px"
        >
        <div>{{ i18n['handleNode'] }}</div>
        <!-- <img :data-item="scriptTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px;margin-top:10px" />
                <div>{{i18n['scriptTask']}}</div> -->
        <img
          data-item="{clazz:'end',size:'30*30',label:''}"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjggNjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY4IDY4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZDRTZFOTt9Cgkuc3Qxe2ZpbGw6I0Y2NjA2Qjt9Cgkuc3Qye2ZpbGw6I0Y1MjIyRDt9Cjwvc3R5bGU+Cjx0aXRsZT5lbmRfMTwvdGl0bGU+CjxnIGlkPSLlm77lsYJfMiI+Cgk8ZyBpZD0i5Zu+5bGCXzEtMiI+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM0LDY3LjVjLTE4LjUsMC0zMy41LTE1LTMzLjUtMzMuNVMxNS41LDAuNSwzNCwwLjVzMzMuNSwxNSwzMy41LDMzLjVTNTIuNSw2Ny41LDM0LDY3LjV6Ii8+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM0LDFjMTguMiwwLDMzLDE0LjgsMzMsMzNTNTIuMiw2NywzNCw2N1MxLDUyLjIsMSwzNFMxNS44LDEsMzQsMSBNMzQsMEMxNS4yLDAsMCwxNS4yLDAsMzRzMTUuMiwzNCwzNCwzNAoJCQlzMzQtMTUuMiwzNC0zNFM1Mi44LDAsMzQsMHoiLz4KCTwvZz4KCTxyZWN0IHg9IjIyIiB5PSIyMyIgY2xhc3M9InN0MiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+CjwvZz4KPC9zdmc+Cg=="
          style="width:42px;height:42px;margin-top:10px"
        >
        <div>{{ i18n['endEvent'] }}</div>
      </el-collapse-item>
      <el-collapse-item :title="i18n['gateway']" name="3">
        <img
          data-item="{clazz:'exclusiveGateway',size:'40*40',label:''}"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgOTIuNSA5Mi41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5Mi41IDkyLjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTZGN0Y3O3N0cm9rZTojNUZEMkQxO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDpub25lO30KCS5zdDJ7ZmlsbDojMTNDMkMyO30KPC9zdHlsZT4KPHRpdGxlPmRlY2lzaW9uXzE8L3RpdGxlPgo8ZyBpZD0i5Zu+5bGCXzIiPgoJPGcgaWQ9IuWbvuWxgl8xLTIiPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MSwyLjRsMzkuMSwzOS4xYzIuNiwyLjYsMi42LDYuOCwwLDkuNEw1MC45LDkwLjFjLTIuNiwyLjYtNi44LDIuNi05LjQsMEwyLjQsNTFjLTIuNi0yLjYtMi42LTYuOCwwLTkuNAoJCQlMNDEuNiwyLjRDNDQuMi0wLjEsNDguNC0wLjEsNTEsMi40eiIvPgoJPC9nPgo8L2c+CjxsaW5lIGNsYXNzPSJzdDEiIHgxPSIzMSIgeTE9IjMxIiB4Mj0iNjIiIHkyPSI2MiIvPgo8bGluZSBjbGFzcz0ic3QxIiB4MT0iMTQ0IiB5MT0iOTIiIHgyPSIxNzguNSIgeTI9IjUyLjciLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTQ5LjYsNDYuMmwxNSwxNS4yYzAuNywwLjcsMC43LDEuOCwwLDIuNWMtMC43LDAuNy0xLjgsMC43LTIuNSwwTDQ3LDQ4LjdsLTE1LjIsMTVjLTAuNywwLjctMS44LDAuNy0yLjUsMAoJYy0wLjctMC43LTAuNy0xLjgsMC0yLjVsMTUuMi0xNUwyOS41LDMxYy0wLjctMC43LTAuNy0xLjgsMC0yLjVjMC43LTAuNywxLjgtMC43LDIuNSwwbDE1LDE1LjJsMTUuMi0xNWMwLjctMC43LDEuOC0wLjcsMi41LDAKCWMwLjcsMC43LDAuNywxLjgsMCwyLjVMNDkuNiw0Ni4yTDQ5LjYsNDYuMnoiLz4KPC9zdmc+Cg=="
          style="width:48px;height:48px;margin-top:10px"
        >
        <div>{{ i18n['exclusiveGateway'] }}</div>
        <img
          data-item="{clazz:'parallelGateway',size:'40*40',label:''}"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgOTIuNSA5Mi41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5Mi41IDkyLjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTZGN0Y3O3N0cm9rZTojNUZEMkQxO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDpub25lO30KCS5zdDJ7ZmlsbDojMTNDMkMyO30KPC9zdHlsZT4KPHRpdGxlPmRlY2lzaW9uXzE8L3RpdGxlPgo8ZyBpZD0i5Zu+5bGCXzIiPgoJPGcgaWQ9IuWbvuWxgl8xLTIiPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MSwyLjRsMzkuMSwzOS4xYzIuNiwyLjYsMi42LDYuOCwwLDkuNEw1MC45LDkwLjFjLTIuNiwyLjYtNi44LDIuNi05LjQsMEwyLjQsNTFjLTIuNi0yLjYtMi42LTYuOCwwLTkuNAoJCQlMNDEuNiwyLjRDNDQuMi0wLjEsNDguNC0wLjEsNTEsMi40eiIvPgoJPC9nPgo8L2c+CjxsaW5lIGNsYXNzPSJzdDEiIHgxPSIzMSIgeTE9IjMxIiB4Mj0iNjIiIHkyPSI2MiIvPgo8bGluZSBjbGFzcz0ic3QxIiB4MT0iMTQ0IiB5MT0iOTIiIHgyPSIxNzguNSIgeTI9IjUyLjciLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTQ4LjksNDhsMC4zLDIxLjRjMCwxLTAuNywxLjgtMS43LDEuOGMtMSwwLTEuOC0wLjctMS44LTEuN0w0NS4zLDQ4bC0yMS40LDAuM2MtMSwwLTEuOC0wLjctMS44LTEuNwoJYzAtMSwwLjctMS44LDEuNy0xLjhsMjEuNC0wLjNsLTAuMy0yMS40YzAtMSwwLjctMS44LDEuNy0xLjhjMSwwLDEuOCwwLjcsMS44LDEuN2wwLjMsMjEuNGwyMS40LTAuM2MxLDAsMS44LDAuNywxLjgsMS43CgljMCwxLTAuNywxLjgtMS43LDEuOEw0OC45LDQ4TDQ4LjksNDh6Ii8+Cjwvc3ZnPgo="
          style="width:48px;height:48px;margin-top:10px"
        >
        <div>{{ i18n['parallelGateway'] }}</div>
        <!-- <img data-item="{clazz:'inclusiveGateway',size:'40*40',label:''}"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px;margin-top:10px" />
                <div>{{i18n['inclusiveGateway']}}</div> -->
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  inject: ['i18n'],
  props: {
    height: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      activeNames: ['1', '3'],
      userTaskData: "{clazz:'userTask',size:'80*44',label:'" + this.i18n['userTask'] + "'}",
      // scriptTaskData: "{clazz:'scriptTask',size:'80*44',label:'" + this.i18n['scriptTask'] + "'}",
      javaTaskData: "{clazz:'javaTask',size:'80*44',label:'" + this.i18n['javaTask'] + "'}",
      mailTaskData: "{clazz:'mailTask',size:'80*44',label:'" + this.i18n['mailTask'] + "'}",
      handleNodeData: "{clazz:'receiveTask',size:'80*44',label:'" + this.i18n['handleNode'] + "'}"
    }
  }
}
</script>

<style lang="scss" >
    .itemPanel {
        float: left;
        width: 10%;
        background: #f0f2f5;
        overflow-y: auto;
        border-left: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        img{
            width: 92px;
            height: 96px;
            padding: 4px;
            border: 1px solid rgba(0,0,0,0);
            border-radius: 2px;
            &:hover{
                border: 1px solid #ccc;
                cursor: move;
            }
        }
        .el-collapse {
            border: 0;
            .el-collapse-item {
                > div[role=tab] > div {
                    padding-left: 10px;
                    border: 1px solid #E9E9E9;
                    border-left:0;
                }
                &:first-child{
                    > div[role=tab] > div {
                        border-top: 0;
                    }
                }
                &:last-child{
                    > div[role=tab] > div {
                        border-bottom: 1px solid #E9E9E9;
                    }
                }
                .el-collapse-item__wrap{
                    border-top: 0;
                    background: #f0f2f5;
                    text-align: center;
                }
            }
        }

    }
</style>
