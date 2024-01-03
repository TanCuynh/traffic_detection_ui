const columns = [
  {
    title: 'License Plate',
    dataIndex: 'result_file_name',
    key: 'result_file_name',
    width: '20%',
    render: (key) => (
      <img
        src={`http://127.0.0.1:5000/api/get_image/result_licenses/${key}`}
        alt="License Plate"
        style={{ width: '100px', height: 'auto' }}
      />
    ),
  },
  {
    title: 'License Plate No.',
    dataIndex: 'license_plate',
    key: 'license_plate',
    width: '20%',
    render: (licensePlate) => <span style={{ fontSize: '17px', fontWeight: 'bold' }}>{licensePlate}</span>,
  },
  {
    title: 'Speed',
    dataIndex: 'speed',
    key: 'speed',
    width: '20%',
    render: (speed) => (speed !== 'Not Detected' ? `${speed} km/h` : 'Not Detected'),
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '30%',
  },
];

const marks = {
  0: {
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'black',
    },
    label: '0km/h',
  },
  50: {
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'black',
    },
    label: '50km/h',
  },
  100: {
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'black',
    },
    label: '100km/h',
  },
  150: {
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'black',
    },
    label: '150km/h',
  },
};

const toastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

export { columns, marks, toastOptions };
