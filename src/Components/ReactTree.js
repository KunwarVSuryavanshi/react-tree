import React, { useState } from 'react'
import '../ReactTree.css'

export default function ReactTree() {
  const [treeData, setTreeData] = useState([
    { 
      value: 'Parent 1',
      children: [
        { 
          value: 'Children 1-1',
          children: [
            {
              value: 'Children 1-1-1',
              children: [
                {
                  value: 'Children 1-1-1-1',
                  children: [
                    {
                      value: 'Children 1-1-1-1-1',
                      children: []
                    },
                    {
                      value: 'Children 1-1-1-1-2',
                      children: []
                    }
                  ]
                }
              ]
            },
            {
              value: 'Children 1-1-2',
              children: []
            },
            {
              value: 'Children 1-1-3',
              children: []
            }
          ] 
        },
        { 
          value: 'Children 1-2',
          children: [] 
        },
        { 
          value: 'Children 1-3',
          children: [] 
        }
      ]
    }, 
    { 
      value: 'Parent 2', 
      children: [
        { 
          value: 'Children 2-1',
          children: [] 
        },
        { 
          value: 'Children 2-2',
          children: [] 
        },
        { 
          value: 'Children 2-3',
          children: [] 
        }
      ]
    }, 
    { value: 'Parent 3', children: []}, 
    { value: 'Parent 4', children: []}, 
    { value: 'Parent 5', children: []}
  ])

  const renderItems = (nodes, parentKey) => {
    return (
      nodes?.map((item, key) => {
        item.nodeInfo = parentKey?.length > 0 ? [...parentKey, key] : [key]
        item.uniqueKey = `${parentKey?.length > 0 ? `${parentKey},${key}`: `${key}`}`
        
        return(
          <div className='tree-container mrL3'>
            <div className={`tree-row ${item?.nodeInfo?.length === 1 ? item?.nodeInfo[0] !== 0 ? 'pdT2' : '' : 'pdT2'}`}>
              <hr className='hr-line'/>
              <span className={`react-tree-input`}>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => onChangeHandler(e, item)}
                />
              </span>
              <span className='react-tree-btn'>
                <button onClick={() => addNode(item)}>Add</button>
                <button onClick={() => removeNode(item)}>Remove</button>
              </span>
            </div>
            {item.children?.length > 0 &&
              renderItems(item.children, item.nodeInfo)
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
    values.children.push({value: '', children: []})
    setTreeData([...treeData])
  }

  const removeNode = (values) => {
    if(values.uniqueKey.length > 1)
    {
      const newKey = values.uniqueKey.slice(0, values.uniqueKey.length -2)
      removeMapper(newKey, values.uniqueKey.charAt(values.uniqueKey.length -1))
    }
    else{
      treeData.splice(values.uniqueKey, 1)
      setTreeData([...treeData])
    }
  }

  const removeMapper = (nkey, uniqueKey, arr = treeData) => {
    arr.map(item => {
      if(item.uniqueKey === nkey)
      {
        item.children.splice(uniqueKey,1)
        setTreeData([...treeData])
        return
      }
      else if(item.children.length > 0){
        removeMapper(nkey, uniqueKey, item.children)
      }
    })
  }

  return (
    <>
      <div className='empty-div'>
      </div>
      <div className={`react-tree-container`} style={{boxSizing: 'border-box'}}>
        <div className={`react-tree-row`} >
          {renderItems(treeData)}
        </div>
      </div>
    </>
  )
}
