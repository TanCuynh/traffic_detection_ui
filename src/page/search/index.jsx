import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app_logo from '../../asset/logo.png';
import { Checkbox, DatePicker, Input, InputNumber, Radio, Slider, Space, Switch, Table, TimePicker } from 'antd';
import { FaMapMarkerAlt, FaCar, FaClock } from 'react-icons/fa';
import { IoMdSearch, IoIosSpeedometer } from 'react-icons/io';
import { HiVideoCamera } from 'react-icons/hi';
import { BiSolidCreditCardFront } from 'react-icons/bi';
import { columns, marks, toastOptions } from '../../const';
import { VehicleListTable } from '../../components/VehicleListTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'antd';

function SearchPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const formatter = (value) => `${value}km/h`;

  const [location, setLocation] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [speedRange, setSpeedRange] = useState([5, 100]);
  const [date, setDate] = useState('');
  const [timeRange, setTimeRange] = useState(['', '']);
  const [hideNotDetected, setHideNotDetected] = useState(false);


  const navigate = useNavigate();

  const handleDetectionPageClick = () => {
    navigate('/');
  };

  const handleLicensePlateChange = (e) => {
    setLicensePlate(e.target.value.toUpperCase());
  };

  const handleRecordClick = (record) => {
    // toast.success('Record Opened!', toastOptions);
    setSelectedVehicle(record);
    console.log(record);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/push_into_db`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setDataSource(data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    setSelectedVehicle(null);

    e.preventDefault();

    const data = {
      location,
      licensePlate,
      speedRange,
      date,
      timeRange,
    };

    fetch(`http://127.0.0.1:5000/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data === "Time stamp must be filled out") {
          console.log("Time stamp must be filled out");
          toast.error("Time stamp must be filled out", toastOptions);

        } else if (data.data === "Don't have record") {
          console.log("No records found");
          toast.error("No records found", toastOptions);
        }
        else {
          setDataSource(data.data); // Store the rows in state
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  let filteredData = dataSource;
  if (hideNotDetected) {
    filteredData = dataSource.filter((record) => record.speed !== 'Not Detected');
  }
  const sortedDataSource = [...filteredData].sort((a, b) => b.id - a.id);


  return (
    <div className="flex">
      <div className="w-2/12 h-screen bg-slate-300 px-4 py-2">
        <div className="w-full h-[50px] p-2 mb-6">
          <div className="flex items-center justify-center gap-4 cursor-pointer" onClick={handleDetectionPageClick}>
            <img className="w-[50px]" src={app_logo} alt="app_logo" />
            <h1 className="text-xl font-extrabold">CARMERA</h1>
          </div>
        </div>
        <form className="w-full h-fit bg-slate-400 rounded-lg p-4">
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2 pb-2">
              <FaMapMarkerAlt fontSize={20} />
              <h2 className="font-bold text-md">Location</h2>
            </div>
            <Radio.Group>
              <Space direction="vertical gap-3" onChange={(e) => setLocation(e.target.value)}>
                <Radio value="Danang">Danang</Radio>
                <Radio value="Hanoi">Hanoi</Radio>
                <Radio value="Ho Chi Minh City">Ho Chi Minh City</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <FaCar fontSize={20} />
              <h2 className="font-bold text-md py-2">Vehicle Type</h2>
            </div>
            <Space direction="vertical gap-3">
              <Checkbox value="Car" disabled defaultChecked>
                Car
              </Checkbox>
              <Checkbox value="Motorcycle" disabled defaultChecked>
                Motorcycle
              </Checkbox>
            </Space>
          </div>
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <BiSolidCreditCardFront fontSize={20} />
              <h2 className="font-bold text-md py-2" onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}>
                License Plate Number
              </h2>
            </div>
            <Input
              value={licensePlate}
              className="h-[34px] w-[200px] mt-2"
              placeholder="Enter license plate number"
              onChange={handleLicensePlateChange}
            />
          </div>
          <div className="border-slate-500 pt-3">
            <div className="flex justify-start items-center gap-2">
              <IoIosSpeedometer fontSize={20} />
              <h2 className="font-bold text-md pt-2">Vehicle Speed</h2>
            </div>
            <div className="pb-1 pt-3 flex items-center gap-2">
              <Checkbox onChange={(e) => setHideNotDetected(e.target.checked)}>
                <p className="text-sm font-semibold">No speed detected</p>
              </Checkbox>
            </div>
            <div className="items-center">
              <Slider
                range
                defaultValue={[5, 100]}
                marks={marks}
                min={0}
                max={150}
                tooltip={{
                  formatter,
                }}
                className='w-[190px]'
                onChange={(value) => {
                  setSpeedRange(value);
                }}
              />
            </div>
          </div>
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2">
              <FaClock fontSize={20} />
              <h2 className="font-bold text-md py-2">Time Stamp</h2>
            </div>
            <div className="flex flex-col gap-2">
              <DatePicker
                onChange={(date, dateString) => {
                  setDate(dateString);
                }}
              />
              <TimePicker.RangePicker
                onChange={(time, timeString) => {
                  setTimeRange(timeString);
                }}
              />
            </div>
          </div>
          <div className="w-full h-fit bg-slate-600 rounded-lg text-white cursor-pointer hover:bg-slate-700 p-3 mt-6" onClick={handleSubmit}>
            <div className="border-slate-500 flex justify-start items-center gap-3 text-center pl-2">
              <IoMdSearch fontSize={22} />
              <h2 className="font-medium text-md">
                Search Vehicle
              </h2>
            </div>
          </div>
        </form>

        <div
          onClick={handleDetectionPageClick}
          className="w-full h-fit bg-slate-700 rounded-lg text-white cursor-pointer hover:bg-slate-800 p-3 mt-4"
        >
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
            <VehicleListTable dataSource={sortedDataSource} columns={columns} handleRecordClick={handleRecordClick} />
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
                      <img
                        className="w-fit h-24"
                        src={`http://127.0.0.1:5000/api/get_image/result_licenses/${selectedVehicle.result_file_name}`}
                        alt="license_img"
                      />
                    </div>
                    <input
                      type="text"
                      value={selectedVehicle.license_plate}
                      readOnly
                      className="p-2 rounded-md focus:outline-none hover:pointer-none"
                    />
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Vehicle speed</p>
                    </div>
                    <div>
                      <p>
                        {selectedVehicle.speed === 'Not Detected' ? 'Not Detected' : `${selectedVehicle.speed} km/h`}
                      </p>
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
                      <p>{selectedVehicle.vehicle_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Location</p>
                    </div>
                    <div>
                      <p>{selectedVehicle.location}</p>
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
            <span className="py-1 font-semibold text-gray-700 text-sm">Setected Vehicle Image</span>
            {selectedVehicle ? (
              <>
                <div className="w-full h-full bg-slate-400 rounded-md">
                  <img
                    src={`http://127.0.0.1:5000/api/get_image/result_frames/${selectedVehicle.result_file_name}`}
                    alt="detected_img"
                  />
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
      <ToastContainer />
    </div>
  );
}

export default SearchPage;
