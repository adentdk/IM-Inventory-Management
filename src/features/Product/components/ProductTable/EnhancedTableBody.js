import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DetailIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

export default function EnhancedTableBody(props) {
  const {
    products,
    order,
    orderBy,
    page,
    rowsPerPage,
    emptyRows,
    isSelected,
    handleClick,
    handleDeleteAction
  } = props

  const classes = useStyles()

  return (
    <TableBody>
    {stableSort(products, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        const isItemSelected = isSelected(row.name)
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={(event) => handleClick(event, row.name)}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none" align="center" >
              <Avatar alt={row.name} src={row.image} className={classes.large} />
            </TableCell>
            <TableCell component="td" id={labelId} scope="row" padding="none" align="center" >
              {row.name}
            </TableCell>
            <TableCell component="td" id={labelId} scope="row" padding="none" align="right" >
              {row.quantity}
            </TableCell>
            <TableCell component="td" id={labelId} scope="row" padding="none" align="center" >
              {row.unit.name}
            </TableCell>
            <TableCell component="td" id={labelId} scope="row" padding="none" align="center" >
              {row.category.name}
            </TableCell>
            <TableCell align="center">
              <Tooltip title="Detail">
                <IconButton
                  aria-label="detail"
                  component={Link}
                  to={`/home/product/${row.id}/detail`}
                >
                  <DetailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  component={Link}
                  to={`/home/product/${row.id}/edit`}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  component={Link}
                  to={`/home/product/${row.id}/delete`}
                  onClick={handleDeleteAction(row)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )
      })}
    {emptyRows > 0 && (
      <TableRow style={{ height: 53 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
    </TableBody>

  )
}

EnhancedTableBody.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.oneOf(['name', 'quantity', 'unit', 'category']).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  emptyRows: PropTypes.bool.isRequired,
  handleDeleteAction: PropTypes.func.isRequired
}
