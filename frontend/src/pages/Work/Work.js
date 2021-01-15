import React, { useEffect, useState } from 'react';
import Block from '../../components/Block/Block.js';
import styles from './work.module.css';
import axios from 'axios';
import WorkInput from './WorkInput';
import WorkModal from './WorkModal';
import { FaPlus } from 'react-icons/fa';

const Work = function () {
  const [input, setInput] = useState('');
  const [datas, setData] = useState([{ data: '' }]);
  const [option, setOption] = useState('');

  //로딩 및 에러처리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [workId, setWorkId] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [correctModal, setCorrectModal] = useState(false);
  const [modalInput, setModalInput] = useState({
    workName: '',
    workCharger: '',
    workStartDate: '',
    workEndDate: '',
  });

  const [deptLists, setDeptLists] = useState([{ dept: '' }]);
  const [selectedDept, setSelectedDept] = useState('1');

  const { workName, workCharger, workStartDate, workEndDate } = modalInput;

  const fetchusers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `/work?nameType=workName&name=`, //13.124.107.49:8080/work?nameType=workName&name=
      );
      setData(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchDept = async () => {
    try {
      const response = await axios.get(`/work/create`);
      setDeptLists(response.data.departmentList);
    } catch (e) {
      console.log('부서데이터를 가져오는데 문제가 있습니다.');
    }
  };

  useEffect(() => {
    fetchusers();
    fetchDept();
  }, []);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error Occurred</div>;

  const handleSelectChange = (e) => {
    setOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const fetchSearchResult = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/work?nameType=${option}&name=${input}`,
        );
        setData(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchSearchResult();
  };

  //모달
  const addModalOpen = () => {
    setAddModal(true);
  };

  const addModalClose = () => {
    setAddModal(false);
  };

  const correctModalOpen = (e) => {
    let getId = e.target.closest('div').id;
    setWorkId(getId);
    setCorrectModal(true);
  };

  const correctModalClose = () => {
    setCorrectModal(false);
  };

  const handleModalInput = (e) => {
    const { value, name } = e.target;
    setModalInput({
      ...modalInput,
      [name]: value,
    });
  };

  const handleSelectDept = (e) => {
    setSelectedDept(e.target.value);
  };

  const addWork = (e) => {
    e.preventDefault();
    alert(
      `${workName}, ${selectedDept}, ${workCharger},${workStartDate}, ${workEndDate}`,
    );
    try {
      axios
        .post(`/work/create`, {
          workName: workName,
          workDept: selectedDept,
          workChargeName: workCharger,
          workStartDate: workStartDate,
          workEndDate: workEndDate,
        })
        .then(() => {
          fetchusers();
          setAddModal(false);
        });
    } catch (e) {
      console.log('업무를 추가하는데 문제가 있습니다.');
    }
  };
  const correctWork = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`work/${workId}/edit`, {
          workName: workName,
          workDept: selectedDept,
          workChargeName: workCharger,
          workStartDate: workStartDate,
          workEndDate: workEndDate,
        })
        .then(() => {
          fetchusers();
          setCorrectModal(false);
        });
    } catch (e) {
      console.log('업무를 수정하는데 문제가 있습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <WorkInput
        handleSubmit={handleSubmit}
        optionValue={option}
        handleSelectChange={handleSelectChange}
        input={input}
        handleInputChange={handleInputChange}
      />
      <div className={styles.addButtonWrap}>
        <button onClick={addModalOpen} className={styles.addButton}>
          <FaPlus />
        </button>
      </div>
      <WorkModal
        modal={addModal}
        handleModalInput={handleModalInput}
        handleSelectDept={handleSelectDept}
        handleWork={addWork}
        selectedDept={selectedDept}
        workName={workName}
        workCharger={workCharger}
        workStartDate={workStartDate}
        workEndDate={workEndDate}
        modalClose={addModalClose}
        deptLists={deptLists}
        buttonText="업무추가"
      />
      <Block
        searchResult={datas}
        modalOpen={correctModalOpen}
        className={styles.block}
      />
      <WorkModal
        modal={correctModal}
        handleModalInput={handleModalInput}
        handleSelectDept={handleSelectDept}
        handleWork={correctWork}
        selectedDept={selectedDept}
        workName={workName}
        workCharger={workCharger}
        workStartDate={workStartDate}
        workEndDate={workEndDate}
        modalClose={correctModalClose}
        deptLists={deptLists}
        buttonText="업무수정"
      />
    </div>
  );
};

export default React.memo(Work);
