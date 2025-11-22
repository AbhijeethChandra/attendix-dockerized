import { twMerge } from "tailwind-merge";

export const CustomTable1 = (props) => {
  const {
    columns,
    datas,
    actions,
    className,
    isLoading,
    errorMessage,
    containerClass,
  } = props;

  return (
    <div
      className={twMerge(
        "w-full overflow-x-auto max-h-[calc(100vh-10rem)] overflow-y-auto",
        containerClass
      )}
    >
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
          {isLoading || errorMessage ? (
            <tr>
              <td
                className={twMerge(
                  "text-center",
                  errorMessage && "text-[var(--color-text-error)]"
                )}
                colSpan={columns.length}
              >
                {errorMessage ? errorMessage : "Loading, Please wait ..."}
              </td>
            </tr>
          ) : datas && datas.length > 0 ? (
            datas.map((data, rowIndex) => {
              let rowElements = [];

              {
                Object.entries(data.tableData).forEach(
                  ([key, value], colIndex) => {
                    if (!key.match(/^-/))
                      rowElements.push(<td key={colIndex}>{value}</td>);
                  }
                );
              }
              return (
                <tr key={rowIndex}>
                  {rowElements}
                  {actions &&
                    actions.map((action, index) => (
                      <td key={index}>
                        <div className="flex gap-2 items-center">
                          {action.map((ActionComponent, actionIndex) => (
                            <ActionComponent
                              key={actionIndex}
                              data={{ ...data.tableData, ...data.other }}
                            />
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
