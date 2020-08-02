import React, { useState } from 'react'
import Blog from './Blog'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@material-ui/core'

const Blogs = ({blogs}) => (
<div>
<h2>Blogs</h2>

<TableContainer component={Paper}>
  <Table>
    <TableBody>
      {blogs
        .sort((a, b) => a.likes < b.likes ? 1 : -1)
        .map(blog => (
        <TableRow key={blog.id}>
        {/*<TableCell>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </TableCell> */}
          <TableCell>
            <Blog blog={blog} handleLikesIncr={handleLikesIncr} handleRemove={handleRemove} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
)


