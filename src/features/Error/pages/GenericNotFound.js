import React from 'react'
import { Container, Box, Typography, Link } from '@material-ui/core'
import { Title } from '../../../components'

export default function GenericNotFound() {
  return (
    <Container>
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Title>
            404
          </Title>
          <Typography component="h5">
            Not Found
          </Typography>
          <Link href="/">Back to Home page</Link>
        </Box>
      </Box>
    </Container>
  )
}