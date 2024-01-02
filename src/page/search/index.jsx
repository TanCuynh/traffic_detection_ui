import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app_logo from '../../asset/logo.png';
import license_icon from '../../asset/license_icon.png';
import detected_image from '../../asset/frame.png';
import { Checkbox, DatePicker, Input, InputNumber, Radio, Slider, Space, Table, TimePicker } from 'antd';
import { FaMapMarkerAlt, FaCar } from "react-icons/fa";
import { IoMdSearch, IoIosSpeedometer } from "react-icons/io";
import { HiVideoCamera } from "react-icons/hi";
import { BiSolidCreditCardFront } from "react-icons/bi";
import { columns, dataSource } from '../../const';


function MainPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [licensePlate, setLicensePlate] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const handleDetectionPageClick = () => {
    navigate('/');
  };

  const handleRowClick = (record) => {
    setSelectedVehicle(record);
  };

  const handleLicensePlateChange = (e) => {
    setLicensePlate(e.target.value.toUpperCase());
  }

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };


  return (
    <div className="flex">
      <div className="w-2/12 h-screen bg-slate-300 px-4 py-2">
        <div className="w-full h-[50px] p-2 mb-6">
          <div className="flex items-center justify-center gap-4">
            <img className="w-[50px]" src={app_logo} alt="app_logo" />
            <h1 className="text-xl font-extrabold">CARMERA</h1>
          </div>
        </div>
        <div className="w-full h-fit bg-slate-400 rounded-lg p-4">
          {/* Location */}
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2 pb-2">
              <FaMapMarkerAlt fontSize={20} />
              <h2 className="font-bold text-md">Location</h2>
            </div>
            <Radio.Group defaultValue={1} disabled>
              <Space direction="vertical gap-3">
                <Radio value={1}>Danang</Radio>
                <Radio value={2}>Hanoi</Radio>
                <Radio value={3}>Ho Chi Minh City</Radio>
              </Space>
            </Radio.Group>
          </div>
          {/* Vehicle type */}
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <FaCar fontSize={20} />
              <h2 className="font-bold text-md py-2">Vehicle Type</h2>
            </div>
            <Space direction="vertical gap-3">
              <Checkbox defaultChecked>Cars</Checkbox>
              <Checkbox>Motorcycles</Checkbox>
            </Space>
          </div>
          {/* License Plate */}
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <BiSolidCreditCardFront fontSize={20} />
              <h2 className="font-bold text-md py-2">License Plate</h2>
            </div>
            <Input
              value={licensePlate}
              className='h-[34px] w-[200px] mt-2'
              placeholder='Enter license plate'
              onChange={handleLicensePlateChange}
            />
          </div>
          {/* Vehicle Speed */}
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <IoIosSpeedometer fontSize={20} />
              <h2 className="font-bold text-md py-2">Vehicle Speed</h2>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <InputNumber
                className='w-[60px]'
                min={0}
                max={200}
                defaultValue={0}
              />
              <p className='font-semibold'>-</p>
              <InputNumber
                className='w-[60px]'
                min={0}
                max={200}
                defaultValue={200}
              />
              <p className='font-bold ml-2'>km/h</p>
            </div>
          </div>
          {/* Time stamp */}
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <IoIosSpeedometer fontSize={20} />
              <h2 className="font-bold text-md py-2">Time Stamp</h2>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <DatePicker.RangePicker onChange={handleDateChange} />
              <TimePicker.RangePicker />
            </div>
          </div>
          <div className="w-full h-fit bg-slate-600 rounded-lg text-white cursor-pointer hover:bg-slate-700 p-3 mt-8">
            <div className="border-slate-500 flex justify-start items-center gap-3 text-center pl-2">
              <IoMdSearch fontSize={22} />
              <h2 className="font-medium text-md">Search Vehicle</h2>
            </div>
          </div>
        </div>

        <div onClick={handleDetectionPageClick} className="w-full h-fit bg-slate-700 rounded-lg text-white cursor-pointer hover:bg-slate-800 p-3 mt-4">
          <div className="border-slate-500 flex justify-start items-center gap-4 text-center pl-2">
            <HiVideoCamera fontSize={22} />
            <h2 className="font-medium text-md">Vehicle Detection Page</h2>
          </div>
        </div>
      </div>
      <div className="w-10/12 h-screen flex">
        <div className="w-1/2 h-screen bg-slate-200 px-4 pb-4 flex flex-col">
          <span className="py-1 font-semibold text-gray-700 text-sm">Searched Vehicle List</span>
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
        <div className="w-1/2 h-screen flex flex-col">
          <div className="h-1/2 w-full bg-slate-200 px-4 pb-2 flex flex-col">
            <span className="py-1 font-semibold text-gray-700 text-sm">Vehicle Detail</span>
            <div className="w-full h-full bg-slate-400 rounded-md flex flex-col p-2">
              {selectedVehicle ? (
                <>
                  <div className="flex items-center border-b pb-8">
                    <div className="w-1/2">
                      <img className="w-fit h-24" src={selectedVehicle.license_img} alt="license_img" />
                    </div>
                    <input type="text" value="29D01245" readOnly className="p-2 rounded-md focus:outline-none hover:pointer-none" />
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
                    Click on a record from the Vehicle List to show the detail!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-1/2 w-full bg-slate-200 px-4 pb-4 flex flex-col">
            <span className="py-1 font-semibold text-gray-700 text-sm">Detected Vehicle Image</span>
            {selectedVehicle ? (
              <>
                <div className="w-full h-full bg-slate-400 rounded-md">
                  <img src={detected_image} alt="detected_img" />
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-full bg-slate-400 rounded-md flex items-center justify-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Click on a record from the Vehicle List to show the detected image!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
