import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CSS from 'csstype';
import { Backdrop, Fade, Modal } from '@material-ui/core';

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
    format: (value: string) => displayImage(value, 'main')
  },
  { 
    id: 'x_studio_product_description_image', 
    label: 'description picture',
    format: (value: string) => displayImage(value, 'description')
  },
  { 
    id: 'x_studio_product_origin_image', 
    label: 'origin picture',
    format: (value: string) => displayImage(value, 'origin')
  }
];

function displayImage(value: string, altText: string) {
  if (value !== null) {
    if (value.startsWith('/9j/')) {
      return (
        <img style={miniatureStyle} alt={altText} src={'data:image/jpg;base64, ' + value}/>
      ); 
    } else if(value.startsWith('iVBOR')) {
      return (
        <img style={miniatureStyle} alt={altText} src={'data:image/png;base64, ' + value}/>
      )
    } else {
      return (
        <img style={miniatureStyle} alt={altText} src={value}/>
      )
    }
  }
}

interface DataGridProps {
  rows: any
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DataGrid(props: DataGridProps) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [open, setOpen] = React.useState(false);
  const [targetedRow, setTargetedRow] = React.useState();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (row: any) => {
    setTargetedRow(row);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleOpen(row)}>
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

      {/* TODO: move the modal to another component ? */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            
            <h2 id="transition-modal-title">
              {
                // try to find another way but this works so fuck it ^^'
                // @ts-ignore: Object is possibly 'null'.
                targetedRow?.name
              }
            </h2>
            <p id="transition-modal-description">Drag and drop the Pictures to add them to the Product</p>
          </div>
        </Fade>
      </Modal>
    </Paper>
  );
}