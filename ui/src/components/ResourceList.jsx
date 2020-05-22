import React from 'react';
import styled from 'styled-components';
import resources from '../assets/resources.json';

const StyledTable = styled.table`
margin: 2% 5%;
`;

const StyledTd = styled.td`
border 1px solid gray;
`;

const ResourceList = () => {
  const resourceList = resources;
  return (
    <StyledTable>
      <tr>
        <th>Target Group</th>
        <th>Type</th>
        <th>Name</th>
        <th>Description</th>
        <th>Web site</th>
        <th>Phone</th>
      </tr>
      {
        resourceList.map((e) => (
          <tr key={e.id}>
            <StyledTd>{e.targetGroup}</StyledTd>
            <StyledTd>{e.resourceType}</StyledTd>
            <StyledTd>{e.resourceName}</StyledTd>
            <StyledTd>{e.resourceDescription}</StyledTd>
            <StyledTd><a href={e.link}>Website</a></StyledTd>
            <StyledTd>{e.phone}</StyledTd>
          </tr>
        ))
      }
    </StyledTable>
  );
};

export default ResourceList;
