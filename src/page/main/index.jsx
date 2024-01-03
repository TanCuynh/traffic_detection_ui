import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app_logo from '../../asset/logo.png';
import { FaInfoCircle, FaMapMarkerAlt, FaRegStopCircle } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineUpdate } from 'react-icons/md';
import { Radio, Space } from 'antd';
import { columns } from '../../const';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noSignalImage from '../../asset/no_signal.jpg';
import { VehicleListTable } from '../../components/VehicleListTable';

function MainPage() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [imgSrc, setImgSrc] = useState(noSignalImage);

  const [dataSource, setDataSource] = useState([]);
  const sortedDataSource = [...dataSource].sort((a, b) => b.id - a.id);

  const handleRecordClick = (record) => {
    // toast.success('Record Opened!', toastOptions);
    setSelectedVehicle(record);
    console.log(record);
  };

  const handleAdvancedSearchClick = () => {
    navigate('/search');
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleLocationChange = (e) => {
    setSelectedValue(e.target.value);
    setImgSrc(`${process.env.REACT_APP_API_ENDPOINT}/${e.target.value}/video_feed`);
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 1000,
    pauseOnHover: false,
    draggable: true,
    theme: 'light',
  };
  // toast.error(data.message, toastOptions);

  const handleStream = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/clear_stream`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });

    setImgSrc(noSignalImage);
  };

  const handleUpdateDatabase = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/push_into_db`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
    fetch('http://127.0.0.1:5000/push_into_db', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setDataSource(data.data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/push_into_db', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setDataSource(data.data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="flex">
      <div className="w-2/12 h-screen bg-slate-300 px-4 py-2">
        <div className="w-full h-[50px] p-2 mb-6">
          <div className="flex items-center justify-center gap-4 cursor-pointer">
            <img className="w-[50px]" src={app_logo} alt="app_logo" />
            <h1 className="text-xl font-extrabold">CARMERA</h1>
          </div>
        </div>
        <div className="w-full h-fit bg-slate-400 rounded-lg p-4">
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2 pb-2">
              <FaInfoCircle fontSize={20} />
              <h2 className="font-bold text-md">Introduction</h2>
            </div>
            <p>
              This website is a project developed by our team, designed to identify vehicles, read license plates, and
              determine vehicle speed through traffic surveillance cameras.
              <br />
              This is a pilot project, and we hope that the product will fulfill the basic requirements for practical
              applications.
            </p>
          </div>
        </div>

        <div className="w-full h-fit bg-slate-400 rounded-lg p-4 my-2">
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2 pb-2">
              <FaMapMarkerAlt fontSize={22} />
              <h2 className="font-bold text-md">Location</h2>
            </div>

            <Radio.Group onChange={handleLocationChange}>
              <Space direction="vertical gap-3">
                <Radio value={1}>Danang</Radio>
                <Radio value={2}>Hanoi</Radio>
                <Radio value={3}>Ho Chi Minh City</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div
            className="w-full h-fit bg-[#b42626] rounded-lg text-white cursor-pointer hover:bg-[#902e2e] p-3 mt-6"
            onClick={handleStream}
          >
            <div className="border-slate-500 flex justify-start items-center gap-3 text-center pl-2">
              <FaRegStopCircle fontSize={20} />
              <h2 className="font-medium text-md">Stop Detecting</h2>
            </div>
          </div>
          <div className="w-full h-fit bg-slate-600 rounded-lg text-white cursor-pointer hover:bg-slate-700 p-3 mt-4" onClick={handleUpdateDatabase}>
            <div className="border-slate-500 flex justify-start items-center gap-3 text-center pl-2">
              <MdOutlineUpdate fontSize={20} />
              <h2 className="font-medium text-md">
                Update Vehicle List
              </h2>
            </div>
          </div>
        </div>
        <div
          onClick={handleAdvancedSearchClick}
          className="w-full h-fit bg-slate-700 rounded-lg text-white cursor-pointer hover:bg-slate-800 p-3 mt-2"
        >
          <div className="border-slate-500 flex justify-start items-center gap-4 text-center pl-2">
            <IoMdSearch fontSize={22} />
            <h2 className="font-medium text-md">Advanced Search Page</h2>
          </div>
        </div>
      </div>
      <div className="w-10/12 h-screen flex">
        <div className="w-1/2 h-screen flex-col">
          <div className="h-1/2 w-full bg-slate-200 px-4 pb-2 flex-col">
            <span className="py-1 font-semibold text-gray-700 text-sm">Record Detail</span>
            <div className="w-full h-full bg-slate-400 rounded-md flex-col p-2">
              {selectedVehicle ? (
                <>
                  <div className="flex-col">
                    <div className="pb-4">
                      <p className="font-bold"> License Plate</p>
                    </div>
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
                        className="w-[135px] py-3 rounded-md text-xl font-bold focus:outline-none hover:pointer-none text-center"
                      />
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Vehicle Speed</p>
                    </div>
                    <div>
                      <p>
                        {selectedVehicle.speed === 'Not Detected' ? 'Not Detected' : `${selectedVehicle.speed} km/h`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Vehicle Type</p>
                    </div>
                    <div>
                      <p>{selectedVehicle.vehicle_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center border-b py-2">
                    <div className="w-1/2">
                      <p className="font-bold">Time Stamp</p>
                    </div>
                    <div>
                      <p>{selectedVehicle.time}</p>
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
            <div className="flex flex-row justify-between my-1">
              <span className="py-1 font-semibold text-gray-700 text-sm">Camera Video</span>
            </div>
            <div className="w-full bg-slate-400 rounded-md flex justify-center">
              <img src={imgSrc} alt="Video Feed" className="h-[380px] w-fit" />
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-slate-200 px-4 pb-4 flex flex-col">
          <span className="py-1 font-semibold text-gray-700 text-sm">Vehicle List</span>
          <div className="w-full h-full bg-white rounded-md overflow-y-auto">
            <VehicleListTable dataSource={sortedDataSource} columns={columns} handleRecordClick={handleRecordClick} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainPage;
