// __tests__/CheckboxWithLabel-test.js

import React from "react";
import { shallow, configure } from "enzyme";
import CheckboxWithLabel from "../react-testing-lib/CheckboxWithLabel";
import Adapter from "enzyme-adapter-react-15";
configure({ adapter: new Adapter() });

test("CheckboxWithLabel changes the text after click", () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  console.log("checkBox", checkbox);

  expect(checkbox.text()).toEqual("Off");

  checkbox.find("input").simulate("change");

  expect(checkbox.text()).toEqual("On");
});
