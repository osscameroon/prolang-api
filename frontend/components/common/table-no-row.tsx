type TableNoRowProps = {
  colSpan: number;
};

const TableNoRow = ({ colSpan }: TableNoRowProps) => {
  return (
    <tr>
      <td className="text-center py-4" colSpan={colSpan}>
        No data at the moment
      </td>
    </tr>
  );
};

export { TableNoRow };
