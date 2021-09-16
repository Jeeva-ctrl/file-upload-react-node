import React from "react";

const Toaster = () => {
  const [position, setPosition] = React.useState("top-left");
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name == "position");
    if (name == "position") {
      setPosition(value);
    }

    console.log("name", name);
    console.log("value", value);
  };
  console.log("position", position);

  return (
    <div className="container">
      <div className="position">
        <div className="heading">Position</div>
        <div className="radio-group">
          <div>
            <input
              className={` ${position === "top-left" ? "active" : ""}`}
              type="radio"
              value={"top-left"}
              name="position"
              onChange={handleChange}
              checked={position === "top-left"}
            />
            <label>top-left</label>
          </div>
          <div>
            <input
              className={` ${position === "top-right" ? "active" : ""}`}
              type="radio"
              name="position"
              value="top-right"
              onChange={handleChange}
              checked={position === "top-right"}
            />
            <label>top-right</label>
          </div>
          <div>
            <input
              className={` ${position === "top-center" ? "active" : ""}`}
              type="radio"
              name="position"
              value="top-center"
              onChange={handleChange}
              checked={position === "top-center"}
            />
            <label>top-center</label>
          </div>
          <div>
            <input
              className={` ${position === "bottom-left" ? "active" : ""}`}
              type="radio"
              name="position"
              value="bottom-left"
              onChange={handleChange}
              checked={position === "bottom-left"}
            />
            <label>bottom-left</label>
          </div>
          <div>
            <input
              className={` ${position === "bottom-center" ? "active" : ""}`}
              type="radio"
              name="position"
              value="bottom-center"
              onChange={handleChange}
              checked={position === "bottom-center"}
            />
            <label>bottom-center</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toaster;
