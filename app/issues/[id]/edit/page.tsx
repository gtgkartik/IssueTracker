import React from 'react'

const Edit = ({params}: {params: {id: string}}) => {
  return (
    <div>
        {params.id}
    </div>
  )
}

export default Edit