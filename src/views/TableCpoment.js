import { Table, Radio } from "antd";
import { useState } from "react";
import data from "../data.json";
import "./TableCpoment.css";
function TableCpoment() {
  const [state, setState] = useState(0); // 当前显示内容
  const dataSource = []; // 表格数据
  // 表格列
  const columns = [
    {
      title: "所属品类",
      dataIndex: "productCategory",
      key: "class",
      width: "10%",
    },
    {
      title: "项目类别",
      dataIndex: "prjCategory",
      key: "prjCategory",
      width: "14%",
    },
    {
      title: "项目编号",
      dataIndex: "numbering",
      key: "numbering",
      width: "10%",
    },
    {
      title: "项目名称",
      dataIndex: "prjName",
      key: "prjName",
      with: "18%",
    },
    {
      title: "项目状态",
      dataIndex: "projectStatus",
      key: "projectStatus",
      with: "10%",
    },
    {
      title: "项目经理",
      dataIndex: "prjManager",
      key: "prjManager",
      with: "10%",
    },
    {
      title: "所属部门",
      dataIndex: "department",
      key: "department",
      with: "10%",
    },
    {
      title: "项目计划时间",
      dataIndex: "date",
      key: "date",
      with: "18%",
    },
  ];
  // 显示数据处理
  const TableDealWith = (data) => {
    const { projectStatus, prjStartDate, prjEndDate, guid } = data;
    let start = projectStatus === "processing" ? "进行中" : "审批中";
    let date = `${prjStartDate.split(" ")[0]}~${prjEndDate.split(" ")[0]}`;
    return {
      ...data,
      projectStatus: start,
      date,
      key: guid,
    };
  };
  for (let i of data) {
    dataSource.push(TableDealWith(i));
  }
  // 卡片
  function CardDealWith(data, index) {
    const {
      projectStatus,
      prjStartDate,
      prjManager,
      taskCount,
      taskDoneCount,
      taskDoingCount,
      prjName,
    } = data;

    let start = projectStatus === "processing" ? "进行中" : "审批中";

    return (
      <div className="card" key={index}>
        <div className="img" />
        <div className="box">
          <li>
            <span className="prjName">{prjName}</span>
            <span className="start">{start}</span>
          </li>
          <li>项目经理：{prjManager}</li>
          <li>立项日期：{prjStartDate.split(" ")[0]}</li>
          <li>
            <span>任务：{taskCount} </span>
            <span>完成：{taskDoneCount} </span>
            <span>进行：{taskDoingCount}</span>
          </li>
        </div>
      </div>
    );
  }
  return (
    <div className="TableCpoment">
      <div className="top">
        <Radio.Group
          defaultValue="0"
          onChange={(e) => {
            setState(+e.target.value);
            console.log(e.target.value);
          }}
        >
          <Radio.Button value="0">卡片</Radio.Button>
          <Radio.Button value="1">列表</Radio.Button>
        </Radio.Group>
      </div>
      {state ? (
        <Table
          className="table"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowClassName={(record, index) => (index % 2 !== 0 ? "grey" : "")}
        />
      ) : (
        <div className="Card">
          {data.map((item, index) => CardDealWith(item, index))}
        </div>
      )}
    </div>
  );
}

export default TableCpoment;
