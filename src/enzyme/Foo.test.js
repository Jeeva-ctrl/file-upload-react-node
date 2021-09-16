// __tests__/CheckboxWithLabel-test.js

import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import Foo from "./Foo";
configure({ adapter: new Adapter() });

const wrapper = shallow(<Foo />);
expect(wrapper.find(".clicks-0").length).to.equal(1);
wrapper.find("a").simulate("click");
expect(wrapper.find(".click-1").length).to.equal(1);
