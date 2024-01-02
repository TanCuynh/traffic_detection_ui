const dataSource = [
  {
    key: '1',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '69',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '2',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '70',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '2',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '71',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '4',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '72',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '5',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '73',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '6',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '74',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '7',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '75',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
  {
    key: '8',
    license_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaAYmo3M_YHFt5J29cHcCKj0s9MFtCl-fiA&usqp=CAU',
    license_num: '29D01245',
    speed: '76',
    time: '11/11/2011 11:11:11',
    detected_img: 'src/asset/frame.png',
  },
];

const columns = [
  {
    title: 'License Plate',
    dataIndex: 'license_img',
    key: 'license_img',
    width: '30%',
    render: (text) => <img src={text} alt="License Plate" style={{ width: '100px', height: 'auto' }} />,
  },
  {
    title: 'License Plate No.',
    dataIndex: 'license_num',
    key: 'license_num',
    width: '30%',
  },
  {
    title: 'Speed',
    dataIndex: 'speed',
    key: 'speed',
    width: '10%',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '40%',
  },
];

export { dataSource, columns };
