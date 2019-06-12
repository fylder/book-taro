import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtButton } from "taro-ui"
import { connect } from "@tarojs/redux"
import { detail } from "../../actions/userAction"

import "./user.scss"

type PageStateProps = {
  user: {
    username: string
  }
}

type PageDispatchProps = {
  detail: () => void
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
      dispatch(detail("fylder"))
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
    navigationBarTitleText: "user"
  }
  constructor(props, context) {
    super(props, context)
    this.state = { id: 0 }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {
    Taro.getUserInfo().then(result => {
      const nickName = result.userInfo.nickName
      this.props.dispatch(detail(nickName))
      Taro.showToast({
        title: nickName,
        icon: "get√",
        duration: 2000
      })
    })
  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtButton className="btn" type="secondary" onClick={this.props.detail}>
          get
        </AtButton>
        <View className="btn">
          <Text>{this.props.user.username}</Text>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default User as ComponentClass<PageOwnProps, PageState>
