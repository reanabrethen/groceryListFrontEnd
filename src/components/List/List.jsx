import React, { Component } from 'react'
import Button from '../common/Button'
import PropTypes from 'prop-types'


export class List extends Component {
    state ={
        groceryInput: this.props.grocery.grocery,
        canEdit: false
    }


  render() {
        const {grocery, purchased, _id} = this.props.grocery
        const {handleIsPurchased, handleOnEdit, handleOnDelete} = this.props
    return (
      <div className='shopping-div'>
        {this.state.canEdit ? (
            <input 
                type="text"
                onChange={(event)=> this.setState({groceryInput: event.target.value})}
                value = {this.state.groceryInput}
            />
        ) : (
            <li className="li-style"
                style={{textDecoration: purchased ? 'line-through' : ""}}
                >
                {grocery}    

            </li>
        )} 

        <Button label={this.state.canEdit ? "Save" : "Edit"}
                cssClass={this.state.canEdit ? "done-button" : "edit-button"}
                clickFunction={this.state.canEdit ?
                ()=>{
                    this.setState({canEdit: false})
                    handleOnEdit(_id, this.state.groceryInput)
                    this.setState({groceryInput: this.props.grocery.grocery})
                }:
                ()=>{
                    this.setState({canEdit: true})
                }}
            />
        <Button label={"Purchased"}
                cssClass={"purchase-button"}
                clickFunction={()=>handleIsPurchased(_id, !purchased)}/>
                
        <Button label={"Delete"}
                cssClass={'delete-button'}
                clickFunction={()=>handleOnDelete(_id)}/>
      </div>
    )
  }
}

List.propTypes = {
    grocery: PropTypes.object.isRequired,
    handleOnEdit: PropTypes.func.isRequired,
    handleIsPurchased: PropTypes.func.isRequired,
    handleOnDelete: PropTypes.func.isRequired
}


export default List