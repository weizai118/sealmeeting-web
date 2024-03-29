(function (RongClass) {
  RongClass.locale = RongClass.locale || {};
  RongClass.locale.zh = {
    login: {
      classId: '输入会议 ID',
      classEmptyError: '会议 ID 不能为空',
      classLengthError: '数字、字母和汉字, 最多 40 个字符',
      roomLengthError: '数字和字母, 最多 40 个字符',
      name: '输入姓名',
      nameEmptyError: '姓名不能为空',
      nameLengthError: '汉字、字母和数字, 最多 10 个字符',
      listener: '列席',
      closeVideo: '加入时关闭摄像头',
      join: '加入会议',
      resolution: '分辨率'
    },
    class: {
      assistant: '主持人',
      teacher: '主讲人',
      student: '参会人',
      audience: '列席'
    },
    errorCode: {
      '-10000': '网络不可用',
      /* 应用自定义错误码提示 */
      '-1000': '连接聊天室失败',
      '-1001': '获取 IM Token 失败',
      '-2000': '获取本地视频失败',
      '-2001': '获取屏幕共享失败',
      '-1002': '上传图片失败',

      /* rtc sdk 错误码提示 */
      '10000': '实例已销毁, 请重新创建实例',
      '10001': '正在链接, 请稍后再试',
      '10002': '未加入房间, 加入成功后方可调用业务方法',
      '10003': '即时通讯链接不可用',
      '10004': '网络不可用, 请稍后再试',
      '10005': 'AppKey 不可为空',
      '20001': 'stream 不存在，请检查传入参数, id、stream.type、stream.tag 是否正确',
      '20002': 'Track 不存在，请检查传入参数 stream.type 是否正确',
      '20003': '房间号不合法，只能包含大小写字母、阿拉伯数字、+、=、-、_ 且长度不能超过 64 个字符',
      '20004': '不可重复加入房间',
      '20005': '获取屏幕共享流失败，desktopStreamId 非法',
      '30001': '参数错误, 请检查参数',
      '40001': '当前用户不在房间内',
      '40002': 'IM Server 内部错误',
      '40003': 'IM Server 房间信息不存在',
      '40004': '用户 ID 不合法',
      '40005': '重复加入房间',

      /* App Server 错误码提示 */
      '1': 'App Server 参数错误',
      '2': 'Auth 过期或错误',
      '3': '无权限',
      '4': '错误的请求',
      '255': 'App Server 错误',
      '10': 'IM Token 错误',
      '11': '创建房间失败',
      '12': '加入房间失败',
      '13': 'IM 消息发送失败',
      '20': '房间不存在',
      '21': '用户不在房间内',
      '22': '退出房间失败',
      '23': '老师不在房间内',
      '24': '主持人不在房间内',
      '25': '创建白板失败',
      '26': '白板不存在',
      '27': '删除白板失败',
      '28': '用户已加入房间',
      '29': '不能修改自己的角色',
      '30': '令牌无效',
      '31': '超过最大人数',
      '32': '主讲人已存在',
      '33': '降级失败',
      '34': '设置主讲人角色失败'
    }
  };
})(window.RongClass);