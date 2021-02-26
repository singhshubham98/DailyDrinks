import React, { Component } from "react";
import List from "./List";
import AddTodo from "./AddItem";
import TodoDetails from "./TodoDetails";

export default class Main extends Component {
  state = {
    isModalOpen: false,
    name: "",
    price: "",
    description: "",
    drinks: [],
    showDetailsModal: false,
    showDetailsOf: "",
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("data"));

    this.setState({
      drinks: data || [],
    });
  }

  onNameChange = (name) => {
    this.setState({ name });
  };

  onPriceChange = (price) => {
    this.setState({ price });
  };

  onDescChange = (description) => {
    this.setState({ description });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  resetData = () => {
    this.setState({ name: "", price: "", description: "" });
  };

  addDrink = () => {
    let drinksList = [];
    let drinkItem = {};
    const { name, price, description } = this.state;
    if (!name) return;

    //getting previous stored localstorage
    const previousList = JSON.parse(localStorage.getItem(`data`));
    if (previousList !== "" && Array.isArray(previousList)) {
      drinksList = [...previousList];
    }

    //generating id based on milliseconds
    const d = new Date();
    const id = d.valueOf();
    drinkItem = { id: id, name, price, description };
    drinksList.push(drinkItem);
    this.updateDrink(drinksList);
    this.updateLocalStorage(drinksList);
    this.toggleModal();
    this.resetData();
  };

  updateDrink = (drinks) => {
    this.setState({ drinks });
  };

  updateLocalStorage = (todoList) => {
    let list = JSON.parse(localStorage.getItem("data"));
    list = todoList;
    localStorage.setItem("data", JSON.stringify(list));
  };

  deleteTodo = (id) => {
    const newList = this.state.drinks.filter((todos) => todos.id !== id);
    this.updateLocalStorage(newList);
    this.updateDrink(newList);
  };

  todosToShow = (type) => {
    this.setState({ showTodoType: type });
  };

  todoToView = (id) => {
    const { drinks } = this.state;
    const detailsToShow = drinks.filter((todo) => todo.id === id);
    this.setState({
      showDetailsModal: !this.state.showDetailsModal,
      showDetailsOf: detailsToShow,
    });
  };

  render() {
    const {
      isModalOpen,
      name,
      price,
      description,
      drinks,
      showDetailsModal,
      showDetailsOf,
    } = this.state;

    return (
      <>
        <div className="todo-wrapper">
          <div className="todo-filters">
            <button>
              <span>Daily Drinks</span>
            </button>
          </div>

          <List
            drinks={drinks}
            deleteTodo={this.deleteTodo}
            completedToDo={this.completedToDo}
            viewToDo={this.todoToView}
          />
          {!isModalOpen && !showDetailsModal && (
            <div className="add-button">
              <button onClick={this.toggleModal}>&#x271A;</button>
            </div>
          )}

          <div
            className={`${
              showDetailsModal ? "modal modal-details" : "modal-closed"
            }`}
          >
            <div className="modal-container">
              <TodoDetails
                detailsToView={showDetailsOf}
                cancel={() =>
                  this.setState({
                    showDetailsModal: !this.state.showDetailsModal,
                    showDetailsOf: "",
                  })
                }
                updateDrinks={this.updateDrink}
                drinks={this.state.drinks}
              />
            </div>
          </div>
        </div>

        <div className={`${isModalOpen ? "modal" : "modal-closed"}`}>
          <div className="modal-container">
            <AddTodo
              name={name}
              price={price}
              description={description}
              onPriceChange={this.onPriceChange}
              onNameChange={this.onNameChange}
              OnDescChange={this.onDescChange}
              add={this.addDrink}
              reset={this.resetData}
              cancel={this.toggleModal}
            />
          </div>
        </div>
      </>
    );
  }
}
