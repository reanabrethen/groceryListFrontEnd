import React, { Component } from 'react'
import List from '../List/List'
import Button from '../common/Button'
import axios from 'axios'

export class Grocery extends Component {
    state ={
        groceryInput: "",
        list: [],
        error: "",
        sortByNewest: false,
        sortByDone: true,
        includePurchasedItems: true
    }

    async componentDidMount(){
        const allGroceries = await axios.get("http://localhost:3000/groceryLists/get-all-groceries")
        this.setState({list: allGroceries.data.payload})
    }

    handleGroceryOnChange = (event)=>{
        this.setState({
            groceryInput: event.target.value
        })
    }

    handleOnSubmit = async(event) =>{
        event.preventDefault()
        if(!this.state.groceryInput.length <= 0 &&
            !this.state.list.some(item => item.grocery === this.state.groceryInput)){
                const newGrocery = await axios.post('http://localhost:3000/groceryLists/create-grocery', {grocery: this.state.groceryInput})
                const newArr = [...this.state.list, newGrocery.data.payload]
                this.setState({
                    list: newArr,
                    groceryInput: "",
                    error: ""
                })
            }else{
                this.setState({error: "Food item already exsists or input is blank."})
            }
    }


    handleIsPurchased = async (id, purchased) => {
        try {
            await axios.put(`http://localhost:3000/groceryLists/update-grocery-by-id/${id}`, {purchased: purchased})
        } catch (error) {
            console.log(error)
        }
        const updatedGrocery = this.state.list.map((grocery)=>{
            if(grocery._id === id){
                grocery.purchased = !grocery.purchased
            }
            return grocery
        })
        this.setState({
            list : updatedGrocery
        })
    }

    sortByPurchased = async (array) => {
        let sorted;
        if(this.state.sortByDone){
            sorted = array.slice().sort((x, y) => Number(x.purchased) - Number(y.purchased))
        }else{
            sorted = array.slice().sort((y, x) => Number(x.purchased) - Number(y.purchased))
        }
        this.setState({
            list: sorted,
            sortByDone: !this.state.sortByDone
        })
    }
    

    sortByOldestToNewest = () => {
        const newArray = this.state.list.sort((x, y) => new Date(x.date) - new Date(y.date))
        this.setState({
           list: newArray
        })
    }
    sortByNewestToOldest = () => {
        const newArray = this.state.list.sort((y, x) => new Date(x.date) - new Date(y.date))
        this.setState({
            list: newArray
        })
    }







    handleOnDelete = async(id) =>{
        const deleteGrocery = await axios.delete(`http://localhost:3000/groceryLists/delete-grocery-by-id/${id}`)
        this.setState({list: this.state.list.filter(deleteGrocery => deleteGrocery._id !== id)})
    }

    handleOnEdit = async(id, text) => {
        if(!text.length <= 0 &&
            !this.state.list.some(item => item.grocery === text.grocery)){
                const updateGroceryItem = await axios.put(`http://localhost:3000/groceryLists/update-grocery-by-id/${id}`, {grocery: text})
                const newArr = this.state.list.map(item =>{
                    if(item._id === updateGroceryItem.data.payload._id){
                        item.grocery = updateGroceryItem.data.payload.grocery
                    }
                    return item
                })
            this.setState({
                list: newArr,
                error: ""
            })
        }else{
            this.setState({error: "This is not a valid grocery item"})
        }
    }

  render() {
    return (
      <div>
        <p className="error">{this.state.error}</p>
        <div className="form-div">
            <form onSubmit={this.handleOnSubmit}>
                <input 
                    type="text" 
                    name='groceryInput'
                    value = {this.state.groceryInput}
                    onChange={this.handleGroceryOnChange}
                    autoFocus
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="sorting">
            <ul>
                <li>
                    <Button 
                        label={'Oldest to Newest'}
                        clickFunction={()=>this.sortByOldestToNewest(this.state.list)}
                        cssClass={'sort-button'}
                        />
                </li>
                <li>
                    <Button 
                        label={'Newest to Oldest'}
                        clickFunction={()=>this.sortByNewestToOldest(this.state.list)}
                        cssClass={'sort-button'}
                        />
                </li>
                <li>
                    <Button 
                        label={'Sort by Purchased'}
                        clickFunction={()=>this.sortByPurchased(this.state.list)}
                        cssClass={'sort-button'}
                        />
                </li>
                <li>
                    <Button 
                        label={'Sort by NOT Purchased'}
                        clickFunction={()=>this.sortByPurchased(this.state.list)}
                        cssClass={'sort-button'}
                        />
                </li>
            </ul>
        </div>
        <div className="grocery-div">
            <ul>
                {this.state.list.filter(item =>{
                    if(this.state.includePurchasedItems){
                        return true
                    }else{
                        return !item.purchased
                    }
                }).map((item) => {
                    return( 
                    <List 
                        key={item._id}
                        grocery = {item}
                        handleIsPurchased = {this.handleIsPurchased}
                        handleOnDelete = {this.handleOnDelete}
                        handleOnEdit = {this.handleOnEdit}
                        />
                    )
                })}
            </ul>
        </div>
      </div>
    )}
}

export default Grocery