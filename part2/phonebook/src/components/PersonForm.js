import React from 'react';

export default function PersonForm(props) {
  return (
    
    <form onSubmit={props.onSubmit}>
        <div>
          name:
          <input value={props.nameValue} onChange={props.onChangeName} />
        </div>
        <div>
          number:
          <input value={props.numberValue} onChange={props.onChangeNumber} />
        </div>
        <button type="submit">save</button>
    </form>
   
  );
}

