import React from "react";
import IconButton from "../template/iconButton";
export default props => {
  const renderRows = () => {
    const list = props.list || [];

    return list.map(data => (
      <tr key={data.id}>
        <td>{data.description}</td>
        <td className="text-right">
          <IconButton
            hide={data.mark}
            style="success"
            icon="check"
            onClick={() => props.handleToggleMark(data)}
          />
          <IconButton
            hide={!data.mark}
            style="warning mx-3"
            icon="undo"
            onClick={() => props.handleToggleMark(data)}
          />
          <IconButton
            hide={!data.mark}
            style="danger"
            icon="trash-o"
            onClick={() => props.handleRemove(data)}
          ></IconButton>
        </td>
      </tr>
    ));
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th className="text-right">Ações</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};
