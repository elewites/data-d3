import { React, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./genderdropdown.css"

function GenderDropDown({ genderSelection }) {
  return (
    <div className="drop-down-container">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Gender
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => genderSelection('men')} > Men</Dropdown.Item>
          <Dropdown.Item onClick={() => genderSelection('women')}>Women</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div >
  )
}

export default GenderDropDown