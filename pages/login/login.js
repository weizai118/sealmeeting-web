(function (RongClass, dependencies, components) {
  'use strict';
  var utils = RongClass.utils,
    common = RongClass.common,
    dialog = RongClass.dialog,
    dataModel = RongClass.dataModel,
    storage = common.storage;

  var loadDialog;

  var EntryCode = 13;

  var StorageKey = RongClass.ENUM.StorageKey,
    SpecialErrorCode = RongClass.ENUM.SpecialErrorCode;
  
  var resolutionSetting = RongClass.setting.rtc.resolution;

  function toClassPage(data) {
    var instance = RongClass.instance;
    data.isLogined = true;
    instance.$router.push({
      name: 'class',
      params: data,
      query: {
        mId: data.roomId,
        p: 'password',
        encode: 1,
        locale: 'zh-cn'
      }
    });
  }

  function setRoomStorage(roomInfo) {
    storage.set(StorageKey.ROOM_ID, roomInfo.roomId);
    storage.set(StorageKey.USER_NAME, roomInfo.userName);
    storage.set(StorageKey.IS_AUDIENCE, roomInfo.isAudience);
    storage.set(StorageKey.IS_CLOSE_VIDEO, roomInfo.isVideoClosed);
  }

  function confirmEntryWithAudience(context) {
    dialog.confirm({
      content: '会议非列席名额已满，是否以列席身份加入 ?',
      position: utils.getCenterPosition(),
      confirmed: function () {
        context.isAudience = true;
        context.entryClass();
      }
    });
  }

  function entryClass(context) {
    context.isLoading = true;
    dataModel.server.init(context.$data).then(function (data) {
      context.isLoading = false;
      setRoomStorage(context.$data);
      loadDialog && loadDialog.destroy();
      toClassPage(data);
    }).catch(function (error) {
      context.isLoading = false;
      if (error.errCode === SpecialErrorCode.ERR_OVER_MAX_COUNT) {
        return confirmEntryWithAudience(context);
      }
      var errorText = context.locale.errorCode[error.errCode] || error.errDetail;
      dialog.confirm({
        content: errorText,
        position: utils.getCenterPosition()
      });
    });
  }

  function filterValueSpace(context, key) {
    var value = context[key];

    var isHeaderSpace = value[0] === ' ';
    if (isHeaderSpace) {
      context[key] = value.substring(1);
      value = context[key];
    }

    var valueLength = value.length,
      isFooterSpace = value[valueLength - 1] === ' ';
    if (isFooterSpace) {
      context[key] = value.substring(0, valueLength - 1);
    }
  }

  function getMethods() {
    return {
      keydown: function (e) {
        var currKey = e.keyCode || e.which || e.charCode;
        if (EntryCode === currKey) {
          this.entryClass();
        }
      },
      entryClass: function () {
        var context = this;
        if (context.checkValid()) {
          entryClass(context);
        }
      },
      isResolutionSelected: function (resol) {
        var resolution = this.resolution;
        return resol.width === resolution.width
           && resol.height === resolution.height;
      },
      filterRoomId: function () {
        filterValueSpace(this, 'roomId');
      },
      filterUserName: function () {
        filterValueSpace(this, 'userName');
      }
    };
  }

  components.login = function (resolve) {
    var options = {
      name: 'login',
      isIgnoreAuth: true,
      template: '#rong-template-login',
      data: function () {
        return {
          isLoading: false,
          roomId: storage.get(StorageKey.ROOM_ID),
          userName: storage.get(StorageKey.USER_NAME),
          isAudience: storage.get(StorageKey.IS_AUDIENCE) || false,
          isVideoClosed: storage.get(StorageKey.IS_CLOSE_VIDEO) || false,
          resolution: resolutionSetting.default
        };
      },
      computed: {
        videoEnable: function () {
          return !this.isVideoClosed;
        },
        resolutionList: function () {
          return resolutionSetting.list;
        }
      },
      watch: {
        isLoading: function (load) {
          var context = this;
          if (load) {
            loadDialog = dialog.joining('正在加入会议 ...', function () {
              dataModel.server.logout();
              context.isLoading = false;
            });
          } else {
            loadDialog && loadDialog.destroy();
          }
        }
      },
      mixins: [
        RongClass.mixins.validate
      ],
      mounted: function () {
        var context = this;
        var meetingInfo = utils.formatUrl();
        if (meetingInfo.mId) {
          context.roomId = meetingInfo.mId;
          context.userName = utils.generateName();
          context.isAudience = false;
          context.isVideoClosed = false;
          context.$nextTick(function () {
            context.entryClass();
          });
        }
      },
      methods: getMethods()
    };
    common.component(options, resolve);
  };
  
})(window.RongClass, {
  Vue: window.Vue,
  win: window
}, window.RongClass.components);