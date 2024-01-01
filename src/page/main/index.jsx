import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app_logo from '../../asset/logo.png';
import { Table } from 'antd';
import { FaInfoCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineUpdate } from "react-icons/md";
import { columns, dataSource } from '../../const';


function MainPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();
  const handleRowClick = (record) => {
    setSelectedVehicle(record);
  };
  const handleAdvancedSearchClick = () => {
    navigate('/search');
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
          <div className="border-slate-500">
            <div className="flex justify-start items-center gap-2 pb-2">
              <FaInfoCircle fontSize={20} />
              <h2 className="font-bold text-lg">Introduction</h2>
            </div>
            <p>
              This website is a project developed by our team, designed to identify vehicles, read license plates, and determine vehicle speed through traffic surveillance cameras.
              <br />This is a pilot project, and we hope that the product will fulfill the basic requirements for practical applications.
            </p>
          </div>
          <div className="w-full h-fit bg-slate-600 rounded-lg text-white cursor-pointer hover:bg-slate-700 p-3 mt-8">
            <div className="border-slate-500 flex justify-start items-center gap-3 text-center pl-2">
              <MdOutlineUpdate fontSize={22} />
              <h2 className="font-medium text-md">Update Vehicle List</h2>
            </div>
          </div>
        </div>

        <div onClick={handleAdvancedSearchClick} className="w-full h-fit bg-slate-700 rounded-lg text-white cursor-pointer hover:bg-slate-800 p-3 mt-4">
          <div className="border-slate-500 flex justify-start items-center gap-4 text-center pl-2">
            <IoMdSearch fontSize={22} />
            <h2 className="font-medium text-md">Advanced Search Page</h2>
          </div>
        </div>
      </div>
      <div className="w-10/12 h-screen flex">
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
                    Click on a vehicle from the Vehicle List to show the detail!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="h-1/2 w-full bg-slate-200 px-4 pb-4 flex flex-col">
            <span className="py-1 font-semibold text-gray-700 text-sm">Camera Video</span>
            <div className="w-full h-full bg-slate-400 rounded-md">
              <img src="http://127.0.0.1:5000/video_feed" alt="Video Feed" />
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-slate-200 px-4 pb-4 flex flex-col">
          <span className="py-1 font-semibold text-gray-700 text-sm">Vehicle List</span>
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

export default MainPage;
