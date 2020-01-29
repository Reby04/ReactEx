import React, { useRef, useState } from "react";
import 'antd/es/date-picker/style/css'; // for css
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Icon } from 'antd';
import { Breadcrumb } from 'antd';
import { Pagination } from 'antd';
import { ListBiglietti } from "./lista_biglietti";
import { Switch, Transfer} from 'antd';

function App() {
  const counter = useRef(2);
  const inputRef = useRef();
  const editId = useRef(0);
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;

  const [list, setList] = useState([
    { id: 1, numbers: [1, 2, 3, 4, 5] },
    { id: 2, numbers: [6, 7, 8, 9, 10] }
  ]);

  const [candy, setCandy] = useState ([{name:'Menta'}, {name:'Lampone'}]);

  const [bool, setBool] = useState(false);
  const estrazione = [1, 2, 3, 10];

  const premi = {
    1: 10,
    2: 100,
    3: 1000
  };

  const risultati = {};

  list.forEach(item => {
    item.numbers.forEach(num => {
      const included = estrazione.includes(num);

      if (included) {
        const count = risultati[item.id] || 0;
        risultati[item.id] = count + 1;
      }
    });
  });

  const showCandy = id => {
    let newList = [...list];
    console.log(newList);
   
    const names = newList.map(item => item.names);
    newList = names;
    setCandy(newList.push({candy}));
    
    }

  const addBiglietto = () => {
    counter.current = counter.current + 1;
    const id = counter.current;

    setList(list => [...list, { id: id, numbers: [inputRef.current.value.split(",")]}]);
  };

  const removeBiglietto = id => {
    let newList = [...list];

    const index = newList.findIndex(item => item.id === id);

    if (index > -1) {
      newList.splice(index, 1);

      setList(newList);
    }
  };

  const updateBiglietto = () => {
    let newList = [...list];
    console.log(newList);

    const indexList = newList.findIndex(index => index.id === editId.current);
    console.log(indexList);
    newList[indexList].numbers = [inputRef.current.value.split(",")];
    console.log(inputRef.current.value);
    
    setList(newList);

    setBool(false);
  };

  const editBiglietto = id => {
    let newList = [...list];

    const object = newList.find(cicle => cicle.id === id);
    inputRef.current.value = object.numbers;
    console.log(object);
    setBool(true);
    editId.current = id;
    };  

    const onChange = checked => {
      console.log(`switch to` + ' ' + checked);
    }


    const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}
  const handleScroll = (direction, e) => {
  console.log('direction:', direction);
  console.log('target:', e.target);
};

  return (
    <div className="App">
       <div>
    <Layout style={{ minHeight: '100vh' }}>
    <div className="logo" />
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
    <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                subnav 1
              </span>
            }
          >
            <Menu.Item key="1">Login</Menu.Item>
            <Menu.Item key="2">Registration</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                subnav 2
              </span>
            }
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                subnav 3
              </span>
            }
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
        </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <ListBiglietti
        biglietti={list}
        onRemove={removeBiglietto}
        onEdit={editBiglietto}
      />

      <input ref={inputRef}/>
      {!bool && <Button type="primary" onClick={addBiglietto}>add</Button>}
      {bool && <Button type="primary" onClick={updateBiglietto}>save</Button>}
      <div>
        {Object.entries(risultati).map(([k, v]) => (
          <div key={k}>
            {k}: {premi[v]}
          </div>
        ))}
      </div>
      <button onClick={showCandy}>show</button>
      
      <div>
      <br></br>
        <Switch defaultChecked onChange={onChange}/>
      </div>

      <br></br>
      <div>
      <br></br>
        <Transfer 
          dataSource={mockData}
          titles={['Source', 'Target']}
          onScroll={handleScroll}
        />
      </div>
      
      <br></br>
      <Pagination className='positionPagination' defaultCurrent={1} total={50}></Pagination>
     
        </Content>
      </Layout>
 
    </Layout>
   
       </Layout>
       
       </div>
       
    </div>
  );
        }

export default App;
