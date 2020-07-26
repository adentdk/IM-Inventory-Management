import React from 'react'
import PropTypes from 'prop-types'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {Title} from '../../../components'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

export default function SimpleTable(props) {
  const classes = useStyles()
  const {
    title,
    linkname,
    to,
    data: {header, body}
  } = props
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {header.map(item => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row, i) => (
            <TableRow key={i}>
              {header.map(item => (
              <TableCell key={item}>{row[item]}</TableCell>
            ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to={to}>
          {linkname}
        </Link>
      </div>
    </React.Fragment>
  )
}

SimpleTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf({header: PropTypes.array, body: PropTypes.arrayOf(PropTypes.object)}).isRequired,
  linkname: PropTypes.string,
  to: PropTypes.string,
}