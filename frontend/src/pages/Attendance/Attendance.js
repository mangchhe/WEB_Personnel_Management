import React from 'react';
import Table from '../../components/Table/Table';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaMinusCircle,
} from 'react-icons/fa';
import styles from './attendance.module.css';

const NumBox = ({ num, type }) => {
  return (
    <div className={styles.numBox}>
      <div
        className={
          type === '정상 출근'
            ? styles.normal
            : type === '지각'
            ? styles.late
            : styles.off
        }
      >
        {type === '정상 출근' ? (
          <FaCheckCircle />
        ) : type === '지각' ? (
          <FaExclamationTriangle />
        ) : (
          <FaMinusCircle />
        )}
      </div>

      <div className={styles.text}>
        <p>{type}</p>
        <p>{num}건</p>
      </div>
    </div>
  );
};

function Attendance() {
  const headerArr = [
    '일자',
    '요일',
    '이름',
    '부서',
    '직급',
    '출근시각',
    '퇴근시각',
    '상태',
  ];

  ////////////////////////////////////////////////
  ////////////////   Dummy Data      /////////////
  ////////////////////////////////////////////////
  const dataArr = [
    {
      date: '02/28',
      day: '금',
      name: '조혜련',
      team: '팀원',
      rank: '사원',
      startTime: '9:00',
      endTime: '18:00',
      status: '정상',
    },
    {
      date: '03/29',
      day: '토',
      name: '조혜련',
      team: '팀원',
      rank: '사원',
      startTime: '9:00',
      endTime: '18:00',
      status: '지각',
    },
    {
      date: '04/30',
      day: '일',
      name: '조혜련',
      team: '팀원',
      rank: '사원',
      startTime: '9:00',
      endTime: '18:00',
      status: '휴가',
    },
  ];
  const numArr = { normal: 11, late: 3, off: 2 };

  return (
    <div>
      <div className={styles.numBoxContainer}>
        <NumBox num={numArr.normal} type="정상 출근" />
        <NumBox num={numArr.late} type="지각" />
        <NumBox num={numArr.off} type="휴가" />
      </div>
      <Table page="attendance" headerArr={headerArr} dataArr={dataArr} />
    </div>
  );
}

export default Attendance;
