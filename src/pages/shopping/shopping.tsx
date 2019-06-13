import { ComponentClass } from "react"
import Taro, { Component, Config } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtList, AtListItem, AtInputNumber } from "taro-ui"
import { connect } from "@tarojs/redux"
import { query, save } from "../../actions/cartAction"
import CartList from "../../actions/model/cart"

import "./shopping.scss"

type PageStateProps = {
  user: {
    id: string
    username: string
    avatar: string
  }
  cart: {
    cart: [
      {
        id: string
        name: string
        count: number
        date: string
      }
    ]
  }
}

type PageDispatchProps = {
  detail: () => void
  handleChange: () => void
}

type PageOwnProps = {
  dispatch(type: any): Promise<any>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface ComponentProps {
  /* declare your component's props here */
}
interface ComponentState {
  id: string
}
interface Shopping {
  props: IProps
}

@connect(
  ({ user, cart }) => ({
    user,
    cart
  }),
  dispatch => ({
    detail() {},
    handleChange(item, cartList, value: number) {
      cartList = cartList.map((it, index) =>
        it.id === item.id ? { ...it, count: value } : it
      )
      dispatch(save(cartList))
    }
  })
)
class Shopping extends Component<ComponentProps, ComponentState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "订单"
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      id: "0"
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {
    //query data
    console.log("indent -> id:" + this.props.user.id)
    this.props.dispatch(query())
  }

  componentDidHide() {}

  render() {
    let datas
    if (this.props.cart.cart) {
      datas = this.props.cart.cart
    } else {
      datas = []
    }
    let dataList: any = []
    datas.map((item, index) => {
      dataList.push(item)
    })
    return (
      <View>
        <View className="at-article__h2">订单</View>
        <AtList>
          {datas.map((item, index) => {
            return (
              <View key={index}>
                <AtListItem
                  title="2019-06-13 15:25:33"
                  note="黑森林草莓味"
                  thumb="http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png"
                />
                <View className="at-row">
                  <View className="at-col at-col__offset-9">
                    <AtInputNumber
                      type="number"
                      min={0}
                      max={10}
                      step={1}
                      value={item.count}
                      onChange={this.props.handleChange.bind(
                        this,
                        item,
                        dataList
                      )}
                    />
                  </View>
                </View>
              </View>
            )
          })}
          <AtListItem
            title="2019-06-13 15:25:33"
            note="芝士蛋糕"
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
          />
        </AtList>
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

export default Shopping as ComponentClass<PageOwnProps, PageState>
