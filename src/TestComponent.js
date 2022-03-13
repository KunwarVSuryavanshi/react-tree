import React from 'react'
import ReactTree from './Components/ReactTree'

function TestComponent() {
  const data = [{
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
  { value: 'Parent 3', children: [] },
  { value: 'Parent 4', children: [] },
  { value: 'Parent 5', children: [] }
]
  return (
    <div>
      <ReactTree treeData={data}/>
    </div>
  )
}

export default TestComponent