import { Checkbox, Radio, Space, Table } from "antd";
import "./App.css";
import app_logo from "./asset/Daco_3261784.png";
import { useState } from "react";

const dataSource = [
  {
    key: "1",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "69",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "2",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "70",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "2",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "71",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "4",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "72",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "5",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "73",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "6",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "74",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "7",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "75",
    time: "11:11:11 11/11/2011",
  },
  {
    key: "8",
    license_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU",
    license_num: "29D01245",
    speed: "76",
    time: "11:11:11 11/11/2011",
  },
];

const columns = [
  {
    title: "License Plate",
    dataIndex: "license_img",
    key: "license_img",
    width: "30%",
    render: (text) => (
      <img
        src={text}
        alt="License Plate"
        style={{ width: "100px", height: "auto" }}
      />
    ),
  },
  {
    title: "License Plate No.",
    dataIndex: "license_num",
    key: "license_num",
    width: "30%",
  },
  {
    title: "Speed",
    dataIndex: "speed",
    key: "speed",
    width: "10%",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: "40%",
  },
];

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const handleRowClick = (record) => {
    setSelectedVehicle(record);
  };
  return (
    <div className="flex">
      <div className="w-2/12 h-screen bg-slate-300 px-4 py-2">
        <div className="w-full h-[50px] p-2 mb-6">
          <div className="flex items-center justify-center gap-4">
            <img className="w-[50px]" src={app_logo} alt="app_logo" />
            <h1 className="text-2xl font-bold">ECam</h1>
          </div>
        </div>
        <div className="w-full h-fit bg-slate-400 rounded-lg p-4">
          <div className="border-slate-500">
            <h2 className="font-bold text-lg pb-3">Location</h2>
            <Radio.Group>
              <Space direction="vertical gap-3">
                <Radio value={1}>Los Santos</Radio>
                <Radio value={2}>Danang</Radio>
                <Radio value={3}>Hanoi</Radio>
                <Radio value={4}>Ho Chi Minh City</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="border-slate-500 pt-8">
            <h2 className="font-bold text-lg py-2">Vehicle type/model</h2>
            <Space direction="vertical gap-3">
              <Checkbox value={1}>Cars</Checkbox>
              <Checkbox value={2}>Trucks</Checkbox>
              <Checkbox value={3}>Motorbikes</Checkbox>
              <Checkbox value={4}>Running</Checkbox>
            </Space>
          </div>
        </div>
      </div>
      <div className="w-10/12 h-screen flex">
        <div className="w-1/2 h-screen flex flex-col">
          <div className="h-1/2 w-full bg-slate-200 px-4 pb-2 flex flex-col">
            <span className="text-center py-1 font-semibold text-gray-700">
              Vehicle Details
            </span>
            <div className="w-full h-full bg-slate-400 rounded-md flex flex-col p-8">
              {selectedVehicle ? (
                <>
                  <div className="flex items-center border-b pb-8">
                    <div className="w-1/2">
                      <img
                        className="w-fit h-24"
                        src={selectedVehicle.license_img}
                        alt="license_img"
                      />
                    </div>
                    <input
                      type="text"
                      value="29D01245"
                      readOnly
                      className="p-2 rounded-md "
                    />
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Vehicle speed</p>
                    </div>
                    <div>
                      <p>{selectedVehicle.speed}</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Time stamp</p>
                    </div>
                    <div>
                      <p>{selectedVehicle.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Vehicle type/model</p>
                    </div>
                    <div>
                      <p>Cars</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Location</p>
                    </div>
                    <div>
                      <p>Danang</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Click on a vehicle from the Vehicle List to show the Vehicle
                    Detail!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="h-1/2 w-full bg-slate-200 px-4 pb-4 flex flex-col">
            <span className="text-center py-1 font-semibold text-gray-700">
              Camera Video
            </span>
            <div className="w-full h-full bg-slate-400 rounded-md">
              <iframe
                src={`https://www.youtube.com/embed/PiOqMMOFQNw`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-slate-200 px-4 pb-4 flex flex-col">
          <span className="text-center py-1 font-semibold text-gray-700">
            Vehicle List
          </span>
          <div className="w-full h-full bg-slate-400 rounded-md overflow-y-auto">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => handleRowClick(record),
                };
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
