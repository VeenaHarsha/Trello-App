import React, { useState } from 'react'
import Lists from './Lists'

function BoardItem (props) {
  const { boardId, boardName, showBoards } = props
  const [showList, setShowList] = useState(false)

  const handleClickBoard = () => {
    console.log('AM Clicked:', boardId)
    showBoards(false)
    setShowList(true)
  }

  return (
    <div>
      <div className='board-display'>
        <div onClick={handleClickBoard}>{boardName}</div>
        {showList ? <Lists /> : null}
      </div>
      <div>
        <Lists boardId={boardId} boardName={boardName} />
      </div>
    </div>
  )
}

export default BoardItem
