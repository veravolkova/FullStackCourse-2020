import React from "react";

export default function Filter(props) {
  return (
    <div>
      find countries:
      <input value={props.value} onChange={props.onChange} />
    </div>
  );
}
