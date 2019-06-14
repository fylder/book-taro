import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image, Swiper, SwiperItem } from "@tarojs/components"
import { AtGrid, AtButton } from "taro-ui"
import { connect } from "@tarojs/redux"
import { image_data, item_datas } from "./data"
import "./index.scss"

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
}

type PageDispatchProps = {
  handleUser: () => void
  handleItemClick: () => void
  handleqr: () => void
  handleCart: (id: string) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
}

@connect(
  ({ user }) => ({ user }),
  dispatch => ({
    handleUser() {
      Taro.navigateTo({
        url: "/pages/user/user"
      })
    },
    handleItemClick(item: object, index: number) {
      Taro.navigateTo({
        url: "/pages/detail/detail?id=" + index
      })
    },
    handleqr() {
      Taro.scanCode().then(response => {
        Taro.showToast({
          title: response.result,
          icon: "success",
          duration: 2000
        })
      })
    },
    handleCart(id: string) {
      if (id) {
        Taro.navigateTo({
          url: "/pages/cart/cart"
        })
      } else {
        Taro.navigateTo({
          url: "/pages/user/user"
        })
      }
    }
  })
)
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "home"
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
        <Swiper
          className="swiper-lay"
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular={true}
          interval={3000}
          indicatorDots={true}
          autoplay={true}
        >
          {image_data.map((item, index) => {
            return (
              <SwiperItem key={index} className="swiper-item">
                <Image
                  src={item.image}
                  className="swiper-img"
                  mode="widthFix"
                />
              </SwiperItem>
            )
          })}
        </Swiper>
        <AtGrid data={item_datas} onClick={this.props.handleItemClick.bind(this)} />
        <View className="line" />
        <AtButton
          className="btn"
          type="secondary"
          loading={false}
          onClick={this.props.handleUser.bind(this)}
        >
          用户信息
        </AtButton>
        <AtButton
          className="btn"
          type="secondary"
          loading={false}
          onClick={this.props.handleCart.bind(this, this.props.user.id)}
        >
          购物车
        </AtButton>
        <AtButton
          className="btn"
          type="secondary"
          loading={false}
          onClick={this.props.handleqr.bind(this)}
        >
          扫码
        </AtButton>
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

export default Index as ComponentClass<PageOwnProps, PageState>
