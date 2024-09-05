/* import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Stack, TextField } from '@mui/material'; 
 
type Node = {
  name: string;
  deadline: Date;
  type: string;
  isComplete: boolean;
  nodes?: Node[];
};

const key = 'Search';

const Component: React.FC = () => {
  const [search, setSearch] = React.useState<string>('');

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  let data = { nodes: nodes.filter((item: Node) => item.name.toLowerCase().includes(search.toLowerCase())) };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const COLUMNS = [
    { label: 'Task', renderCell: (item: Node) => item.name },
    {
      label: 'Deadline',
      renderCell: (item: Node) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item: Node) => item.type },
    {
      label: 'Complete',
      renderCell: (item: Node) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item: Node) => item.nodes?.length },
  ];

  return (
    <>
      <Stack spacing={10}>
        <TextField label="Search Task" value={search} InputProps={{ startAdornment: <FaSearch /> }} onChange={handleSearch} />
      </Stack>
      <br />

      <CompactTable columns={COLUMNS} data={data} theme={theme} />

      <br />
      <DocumentationSee anchor={'Features/' + key} />
    </>
  );
};

export default Component;
 */