import request from '@/utils/request'

// 新建任务
export function createTask(data) {
  return request({
    url: '/api/v1/task',
    method: 'post',
    data
  })
}

// 任务列表
export function taskList(params) {
  return request({
    url: '/api/v1/task',
    method: 'get',
    params
  })
}

// 更新任务
export function updateTask(data) {
  return request({
    url: '/api/v1/task',
    method: 'put',
    data
  })
}

// 删除任务
export function deleteTask(params) {
  return request({
    url: '/api/v1/task',
    method: 'delete',
    params
  })
}

// 任务详情
export function taskDetails(params) {
  return request({
    url: '/api/v1/task/details',
    method: 'get',
    params
  })
}
