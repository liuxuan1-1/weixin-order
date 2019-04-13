import React, { Component } from 'react';

import './table.css';
import ajax from '../../ajax';
import { Table } from 'antd';

const goods = {
  1: {
    id: 1,
    name: '果盘3',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1014,
    price: 120
			},
  2: {
    id: 2,
    name: '龙舌兰',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1029,
    price: 100
			},
  3: {
    id: 3,
    name: '方便面',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1030,
    price: 5
			},
  4: {
    id: 4,
    name: '粉丝',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1059,
    price: 5
			},
  5: {
    id: 5,
    name: '果盘1',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1029,
    price: 130
			},
  6: {
    id: 6,
    name: '果盘2',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 1064,
    price: 150
			},
  7: {
    id: 7,
    name: '锐澳',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 814,
    price: 200
			},
  8: {
    id: 8,
    name: '尊尼获加',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 124,
    price: 220
			},
  9: {
    id: 9,
    name: '芝士华',
    pic: 'http://img1.gtimg.com/health/pics/hv1/138/79/2068/134491983.jpg',
    sold: 102,
    price: 300
			}
}

class App extends Component {
  constructor (props, context){
    super(props, context)

    this.handlerClickDone = this.handlerClickDone.bind(this);
    this.expandedRowRender = this.expandedRowRender.bind(this);
    this.foods = {};
    this.state = {
      // columns: [
      //   { title: 'id', dataIndex: 'id', key: 'id' },
      //   { title: '用户名', dataIndex: 'username', key: 'uername' },
      //   { title: '时间', dataIndex: 'createdAt', key: 'createdAt' },
      //   { title: '操作', key: 'operation', render: () => <a href="javascript:alert('ok');" onClick={this.handlerClickDone}>出餐</a> },
      // ],
      columns: [
        {title: 'id', dataIndex: 'id', key: 'id'},
        {title: '菜品', dataIndex: 'info', key: 'info'},
        {title: '备注', dataIndex: 'comments', key: 'comments'}
      ],
      data: []
    }
  }

  componentWillMount() {
    ajax('get', 'http://127.0.0.1:7001/api/accounts/getinfo').then(e => {
      if (e) {
        const result = JSON.parse(e)
        if (result.success) {
          const stateData = [];
          let i = 0;
          for (let prop in result.data) {
            if (result.data[prop]) {
              const dbinfo = JSON.parse(result.data[prop].list);
              let info = '';
              for (let ss in dbinfo) {
                if (dbinfo[ss]) {
                  info += `${goods[ss].name}: ${dbinfo[ss]}份; `
                }
              }
              stateData.push({
                id: i,
                comments: result.data[prop].comments,
                info,
              })
              i++;
            }
          }
          this.setState({
            data: stateData
          })
        }
      }
    })
    this.timer = setInterval(() => {
      ajax('get', 'http://127.0.0.1:7001/api/accounts/getinfo').then(e => {
        if (e) {
          const result = JSON.parse(e)
          if (result.code) {
            const stateData = [];
            let i = 0;
            for (let prop in result.data) {
              if (result.data[prop]) {
                const dbinfo = JSON.parse(result.data[prop].info);
                let info = '';
                for (let ss in dbinfo) {
                  if (dbinfo[ss]) {
                    info += `${goods[ss].name}: ${dbinfo[ss]}份; `
                  }
                }
                stateData.push({
                  id: i,
                  comments: result.data[prop].comments,
                  info,
                })
                i++;
              }
            }
            this.setState({
              data: stateData
            })
          }
        }
      })
    }, 3000)

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handlerClickDone(e) {
    const id = e.target.parentElement.parentElement.childNodes[1].innerText;
    console.log(id);
    ajax('get', `https://9vagitvj.qcloud.la/weapp/updatechosefood?id=${id}`)
  }

  expandedRowRender(e) {
    const { id } = e
    const columns = [
      { title: 'id', dataIndex: 'id', key: 'id' },
      { title: '菜名', dataIndex: 'name', key: 'name' },
      { title: '数量', dataIndex: 'nums', key: 'nums' },
    ];
    const data = this.foods[id]
    const arr = []
    if (data.length !== 0) {
      data.forEach((e, i) => {
        arr.push({
          key: i,
          id: e.foodid,
          name: e.name,
          nums: e.nums
        })
      })
    }

    return (
      <Table
        columns={columns}
        dataSource={arr}
        pagination={false}
      />
    );
  }

  render() {
    const { columns, data } = this.state;

    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        // expandedRowRender={this.expandedRowRender}
        dataSource={data}
      />
    );
  }
}

export default App;
