import React, { useEffect, useState} from 'react';
import Styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../api';


const PatientDetail = (props) => {
  const { id } = useParams();
  return (
    <div>{id}</div>
  );
};

export default PatientDetail;
