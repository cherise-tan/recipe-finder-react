import React from 'react'

import { randomRecipe } from '../api'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    randomRecipe()
      .then(res => {
        console.log(res)
        this.setState({
          recipeDetails: res
        })
      })
  }

  render() {
    const recipeDetails = this.state.recipeDetails
    return (
      <React.Fragment>

        {this.state.recipeDetails && (<div>
          <h1>{recipeDetails.title}</h1>
          <img className='image' src={recipeDetails.image} alt=""></img>
          <h3>Category: {recipeDetails.category}</h3>
          <h3>Nationality: {recipeDetails.area}</h3>

          <ul>
            {
              recipeDetails.ingredientArray.map((ingredient, i) => {
                return <li> {recipeDetails.measureArray[i]} {ingredient}</li>
              })
            }
          </ul>

          <ul>
            {
              recipeDetails.instructions.map(instruction => {
                return <li className="no-bullet">{instruction}</li>
              })
            }
          </ul>

        </div>)}


      </React.Fragment>
    )
  }
}

export default App
