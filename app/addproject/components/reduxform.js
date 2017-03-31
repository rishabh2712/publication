import { Field, FieldArray, reduxForm } from 'redux-form'
import React, { Component } from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <div className="ui fluid input">
        <input {...input} type={type} placeholder={label}/>
      </div>
    </div>
)

const renderReferences = ({ fields, meta: { error } }) => (
    <div className="ui list">
      <button type="button" className="ui button" onClick={() => fields.push()}>Add Reference</button>
      {fields.map((reference, index) =>
        <div className="ui grid">
          <div className="ten wide column">
            <div className="item" key={index}>
              <Field
                name={reference}
                type="text"
                component={renderField}
                label={`Reference #${index + 1}`}/>
            </div>
          </div>
          <div className="column">
            <button className="ui icon button" onClick={() => fields.remove(index)}>
            <i className="trash icon"></i>
            </button>
          </div>
        </div>
      )}
      {error && <li className="error">{error}</li>}
    </div>
)

const FieldArraysForm = (props) => {
  const { handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="references" component={renderReferences}/>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays',
  destroyOnUnmount: false
})(FieldArraysForm)
