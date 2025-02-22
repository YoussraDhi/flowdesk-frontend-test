import React from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px;
  color: #888;
`;

interface DropoverProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Dropover: React.FC<DropoverProps> = ({ options, value, onChange }) => {
  return (
    <SelectContainer>
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      <SelectArrow>▼</SelectArrow>
    </SelectContainer>
  );
};

export default Dropover;
