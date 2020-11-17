import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CSS from 'csstype';

interface Column {
  id: 'id' | 'default_code' | 'name' | 'image_1920' | 'x_studio_product_description_image' | 'x_studio_product_origin_image';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => any;
}

const miniatureStyle: CSS.Properties = {
  maxWidth: '150px',
  maxHeight: '150px'
};

const columns: Column[] = [
  { id: 'id', label: 'odoo id', minWidth: 170 },
  { id: 'default_code', label: 'default_code', minWidth: 100 },
  { id: 'name', label: 'name', minWidth: 170 },
  { 
    id: 'image_1920',
    label: 'main picture',
    format: (value: string) => {
      if (value !== null) {
        if (value.startsWith('/9j/')) {
          return (
            <img style={miniatureStyle} alt='main' src={'data:image/jpg;base64, ' + value}/>
          ); 
        } else if(value.startsWith('iVBOR')) {
          return (
            <img style={miniatureStyle} alt='main' src={'data:image/png;base64, ' + value}/>
          )
        } else {
          return (
            <img style={miniatureStyle} alt='main' src={value}/>
          )
        }
      }
    }
  },
  { 
    id: 'x_studio_product_description_image', 
    label: 'description picture',
    format: (value: string) => {
      if (value !== null) {
        if (value.startsWith('/9j/')) {
          return (
            <img style={miniatureStyle} alt='description' src={'data:image/jpg;base64, ' + value}/>
          ); 
        } else if(value.startsWith('iVBOR')) {
          return (
            <img style={miniatureStyle} alt='description' src={'data:image/png;base64, ' + value}/>
          )
        } else {
          return (
            <img style={miniatureStyle} alt='description' src={value}/>
          )
        }
      }
    }
  },
  { 
    id: 'x_studio_product_origin_image', 
    label: 'origin picture',
    format: (value: string) => {
      if (value !== null) {
        if (value.startsWith('/9j/')) {
          return (
            <img style={miniatureStyle} alt='origin' src={'data:image/jpg;base64, ' + value}/>
          ); 
        } else if(value.startsWith('iVBOR')) {
          return (
            <img style={miniatureStyle} alt='origin' src={'data:image/png;base64, ' + value}/>
          )
        } else {
          return (
            <img style={miniatureStyle} alt='origin' src={value}/>
          )
        }
      }
    }
  }
];

interface DataGridProps {
  rows: any
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  
});

export default function DataGrid(props: DataGridProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}