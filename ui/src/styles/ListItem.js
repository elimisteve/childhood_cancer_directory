import styled from 'styled-components';

const ListItem = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  margin-left: 2%;
  margin-right: 2%;
  border-radius: 5px;
  & > * {
    padding: 10px;
  }
`;

export default ListItem;
