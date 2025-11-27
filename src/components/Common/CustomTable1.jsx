import { twMerge } from "tailwind-merge";
import { Loading } from "./Loading";
import { IoChevronDown } from "react-icons/io5";

export const CustomTable1 = (props) => {
  const {
    columns,
    datas,
    actions,
    className,
    isLoading,
    errorMessage,
    containerClass,
    sort,
    setSort,
  } = props;

  const handleSortClick = (col, index) => {
    let order = "ASC";
    if (sort?.name === col && sort?.order === "ASC") {
      order = "DESC";
    }
    setSort({
      name: col,
      order: order,
      field:
        datas.flatMap((x) => x.tableData).length > 0
          ? Object.keys(datas[0].tableData)[index] || ""
          : "",
    });
  };

  console.log(sort)

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
                <th key={index} onClick={() => handleSortClick(col, index)}>
                  <div className="flex gap-3 items-center cursor-pointer">
                    {col}
                    <IoChevronDown
                      className={
                        sort?.name === col
                          ? sort?.order === "ASC"
                            ? "rotate-180"
                            : ""
                          : "invisible"
                      }
                    />
                  </div>
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading || errorMessage ? (
            <tr style={{ height: "calc(7 * 2.5rem)" }}>
              <td
                className={twMerge(
                  "text-center",
                  errorMessage && "text-[var(--color-text-error)]"
                )}
                colSpan={columns.length}
              >
                {errorMessage ? errorMessage : <Loading />}
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
                <tr key={rowIndex} style={{ height: "2.5rem" }}>
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
            <tr style={{ height: "calc(7 * 2.5rem)" }}>
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
