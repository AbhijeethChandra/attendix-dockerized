import { useCallback } from 'react';
import jsonAsXlsx from 'json-as-xlsx';
import { twMerge } from 'tailwind-merge';

export const useExcelExport = (columns, contents, options = {}) =>{
  const {
    fileName = 'export',
    sheetName = 'Sheet1',
    buttonText = 'Download Excel',
    buttonClassName = ''
  } = options;

  /**
   * Transforms the contents array into the format expected by json-as-xlsx
   */
  const transformData = useCallback(() => {
    return contents.map(item => {
      const row = {};
      const values = Object.values(item);
      
      columns.forEach((column, index) => {
        row[column] = values[index] !== undefined ? values[index] : '';
      });
      
      return row;
    });
  }, [columns, contents]);

  /**
   * Handles the Excel download
   */
  const handleDownload = useCallback(() => {
    const transformedData = transformData();
    
    const columnConfig = columns.map(col => ({
      label: col,
      value: col
    }));

    const data = [{
      sheet: sheetName,
      columns: columnConfig,
      content: transformedData
    }];
    
    const settings = {
      fileName: fileName,
      extraLength: 3,
      writeMode: 'writeFile',
      writeOptions: {}
    };

    jsonAsXlsx(data, settings);
  }, [columns, transformData, fileName, sheetName]);

  /**
   * Download Button Component
   */
  const DownloadButton = () => (
    <button
      onClick={handleDownload}
      className={twMerge('button-1 px-3 py-1 rounded-md',buttonClassName)}
      type="button"
    >
      {buttonText}
    </button>
  );

  return {
    DownloadButton,
    download: handleDownload
  };
}

// Example usage in a component:
// 
// function MyComponent() {
//   const columns = ['Name', 'Age', 'City', 'Score'];
//   const contents = [
//     { r: 'John', t: 25, y: 'NYC', i: 95 },
//     { j: 'Jane', k: 30, n: 'LA', m: 88 }
//   ];
//
//   const { DownloadButton } = useExcelExport(columns, contents, {
//     fileName: 'user-data',
//     sheetName: 'Users',
//     buttonText: 'Export to Excel',
//     buttonClassName: 'btn btn-primary'
//   });
//
//   return (
//     <div>
//       <h1>User Data</h1>
//       <DownloadButton />
//     </div>
//   );
// }