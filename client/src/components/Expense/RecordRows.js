import React, { Component } from 'react'
import ExpenseDetail from './ExpenseDetail'
import { RECORDS_SUBSCRIPTION } from '../../apollo/graphql.subscription'

class RecordRows extends Component {
  componentDidMount () {
    this.subscribeToNewRecords()
    this.props.data.records.reverse()
  }

  subscribeToNewRecords () {
    this.props.subscribeFunc({
      document: RECORDS_SUBSCRIPTION,
      variables: { userId: window.localStorage.getItem('id') },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newRecord = subscriptionData.data.recordCreated
        // console.log(newRecord)
        // console.log(prev.records)
        // console.log(Object.assign(prev, { records: [...prev.records, newRecord] }))
        return Object.assign(prev, { records: [newRecord, ...prev.records] })
      }
    })
  }
  render () {
    return (
      <div>
        {this.props.data.records.map((record) => {
          return <ExpenseDetail recordId={record.id} key={record.id} tag={record.tag} payMethod={record.method} description={record.description} date={record.date} amount={record.amount} />
        })}
      </div>
    )
  }
}

export default RecordRows
