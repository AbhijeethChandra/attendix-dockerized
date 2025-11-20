import { twMerge } from "tailwind-merge";

export const CustomTable1 = (props) => {
  const { columns, datas, actions, className } = props;

  return (
    <div className="w-full overflow-x-auto">
      <table className={twMerge("table-1", className)}>
        <thead>
          {columns && (
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {datas && datas.length > 0 ? (
            datas.map((data, rowIndex) => {
              let rowElements = [];

              {
                Object.entries(data).forEach(([key, value], colIndex) => {
                  if (!key.match(/^-/))
                    rowElements.push(<td key={colIndex}>{value}</td>);
                });
              }
              return (
                <tr key={rowIndex}>
                  {rowElements}
                  {actions &&
                    actions.map((action, index) => (
                      <td key={index}>
                        <div className="flex gap-2 items-center">
                          {action.map((ActionComponent, actionIndex) => (
                            <ActionComponent key={actionIndex} data={data} />
                          ))}
                        </div>
                      </td>
                    ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={columns.length}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
