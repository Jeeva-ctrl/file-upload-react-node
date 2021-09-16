// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();

  //   {
  //     type: 'a',
  //     props: {
  //       className: 'normal',
  //       href: 'http://www.facebook.com',
  //       onMouseEnter: [Function: onMouseEnter],
  //       onMouseLeave: [Function: onMouseLeave]
  //     },
  //     children: [ 'Facebook' ]
  //   }

  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
