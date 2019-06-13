import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtAvatar, AtButton } from "taro-ui"
import { connect } from "@tarojs/redux"
import { detail, exit } from "../../actions/userAction"

import "./user.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {
  detail: () => void
  clickItem: (position: number) => void
  exit: () => void
}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface User {
  props: IProps
}

@connect(
  ({ user }) => ({
    user
  }),
  dispatch => ({
    detail() {
      Taro.getUserInfo().then(result => {
        console.dir(result)
        const nickName = result.userInfo.nickName
        const avatarUrl = result.userInfo.avatarUrl
        dispatch(detail("1", nickName, avatarUrl))
        // Taro.showToast({
        //   title: nickName,
        //   icon: "get√",
        //   duration: 2000
        // })
      })
    },
    clickItem(position: number) {
      console.dir(position)
      // console.dir(e)
      if (position === 2) {
        Taro.navigateTo({
          url: "/pages/shopping/shopping"
        })
      } else {
        Taro.navigateTo({
          url: "/pages/indent/indent"
        })
      }
    },
    exit() {
      dispatch(exit())
    }
  })
)
class User extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "用户信息"
  }
  constructor(props, context) {
    super(props, context)
    this.state = { id: 0 }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    let infoContent
    if (this.props.user.username && this.props.user.username.length > 0) {
      infoContent = (
        <View className="index">
          <View className="info-card">
            <View className="at-row">
              <View className="at-col at-col-1 at-col--auto">
                <AtAvatar circle size="large" image={this.props.user.avatar} />
              </View>
              <View className="at-col">
                <View className="btn">
                  <Text>{this.props.user.username}</Text>
                  <Text className=".at-article__p">
                    {this.props.user.username}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <AtButton
            className="btn"
            type="secondary"
            onClick={this.props.clickItem.bind(this, 1)}
          >
            编辑信息
          </AtButton>
          <AtButton
            className="btn"
            type="secondary"
            onClick={this.props.clickItem.bind(this, 2)}
          >
            购物车
          </AtButton>
          <AtButton
            className="btn"
            type="secondary"
            onClick={this.props.clickItem.bind(this, 1)}
          >
            订单记录
          </AtButton>
          <AtButton className="btn" type="primary" onClick={this.props.exit.bind(this)}>
            注销
          </AtButton>
        </View>
      )
    } else {
      infoContent = (
        <View className="index">
          <View className="info-card">
            <View className="at-row">
              <View className="at-col at-col-1 at-col--auto">
                <AtAvatar circle size="large" image={this.props.user.avatar} />
              </View>
              <View className="at-col">
                <View className="btn">
                  <Text>请登录</Text>
                </View>
              </View>
            </View>
          </View>
          <AtButton
            className="btn"
            type="secondary"
            onClick={this.props.detail.bind(this)}
          >
            登录
          </AtButton>
        </View>
      )
    }
    return <View>{infoContent}</View>
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default User as ComponentClass<PageOwnProps, PageState>
