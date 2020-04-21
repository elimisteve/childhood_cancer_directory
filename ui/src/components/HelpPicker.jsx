import React from 'react';
import PropTypes from 'prop-types';

const HelpPicker = (props) => (
    <div>
      <h2>{props.header}</h2>
      {
        props.helpTypes.map((help) => (
          <div key={help.id}>
            <label htmlFor={`helpType${help.id}`}>
              {`${help.name}`}
              <input
                key={help.id}
                checked={props.checked.has(help.id)}
                id={`helpType_${help.id}`}
                type="checkbox"
                name={help.name}
                onChange={props.handleChange}/>
            </label>
          </div>
        ))
      }
    </div>
);
HelpPicker.propTypes = {
  header: PropTypes.string,
  helpTypes: PropTypes.array.isRequired,
  checked: PropTypes.instanceOf(Set).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default HelpPicker;
