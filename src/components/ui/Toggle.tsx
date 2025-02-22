import React from "react";
import styled from "styled-components";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #f5b942;
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;

const Label = styled.span<{ isToggled: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
  color: white;
  pointer-events: none;
  transition: 0.4s;

  &:first-of-type {
    left: 10px;
    opacity: ${({ isToggled }) => (isToggled ? 1 : 0)};
  }

  &:last-of-type {
    right: 10px;
    opacity: ${({ isToggled }) => (isToggled ? 0 : 1)};
  }
`;

interface ToggleProps {
  isToggled: boolean;
  onToggle: () => void;
  values?: [string, string];
}

const Toggle: React.FC<ToggleProps> = ({ isToggled, onToggle, values }) => {
  return (
    <Switch>
      <Input type="checkbox" checked={isToggled} onChange={onToggle} />
      <Slider />
      {values && values.length === 2 ? (
        <React.Fragment>
          <Label isToggled={isToggled}>{values[0]}</Label>
          <Label isToggled={isToggled}>{values[1]}</Label>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Label isToggled={isToggled}>ON</Label>
          <Label isToggled={isToggled}>OFF</Label>
        </React.Fragment>
      )}
    </Switch>
  );
};

export default Toggle;
