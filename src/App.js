import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './App.css';

const myCellComponent = (p) => {
  return (
    <>
      <button onClick={() => window.alert('Action!')}>+</button>
      {p.value}
    </>
  );
};

function App() {
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    { make: 'Vauxhall', model: 'EX30', price: 33795, electric: true },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: false },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    { make: 'Vauxhall', model: 'EX30', price: 33795, electric: true },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: false },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    { make: 'Vauxhall', model: 'EX30', price: 33795, electric: true },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: false },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
  ]);

  // Определения колонок по умолчанию
  // Подобные настройки можно применить к каждой отдельной колонке
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      // У каждого столбца будет отображен фильтр
      filter: true,
      // С этой опцией фильтр будет занимать ячейку под заголовком
      floatingFilter: true,
      // Включить возможность редактирование текста
      editable: true,
    };
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    // Поле значение поля field преобразуется из camelCase
    // make преобразуется в 'Make'
    // makeName преобразовалось бы в 'Make name'
    {
      field: 'make',
      cellRenderer: myCellComponent,
      // Настройка для редактированя ячейки в виде селектора
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Tesla', 'Ford', 'Toyota'] },
      // Добавить к ячейкам чекбокс выбора
      checkboxSelection: true,
    },
    // Можно задать заголовок напрямую
    {
      headerName: 'Model',
      valueGetter: (p) => p.data.make + ' ' + p.data.model,
    },
    // Можно использовать геттер для вывода определенного значения
    {
      field: 'price',
      valueFormatter: (p) => '€' + p.value.toLocaleString(),
      // Стилизация ячеек с определенным значением
      cellClassRules: {
        'green-cell': (p) => p.value > 30000,
      },
    },
    { field: 'electric' },
  ]);

  // Объект с правилами CSS, применяемыми в соответствии с
  // возвращаемым значением функции
  const rowClassRules = useMemo(() => ({
    'red-row': (p) => p.data.make === 'Toyota',
  }));

  return (
    // 'ag-theme-quartz-dark' - темная тема
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        // Настройка для возможно сти выбора нескольких строк
        rowSelection={'multiple'}
        // Включить пагинацию
        pagination={true}
        // Количество строк на страницу
        paginationPageSize={10}
        // Выбор количества строк на страницу
        paginationPageSizeSelector={[10, 20]}
        rowClassRules={rowClassRules}
      />
    </div>
  );
}

export default App;
