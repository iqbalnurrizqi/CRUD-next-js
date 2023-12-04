import { log } from 'console'
import React from 'react'

export default function PostDetail({params}: {params : {postId: string}}) {
  console.log(params)
  return (
    
    <div>
    
      Post {params.postId}
      </div>
  )
}
