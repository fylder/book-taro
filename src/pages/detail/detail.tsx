import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { AtButton } from "taro-ui"
import { connect } from "@tarojs/redux"

import { detail } from "../../actions/detailAction"

import "./detail.scss"

type PageStateProps = {
  detail: {
    info: string
  }
}

type PageDispatchProps = {
  detail: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Detail {
  props: IProps
}

@connect(
  ({ detail }) => ({
    detail
  }),
  dispatch => ({
    detail() {
      dispatch(detail("fylder"))
    }
  })
)
class Detail extends Component {
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

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

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

export default Detail as ComponentClass<PageOwnProps, PageState>
