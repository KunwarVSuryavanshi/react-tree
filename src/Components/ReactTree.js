import React, { useEffect, useState } from 'react'
import './ReactTree.css'

export default function ReactTree(props) {
  const [treeData, setTreeData] = useState([])

  const handleClick = (item) => {
    item.expanded = !item.expanded
    setTreeData([...treeData])
  }

  const renderItems = (nodes, parentKey) => {
    return (
      nodes?.map((item, key) => {
        item.nodeInfo = parentKey?.length > 0 ? [...parentKey, key] : [key]
        item.uniqueKey = `${parentKey?.length > 0 ? `${parentKey},${key}` : `${key}`}`

        return (
          <div className='tree-container pdL3'>
            {item?.children?.length > 0 &&
              <>
              {item?.expanded ?
                <div className='drop_icon' onClick={() => handleClick(item)}>
                  &#x25BC;
                </div>
                :
                <div className='drop_icon' onClick={() => handleClick(item)}>
                  &#x25B6;
                </div>}
              </>
            }
            <div className={`tree-row ${item?.nodeInfo?.length === 1 ? item?.nodeInfo[0] !== 0 ? 'pdT2' : '' : 'pdT2'}`}>
              <span className={`react-tree-input`} >
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onChangeHandler(e, item)}
                  placeholder={item.placeholder ? item.placeholder : props.genericPlacholder || "Enter text ..."}
                />
              </span>
              <span className='react-tree-btn'>
                <button onClick={() => addNode(item)}>Add</button>
                <button onClick={() => removeNode(item)}>Remove</button>
              </span>
            </div>
            {item?.children?.length > 0 && item?.expanded ?
              renderItems(item?.children, item?.nodeInfo)
              :
              <></>
            }
          </div>
        )
      })
    )
  }

  const onChangeHandler = (event, nodeProps) => {
    nodeProps.value = event.target.value
    setTreeData([...treeData])
  }

  const addNode = (values) => {
    values.children.push({ value: '', children: [] })
    setTreeData([...treeData])
  }

  const removeNode = (values) => {
    if (values.uniqueKey.length > 1) {
      const newKey = values.uniqueKey.slice(0, values.uniqueKey.length - 2)
      removeMapper(newKey, values.uniqueKey.charAt(values.uniqueKey.length - 1))
    }
    else {
      treeData.splice(values.uniqueKey, 1)
      setTreeData([...treeData])
    }
  }

  const removeMapper = (nkey, uniqueKey, arr = treeData) => {
    arr.map(item => {
      if (item.uniqueKey === nkey) {
        item.children.splice(uniqueKey, 1)
        setTreeData([...treeData])
        return
      }
      else if (item.children.length > 0) {
        removeMapper(nkey, uniqueKey, item.children)
      }
    })
  }

  const mapper = (datas) => {
    datas.map(item => {
      if (item.expanded === undefined || item.expanded === null)
        item.expanded = true;
      if (item.children)
        mapper(item.children)
    })
  }

  useEffect(() => {
    mapper(props.treeData)
    setTreeData([...props.treeData])
  },[])

  return (
    <>
      <div className={`react-tree-container`}>
        <div className={`react-tree-row`} >
          {renderItems(treeData)}
        </div>
      </div>
    </>
  )
}
