import TinyReact from "./TinyReact";

const app = document.getElementById('app');

// 普通 virtualDOM 对象
const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

// 更改后的virtualDOM
const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    {/* <span>这是一段被修改过的内容</span> */}
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    {/* 2, 3 */}
    <input type="text" value="13" />
  </div>
)

// TinyReact.render(virtualDOM, app); //（需要渲染的 VirtualDOM 对象，挂载到DOM上）

// setTimeout(() => {
//   TinyReact.render(modifyDOM, app);
// }, 2000);

// 组件
// function Dom () {
//   return <div className="demo">123123</div>
// }
// function Header(props) {
//   return <div>
//             <h1>{props.title}</h1>
//             &hearts;<Dom />
//         </div>;   
// }

// TinyReact.render(<Header title='hello react!'/>, app);


// 类组件
class Alert extends TinyReact.Component {
  constructor(props) {
    super(props); // 通过 super 方法把 props 传递给父类中，父类通过 constructor 方法，将 props 存储起来，这样子类在实例化之后就会有 props 属性了
    this.state = {
      title: 'default title',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps-data');
    console.log('componentWillReceiveProps-data1111');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate-data222');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate-data333');
  }

  handleTitleChange () {
    this.setState({
      title: 'Change Title',
    });
  }

  render () {
    console.log(this.state.title, 'this.state.title-data');
    return (
      <div>
        {this.props.name}
        <br/>
        {this.props.age}

        <h1>
          {this.state.title}
        </h1>
        <button onClick={this.handleTitleChange}>改变 title</button>
      </div>
    );
  }
}

class Header extends TinyReact.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.name}
        <br/>
        {this.props.age}
      </div>
    );
  }

}

// TinyReact.render(<Alert name='zhangsan' age='20'/>, app);

// setTimeout(() => {
//   TinyReact.render(<Alert name='lisi' age='50'/>, app);
//   // TinyReact.render(<Header name='wangmazi' age='80'/>, app);

// }, 2000);


class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // console.log(this.input.value)
    console.log(this.input)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} name="张三" age={20} />
      </div>
    )
  }
}

// TinyReact.render(<DemoRef />, app);



class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三"
        },
        {
          id: 2,
          name: "李四"
        },
        {
          id: 3,
          name: "王五"
        },
        {
          id: 4,
          name: "赵六"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    // newState.persons.pop()
    this.setState(newState)
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id}>
              {person.name}
              <DemoRef />
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, app)
